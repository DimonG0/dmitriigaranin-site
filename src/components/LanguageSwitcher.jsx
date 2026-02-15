// src/components/LanguageSwitcher.jsx
import { NavLink, useLocation, useParams } from "react-router-dom";
import { LANGS } from "../lib/routes";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const { pathname, search, hash } = useLocation();
  const current = LANGS.includes(lang) ? lang : "en";

  const buildTo = (nextLang) => {
    const safe = LANGS.includes(nextLang) ? nextLang : "en";
    const nextPath = pathname.replace(/^\/(en|ru|fr|am)(?=\/|$)/, `/${safe}`);
    return `${nextPath}${search}${hash}`;
  };

  return (
    <div className="flex items-center gap-3">
      {LANGS.map((l) => (
        <NavLink
          key={l}
          to={buildTo(l)}
          className={[
            "text-[11px] tracking-[0.28em] uppercase transition",
            l === current ? "text-[#D4AF37]" : "text-white/40 hover:text-white/70",
          ].join(" ")}
        >
          {l}
        </NavLink>
      ))}
    </div>
  );
}
