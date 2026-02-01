export function setSeo({
  title,
  description,
  url,
  lang = "en",
}) {
  if (title) document.title = title;

  const setMeta = (name, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[name="${name}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", name);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  const setProperty = (property, content) => {
    if (!content) return;
    let el = document.querySelector(`meta[property="${property}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("property", property);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("description", description);
  setMeta("language", lang);

  setProperty("og:title", title);
  setProperty("og:description", description);
  setProperty("og:url", url);
  setProperty("og:type", "website");
}
