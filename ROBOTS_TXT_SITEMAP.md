# Robots.txt & Sitemap Configuration Guide

## Overview
This guide explains how to configure `robots.txt` and create a sitemap for optimal SEO, GEO, and AEO performance.

---

## 1. Robots.txt Configuration

### What is robots.txt?
A file that tells search engine crawlers which pages they can and cannot access on your site.

### Recommended robots.txt for tommykovatch.com

Create a file at the root of your domain: `https://tommykovatch.com/robots.txt`

```txt
# Robots.txt for tommykovatch.com
# Allow all search engines and AI crawlers

User-agent: *
Allow: /

# AI-specific crawlers (for GEO optimization)
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Disallow sensitive or admin paths (if you have them)
# User-agent: *
# Disallow: /admin/
# Disallow: /private/

# Sitemap location
Sitemap: https://tommykovatch.com/sitemap.xml
```

### Key Points:
- ✅ **Allow all crawlers** - You want maximum visibility
- ✅ **Explicitly allow AI crawlers** - For GEO optimization
- ✅ **Include sitemap URL** - Helps search engines find all pages
- ❌ **Don't block AI bots** - You WANT ChatGPT, Perplexity, etc. to index you

---

## 2. Sitemap.xml Configuration

### What is a sitemap?
An XML file that lists all important URLs on your site with metadata (last modified, change frequency, priority).

### Manual Sitemap (For Single Page Site)

Create a file at: `https://tommykovatch.com/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  
  <!-- Main Landing Page -->
  <url>
    <loc>https://tommykovatch.com/</loc>
    <lastmod>2026-02-22</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    
    <!-- Video Sitemap Entry (for hero video) -->
    <video:video>
      <video:thumbnail_loc>https://tommykovatch.com/video-thumbnail.jpg</video:thumbnail_loc>
      <video:title>Financial Freedom Strategy - Why You Are Here</video:title>
      <video:description>Learn how to achieve financial freedom with proven wealth-building strategies from Tommy Kovatch</video:description>
      <video:content_loc>https://player.vimeo.com/video/1164824132</video:content_loc>
      <video:player_loc>https://player.vimeo.com/video/1164824132</video:player_loc>
      <video:duration>330</video:duration>
      <video:publication_date>2026-02-15</video:publication_date>
      <video:family_friendly>yes</video:family_friendly>
      <video:requires_subscription>no</video:requires_subscription>
    </video:video>
  </url>

  <!-- FAQ Section (if on separate page) -->
  <url>
    <loc>https://tommykovatch.com/#faq</loc>
    <lastmod>2026-02-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>

  <!-- Registration Section -->
  <url>
    <loc>https://tommykovatch.com/#registration</loc>
    <lastmod>2026-02-22</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
```

### Update These Values:
1. **lastmod** - Date of last update (YYYY-MM-DD format)
2. **video:duration** - Actual video duration in seconds
3. **video:publication_date** - Actual upload date
4. **video:thumbnail_loc** - Your actual thumbnail URL

---

## 3. Implementation on Cloudflare Pages

### Option 1: Static Files (Recommended)

Since you're using Cloudflare Pages, you can add static files to your build output.

**For Vite/React:**

