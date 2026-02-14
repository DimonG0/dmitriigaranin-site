// src/lib/routes.js

/* =====================
   Languages & Routes
   ===================== */

export const LANGS = ["en", "ru", "fr", "am"];

export const ROUTES = [
  "home",
  "about",
  "portfolio",
  "reviews",
  "behind",
  "contact",
];

export const DEFAULT_LANG = "en";
export const DEFAULT_ROUTE = "home";

/* =====================
   Guards (runtime-safe)
   ===================== */

export function isLang(value) {
  return typeof value === "string" && LANGS.includes(value);
}

export function isRoute(value) {
  return typeof value === "string" && ROUTES.includes(value);
}

/* =====================
   Resolvers (never crash)
   ===================== */

export function resolveLang(value) {
  return isLang(value) ? value : DEFAULT_LANG;
}

export function resolveRoute(value) {
  return isRoute(value) ? value : DEFAULT_ROUTE;
}

/* =====================
   Parsers / Builders
   ===================== */

export function parsePathname(pathname = "") {
  const clean = String(pathname).split("?")[0].split("#")[0];
  const parts = clean.split("/").filter(Boolean); // ["en","about",...]
  const lang = resolveLang(parts[0]);
  const route = resolveRoute(parts[1]);
  const rest = parts.slice(2);
  return { lang, route, rest };
}

export function buildPath(lang, route, rest = []) {
  const safeLang = resolveLang(lang);
  const safeRoute = resolveRoute(route);
  const tail = Array.isArray(rest) && rest.length ? `/${rest.map(encodeURIComponent).join("/")}` : "";
  return `/${safeLang}/${safeRoute}${tail}`;
}

/* =====================
   Language switch (keep current route)
   ===================== */

export function switchLangPath(pathname, nextLang) {
  const { route, rest } = parsePathname(pathname);
  return buildPath(nextLang, route, rest);
}

export const DEFAULT_PATH = buildPath(DEFAULT_LANG, DEFAULT_ROUTE);
