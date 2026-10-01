# Deployment Setup

This project uses GitHub Actions for continuous deployment to the local production server.

## Workflow

1. **Push to GitHub** → Triggers build
2. **GitHub Actions builds** → Creates static export in `web/dist/`
3. **Deploy job runs** → SCP files to `192.168.50.32:/var/www/bettermachine`
4. **Site live** → https://bettermachine.ai

## Required GitHub Secrets

Configure these in GitHub repo settings → Secrets and variables → Actions:

| Secret | Value | Description |
|--------|-------|-------------|
| `DEPLOY_HOST` | `192.168.50.32` | Production server IP |
| `DEPLOY_USER` | `erik-ross` | SSH user |
| `DEPLOY_KEY` | [SSH private key] | Key with write access to `/var/www/bettermachine` |

## SSH Key Setup

On the production server (192.168.50.32):

```bash
# Generate deploy key (if not exists)
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""

# Add public key to authorized_keys
cat ~/.ssh/github_deploy.pub >> ~/.ssh/authorized_keys

# Set proper permissions
chmod 700 ~/.ssh
chmod 600 ~/.ssh/authorized_keys

# Copy private key for GitHub secret
cat ~/.ssh/github_deploy
```

Paste the private key (entire contents including `-----BEGIN OPENSSH PRIVATE KEY-----`) into GitHub secret `DEPLOY_KEY`.

## Testing Deployment

The workflow runs on:
- Every push to `main` → Build + Deploy
- Every PR to `main` → Build only (no deploy)

## Manual Deploy

If needed, deploy manually from local:

```bash
cd web
npm run build
rsync -avz --delete dist/ erik-ross@192.168.50.32:/var/www/bettermachine/
```

## Verification

After deployment, verify:
- https://bettermachine.ai loads
- Project detail pages work (e.g., /projects/hockeyops)
- No console errors
