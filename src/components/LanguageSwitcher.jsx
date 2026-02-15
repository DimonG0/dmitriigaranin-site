import { NavLink, useLocation, useParams } from "react-router-dom";
import { LANGS } from "../lib/routes";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const location = useLocation();

  const current = LANGS.includes(lang) ? lang : "en";

  // "/en/behind/foo" -> ["en","behind","foo"]
  const segments = location.pathname.split("/").filter(Boolean);
  const restSegments = segments.slice(1); // everything after lang
  const restPath = restSegments.length ? restSegments.join("/") : "home";

  return (
    <div className="flex items-center gap-3">
      {LANGS.map((l) => (
        <NavLink
          key={l}
          to={`/${l}/${restPath}${location.search}${location.hash}`}
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
