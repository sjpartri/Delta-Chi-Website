# Deploying to Vercel

This guide explains how to deploy the Delta Chi Alberta website to Vercel and configure environment variables.

## Prerequisites

1. A Vercel account (sign up at [vercel.com](https://vercel.com))
2. Your Instagram Graph API credentials:
   - `INSTAGRAM_ACCESS_TOKEN` (long-lived Page Access Token)
   - `INSTAGRAM_USER_ID` (numeric Instagram Business Account ID)

## Step 1: Connect Your Repository

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Vercel will auto-detect Next.js settings

## Step 2: Configure Environment Variables

**Important:** You must add environment variables in Vercel before deploying, or your Instagram feed won't work.

### In Vercel Dashboard:

1. Go to your project settings
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:

#### Required Variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `INSTAGRAM_ACCESS_TOKEN` | Your Instagram Graph API long-lived Page Access Token | `EAABwzLix...` (long string) |
| `INSTAGRAM_USER_ID` | Your Instagram Business Account numeric ID | `17841411797581540` |

#### Optional Variables:

| Variable Name | Description | Example |
|--------------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your production site URL (for sitemap, canonical URLs) | `https://deltachialberta.ca` |
| `INSTAGRAM_HIGHLIGHTS` | JSON array of manually configured highlights | `[{"id":"1","image":"https://...","label":"Recruitment"}]` |

### Adding Variables:

1. Click **Add New**
2. Enter the variable name (e.g., `INSTAGRAM_ACCESS_TOKEN`)
3. Enter the value (paste your token/ID)
4. Select environments:
   - ✅ **Production** (required)
   - ✅ **Preview** (optional, for testing)
   - ✅ **Development** (optional, for local testing)
5. Click **Save**

### Important Notes:

- **Never commit** `.env.local` to Git (it's already in `.gitignore`)
- Vercel automatically injects these variables at build time
- Variables are available as `process.env.VARIABLE_NAME` in your code
- Changes to environment variables require a new deployment

## Step 3: Deploy

1. After adding environment variables, click **Deploy**
2. Vercel will:
   - Install dependencies (`npm install`)
   - Build your app (`npm run build`)
   - Deploy to production

## Step 4: Verify Deployment

1. Once deployed, visit your site
2. Check the Instagram feed on the home page
3. If the feed is empty, check:
   - Vercel deployment logs for errors
   - Visit `/api/instagram/verify` to test your credentials
   - Ensure environment variables are set for **Production** environment

## Troubleshooting

### Instagram Feed Not Working?

1. **Check Vercel Logs:**
   - Go to your project → **Deployments** → Click on a deployment → **Functions** tab
   - Look for errors in `/api/instagram` routes

2. **Verify Environment Variables:**
   - Go to **Settings** → **Environment Variables**
   - Ensure variables are set for **Production**
   - Check for typos in variable names

3. **Test Your Credentials:**
   - Visit `https://your-site.vercel.app/api/instagram/verify`
   - This will tell you if your token and user ID are valid

4. **Common Issues:**
   - Token expired → Generate a new long-lived token
   - Wrong User ID → Use numeric ID, not username
   - Token not long-lived → Use Page Access Token, not User Access Token

### Getting Instagram Credentials

If you don't have Instagram credentials yet:

1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create/select an app
3. Add Instagram Basic Display product
4. Generate a long-lived Page Access Token
5. Get your Instagram Business Account ID from Graph API Explorer

See your `.env.example` file for more details.

## Environment Variable Reference

### `INSTAGRAM_ACCESS_TOKEN`
- **Type:** String
- **Required:** Yes (for Instagram feed)
- **Description:** Long-lived Page Access Token from Facebook Graph API
- **How to get:** Facebook Developers → Your App → Tools → Graph API Explorer → Generate Token → Select "Page Access Token" → Make it long-lived

### `INSTAGRAM_USER_ID`
- **Type:** Number (as string)
- **Required:** Yes (for Instagram feed)
- **Description:** Numeric ID of your Instagram Business Account
- **How to get:** Graph API Explorer → `GET /me/accounts` → Find your page → `instagram_business_account.id`

### `NEXT_PUBLIC_SITE_URL`
- **Type:** String (URL)
- **Required:** No
- **Description:** Your production site URL
- **Example:** `https://deltachialberta.ca`
- **Used for:** Sitemap generation, canonical URLs

### `INSTAGRAM_HIGHLIGHTS`
- **Type:** JSON String
- **Required:** No
- **Description:** Manually configured Instagram highlights
- **Format:** `[{"id":"1","image":"https://...","label":"Recruitment","link":"https://..."}]`

## Next Steps

After deployment:
- Set up a custom domain (if needed)
- Configure automatic deployments from your main branch
- Set up preview deployments for pull requests (optional)
