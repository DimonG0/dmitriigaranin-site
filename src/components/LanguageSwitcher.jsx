import { LANGS } from "../lib/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const loc = useLocation();
  const nav = useNavigate();

  const current = lang || "en";

  function go(toLang) {
    const parts = loc.pathname.split("/").filter(Boolean); // [lang, page...]
    if (parts.length === 0) {
      nav(`/${toLang}/home`);
      return;
    }
    parts[0] = toLang;
    nav("/" + parts.join("/"));
  }

  return (
    <div className="flex items-center gap-2">
      {LANGS.map((l) => (
        <button
          key={l}
          onClick={() => go(l)}
          className={[
            "rounded-full px-3 py-1 text-xs tracking-luxe border transition",
            l === current
              ? "border-goldBright/70 text-goldBright shadow-goldGlow"
              : "border-white/15 text-zinc-300 hover:border-gold/50 hover:text-goldBright",
          ].join(" ")}
          type="button"
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
