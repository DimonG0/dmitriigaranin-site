import { useEffect } from "react";

/**
 * Locale map for Open Graph / search engines
 */
const LOCALES = {
  en: "en_US",
  ru: "ru_RU",
  fr: "fr_FR",
  am: "hy_AM",
};

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

/**
 * Main SEO hook
 */
export function useSeo({
  title,
  description,
  url,
  lang = "en",
  image = "/og.jpg",
  noIndex = false,
}) {
  useEffect(() => {
    /* ===========================
       Guards
    =========================== */

    if (typeof document === "undefined") return;

    const safeLang = LOCALES[lang] ? lang : "en";
    const locale = LOCALES[safeLang];

    /* ===========================
       Title
    =========================== */

    if (title) {
      document.title = title;
    }

    /* ===========================
       Basic SEO
    =========================== */

    upsertMeta({ attr: "name", key: "description", content: description });
    upsertMeta({ attr: "name", key: "robots", content: noIndex ? "noindex,nofollow" : "index,follow" });
    upsertMeta({ attr: "name", key: "language", content: safeLang });

    /* ===========================
       Canonical
    =========================== */

    if (url) {
      upsertLink({ rel: "canonical", href: url });
    }

    /* ===========================
       Open Graph (Facebook, etc.)
    =========================== */

    upsertMeta({ attr: "property", key: "og:type", content: "website" });
    upsertMeta({ attr: "property", key: "og:title", content: title });
    upsertMeta({ attr: "property", key: "og:description", content: description });
    upsertMeta({ attr: "property", key: "og:url", content: url });
    upsertMeta({ attr: "property", key: "og:image", content: image });
    upsertMeta({ attr: "property", key: "og:locale", content: locale });

    /* ===========================
       Twitter
    =========================== */

    upsertMeta({ attr: "name", key: "twitter:card", content: "summary_large_image" });
    upsertMeta({ attr: "name", key: "twitter:title", content: title });
    upsertMeta({ attr: "name", key: "twitter:description", content: description });
    upsertMeta({ attr: "name", key: "twitter:image", content: image });

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
        { title, description, url, lang: safeLang }
      );
    }
  }, [title, description, url, lang, image, noIndex]);
}
