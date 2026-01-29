import { useEffect } from "react";

export function useSeo({
  title,
  description,
  url,
  lang = "en",
  image = "/og.jpg",
}) {
  useEffect(() => {
    if (title) document.title = title;

    const set = (name, content, prop = false) => {
      const key = prop ? "property" : "name";
      let el = document.querySelector(`meta[${key}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(key, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) set("description", description);
    set("og:title", title || document.title, true);
    set("og:description", description || "", true);
    if (url) set("og:url", url, true);
    set("og:image", image, true);
    set("og:locale", lang === "ru" ? "ru_RU" : lang === "fr" ? "fr_FR" : "en_US", true);

    set("twitter:card", "summary_large_image");
    set("twitter:title", title || document.title);
    set("twitter:description", description || "");
    set("twitter:image", image);
  }, [title, description, url, lang, image]);
}
