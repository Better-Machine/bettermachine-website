# Deployment

Two apps, two destinations, one webhook listener.

```
                      push to master
                            │
        ┌───────────────────┴───────────────────┐
        ▼                                       ▼
 Hostinger (Node 22, Other)         deploy-internal.yml
 build: npm run build:public        (bettermachine-host)
 output: apps/public/out                  │
        │                                 ▼
        ▼                          admin writes
   bettermachine.ai              (projects, agents)
                                         │
                                         ▼
                                  dispatchPublicRebuild()
                                         │
                                         ▼
                       dispatch-public.yml (logs only)
                       Hostinger builds on next push to master
```

## Apps

| App | Path | Runtime | Destination | Built by |
|---|---|---|---|---|
| `@bm/public` | `apps/public/` | Static export → `apps/public/out/` | Hostinger (`bettermachine.ai`) | Hostinger panel |
| `@bm/internal` | `apps/internal/` | Node server (Next.js start) | `100.69.226.55` (bettermachine-host) | `deploy-internal.yml` |

## How public deployment works (Hostinger-driven)

Hostinger's site panel for `bettermachine.ai` is configured to:

| Field | Value |
|---|---|
| Framework preset | Other |
| Branch | `master` |
| Build command | `npm install && npm run build:public` |
| Output directory | `apps/public/out` |
| Node version | 22.x |

Every push to `master` triggers Hostinger to run `npm install` and `npm run build:public` (which is `npm --workspace apps/public run build`), then serves `apps/public/out/` as the static site.

**Old env vars to delete from Hostinger panel** (no longer used):
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

## How internal deployment works (GitHub Actions-driven)

`deploy-internal.yml` runs on push to `master` or manual `workflow_dispatch`:

1. SSH to `BETTERMACHINE_DEPLOY_HOST` (`100.69.226.55`)
2. `cd "$DEPLOY_PATH"` and `git reset --hard origin/master`
3. Write `apps/internal/.env.local` with admin basic auth + dispatch token
4. `npm ci --workspaces --include-workspace-root`
5. `node apps/internal/migrate.cjs` (idempotent schema migration)
6. `cd apps/internal && npm run build` (Next.js webpack build)
7. Restart systemd unit `bettermachine-monorepo-internal.service`
8. Smoke test `/pmo`, `/internal/admin`, `/api/audit`

## Webhook (option b) — content sync plumbing

After any successful write to a project or agent via `/internal/admin`, the
internal app fires a fire-and-forget `repository_dispatch` POST to GitHub.
`dispatch-public.yml` listens for `public-content-changed` and logs the
event.

```
PUT /api/projects/[id]    ──┐
                            ├──► dispatchPublicRebuild() ──► GitHub API
PUT /api/agents/[id]      ──┘                              ──► dispatch-public.yml
                                                                   (logs only)
```

As of Phase 4, Hostinger builds the public site on every push to `master`,
so the webhook is not currently wired to trigger a public rebuild. It is
kept as:
- An audit point (every admin write produces a log line)
- A registration of the event type, so the dispatch helper has somewhere to land
- A ready hook for a future re-automation (e.g., if the Hostinger build is
  replaced with a GitHub-only pipeline, add a `build` job here)

The dispatch is best-effort: if GitHub is unreachable or the token is
missing, the admin write still succeeds. Manual fallback is to push a
commit to `master` (which Hostinger picks up).

## Required GitHub Secrets

| Secret | Value | Purpose |
|---|---|---|
| `BETTERMACHINE_DEPLOY_HOST` | `100.69.226.55` | SSH host (internal deploy) |
| `BETTERMACHINE_DEPLOY_USER` | `erik-ross` | SSH user |
| `BETTERMACHINE_DEPLOY_KEY` | `<ssh private key>` | SSH key |
| `BETTERMACHINE_DEPLOY_PATH` | `/home/erik-ross/bettermachine-website` | Repo path on the server |
| `BETTERMACHINE_PM2_NAME` | `bettermachine-monorepo-internal.service` | systemd unit (created in setup) |
| `BETTERMACHINE_DISPATCH_TOKEN` | `<GitHub PAT with repo:dispatch>` | Webhook auth |

## Required Hostinger panel settings

Set on the Hostinger site panel for `bettermachine.ai`:

| Setting | Value |
|---|---|
| Branch | `master` |
| Build command | `npm install && npm run build:public` |
| Output directory | `apps/public/out` |
| NEXTAUTH_SECRET | *(delete)* |
| NEXTAUTH_URL | *(delete)* |

## First-time setup on bettermachine-host

The repo isn't cloned yet. Run this once before any workflow can deploy:

```bash
# 1. Clone the monorepo
cd /home/erik-ross
git clone https://github.com/Better-Machine/bettermachine-website.git bettermachine-website
cd bettermachine-website

# 2. Install workspace deps
npm ci --workspaces --include-workspace-root

# 3. Run the migration (creates apps/internal/data.sqlite)
cd apps/internal && node migrate.cjs && cd ../..

# 4. Write the env file
cat > apps/internal/.env.local <<EOF
ADMIN_BASIC_AUTH_USER=admin
ADMIN_BASIC_AUTH_PASS=<chosen-password>
BETTERMACHINE_DISPATCH_TOKEN=***
EOF
chmod 600 apps/internal/.env.local

# 5. Build
cd apps/internal && npm run build && cd ../..

# 6. Create the systemd unit
sudo tee /etc/systemd/system/bettermachine-monorepo-internal.service > /dev/null <<EOF
[Unit]
Description=Better Machine — Internal Dashboard (monorepo)
After=network.target

[Service]
Type=simple
User=erik-ross
WorkingDirectory=/home/erik-ross/bettermachine-website/apps/internal
EnvironmentFile=/home/erik-ross/bettermachine-website/apps/internal/.env.local
ExecStart=/usr/bin/node node_modules/next/dist/bin/next start -p 3000
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now bettermachine-monorepo-internal.service
```

Verify the new unit is running:

```bash
sudo systemctl status bettermachine-monorepo-internal.service
curl -sI http://localhost:3000/pmo
```

## Manual deploy

```bash
# Internal
gh workflow run deploy-internal.yml

# Public — option 1: trigger Hostinger build by pushing an empty commit
git commit --allow-empty -m "rebuild public"
git push origin master

# Public — option 2: trigger from Hostinger panel
# (use Hostinger's "Save and redeploy" button)
```

## Rollback

**Public (Hostinger):** Hostinger keeps the previous successful build. Use
its rollback UI in the panel.

**Internal:** On the server:

```bash
cd /home/erik-ross/bettermachine-website
git reset --hard HEAD@{1}
cd apps/internal && npm run build && cd ../..
sudo systemctl restart bettermachine-monorepo-internal.service
```

## Why webpack (not Turbopack) for the public build

Turbopack spawns PostCSS workers that crash on resource-constrained
shared hosting (the worker exits with status 0 before the parent can
connect). Webpack is fine. The `apps/public` workspace's `build` script
runs `next build --webpack` — see `apps/public/package.json`.
