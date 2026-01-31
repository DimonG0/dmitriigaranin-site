import { LANGS } from "../lib/routes";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function LanguageSwitcher() {
  const { lang } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const currentLang = LANGS.includes(lang) ? lang : "en";

  function go(toLang) {
    const parts = location.pathname.split("/").filter(Boolean);

    // если вдруг зашли на /
    if (parts.length === 0) {
      navigate(`/${toLang}/home`);
      return;
    }

    // если первый сегмент — язык
    if (LANGS.includes(parts[0])) {
      parts[0] = toLang;
    } else {
      parts.unshift(toLang);
    }

    navigate("/" + parts.join("/"));
  }

  return (
    <div className="flex items-center gap-2">
      {LANGS.map((l) => {
        const active = l === currentLang;

        return (
          <button
            key={l}
            onClick={() => go(l)}
            type="button"
            className={[
              "rounded-full px-3 py-1 text-[11px] tracking-[0.25em] uppercase transition",
              active
                ? "bg-[#D4AF37]/20 text-[#D4AF37] ring-1 ring-[#D4AF37]/40"
                : "text-white/60 hover:text-white",
            ].join(" ")}
          >
            {l.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
