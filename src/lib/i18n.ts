// src/lib/i18n.ts
import { copy, Lang } from "./copy";

const DEV = import.meta.env?.DEV === true;

/* ================================
   Safe primitive getter
================================ */
export const SAFE = <T>(v: T | undefined | null, fallback: T): T => (v ?? fallback);

export type I18nCopy = Record<string, any>;

/* ================================
   Safe deep picker
   pick(copy.en, "home.note")
================================ */
export function pick<T = any>(
  obj: Record<string, any> | null | undefined,
  path: string,
  fallback: T = "" as T
): T {
  try {
    if (!obj || typeof obj !== "object") return fallback;

    const value = path
      .split(".")
      .filter(Boolean)
      .reduce<any>((o, k) => (o && typeof o === "object" && k in o ? o[k] : undefined), obj);

    if (value === undefined && DEV) {
      console.warn(`⚠️ i18n missing key: ${path}`);
    }

    return (value ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/* ================================
   Main i18n accessor
================================ */
export function t(lang: Lang = "en"): I18nCopy {
  const data: I18nCopy = (copy as any)[lang] ?? (copy as any).en ?? {};

  if (!DEV) return data;

  // DEV guard: warn on missing sections (top-level only)
  return new Proxy(data, {
    get(target, prop) {
      if (typeof prop === "string" && !(prop in target)) {
        console.warn(`⚠️ i18n missing section: ${lang}.${prop}`);
        return {};
      }
      return (target as any)[prop as any];
    },
  });
}
