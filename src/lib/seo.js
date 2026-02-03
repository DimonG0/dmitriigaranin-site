// src/lib/seo.js

const DEV = import.meta.env.DEV;

/* ================================
   helpers
================================ */

function log(...args) {
  if (DEV) console.info("🔎 SEO:", ...args);
}

function warn(...args) {
  if (DEV) console.warn("⚠️ SEO:", ...args);
}

function setAttr(el, attr, value) {
  if (value == null || value === "") return;
  el.setAttribute(attr, value);
}

function ensureMeta(selector, attrs) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

function ensureLink(selector, attrs) {
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
    document.head.appendChild(el);
  }
  return el;
}

/* ================================
   main SEO setter
================================ */

export function setSeo({
  title,
  description,
  url,
  lang = "en",

  // optional
  image,
  siteName = "Dmitrii Garanin",
  type = "website",
  twitterCard = "summary_large_image",

  // locales for hreflang
  alternates = {
    en: "/en",
    ru: "/ru",
    fr: "/fr",
    am: "/am",
  },
}) {
  try {
    /* ---------- title ---------- */
    if (title) {
      document.title = title;
      log("title set");
    } else {
      warn("missing title");
    }

    /* ---------- html lang ---------- */
    document.documentElement.setAttribute("lang", lang);

    /* ---------- basic meta ---------- */
    setAttr(
      ensureMeta('meta[name="description"]', { name: "description" }),
      "content",
      description
    );

    setAttr(
      ensureMeta('meta[name="robots"]', { name: "robots" }),
      "content",
      "index, follow"
    );

    setAttr(
      ensureMeta('meta[name="googlebot"]', { name: "googlebot" }),
      "content",
      "index, follow"
    );

    setAttr(
      ensureMeta('meta[name="yandex"]', { name: "yandex" }),
      "content",
      "index, follow"
    );

    /* ---------- canonical ---------- */
    if (url) {
      setAttr(
        ensureLink('link[rel="canonical"]', { rel: "canonical" }),
        "href",
        url
      );
    }

    /* ---------- OpenGraph ---------- */
    setAttr(
      ensureMeta('meta[property="og:title"]', { property: "og:title" }),
      "content",
      title
    );

    setAttr(
      ensureMeta('meta[property="og:description"]', {
        property: "og:description",
      }),
      "content",
      description
    );

    setAttr(
      ensureMeta('meta[property="og:type"]', { property: "og:type" }),
      "content",
      type
    );

    setAttr(
      ensureMeta('meta[property="og:url"]', { property: "og:url" }),
      "content",
      url
    );

    setAttr(
      ensureMeta('meta[property="og:site_name"]', {
        property: "og:site_name",
      }),
      "content",
      siteName
    );

    if (image) {
      setAttr(
        ensureMeta('meta[property="og:image"]', {
          property: "og:image",
        }),
        "content",
        image
      );
    }

    /* ---------- Twitter ---------- */
    setAttr(
      ensureMeta('meta[name="twitter:card"]', {
        name: "twitter:card",
      }),
      "content",
      twitterCard
    );

    setAttr(
      ensureMeta('meta[name="twitter:title"]', {
        name: "twitter:title",
      }),
      "content",
      title
    );

    setAttr(
      ensureMeta('meta[name="twitter:description"]', {
        name: "twitter:description",
      }),
      "content",
      description
    );

    if (image) {
      setAttr(
        ensureMeta('meta[name="twitter:image"]', {
          name: "twitter:image",
        }),
        "content",
        image
      );
    }

    /* ---------- hreflang ---------- */
    if (url && alternates) {
      Object.entries(alternates).forEach(([code, path]) => {
        ensureLink(
          `link[rel="alternate"][hreflang="${code}"]`,
          {
            rel: "alternate",
            hreflang: code,
            href: new URL(path, url).toString(),
          }
        );
      });

      // x-default
      ensureLink(
        'link[rel="alternate"][hreflang="x-default"]',
        {
          rel: "alternate",
          hreflang: "x-default",
          href: url,
        }
      );
    }

    log("SEO applied successfully");
  } catch (err) {
    console.error("❌ SEO crashed:", err);
  }
}
