import { NavLink, useParams } from "react-router-dom";
import { LANGS } from "../lib/routes";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const current = LANGS.includes(lang) ? lang : "en";

  return (
    <div className="flex items-center gap-3">
      {LANGS.map((l) => (
        <NavLink
          key={l}
          to={`/${l}/home`}
          className={[
            "text-[11px] tracking-[0.28em] uppercase transition",
            l === current
              ? "text-[#D4AF37]"
              : "text-white/40 hover:text-white/70",
          ].join(" ")}
        >
          {l}
        </NavLink>
      ))}
    </div>
  );
}
