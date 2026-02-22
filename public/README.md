# Public Assets Directory

This folder contains static assets that will be served at the root URL of your website.

## Required Images (TODO - You Need to Add These)

### 1. OpenGraph Image
**Filename:** `og-image.jpg`
**Dimensions:** 1200 x 630 pixels
**Purpose:** Social media sharing (Facebook, LinkedIn, Twitter, etc.)
**Requirements:**
- Include Tommy Kovatch branding/logo
- Add value proposition or tagline
- High quality, professional appearance
- File size: < 300KB (optimized)

**Example text overlay:**
```
"Achieve Financial Freedom"
Tommy Kovatch
Expert Wealth Building Strategies
```

---

### 2. Video Thumbnail
**Filename:** `video-thumbnail.jpg`
**Dimensions:** 1280 x 720 pixels (16:9 ratio)
**Purpose:** Video SEO, appears in Google video search results
**Requirements:**
- Compelling frame from your Vimeo video
- Should entice clicks
- Include text overlay if helpful
- File size: < 200KB (optimized)

---

### 3. Favicon (Optional but Recommended)
**Filename:** `favicon.ico`
**Dimensions:** 32 x 32 pixels (or 64x64 multi-size)
**Purpose:** Browser tab icon
**Requirements:**
- Simple, recognizable logo/icon
- Works well at small size

**Filename:** `apple-touch-icon.png`
**Dimensions:** 180 x 180 pixels
**Purpose:** iOS home screen icon
**Requirements:**
- PNG format
- Looks good on mobile devices

---

## Current Files

### ✅ robots.txt
Configured to allow all search engines and AI crawlers (GPTBot, Claude, etc.)
**Access:** https://tommykovatch.com/robots.txt

### ✅ sitemap.xml
Contains all pages and video metadata for search engines
**Access:** https://tommykovatch.com/sitemap.xml

---

## How to Add Images

1. Save your images with the exact filenames above
2. Place them in this `/public` folder
3. Deploy your site (Cloudflare Pages will serve them automatically)
4. Verify they're accessible:
   - https://tommykovatch.com/og-image.jpg
   - https://tommykovatch.com/video-thumbnail.jpg
   - https://tommykovatch.com/favicon.ico

---

## Image Optimization Tips

### For Web Performance:
- Use JPEG for photos (og-image, video-thumbnail)
- Use PNG for graphics with transparency (favicon, apple-touch-icon)
- Optimize/compress before upload (use TinyPNG, Squoosh, or ImageOptim)
- Target file sizes: < 300KB for large images

### Tools:
- **TinyPNG:** https://tinypng.com/ (free compression)
- **Squoosh:** https://squoosh.app/ (Google's image optimizer)
- **Canva:** Create og-image with templates
- **Figma/Photoshop:** Professional design tools

---

## After Adding Images

### Update These Files:

1. **SEOHead.tsx** (line ~10)
   ```typescript
   ogImage = "https://tommykovatch.com/og-image.jpg"
   ```

2. **StructuredData.tsx** (line ~96)
   ```typescript
   "thumbnailUrl": "https://tommykovatch.com/video-thumbnail.jpg"
   ```

3. **sitemap.xml** (line ~15)
   ```xml
   <video:thumbnail_loc>https://tommykovatch.com/video-thumbnail.jpg</video:thumbnail_loc>
   ```

### Test Social Sharing:
- **Facebook:** https://developers.facebook.com/tools/debug/
- **Twitter:** https://cards-dev.twitter.com/validator
- **LinkedIn:** Post inspector in LinkedIn

---

## Questions?

Refer to:
- `/GEO_AEO_OPTIMIZATION_GUIDE.md` - Complete SEO guide
- `/SEO_IMPLEMENTATION_CHECKLIST.md` - Step-by-step tasks
- `/ROBOTS_TXT_SITEMAP.md` - Technical configuration

**Last Updated:** February 22, 2026
