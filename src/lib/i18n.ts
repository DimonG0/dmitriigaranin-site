// src/lib/i18n.ts
import { copy, Lang, CopyBlock } from "./copy";

const DEV = import.meta.env?.DEV === true;

export const SAFE = <T>(v: T | undefined | null, fallback: T): T => (v ?? fallback);

/* ================================
   Deep merge (en as base)
================================ */
function isObj(v: any): v is Record<string, any> {
  return v && typeof v === "object" && !Array.isArray(v);
}

function mergeDeep<T>(base: T, patch: any): T {
  if (Array.isArray(base)) {
    // если в языке массив null/undefined — оставляем en массив
    if (patch == null) return base;
    // если в языке задан массив — используем его
    return (Array.isArray(patch) ? patch : base) as any;
  }

  if (!isObj(base)) {
    return (patch ?? base) as T;
  }

  const out: Record<string, any> = { ...(base as any) };
  if (!isObj(patch)) return out as T;

  for (const k of Object.keys(patch)) {
    const bv = (base as any)[k];
    const pv = patch[k];

    if (Array.isArray(bv)) out[k] = mergeDeep(bv, pv);
    else if (isObj(bv)) out[k] = mergeDeep(bv, pv);
    else out[k] = pv ?? bv;
  }
  return out as T;
}

/* ================================
   Safe deep picker (optional)
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

    if (value === undefined && DEV) console.warn(`⚠️ i18n missing key: ${path}`);
    return (value ?? fallback) as T;
  } catch {
    return fallback;
  }
}

/* ================================
   Main accessor: always full CopyBlock
================================ */
export function t(lang: Lang = "en"): CopyBlock {
  const base = copy.en;
  const patch = (copy as any)[lang] ?? {};
  const data = mergeDeep<CopyBlock>(base, patch);

  if (!DEV) return data;

  // DEV guard: warn on missing top-level sections
  return new Proxy(data as any, {
    get(target, prop) {
      if (typeof prop === "string" && !(prop in target)) {
        console.warn(`⚠️ i18n missing section: ${lang}.${prop}`);
        return {};
      }
      return target[prop as any];
    },
  }) as CopyBlock;
}
