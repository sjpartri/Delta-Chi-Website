# Quick Start - DreamHost Deployment

This is a simplified guide to get your site live on DreamHost quickly.

## Prerequisites

- DreamHost account with domain configured
- SSH access enabled
- Environment variables ready (see below)

## Step 1: Set Environment Variables in DreamHost Panel

1. Log into DreamHost panel
2. Go to **Domains** → **Manage Domains**
3. Click **Edit** next to your domain
4. Scroll to **Environment Variables** section
5. Add these variables:

```
NEXT_PUBLIC_SITE_URL = https://yourdomain.com
NODE_ENV = production
INSTAGRAM_ACCESS_TOKEN = your_token_here (if using Instagram)
INSTAGRAM_USER_ID = your_user_id_here (if using Instagram)
```

## Step 2: Upload Files

### Option A: Using SFTP/FTP (Easiest - No GitHub Needed)

**Using FileZilla or DreamHost File Manager:**
- Upload all files to `~/deltachi.ca/` 
- **Skip:** `node_modules/` and `.next/` (will be created on server)
- See `DIRECT_UPLOAD_GUIDE.md` for detailed instructions

### Option B: Using Git (Optional)

```bash
ssh webmaster@deltachi.ca
cd ~/deltachi.ca
git clone https://github.com/yourusername/deltachi.git .
```

## Step 3: Update .htaccess

Edit `.htaccess` and replace:
- `username` with your DreamHost username
- `yourdomain.com` with your actual domain

## Step 4: Deploy

SSH into your server and run:

```bash
cd ~/yourdomain.com
chmod +x deploy.sh
./deploy.sh
```

Or manually:

```bash
cd ~/yourdomain.com
npm install --production
npm run build
```

## Step 5: Restart Passenger

1. In DreamHost panel: **Domains** → **Manage Domains** → **Edit** your domain
2. Click **Restart Passenger** button
3. Wait 1-2 minutes

## Step 6: Test

Visit your domain in a browser. The site should be live!

## Troubleshooting

**Site not loading?**
- Check error logs: `tail -f ~/logs/yourdomain.com/http/error.log`
- Verify environment variables are set
- Ensure `npm run build` completed successfully

**Need help?**
- See `DREAMHOST_DEPLOYMENT.md` for detailed guide
- See `DEPLOY_CHECKLIST.md` for step-by-step checklist