1. Create a `/public` folder in your project root (if it doesn't exist)
2. Add these files to `/public`:
   - `robots.txt`
   - `sitemap.xml`
3. These will be automatically served at the root URL

**File structure:**
```
/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── og-image.jpg
│   └── video-thumbnail.jpg
├── src/
│   └── app/
└── package.json
```

### Option 2: Cloudflare Workers (Advanced)

If you need dynamic sitemap generation, use a Cloudflare Worker.

---

## 4. AI Crawler Configuration

### What AI Crawlers to Allow?

#### ✅ ALLOW (for GEO optimization):
- **GPTBot** - OpenAI's web crawler (ChatGPT)
- **ChatGPT-User** - ChatGPT user-initiated browsing
- **Google-Extended** - Google's generative AI training
- **CCBot** - Common Crawl (used by many AI systems)
- **anthropic-ai** - Anthropic's Claude
- **PerplexityBot** - Perplexity AI search

#### ❓ OPTIONAL (depends on goals):
- **FacebookBot** - Meta AI training
- **Bytespider** - TikTok/ByteDance crawler
- **Applebot-Extended** - Apple Intelligence training

### How to Block AI Crawlers (if needed)

```txt
# Block specific AI bot from training on your content
User-agent: GPTBot
Disallow: /

# But still allow user-initiated ChatGPT browsing
User-agent: ChatGPT-User
Allow: /
```

**For your financial services site, you should ALLOW all AI bots** since you want maximum visibility in AI-powered search engines.

---

## 5. Google Search Console Setup

### Step 1: Add Property
1. Go to: https://search.google.com/search-console
2. Click "Add Property"
3. Enter: `https://tommykovatch.com`

### Step 2: Verify Ownership

**Method 1: DNS Verification (Recommended for Cloudflare)**
1. Google provides a TXT record
2. Add to Cloudflare DNS:
   - Type: `TXT`
   - Name: `@`
   - Content: `google-site-verification=XXXXXXXXXXXXX`
   - TTL: Auto

**Method 2: HTML Tag**
Add to your `<head>` via React Helmet:
```tsx
<meta name="google-site-verification" content="YOUR_CODE_HERE" />
```

### Step 3: Submit Sitemap
1. In Search Console, go to "Sitemaps"
2. Enter: `https://tommykovatch.com/sitemap.xml`
3. Click "Submit"

### Step 4: Request Indexing
1. Use "URL Inspection" tool
2. Enter: `https://tommykovatch.com`
3. Click "Request Indexing"

---

## 6. Bing Webmaster Tools Setup

Don't forget Bing! It powers many AI services (ChatGPT, DuckDuckGo, etc.)

### Setup:
1. Go to: https://www.bing.com/webmasters
2. Add your site
3. Verify via DNS or file upload
4. Submit sitemap

### Why Bing Matters:
- Powers ChatGPT search
- Powers DuckDuckGo
- ~30% of US search market share
- Less competitive than Google

---

## 7. Video Sitemap Best Practices

Since your hero video is critical to your landing page:

### Required Fields:
- ✅ `thumbnail_loc` - Must be actual accessible URL
- ✅ `title` - Descriptive, keyword-rich
- ✅ `description` - 1-2 sentences
- ✅ `content_loc` OR `player_loc` - Video URL

### Recommended Fields:
- ✅ `duration` - In seconds (helps Google)
- ✅ `publication_date` - When video was published
- ✅ `family_friendly` - Yes (important for financial content)

### Optional but Helpful:
- `expiration_date` - If video is time-sensitive
- `rating` - If you have video ratings
- `view_count` - If publicly available
- `uploader` - Your name/brand

---

## 8. Monitoring & Maintenance

### Weekly:
- [ ] Check Google Search Console for errors
- [ ] Review indexing status
- [ ] Check for crawl errors

### Monthly:
- [ ] Update `lastmod` dates in sitemap if content changed
- [ ] Review search performance
- [ ] Check for new AI crawlers to allow

### Quarterly:
- [ ] Audit all URLs in sitemap
- [ ] Remove dead links
- [ ] Add new pages
- [ ] Review robots.txt rules

---

## 9. Advanced: Dynamic Sitemap Generation

If you plan to add more pages (blog, resources, etc.), consider dynamic sitemap generation.

### For React/Vite Sites:

**Option 1: Build-time Generation**
Use a package like `sitemap` to generate during build:

```bash
npm install sitemap
```

Create `scripts/generate-sitemap.js`:
```javascript
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';
import fs from 'fs';

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/#faq', changefreq: 'monthly', priority: 0.8 },
  { url: '/#registration', changefreq: 'monthly', priority: 0.9 },
];

const stream = new SitemapStream({ hostname: 'https://tommykovatch.com' });

streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => fs.writeFileSync('public/sitemap.xml', data.toString()));
```

Add to `package.json`:
```json
{
  "scripts": {
    "build": "npm run generate-sitemap && vite build",
    "generate-sitemap": "node scripts/generate-sitemap.js"
  }
}
```

**Option 2: Cloudflare Worker**
Generate sitemap dynamically via Worker for real-time updates.

---

## 10. Common Issues & Solutions

### Issue: Sitemap not found (404)
**Solution:** 
- Ensure `sitemap.xml` is in `/public` folder
- Check Cloudflare Pages deployment includes public files
- Test: `curl https://tommykovatch.com/sitemap.xml`

### Issue: Robots.txt not working
**Solution:**
- File must be at exact URL: `https://tommykovatch.com/robots.txt`
- Check for trailing slashes
- Verify file encoding is UTF-8

### Issue: Google not crawling
**Solution:**
- Submit sitemap in Search Console
- Request indexing manually
- Check for `noindex` meta tags
- Verify DNS is resolving correctly

### Issue: Video not appearing in search
**Solution:**
- Ensure video thumbnail is accessible
- Add all required VideoObject schema fields
- Submit video sitemap separately
- Wait 1-2 weeks for indexing

---

## 11. SEO Tools for Monitoring

### Free Tools:
- **Google Search Console** - Primary SEO monitoring
- **Bing Webmaster Tools** - Bing search monitoring
- **Google Rich Results Test** - Test structured data
- **Screaming Frog SEO Spider** - Free for up to 500 URLs

### Paid Tools (Optional):
- **Ahrefs** - Comprehensive SEO toolkit
- **SEMrush** - Keyword research and tracking
- **Moz Pro** - SEO analytics

---

## ✅ Quick Setup Checklist

### For tommykovatch.com:
- [ ] Create `/public/robots.txt` with AI crawler allowances
- [ ] Create `/public/sitemap.xml` with all pages and video
- [ ] Add og-image.jpg and video-thumbnail.jpg to `/public`
- [ ] Deploy to Cloudflare Pages
- [ ] Verify files accessible at root URLs
- [ ] Add property to Google Search Console
- [ ] Verify ownership via DNS TXT record
- [ ] Submit sitemap in Search Console
- [ ] Add property to Bing Webmaster Tools
- [ ] Test robots.txt: https://tommykovatch.com/robots.txt
- [ ] Test sitemap: https://tommykovatch.com/sitemap.xml

---

**Last Updated:** February 22, 2026
