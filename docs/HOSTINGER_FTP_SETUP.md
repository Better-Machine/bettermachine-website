# Hostinger FTP Deployment Secrets

## Required GitHub Secrets

Add these in: GitHub → Settings → Secrets → Actions → New repository secret

| Secret Name | Value | Where to Find |
|-------------|-------|---------------|
| `FTP_SERVER` | `ftp.bettermachine.ai` or `ftpupload.net` | Hostinger hPanel → Files → FTP Accounts |
| `FTP_USERNAME` | Your FTP username | Hostinger hPanel → Files → FTP Accounts |
| `FTP_PASSWORD` | Your FTP password | Hostinger hPanel → Files → FTP Accounts → Manage → Change Password |

## Steps to Get FTP Credentials

1. Log into Hostinger hPanel
2. Go to **Files → FTP Accounts**
3. If no FTP account exists:
   - Click **Create FTP Account**
   - Username: `bettermachine` (or your choice)
   - Password: generate secure password
   - Directory: `/public_html/`
4. If account exists:
   - Click **Manage** next to the account
5. Note down:
   - **FTP Hostname** (e.g., `ftp.bettermachine.ai`)
   - **Username** (e.g., `u123456789.bettermachine`)
   - **Password** (set or reset if needed)

## Testing FTP Connection

From your local machine:
```bash
ftp -p ftp.bettermachine.ai
# Enter username and password when prompted
```

## Notes

- Uses **FTPS** (FTP over SSL/TLS) — secure
- Port 21 (standard FTPS)
- Deploys to `/public_html/` (Hostinger's web root)
- Incremental sync — only uploads changed files
