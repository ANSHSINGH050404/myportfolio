# Deployment Guide

## Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js portfolio.

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Developer portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your repository
5. Click "Deploy"

That's it! Vercel will:
- Auto-detect Next.js
- Configure build settings
- Deploy to production
- Provide a `.vercel.app` domain

### 3. Add Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS instructions
4. SSL is automatic

### 4. Environment Variables

If using GitHub API token:

1. Go to Project Settings → Environment Variables
2. Add `GITHUB_TOKEN` with your token
3. Redeploy

---

## Deploy to Netlify

### 1. Push to GitHub (same as above)

### 2. Import to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up/login
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub
5. Select your repository
6. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
7. Click "Deploy"

### 3. Configure Next.js on Netlify

Install Netlify Next.js plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

Create `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

---

## Deploy to Your Own Server

### Using PM2 (Process Manager)

```bash
# Build the app
npm run build

# Install PM2 globally
npm install -g pm2

# Start the app
pm2 start npm --name "portfolio" -- start

# Save PM2 configuration
pm2 save

# Auto-restart on server reboot
pm2 startup
```

### Using Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

---

## Deploy to GitHub Pages (Static Export)

GitHub Pages requires static export:

1. Update `next.config.js`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
}
```

2. Build static site:

```bash
npm run build
```

3. Push `out/` directory to `gh-pages` branch

**Note**: Some features (API routes, ISR) won't work with static export.

---

## Environment Variables

For all deployments, set these environment variables:

- `GITHUB_TOKEN` (optional): Your GitHub Personal Access Token for higher API rate limits

---

## Performance Checklist

Before deploying, verify:

- ✅ Three.js canvas is lazy-loaded
- ✅ Images are optimized
- ✅ GitHub API has caching/revalidation
- ✅ Lighthouse score > 90
- ✅ Mobile responsive
- ✅ No console errors

---

## Custom Domain Setup

### Vercel
1. Add domain in project settings
2. Add DNS records:
   - Type: `A`, Name: `@`, Value: `76.76.21.21`
   - Type: `CNAME`, Name: `www`, Value: `cname.vercel-dns.com`

### Netlify
1. Add domain in site settings
2. Add DNS records:
   - Type: `A`, Name: `@`, Value: `75.2.60.5`
   - Type: `CNAME`, Name: `www`, Value: `yoursite.netlify.app`

SSL certificates are automatically provisioned.

---

## Monitoring & Analytics

### Vercel Analytics

Add to `app/layout.tsx`:

```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Google Analytics

Install `next/script`:

```typescript
import Script from 'next/script';

// In layout.tsx
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

---

## Troubleshooting Deployment

**Build fails**:
- Check Node version (18+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

**Three.js not working in production**:
- Ensure dynamic import with `ssr: false`
- Check browser console for WebGL errors

**GitHub API rate limit**:
- Add `GITHUB_TOKEN` environment variable
- Increase `revalidate` time

**Slow loading**:
- Enable image optimization
- Check bundle size with `npm run build`
- Use CDN for static assets
