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
  return isLang(value) ? value : "en";
}

export function resolveRoute(value) {
  return isRoute(value) ? value : "home";
}

/* =====================
   Builders
   ===================== */

export function buildPath(lang, route) {
  const safeLang = resolveLang(lang);
  const safeRoute = resolveRoute(route);
  return `/${safeLang}/${safeRoute}`;
}

export const DEFAULT_PATH = "/en/home";
