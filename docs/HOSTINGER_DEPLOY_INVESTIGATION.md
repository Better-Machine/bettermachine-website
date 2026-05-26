# Hostinger GitHub Actions Deployment Investigation

## Executive Summary

The current GitHub Actions workflow fails with `dial tcp ***:22: i/o timeout` when trying to use `appleboy/scp-action` to deploy to Hostinger. This document analyzes the root cause and provides alternative deployment solutions.

---

## Root Cause Analysis

### The Problem

```
dial tcp ***:22: i/o timeout
```

This error indicates that Hostinger's shared hosting environment **does not expose SSH on port 22 to external IP addresses** (such as GitHub Actions runners). Shared hosting providers commonly restrict SSH access for security reasons.

### Why SCP/SSH Fails

1. **Hostinger Shared Hosting Restrictions**: SSH/SFTP access on shared hosting is typically restricted to:
   - Only connections from specific whitelisted IPs
   - Connections requiring hPanel authentication
   - No direct SSH access from CI/CD runners

2. **GitHub Actions Runner IPs**: GitHub Actions runners use dynamic IP addresses that cannot be reliably whitelisted

3. **The `appleboy/scp-action` action**: Requires direct SSH connectivity which Hostinger shared hosting doesn't support from external sources

---

## Deployment Options Ranked by Preference

### Option 1: FTP/FTPS Deployment (RECOMMENDED) ⭐

**Status**: ✅ Available on all Hostinger shared hosting plans

Hostinger provides FTP/FTPS access on ports 21 (FTP) and 21/990 (FTPS). This is the most reliable method for GitHub Actions deployment.

**Implementation**:

```yaml
name: Deploy to Hostinger via FTP

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy via FTP
        uses: SamKirkland/FTP-Deploy-Action@v4.4.0
        with:
          server: ${{ secrets.FTP_SERVER }}
          username: ${{ secrets.FTP_USERNAME }}
          password: ${{ secrets.FTP_PASSWORD }}
          protocol: ftps
          port: 21
          local-dir: ./
          server-dir: /public_html/
          exclude: |
            **/.git*
            **/.git*/**
            **/node_modules/**
            **/.github/**
```

**Required Secrets** (add in GitHub repo Settings > Secrets):
- `FTP_SERVER`: Your Hostinger FTP server (e.g., `ftp.yourdomain.com` or IP)
- `FTP_USERNAME`: FTP username from hPanel
- `FTP_PASSWORD`: FTP password from hPanel

**Pros**:
- Native GitHub Actions support with `FTP-Deploy-Action`
- Incremental sync (only uploads changed files)
- No SSH dependencies
- Works reliably from GitHub Actions

**Cons**:
- FTP is unencrypted (use FTPS for security)
- Slightly slower than SSH for large deployments
- Requires storing FTP credentials as secrets

---

### Option 2: Hostinger Git Auto-Deploy (if available)

**Status**: ⚠️ Limited availability on specific plans

Hostinger offers a **Git Auto-Deploy** feature on some plans that allows direct Git integration from GitHub.

**How to Check**:
1. Log into hPanel
2. Navigate to **Website** → **Git**
3. Look for "Auto Deploy" or "Git Integration" option

**Implementation** (if available):

```yaml
name: Trigger Hostinger Auto-Deploy

on:
  push:
    branches: [main]

jobs:
  webhook:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Hostinger Deploy Webhook
        run: |
          curl -X POST "${{ secrets.HOSTINGER_DEPLOY_WEBHOOK }}"
```

**Pros**:
- Native integration
- No file transfer overhead
- Automatic on every push

**Cons**:
- Not available on all Hostinger plans
- May require Business or higher tier
- Limited documentation

---

### Option 3: Hostinger API Deployment

**Status**: ⚠️ Limited scope for file deployment

Hostinger has a [Developer API](https://developers.hostinger.com/) but it primarily focuses on:
- DNS management
- Domain operations
- VPS/server management
- **NOT** shared hosting file deployment

**Pros**:
- Modern API approach
- Programmatic control

**Cons**:
- API does not support shared hosting file uploads
- Requires API key generation
- Not suitable for this use case

---

### Option 4: Self-Hosted Runner on Better-Machine Infrastructure

**Status**: ✅ Feasible alternative

Deploy to a server you control (e.g., `192.168.50.32` mentioned in documentation) instead of Hostinger.

**Implementation**:

```yaml
name: Deploy to Self-Hosted Server

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Deploy via SCP
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.SERVER_HOST }}
          username: ${{ secrets.SERVER_USERNAME }}
          key: ${{ secrets.SERVER_SSH_KEY }}
          source: "."
          target: "/var/www/bettermachine-website/"
```

**Pros**:
- Full SSH access
- Complete control over deployment
- Can use nginx/Apache as reverse proxy

**Cons**:
- Requires maintaining own infrastructure
- Need to configure DNS to point to your server
- Additional server management overhead

---

### Option 5: Hostinger Business/VPS Hosting Upgrade

**Status**: ⚠️ Requires plan change

Hostinger VPS or Business hosting includes full SSH access that works with GitHub Actions.

**Pros**:
- Full SSH/SCP support
- Better performance
- More control

**Cons**:
- Additional cost
- Migration required
- Overkill for simple static sites

---

## Recommended Solution

### Primary Recommendation: **FTP/FTPS via SamKirkland/FTP-Deploy-Action**

This is the most reliable, well-documented, and widely-used approach for deploying to Hostinger shared hosting from GitHub Actions.

### Setup Steps

1. **Get FTP credentials from hPanel**:
   - Log into Hostinger hPanel
   - Go to **Files** → **FTP Accounts**
   - Create or note existing FTP credentials

2. **Add secrets to GitHub**:
   - Go to Repo Settings → Secrets → Actions
   - Add `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD`

3. **Update workflow** (see code above)

4. **Test deployment**:
   ```bash
   # Dry run locally
   git push origin main
   # Check Actions tab for deployment status
   ```

---

## Trade-offs Summary

| Option | Complexity | Security | Speed | Cost | Recommendation |
|--------|-----------|----------|-------|------|----------------|
| FTP/FTPS | Low | Good (with FTPS) | Medium | $0 | ⭐ **RECOMMENDED** |
| Git Auto-Deploy | Low | Good | Fast | $0 | Check if available |
| Hostinger API | Medium | Good | N/A | $0 | Not suitable |
| Self-Hosted | High | Good | Fast | $ (infra) | Alternative |
| VPS Upgrade | Medium | Good | Fast | $$ | Overkill |

---

## Next Steps

1. ✅ **Immediate**: Switch to FTP-Deploy-Action (Option 1)
2. 🔄 **Future**: Consider moving to VPS or cloud hosting (Vercel, Netlify) for better CI/CD integration
3. 📋 **Document**: Update `TOOLS.md` with FTP credentials location

---

## References

- [SamKirkland/FTP-Deploy-Action](https://github.com/SamKirkland/FTP-Deploy-Action)
- [Hostinger hPanel Documentation](https://support.hostinger.com/)
- [GitHub Actions Secrets Documentation](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)

---

*Investigation completed: 2026-05-26*
