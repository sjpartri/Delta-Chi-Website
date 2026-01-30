# Direct Upload Guide (No GitHub Required)

You can deploy directly to DreamHost without using GitHub. This guide shows you how.

## What You Need

- DreamHost account
- SFTP/FTP client (FileZilla, WinSCP, or DreamHost's file manager)
- Your project files

## Step 1: Prepare Files Locally

**Files to upload:**
- ✅ All files in your project folder
- ✅ `app/` directory
- ✅ `components/` directory
- ✅ `public/` directory
- ✅ `server.js`, `.htaccess`, `passenger_wsgi.py`
- ✅ `package.json`, `package-lock.json`
- ✅ `next.config.js`, `tsconfig.json`
- ✅ `tailwind.config.ts`, `postcss.config.mjs`
- ✅ All `.md` files (documentation)

**Files to SKIP (don't upload):**
- ❌ `node_modules/` folder (will be installed on server)
- ❌ `.next/` folder (will be built on server)
- ❌ `.env.local` or any `.env` files (use DreamHost panel instead)
- ❌ `.git/` folder (if you have one)

## Step 2: Set Environment Variables in DreamHost Panel

**BEFORE uploading**, set these in DreamHost panel:

1. Log into DreamHost panel
2. Go to **Domains** → **Manage Domains**
3. Click **Edit** next to `deltachi.ca`
4. Scroll to **Environment Variables** section
5. Add:
   ```
   NEXT_PUBLIC_SITE_URL = https://deltachi.ca
   NODE_ENV = production
   INSTAGRAM_ACCESS_TOKEN = your_token_here
   INSTAGRAM_USER_ID = your_user_id_here
   ```

## Step 3: Upload Files via SFTP/FTP

### Using FileZilla (Recommended)

1. **Download FileZilla** (free): https://filezilla-project.org/

2. **Connect to DreamHost:**
   - Host: `deltachi.ca` (or your server IP)
   - Username: `webmaster@deltachi.ca`
   - Password: Your DreamHost password
   - Port: 22 (SFTP) or 21 (FTP)

3. **Navigate to your domain directory:**
   - Remote site: `/home/webmaster@deltachi.ca/deltachi.ca/`

4. **Upload files:**
   - Left side: Your local project folder
   - Right side: DreamHost server folder
   - Drag and drop all files (except `node_modules/` and `.next/`)

### Using DreamHost File Manager

1. Log into DreamHost panel
2. Go to **Files** → **Manage Files**
3. Navigate to `/home/webmaster@deltachi.ca/deltachi.ca/`
4. Upload files using the upload button

### Using WinSCP (Windows)

1. Download WinSCP: https://winscp.net/
2. Connect with same credentials as FileZilla
3. Drag and drop files

## Step 4: SSH into Server and Install

After uploading, SSH into your server:

```bash
ssh webmaster@deltachi.ca
cd ~/deltachi.ca
```

**Install dependencies:**
```bash
npm install --production
```

**Build the application:**
```bash
npm run build
```

## Step 5: Verify Files

Check that these files exist:
```bash
ls -la
# Should see: server.js, .htaccess, package.json, app/, components/, public/
```

## Step 6: Restart Passenger

1. DreamHost panel → **Domains** → **Manage Domains** → **Edit** `deltachi.ca`
2. Click **Restart Passenger** button
3. Wait 1-2 minutes

## Step 7: Test

Visit `https://deltachi.ca` - your site should be live! 🎉

## Updating Your Site Later

When you make changes:

1. **Update files locally**
2. **Upload changed files** via SFTP/FTP
3. **SSH into server:**
   ```bash
   ssh webmaster@deltachi.ca
   cd ~/deltachi.ca
   ```
4. **Rebuild:**
   ```bash
   npm run build
   ```
5. **Restart Passenger** in DreamHost panel

## Troubleshooting

**Can't connect via SFTP?**
- Verify your username: `webmaster@deltachi.ca`
- Check DreamHost panel → Users → Manage Users for correct username
- Try port 22 for SFTP or 21 for FTP

**Files not uploading?**
- Check file permissions
- Ensure you're in the correct directory
- Try using DreamHost's file manager instead

**Need help?**
- See `QUICK_START.md` for quick reference
- See `DREAMHOST_DEPLOYMENT.md` for detailed guide

