# Deployment

Two apps, two destinations, one webhook.

```
                         push to master
                                │
                                ├────────────────────┐
                                ▼                    ▼
                  deploy-internal.yml    deploy-public.yml
                  (bettermachine-host)   (Hostinger static)
                          │                      ▲
                          │                      │
                          ▼                      │
                  admin writes ─── webhook ──────┘
                  (projects, agents)   (option b)
```

## Apps

| App | Path | Runtime | Destination | Workflow |
|---|---|---|---|---|
| `@bm/public` | `apps/public/` | Static export → `out/` | Hostinger (`u946149573@145.79.4.138:65002`) | `deploy-public.yml` |
| `@bm/internal` | `apps/internal/` | Node server (Next.js start) | `100.69.226.55` (bettermachine-host) | `deploy-internal.yml` |

## Triggers

- **`deploy-internal.yml`** fires on:
  - `push` to `master`
  - `workflow_dispatch` (manual)
- **`deploy-public.yml`** fires on:
  - `push` to `master` (any commit rebuilds the public site)
  - `repository_dispatch` of type `public-content-changed` (webhook from internal writes)
  - `workflow_dispatch` (manual)

## Webhook (option b) — content sync

After any successful write to a project or agent via `/internal/admin`, the
internal app fires a fire-and-forget `repository_dispatch` POST to GitHub.
`deploy-public.yml` then rebuilds and rsyncs the static site.

```
PUT /api/projects/[id]    ──┐
                            ├──► dispatchPublicRebuild() ──► GitHub API
PUT /api/agents/[id]      ──┘                              ──► deploy-public.yml
                                                                │
                                                                ▼
                                                          Hostinger static
```

The dispatch is best-effort: if GitHub is unreachable or the token is
missing, the admin write still succeeds. The deploy can be triggered
manually from the Actions tab.

## Required GitHub Secrets

| Secret | Used by | Purpose |
|---|---|---|
| `BETTERMACHINE_DEPLOY_HOST` | internal | SSH host (`100.69.226.55`) |
| `BETTERMACHINE_DEPLOY_USER` | internal | SSH user (`erik-ross`) |
| `BETTERMACHINE_DEPLOY_KEY` | internal | SSH private key |
| `BETTERMACHINE_DEPLOY_PATH` | internal | Repo path on the server |
| `BETTERMACHINE_PM2_NAME` | internal | pm2 process name (or systemd unit) |
| `BETTERMACHINE_DISPATCH_TOKEN` | internal → public | GitHub PAT with `repo:dispatch` scope |
| `BETTERMACHINE_HOSTINGER_HOST` | public | Hostinger SSH host |
| `BETTERMACHINE_HOSTINGER_USER` | public | Hostinger SSH user |
| `BETTERMACHINE_HOSTINGER_PORT` | public | Hostinger SSH port (likely `65002`) |
| `BETTERMACHINE_HOSTINGER_KEY` | public | Hostinger SSH private key |
| `BETTERMACHINE_HOSTINGER_PATH` | public | Remote target directory |
| `ADMIN_BASIC_AUTH_USER` | internal | Basic auth user for `/internal/admin` |
| `ADMIN_BASIC_AUTH_PASS` | internal | Basic auth password |

## First-time setup on bettermachine-host

```bash
# 1. Clone the monorepo into the deploy path
cd "$BETTERMACHINE_DEPLOY_PATH"
git clone https://github.com/Better-Machine/bettermachine-website.git .

# 2. Install workspace deps
npm ci --workspaces --include-workspace-root

# 3. Run the migration
cd apps/internal && node migrate.cjs && cd ../..

# 4. Register the pm2 process
cd apps/internal
pm2 start npm --name "$BETTERMACHINE_PM2_NAME" -- start
pm2 save
```

## First-time setup on Hostinger

The public app is a static export. The destination directory on the
Hostinger box should be the document root of `bettermachine.ai`
(typically `/home/u946149573/domains/bettermachine.ai/public_html/`).
The deploy workflow rsyncs `apps/public/out/` directly into it.

```bash
# 1. Verify the destination exists and is writable
ssh -p 65002 u946149573@145.79.4.138 \
  "ls -ld /home/u946149573/domains/bettermachine.ai/public_html/"

# 2. (optional) Drop a stub index.html so DNS doesn't 404 before the first deploy
```

## Manual deploy

```bash
# Internal
gh workflow run deploy-internal.yml

# Public (after editing data.sqlite on the server, or as a recovery path)
gh workflow run deploy-public.yml
```

## Rollback

The internal app's `git reset --hard origin/master` step in the deploy
workflow can be undone with `git reset --hard HEAD@{1}` on the server.
The public app is static — re-trigger `deploy-public.yml` after a
`git revert` on master.

## Why webpack (not Turbopack) for the public build

Turbopack spawns PostCSS workers that crash on resource-constrained
shared hosting (the worker exits with status 0 before the parent can
connect). Webpack is fine. See the workflow comments for the
`NEXT_TELEMETRY_DISABLED` env var.
