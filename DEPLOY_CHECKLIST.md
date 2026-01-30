# DreamHost Deployment Checklist

Use this checklist to ensure everything is ready for deployment.

## Pre-Deployment

- [ ] **Test build locally**
  ```bash
  npm install
  npm run build
  npm start
  ```
  Verify the site works at http://localhost:3000

- [ ] **Environment Variables Prepared**
  - [ ] `NEXT_PUBLIC_SITE_URL` - Your actual domain (e.g., `https://deltachialberta.ca`)
  - [ ] `INSTAGRAM_ACCESS_TOKEN` - Your Instagram access token (if using Instagram feed)
  - [ ] `INSTAGRAM_USER_ID` - Your Instagram user ID (if using Instagram feed)
  - [ ] `NODE_ENV=production` - Will be set automatically by DreamHost

- [ ] **Files Ready**
  - [ ] All source files committed to git (or ready to upload)
  - [ ] `public/` folder contains all images and assets
  - [ ] `favicon.ico` is in `public/` folder
  - [ ] No `.env.local` or sensitive files in repository

## DreamHost Panel Configuration

- [ ] **Domain Setup**
  - [ ] Domain added in DreamHost panel
  - [ ] Web directory set (e.g., `/home/username/yourdomain.com`)
  - [ ] Passenger enabled for the domain
  - [ ] PHP version set (not needed, but Passenger requires it)

- [ ] **Environment Variables Set**
  - [ ] Go to Domains → Manage Domains → Edit your domain
  - [ ] Scroll to "Environment Variables" section
  - [ ] Add `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
  - [ ] Add `INSTAGRAM_ACCESS_TOKEN` = `your_token` (if using Instagram)
  - [ ] Add `INSTAGRAM_USER_ID` = `your_user_id` (if using Instagram)
  - [ ] Add `NODE_ENV` = `production`

## File Upload/Deployment

- [ ] **Upload Files**
  - [ ] All project files uploaded to domain directory
  - [ ] OR Git repository cloned to domain directory
  - [ ] `.htaccess` file is in root directory
  - [ ] `server.js` file is in root directory
  - [ ] `passenger_wsgi.py` file is in root directory

- [ ] **SSH into Server**
  ```bash
  ssh username@yourdomain.com
  cd ~/yourdomain.com
  ```

- [ ] **Install Dependencies**
  ```bash
  npm install --production
  ```

- [ ] **Build Application**
  ```bash
  npm run build
  ```
  This creates the `.next` folder with production build

- [ ] **Verify Files**
  ```bash
  ls -la
  # Should see: server.js, .htaccess, package.json, .next/, public/, app/
  ```

- [ ] **Set Permissions** (if needed)
  ```bash
  chmod 755 ~/yourdomain.com
  chmod 644 ~/yourdomain.com/.htaccess
  chmod 644 ~/yourdomain.com/server.js
  ```

## Post-Deployment

- [ ] **Restart Passenger**
  - [ ] In DreamHost panel: Domains → Manage Domains → Edit domain
  - [ ] Click "Restart Passenger" button
  - [ ] OR wait 2-3 minutes for automatic restart

- [ ] **Test Website**
  - [ ] Visit your domain in browser
  - [ ] Check homepage loads correctly
  - [ ] Test navigation to all pages
  - [ ] Verify Instagram feed works (if configured)
  - [ ] Check mobile responsiveness
  - [ ] Test all links and buttons

- [ ] **Check Logs** (if issues)
  ```bash
  tail -f ~/logs/yourdomain.com/http/error.log
  tail -f ~/logs/passenger.log
  ```

## Troubleshooting

### Site shows "Application failed to start"
- [ ] Check Node.js version: `node --version` (should be 18+)
- [ ] Verify `server.js` exists and is executable
- [ ] Check environment variables are set correctly
- [ ] Review error logs

### 500 Internal Server Error
- [ ] Check Passenger logs
- [ ] Verify `npm run build` completed successfully
- [ ] Ensure `.next` folder exists
- [ ] Check file permissions

### Instagram Feed Not Working
- [ ] Verify environment variables are set
- [ ] Check token hasn't expired
- [ ] Review browser console for errors
- [ ] Check server logs for API errors

### Static Files (images) Not Loading
- [ ] Verify `public/` folder is in correct location
- [ ] Check file permissions on `public/` folder
- [ ] Ensure images exist in `public/images/`

## Maintenance

- [ ] **Update Application**
  ```bash
  git pull  # or upload new files
  npm install --production
  npm run build
  # Restart Passenger in panel
  ```

- [ ] **Monitor Logs Regularly**
  - Check error logs weekly
  - Monitor for any issues

- [ ] **Keep Dependencies Updated**
  ```bash
  npm outdated
  npm update
  npm run build
  ```

## Quick Reference Commands

```bash
# SSH into server
ssh username@yourdomain.com

# Navigate to app directory
cd ~/yourdomain.com

# Install dependencies
npm install --production

# Build application
npm run build

# Check Node version
node --version

# View recent errors
tail -20 ~/logs/yourdomain.com/http/error.log

# Check if Passenger is running
ps aux | grep passenger
```

## Support Resources

- DreamHost Node.js Documentation
- Next.js Deployment Documentation
- DreamHost Support Forums
- Your deployment guide: `DREAMHOST_DEPLOYMENT.md`

