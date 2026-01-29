import { useEffect } from "react";

const LOCALES = {
  en: "en_US",
  ru: "ru_RU",
  fr: "fr_FR",
  hy: "hy_AM",
};

function setMeta({ key, name, content }) {
  if (!content) return;

  let el = document.querySelector(`meta[${key}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(key, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useSeo({
  title,
  description,
  url,
  lang = "en",
  image = "/og.jpg",
}) {
  useEffect(() => {
    /* Title */
    if (title) {
      document.title = title;
    }

    /* Basic SEO */
    setMeta({ key: "name", name: "description", content: description });

    /* Open Graph */
    setMeta({ key: "property", name: "og:title", content: title });
    setMeta({ key: "property", name: "og:description", content: description });
    setMeta({ key: "property", name: "og:url", content: url });
    setMeta({ key: "property", name: "og:image", content: image });
    setMeta({
      key: "property",
      name: "og:locale",
      content: LOCALES[lang] || LOCALES.en,
    });

    /* Twitter */
    setMeta({ key: "name", name: "twitter:card", content: "summary_large_image" });
    setMeta({ key: "name", name: "twitter:title", content: title });
    setMeta({ key: "name", name: "twitter:description", content: description });
    setMeta({ key: "name", name: "twitter:image", content: image });
  }, [title, description, url, lang, image]);
}
