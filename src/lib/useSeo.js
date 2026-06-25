import { useEffect } from "react";
import { DEFAULT_SEO_IMAGE, SEO_LOCALES, SEO_LANGUAGE_TAGS, SITE_NAME, SITE_ORIGIN } from "./seoConfig.js";

/**
 * Locale map for Open Graph / search engines
 */
/**
 * Safe meta setter (name / property)
 */
function upsertMeta({ attr, key, content }) {
  if (!content || typeof document === "undefined") return;

  let el = document.head.querySelector(`meta[${attr}="${key}"]`);

  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }

  el.setAttribute("content", String(content));
}

function upsertMetaList({ attr, key, contents }) {
  if (!Array.isArray(contents) || typeof document === "undefined") return;

  document.head.querySelectorAll(`meta[${attr}="${key}"]`).forEach((el) => el.remove());

  contents.filter(Boolean).forEach((content) => {
    const el = document.createElement("meta");
    el.setAttribute(attr, key);
    el.setAttribute("content", String(content));
    document.head.appendChild(el);
  });
}

/**
 * Safe link rel setter (canonical, alternate)
 */
function upsertLink({ rel, href, hreflang }) {
  if (!href || typeof document === "undefined") return;

  let selector = `link[rel="${rel}"]`;
  if (hreflang) selector += `[hreflang="${hreflang}"]`;

  let el = document.head.querySelector(selector);

  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }

  el.setAttribute("href", href);
}

function removeAlternateLinks() {
  if (typeof document === "undefined") return;
  document.head
    .querySelectorAll('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());
}

function upsertJsonLd(id, data) {
  if (!data || typeof document === "undefined") return;

  let el = document.head.querySelector(`script[type="application/ld+json"][id="${id}"]`);

  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("id", id);
    document.head.appendChild(el);
  }

  el.textContent = JSON.stringify(data);
}

/**
 * Main SEO hook
 */
export function useSeo({
  title,
  description,
  url,
  lang = "en",
  image = DEFAULT_SEO_IMAGE,
  imageAlt = "Dmitrii Garanin actor portfolio portrait",
  alternates = [],
  siteName = SITE_NAME,
  type = "website",
  structuredData,
  noIndex = false,
}) {
  useEffect(() => {
    /* ===========================
       Guards
    =========================== */

    if (typeof document === "undefined") return;

    const safeLang = SEO_LOCALES[lang] ? lang : "en";
    const locale = SEO_LOCALES[safeLang];
    const languageTag = SEO_LANGUAGE_TAGS[safeLang] || safeLang;
    const absoluteImage = image?.startsWith("http") ? image : `${SITE_ORIGIN}${image}`;

    /* ===========================
       Title
    =========================== */

    if (title) {
      document.title = title;
    }

    document.documentElement.setAttribute("lang", languageTag);

    /* ===========================
       Basic SEO
    =========================== */

    upsertMeta({ attr: "name", key: "description", content: description });
    upsertMeta({
      attr: "name",
      key: "robots",
      content: noIndex
        ? "noindex,nofollow"
        : "index,follow,max-snippet:-1,max-image-preview:large,max-video-preview:-1",
    });
    upsertMeta({ attr: "name", key: "googlebot", content: noIndex ? "noindex,nofollow" : "index,follow" });
    upsertMeta({ attr: "name", key: "yandex", content: noIndex ? "noindex,nofollow" : "index,follow" });
    upsertMeta({ attr: "name", key: "language", content: languageTag });
    upsertMeta({ attr: "name", key: "author", content: "Dmitrii Garanin" });
    upsertMeta({ attr: "name", key: "application-name", content: siteName });
    upsertMeta({ attr: "name", key: "referrer", content: "strict-origin-when-cross-origin" });

    /* ===========================
       Canonical
    =========================== */

    if (url) {
      upsertLink({ rel: "canonical", href: url });
    }

    removeAlternateLinks();
    alternates.forEach((alternate) => {
      upsertLink({
        rel: "alternate",
        hreflang: alternate.hreflang || alternate.lang,
        href: alternate.href,
      });
    });
    const defaultAlternate = alternates.find((alternate) => alternate.lang === "en") || alternates[0];
    if (defaultAlternate) {
      upsertLink({ rel: "alternate", hreflang: "x-default", href: defaultAlternate.href });
    }

    /* ===========================
       Open Graph (Facebook, etc.)
    =========================== */

    upsertMeta({ attr: "property", key: "og:type", content: type });
    upsertMeta({ attr: "property", key: "og:title", content: title });
    upsertMeta({ attr: "property", key: "og:description", content: description });
    upsertMeta({ attr: "property", key: "og:url", content: url });
    upsertMeta({ attr: "property", key: "og:site_name", content: siteName });
    upsertMeta({ attr: "property", key: "og:image", content: absoluteImage });
    upsertMeta({ attr: "property", key: "og:image:alt", content: imageAlt });
    upsertMeta({ attr: "property", key: "og:locale", content: locale });
    upsertMetaList({
      attr: "property",
      key: "og:locale:alternate",
      contents: Object.entries(SEO_LOCALES)
        .filter(([code]) => code !== safeLang)
        .map(([, alternateLocale]) => alternateLocale),
    });

    /* ===========================
       Twitter
    =========================== */

    upsertMeta({ attr: "name", key: "twitter:card", content: "summary_large_image" });
    upsertMeta({ attr: "name", key: "twitter:title", content: title });
    upsertMeta({ attr: "name", key: "twitter:description", content: description });
    upsertMeta({ attr: "name", key: "twitter:image", content: absoluteImage });
    upsertMeta({ attr: "name", key: "twitter:image:alt", content: imageAlt });

    /* ===========================
       Structured data
    =========================== */

    upsertJsonLd("seo-jsonld", structuredData);

    /* ===========================
       Yandex specific
    =========================== */

    upsertMeta({ attr: "name", key: "yandex-verification", content: import.meta.env.VITE_YANDEX_VERIFICATION });
    upsertMeta({ attr: "name", key: "format-detection", content: "telephone=no" });

    /* ===========================
       Dev logging
    =========================== */

    if (import.meta.env.DEV) {
      console.info(
        "%c[SEO]",
        "color:#D4AF37;font-weight:bold;",
        { title, description, url, lang: safeLang, alternates, structuredData }
      );
    }
  }, [title, description, url, lang, image, imageAlt, alternates, siteName, type, structuredData, noIndex]);
}
