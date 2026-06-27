import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getSitemapEntries, PORTFOLIO_IMAGE_SITEMAP_ITEMS, SITE_ORIGIN } from "../src/lib/seoConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");

const today = new Date().toISOString().slice(0, 10);

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function getPriority(route) {
  if (route === "home") return "1.0";
  if (route === "portfolio") return "0.95";
  if (route === "about" || route === "contact") return "0.85";
  return "0.75";
}

function getChangefreq(route) {
  if (route === "home" || route === "portfolio") return "weekly";
  return "monthly";
}

function getImageEntries(route) {
  if (route !== "portfolio") return "";

  return PORTFOLIO_IMAGE_SITEMAP_ITEMS.map((image) =>
    [
      "    <image:image>",
      `      <image:loc>${escapeXml(image.loc)}</image:loc>`,
      `      <image:title>${escapeXml(image.title)}</image:title>`,
      `      <image:caption>${escapeXml(image.caption)}</image:caption>`,
      "    </image:image>",
    ].join("\n")
  ).join("\n");
}

function buildSitemap() {
  const urls = getSitemapEntries()
    .map((entry) => {
      const alternates = entry.alternates
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`
        )
        .join("\n");
      const images = getImageEntries(entry.route);

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${getChangefreq(entry.route)}</changefreq>`,
        `    <priority>${getPriority(entry.route)}</priority>`,
        alternates,
        images,
        "  </url>",
      ].filter(Boolean).join("\n");
    })
    .join("\n");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    "</urlset>",
    "",
  ].join("\n");
}

function buildRobots() {
  return [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

await mkdir(publicDir, { recursive: true });
await writeFile(resolve(publicDir, "sitemap.xml"), buildSitemap(), "utf8");
await writeFile(resolve(publicDir, "robots.txt"), buildRobots(), "utf8");

console.log("Generated public/sitemap.xml and public/robots.txt");
