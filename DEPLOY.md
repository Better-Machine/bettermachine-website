# Deployment Setup

This project deploys a **Next.js Node.js server** (not a static export)
to the local production box at `192.168.50.32`.

## Why this changed (2026-09-30)

The site was previously built with `output: "export"` — a fully static
export that SCP'd `web/dist/` to nginx on the production box. That worked
for the public marketing site, but it cannot run:

- **API routes** (`/api/projects`, `/api/agents`, `/api/pmo`) — these
  need a Node.js runtime.
- **Dynamic pages** with `force-dynamic` — the PMO must read the DB on
  every request to be useful.

The PMO build required both. Static export was dropped in favor of a
real Node.js server. The trade-off:

- ✅ PMO and APIs are live.
- ✅ DB edits show up without redeploy (just restart the server).
- ⚠️ The deploy script now `rsync`s source + `npm install`s on the box,
  then restarts a `pm2` / `systemd` process instead of just SCP'ing
  static files.
- ⚠️ Onboarding a contributor now requires them to install npm deps
  locally, not just `rsync` a dist folder.

## Workflow

1. **Push to GitHub** → Triggers build
2. **GitHub Actions runs lint + type-check** (no build artifact upload)
3. **Deploy job runs** → SSHes to `192.168.50.32`, pulls latest, runs
   `npm ci --production`, runs `npm run seed`, restarts the Node process
   via `pm2 reload bettermachine-website`.
4. **Site live** → https://bettermachine.ai (public) and
   https://private.bettermachine.ai/pmo (internal)

## Required GitHub Secrets

| Secret | Value | Description |
|---|---|---|
| `DEPLOY_HOST` | `192.168.50.32` | Production server IP |
| `DEPLOY_USER` | `erik-ross` | SSH user |
| `DEPLOY_KEY` | (SSH private key) | Key with write access |

## Production server setup (one-time)

```bash
# As erik-ross on 192.168.50.32
sudo mkdir -p /opt/bettermachine-website
sudo chown erik-ross:erik-ross /opt/bettermachine-website
git clone https://github.com/Better-Machine/bettermachine-website /opt/bettermachine-website
cd /opt/bettermachine-website/web
nvm use 24
npm ci
npm run seed

# pm2 process manager
pm2 start npm --name bettermachine-website -- run start
pm2 save
pm2 startup
```

## Reverse proxy (Caddy on the prod box)

```caddyfile
bettermachine.ai, www.bettermachine.ai {
    reverse_proxy 127.0.0.1:3000
}

private.bettermachine.ai {
    reverse_proxy 127.0.0.1:3000
}
```

The Next.js app itself enforces the private/public split via
`web/src/middleware.ts` — the Caddy config just forwards both hostnames
to the same Node process.

## Manual deploy

```bash
ssh erik-ross@192.168.50.32
cd /opt/bettermachine-website
git pull
cd web
nvm use 24
npm ci
npm run seed
pm2 reload bettermachine-website
```

## Verification

After deploy:
- https://bettermachine.ai loads
- https://bettermachine.ai/projects/gtcpgh (renamed from barto) loads
- https://bettermachine.ai/agents/ray (renamed from BobbyRay) loads
- https://private.bettermachine.ai/pmo loads (Cloudflare + middleware gate)
- https://bettermachine.ai/pmo 404s (middleware gate)
- https://bettermachine.ai/api/pmo 404s (middleware gate)

## Rollback

```bash
ssh erik-ross@192.168.50.32
pm2 reload bettermachine-website --update-env
# If the new commit is broken, revert in git:
git revert HEAD
pm2 reload bettermachine-website
```
