export const dynamic = "force-static";

export default function generateSitemap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://dmitriigaranin.com/</loc>
    <priority>1.0</priority>
  </url>
</urlset>`;
}
