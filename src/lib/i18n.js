// src/lib/i18n.jsx
import { copy, t, SAFE, pick } from './copy';

export const DEV = import.meta.env.DEV;

// Re-export everything from copy.ts
export { t, SAFE, pick, copy };

// Optional: Add development warnings
export function tWithWarnings(lang = "en") {
  const data = t(lang);
  
  if (DEV) {
    return new Proxy(data, {
      get(target, prop) {
        if (!(prop in target)) {
          console.warn(`⚠️ [i18n] Missing key: ${lang}.${String(prop)}`);
          return {};
        }
        return target[prop];
      },
    });
  }
  
  return data;
}