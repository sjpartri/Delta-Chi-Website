# Delta Chi Alberta – Fraternity Website

Next.js website for **Delta Chi Alberta** (Delta Chi Alberta, Canada) at the University of Alberta. Built for strong SEO for queries like "Delta Chi Alberta", "Delta Chi", and "Delta Chi Alberta, Canada", with a home page tightly integrated with Instagram (feed + stories), responsive and mobile-friendly.

## Features

- **Next.js 14** (App Router), TypeScript, Tailwind CSS
- **SEO**: metadata, Open Graph, Twitter cards, JSON-LD, sitemap, robots.txt
- **Multi-page**: Home, About, Values, Join, Philanthropy, Contact
- **Instagram**: home page features an Instagram feed and Stories section (placeholders; ready for API or embed)
- **Responsive**: header with mobile menu, fluid layouts

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
deltachi/
├── app/
│   ├── layout.tsx      # Root layout, SEO metadata, JSON-LD
│   ├── page.tsx        # Home (hero, values teaser, Instagram feed + stories)
│   ├── about/          # About Delta Chi Alberta
│   ├── values/         # Core values (from deltachi.org)
│   ├── join/           # Rush & recruitment
│   ├── philanthropy/   # V Foundation, giving back
│   ├── contact/        # Contact & social links
│   ├── sitemap.ts      # Dynamic sitemap
│   └── robots.ts       # Robots.txt
├── components/
│   ├── Header.tsx      # Nav + mobile menu
│   ├── Footer.tsx      # Links, social, international
│   ├── InstagramFeed.tsx   # Instagram feed (placeholder for API/embed)
│   └── InstagramStories.tsx # Stories strip (placeholder)
└── ...
```

## SEO

- **Target keywords**: Delta Chi Alberta, Delta Chi Alberta, Canada, Delta Chi
- **Metadata**: title, description, keywords, Open Graph, Twitter
- **JSON-LD**: Organization schema
- **Sitemap**: `/sitemap.xml`
- **Robots**: `/robots.txt` allowing all, pointing to sitemap

Set `NEXT_PUBLIC_SITE_URL` in production (e.g. `https://deltachialberta.ca`) for canonical URLs and sitemap.

## Instagram Integration

The home page includes:

1. **Instagram Feed** – grid of posts. To use real data:
   - Use [Instagram Basic Display API](https://developers.facebook.com/docs/instagram-basic-display-api) or [Instagram Graph API](https://developers.facebook.com/docs/instagram-api) (business/creator account).
   - Store an access token in env (e.g. `INSTAGRAM_ACCESS_TOKEN`), fetch in a Server Component or API route, and pass media to `InstagramFeed`.
   - Alternatively, use a third-party embed (e.g. Curator.io, SnapWidget) and replace the component with an iframe or script.

2. **Instagram Stories** – horizontal scroll strip. To use real data:
   - Use Instagram Graph API "stories" if available for your account.
   - Or manually curate “story highlight” links or images and pass them into `InstagramStories`.

Content and structure were inspired by [deltachi.org](https://deltachi.org).

## Build & Deploy

```bash
npm run build
npm start
```

### DreamHost Deployment

This project is configured for DreamHost deployment. See deployment documentation:

- **Quick Start:** [`QUICK_START.md`](./QUICK_START.md) - Fast deployment guide
- **Full Guide:** [`DREAMHOST_DEPLOYMENT.md`](./DREAMHOST_DEPLOYMENT.md) - Complete instructions
- **Checklist:** [`DEPLOY_CHECKLIST.md`](./DEPLOY_CHECKLIST.md) - Step-by-step checklist
- **Summary:** [`DEPLOYMENT_SUMMARY.md`](./DEPLOYMENT_SUMMARY.md) - Overview

**Before deploying:**
1. Update `.htaccess` with your DreamHost username and domain
2. Set environment variables in DreamHost panel
3. Upload files and run `npm install --production && npm run build`
4. Restart Passenger in DreamHost panel

### Other Hosting Options

Deploy to Vercel, Netlify, or any Node host that supports Next.js.

## License

Private – Delta Chi Alberta / The Delta Chi Fraternity, Inc.
