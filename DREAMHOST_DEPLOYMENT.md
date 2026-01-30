# DreamHost Deployment Guide

This guide will help you deploy your Next.js application to DreamHost.

## Prerequisites

1. A DreamHost account with Node.js support enabled
2. SSH access to your DreamHost server
3. Your domain or subdomain configured in DreamHost

## Step 1: Prepare Your Application

### 1.1 Build the Application Locally (Optional - for testing)

```bash
npm install
npm run build
```

This will create a `.next` folder with the production build. You can test it locally with `npm start` to ensure everything works.

### 1.2 Create Environment Variables File

Create a `.env.production` file (or use DreamHost's environment variable settings) with:

```env
# Site URL (update with your actual domain)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# Instagram API (if using Instagram feed)
INSTAGRAM_ACCESS_TOKEN=your_instagram_access_token_here
INSTAGRAM_USER_ID=your_instagram_user_id_here

# Node environment
NODE_ENV=production
```

**Important:** Never commit `.env.production` to git. It should be in `.gitignore` (which it already is).

## Step 2: Set Up Node.js App in DreamHost Panel

1. Log in to your DreamHost panel
2. Go to **Domains** → **Manage Domains**
3. Click **Edit** next to your domain
4. Under **Web Options**, ensure **Passenger (Ruby/Node.js/Python apps)** is enabled
5. Set the **Web directory** to your application directory (e.g., `/home/username/yourdomain.com`)

## Step 3: Upload Your Files

### Option A: Using Git (Recommended)

1. SSH into your DreamHost server:
   ```bash
   ssh username@yourdomain.com
   ```

2. Navigate to your domain directory:
   ```bash
   cd ~/yourdomain.com
   ```

3. Clone your repository (if using Git):
   ```bash
   git clone https://github.com/yourusername/deltachi.git .
   ```

4. Or if you already have files there, pull updates:
   ```bash
   git pull
   ```

### Option B: Using SFTP/FTP

Upload all project files to your domain directory, excluding:
- `node_modules/` (will be installed on server)
- `.next/` (will be built on server)
- `.env.local` (use `.env.production` instead)

## Step 4: Install Dependencies and Build

1. SSH into your server:
   ```bash
   ssh username@yourdomain.com
   cd ~/yourdomain.com
   ```

2. Install Node.js dependencies:
   ```bash
   npm install --production
   ```

3. Build the Next.js application:
   ```bash
   npm run build
   ```

## Step 5: Configure Environment Variables

### Option A: Using DreamHost Panel

1. In DreamHost panel, go to **Domains** → **Manage Domains**
2. Click **Edit** next to your domain
3. Scroll to **Environment Variables** section
4. Add each environment variable:
   - `NEXT_PUBLIC_SITE_URL` = `https://yourdomain.com`
   - `INSTAGRAM_ACCESS_TOKEN` = `your_token_here`
   - `INSTAGRAM_USER_ID` = `your_user_id_here`
   - `NODE_ENV` = `production`

### Option B: Using .env.production file

1. Create `.env.production` in your project root:
   ```bash
   nano .env.production
   ```

2. Add your environment variables (see Step 1.2)

3. Save and exit (Ctrl+X, then Y, then Enter)

## Step 6: Configure Passenger/Node.js

1. In your domain directory, create or edit `package.json` to ensure the start script is correct:
   ```json
   {
     "scripts": {
       "start": "next start -p $PORT"
     }
   }
   ```

2. Create a `passenger_wsgi.py` file (even though it's Python, Passenger uses it for Node.js):
   ```python
   import sys
   import os

   # Add your project directory to the Python path
   sys.path.insert(0, os.path.dirname(__file__))

   # Passenger will automatically detect and run your Node.js app
   ```

   **OR** create a `.htaccess` file:
   ```apache
   PassengerNodejs /usr/bin/node
   PassengerAppRoot /home/username/yourdomain.com
   PassengerAppType node
   PassengerStartupFile server.js
   ```

3. Actually, for Next.js on DreamHost, you may need to create a custom server file. Create `server.js`:
   ```javascript
   const { createServer } = require('http')
   const { parse } = require('url')
   const next = require('next')

   const dev = process.env.NODE_ENV !== 'production'
   const hostname = 'localhost'
   const port = process.env.PORT || 3000

   const app = next({ dev, hostname, hostname })
   const handle = app.getRequestHandler()

   app.prepare().then(() => {
     createServer(async (req, res) => {
       try {
         const parsedUrl = parse(req.url, true)
         await handle(req, res, parsedUrl)
       } catch (err) {
         console.error('Error occurred handling', req.url, err)
         res.statusCode = 500
         res.end('internal server error')
       }
     }).listen(port, (err) => {
       if (err) throw err
       console.log(`> Ready on http://${hostname}:${port}`)
     })
   })
   ```

4. Update `package.json` start script:
   ```json
   {
     "scripts": {
       "start": "node server.js"
     }
   }
   ```

## Step 7: Set File Permissions

```bash
chmod 755 ~/yourdomain.com
chmod 644 ~/yourdomain.com/.env.production
```

## Step 8: Restart the Application

1. In DreamHost panel, go to **Domains** → **Manage Domains**
2. Click **Edit** next to your domain
3. Click **Restart Passenger** or wait a few minutes for automatic restart

## Step 9: Verify Deployment

1. Visit your domain in a browser
2. Check that all pages load correctly
3. Verify Instagram feed is working (if configured)
4. Check browser console for any errors

## Troubleshooting

### Application Not Starting

1. Check DreamHost error logs:
   ```bash
   tail -f ~/logs/yourdomain.com/http/error.log
   ```

2. Check Node.js version:
   ```bash
   node --version
   ```
   DreamHost should have Node.js 18+ for Next.js 14.

3. Verify environment variables are set:
   ```bash
   echo $NEXT_PUBLIC_SITE_URL
   ```

### Build Errors

1. Ensure all dependencies are installed:
   ```bash
   npm install
   ```

2. Check for TypeScript errors:
   ```bash
   npm run lint
   ```

### Instagram Feed Not Working

1. Verify environment variables are set correctly
2. Check that tokens haven't expired
3. Review server logs for API errors

### Static Files Not Loading

1. Ensure `public/` folder is in the correct location
2. Check file permissions on `public/` folder
3. Verify Next.js is serving static files correctly

## Alternative: Use DreamHost's Node.js Version Manager

If you need a specific Node.js version:

1. Install nvm (Node Version Manager):
   ```bash
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
   source ~/.bashrc
   ```

2. Install and use Node.js 18+:
   ```bash
   nvm install 18
   nvm use 18
   ```

## Notes

- DreamHost uses Passenger for Node.js apps
- The application will automatically restart when files change (in development) or when you restart Passenger
- Environment variables set in DreamHost panel take precedence over `.env.production`
- For production, always use `NODE_ENV=production`
- Keep your `.env.production` file secure and never commit it to version control

## Support

If you encounter issues:
1. Check DreamHost's Node.js documentation
2. Review Next.js deployment documentation
3. Check DreamHost support forums
4. Contact DreamHost support if needed

