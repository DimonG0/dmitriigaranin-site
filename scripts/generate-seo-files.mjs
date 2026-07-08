import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { buildAbsoluteUrl, getSitemapEntries, PORTFOLIO_IMAGE_SITEMAP_ITEMS, SITE_ORIGIN } from "../src/lib/seoConfig.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const publicDir = resolve(root, "public");

const datePattern = /^\d{4}-\d{2}-\d{2}$/;

const securityHeaders = [
  ["Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload"],
  ["X-Content-Type-Options", "nosniff"],
  ["X-Frame-Options", "DENY"],
  ["Referrer-Policy", "strict-origin-when-cross-origin"],
  ["X-Permitted-Cross-Domain-Policies", "none"],
  ["Cross-Origin-Opener-Policy", "same-origin"],
  ["Cross-Origin-Resource-Policy", "same-origin"],
  [
    "Permissions-Policy",
    "accelerometer=(), autoplay=(), camera=(), clipboard-read=(), display-capture=(), encrypted-media=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), web-share=()",
  ],
  [
    "Content-Security-Policy",
    "default-src 'self'; base-uri 'self'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://formsubmit.co; img-src 'self' data: blob: https:; media-src 'self' https:; font-src 'self' data: https://fonts.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; script-src 'self'; connect-src 'self' https:; manifest-src 'self'; worker-src 'self' blob:; upgrade-insecure-requests",
  ],
];

async function readText(filePath) {
  try {
    return await readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

function normalizeNewlines(value) {
  return String(value).replace(/\r\n/g, "\n");
}

function getLastmodDate(existingSitemap) {
  const envDate = process.env.SITEMAP_LASTMOD;
  if (datePattern.test(envDate || "")) return envDate;

  const existingDate = existingSitemap.match(/<lastmod>(\d{4}-\d{2}-\d{2})<\/lastmod>/)?.[1];
  if (datePattern.test(existingDate || "")) return existingDate;

  return new Date().toISOString().slice(0, 10);
}

async function writeIfChanged(filePath, nextContent) {
  const existingContent = await readText(filePath);
  if (normalizeNewlines(existingContent) === normalizeNewlines(nextContent)) return false;

  await writeFile(filePath, nextContent, "utf8");
  return true;
}

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

function buildSitemap(lastmodDate) {
  const urls = getSitemapEntries()
    .map((entry) => {
      const alternates = entry.alternates
        .concat({ hreflang: "x-default", href: buildAbsoluteUrl("en", entry.route) })
        .map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`
        )
        .join("\n");
      const images = getImageEntries(entry.route);

      return [
        "  <url>",
        `    <loc>${escapeXml(entry.url)}</loc>`,
        `    <lastmod>${lastmodDate}</lastmod>`,
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
    "Disallow: /api/archive/",
    "Disallow: /private-archive/",
    "",
    "User-agent: Yandex",
    "Allow: /",
    "Disallow: /api/archive/",
    "Disallow: /private-archive/",
    "",
    "User-agent: Googlebot",
    "Allow: /",
    "Disallow: /api/archive/",
    "Disallow: /private-archive/",
    "",
    `Sitemap: ${SITE_ORIGIN}/sitemap.xml`,
    "",
  ].join("\n");
}

function buildHeaders() {
  return [
    "/*",
    ...securityHeaders.map(([key, value]) => `  ${key}: ${value}`),
    "",
    "/api/archive/*",
    "  Cache-Control: no-store",
    "  X-Robots-Tag: noindex, nofollow",
    "",
    "/sitemap.xml",
    "  Content-Type: application/xml; charset=utf-8",
    "  Cache-Control: public, max-age=3600",
    "",
    "/robots.txt",
    "  Content-Type: text/plain; charset=utf-8",
    "  Cache-Control: public, max-age=3600",
    "",
  ].join("\n");
}

await mkdir(publicDir, { recursive: true });
const sitemapPath = resolve(publicDir, "sitemap.xml");
const robotsPath = resolve(publicDir, "robots.txt");
const headersPath = resolve(publicDir, "_headers");
const existingSitemap = await readText(sitemapPath);
const lastmodDate = getLastmodDate(existingSitemap);
const changedFiles = [];

if (await writeIfChanged(sitemapPath, buildSitemap(lastmodDate))) {
  changedFiles.push("public/sitemap.xml");
}

if (await writeIfChanged(robotsPath, buildRobots())) {
  changedFiles.push("public/robots.txt");
}

if (await writeIfChanged(headersPath, buildHeaders())) {
  changedFiles.push("public/_headers");
}

console.log(
  changedFiles.length
    ? `Generated ${changedFiles.join(" and ")}`
    : "SEO files already up to date"
);
