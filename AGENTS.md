# Project rules
- Keep shared advertising placement logic centralized in `public/shared/ads.js`; this keeps sitewide ad behavior consistent without changing individual content pages.
- Map clean directory URLs to their existing public HTML files in Vite development middleware; the preview must match static hosting without changing the production copy build.