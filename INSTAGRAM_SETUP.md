# How to Hook Up Instagram

You have two main options to show real Instagram content on the site.

---

## Option 1: Instagram Graph API (real feed in your layout)

Use this if you want the feed and stories to pull from your **Instagram Business or Creator** account automatically.

### 1. Prerequisites

- An **Instagram Business or Creator** account (not personal).
- A **Facebook Page** connected to that Instagram account.
  **It must be a Page, not a Facebook Group** — the Instagram Graph API only works with Pages linked to Instagram Business/Creator accounts.
- A **Facebook Developer** account: [developers.facebook.com](https://developers.facebook.com).

### 2. Create a Facebook Page (if you don’t have one)

You need a **Facebook Page** (not a personal profile or a Group) so Instagram Business/Creator can connect to it.

1. Go to [facebook.com/pages/create](https://www.facebook.com/pages/create) (or in the Facebook app: **Menu** → **Pages** → **Create**).
2. Choose a type, e.g. **Community or Public Figure** or **Brand or Product** (e.g. “Delta Chi Alberta”).
3. Enter the **Page name** (e.g. “Delta Chi Alberta”) and an optional **category** (e.g. “Fraternity” or “Nonprofit Organization”).
4. Add a short **description** and **profile picture** if prompted. You can edit these later.
5. Click **Create Page**. Facebook may ask you to add a few more details; you can skip or fill them in.
6. After the Page exists, go to [business.facebook.com](https://business.facebook.com) (Meta Business Suite) → **Settings** → **Accounts** → **Instagram**. Connect your Instagram Business or Creator account to this Page.
   (If your Instagram is still “Personal”, switch it to **Professional** in Instagram: **Settings** → **Account** → **Switch to professional account**, then connect it to the new Page.)

### 3. Create a Facebook App

1. Go to [developers.facebook.com/apps](https://developers.facebook.com/apps) → **Create App**.
2. Choose **Other** → **Business** (or use “Consumer” if you prefer).
3. Name the app (e.g. “Delta Chi Alberta Site”), add contact email, create app.

### 4. Add Instagram Graph API

1. In the app dashboard, go to **Add Products**.
2. Find **Instagram** and click **Set up**.
3. Use **Instagram Graph API** (for Business/Creator accounts).

### 5. Connect Instagram to a Facebook Page

1. In **Facebook Login** (or **Instagram**) product settings, you need to connect an Instagram account via a Page.
2. **Meta Business Suite**: [business.facebook.com](https://business.facebook.com) → connect your **Facebook Page** and **Instagram account** (Settings → Accounts → Instagram).
3. Ensure the Instagram account is set as **Business** or **Creator** and linked to that Page.

### 6. Get a long‑lived Page Access Token

You need a **Page Access Token** that has Instagram permissions. Easiest path:

1. **Graph API Explorer**: [developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer).
2. Select your app, then under “User or Page” choose the **Page** linked to Instagram.
3. Click **Generate Access Token**.
4. In the permission dialog, request:
   - `instagram_basic`
   - `pages_show_list`
   - `pages_read_engagement`
5. After generating, use the **Access Token Info** (or “Debug”) and click **Extend** to get a long‑lived token (optional but recommended so it lasts longer).

### 7. Get your Instagram Business Account ID

1. In Graph API Explorer, call:
   ```text
   GET /me/accounts
   ```
   with the Page token. Find the Page that has `instagram_business_account` in the response.
2. In that Page object you’ll see something like:
   ```json
   "instagram_business_account": { "id": "123456789" }
   ```
   That `id` is your **Instagram User ID** (the numeric ID of the Business/Creator account).

### 8. Add env variables

In the project root, copy `.env.example` to `.env.local` and set:

```env
# Instagram Graph API (Option 1)
INSTAGRAM_ACCESS_TOKEN=your_long_lived_page_access_token
INSTAGRAM_USER_ID=your_instagram_business_account_id
```

- **INSTAGRAM_ACCESS_TOKEN**: The long‑lived Page Access Token from step 5.
- **INSTAGRAM_USER_ID**: The numeric ID from step 6.

Restart the dev server after changing env vars.

### 9. Test the feed

- **Feed**: The home page feed is wired to `GET /api/instagram`. If the token and user ID are correct, it will show real posts.
- **Stories**: The Graph API only exposes *current* stories (last 24 hours). The Stories section can be updated to use that later, or you can keep manual/placeholder “highlights” for now.

### 10. Verify token and User ID

You can confirm that your token and User ID are correct in two ways:

**A) Project verify endpoint (when the server can reach Instagram)**
With the dev server running (and, if needed, `NODE_TLS_REJECT_UNAUTHORIZED=0` for local SSL issues), open in your browser:

```
http://localhost:3000/api/instagram/verify
```

- **`{ "valid": true, "message": "Token and User ID are correct.", "username": "uofadchi" }`** → Token and User ID are valid.
- **`{ "valid": false, "error": "..." }`** → Something is wrong; the `error` text explains (e.g. invalid token, wrong ID).

**B) Graph API Explorer (works even when your machine has SSL/firewall issues)**
This runs in your browser, so it doesn’t use your Node/server environment:

1. Go to [Graph API Explorer](https://developers.facebook.com/tools/explorer).
2. Select your app and choose the **Page** linked to Instagram (under “User or Page”).
3. In the request URL box, use: **`{user-id}?fields=id,username`** and replace `{user-id}` with your numeric `INSTAGRAM_USER_ID` (e.g. `1009859785536653`). So the path is: `1009859785536653?fields=id,username`.
4. Click **Submit**.

- If you see **`{ "id": "1009859785536653", "username": "uofadchi" }`** (or your handle), the token and User ID are correct.
- If you see an **error** (e.g. “Invalid OAuth access token”), the token is wrong or expired; generate a new Page token and try again.

**Test feed (media) in Explorer**
With a **Page** token, the Explorer uses the Page as "me", and a path like `1009859785536653/media` can fail with "(#100) ... node type (Page)" because the request goes to Facebook Graph. To test that your token can read Instagram media, use a **nested request** so the Page’s connected Instagram account is used:

1. In Graph API Explorer, keep your app and select the **Page** (so the token is a Page token).
2. Set the path to: **`me?fields=instagram_business_account{media{id,media_url,permalink,caption}}`**
3. Click **Submit**.

If you see **`instagram_business_account`** with a **`media`** object and a **`data`** array of posts, the token works for the feed. Copy that token into `.env.local` as `INSTAGRAM_ACCESS_TOKEN` (no line break after it), then restart the dev server. If you see an error, generate a new Page token and try again.

**Token length**
When the feed shows [190], the API returns `tokenLength` in dev. Compare it to the length of the token in Explorer; if the server length is smaller, the token in `.env.local` was truncated or has a line break.

### Troubleshooting

- **“Invalid OAuth access token”**: Regenerate the token, ensure it’s for the correct Page and has `instagram_basic` and page permissions.
- **[190] Invalid OAuth access token / Cannot parse access token**: Token is invalid, expired, or truncated. Generate a new Page token in Graph API Explorer (select Page, not User; request `instagram_basic`, `pages_show_list`); copy the **entire** token into `.env.local`; restart dev server.
- **Empty or no media**: Confirm the Instagram account is Business/Creator and linked to the Page whose token you use. Check that `INSTAGRAM_USER_ID` is the `instagram_business_account.id` from `/me/accounts`.
- **Rate limits**: The API has rate limits; the project uses a simple cache (see API route) to reduce calls.
- **“fetch failed” or “Server could not reach Instagram”**: The **machine running Next.js** (your dev server or host) cannot make outbound HTTPS requests to `graph.instagram.com`. Common causes:
  1. **Corporate firewall or proxy** blocking outbound HTTPS. Try from a home network or mobile hotspot.
  2. **VPN** or strict network policy. Try disabling VPN or using another network.
  3. **Deploy to Vercel** (or similar): the API route runs on their servers, which can reach Instagram. Your token and `INSTAGRAM_USER_ID` in project env vars will work there.
- **“unable to get local issuer certificate”** or **`UNABLE_TO_ISSUER_CERT_LOCALLY`**: Node.js cannot verify Instagram’s SSL certificate (often due to corporate proxy/firewall doing SSL inspection, or missing CA certs). **Local dev only:** run the dev server with TLS verification disabled:
  - **PowerShell:** `$env:NODE_TLS_REJECT_UNAUTHORIZED="0"; npm run dev`
  - **Cmd:** `set NODE_TLS_REJECT_UNAUTHORIZED=0 && npm run dev`
  - **Bash:** `NODE_TLS_REJECT_UNAUTHORIZED=0 npm run dev`
  Do **not** use this in production. Alternatively, fix CA certificates on your machine or deploy to Vercel.

---

## Option 2: Third‑party embed (no API, no token)

Use this if you don’t want to use the Graph API or don’t have a Business/Creator account.

1. Sign up for a service that embeds Instagram feeds, for example:
   - [Curator.io](https://curator.io)
   - [SnapWidget](https://snapwidget.com)
   - [EmbedSocial](https://embedsocial.com)
2. Connect your Instagram account in their dashboard (they use their own API or partnership).
3. They give you an embed code (iframe or script).
4. In the project, you can replace the **Instagram Feed** block in `app/page.tsx` with their embed component (e.g. an iframe or a div + their script), or add a new section that only renders the embed.

No `.env` or API route needed; the feed is fully handled by the third party.

---

## Summary

| Goal                         | Use |
|-----------------------------|-----|
| Real feed from your account | Option 1: Graph API + `.env` (INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_USER_ID). |
| Easiest, no coding/tokens   | Option 2: Curator.io / SnapWidget / EmbedSocial embed. |

The code is set up so that **if** `INSTAGRAM_ACCESS_TOKEN` and `INSTAGRAM_USER_ID` are set, the feed uses the API; otherwise it shows placeholders. Stories can stay as placeholders or be wired to the API’s stories endpoint later.
