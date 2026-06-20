import { NavLink, useParams } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { LANGS } from "../lib/routes";

const BRAND = {
  name: {
    en: "DMITRII GARANIN",
    ru: "ДМИТРИЙ ГАРАНИН",
    fr: "DMITRII GARANIN",
    am: "ԴՄԻՏՐԻ ԳԱՐԱՆԻՆ",
  },
  tagline: {
    en: "ACTOR • CREATIVE • IT",
    ru: "АКТЁР • КРЕАТИВ • IT",
    fr: "ACTEUR • CRÉATIF • IT",
    am: "ԴԵՐԱՍԱՆ • ՍՏԵՂԾԱԳՈՐԾ • IT",
  },
};

const NAV_ITEMS = [
  { key: "home", label: { en: "Home", ru: "Главная", fr: "Accueil", am: "Գլխավոր" } },
  { key: "about", label: { en: "About", ru: "О себе", fr: "À propos", am: "Իմ մասին" } },
  { key: "portfolio", label: { en: "Portfolio", ru: "Портфолио", fr: "Portfolio", am: "Պորտֆոլիո" } },
  { key: "reviews", label: { en: "Reviews", ru: "Отзывы", fr: "Avis", am: "Կարծիքներ" } },
  { key: "behind", label: { en: "Behind", ru: "За кадром", fr: "Backstage", am: "Կուլիսներ" } },
  { key: "contact", label: { en: "Contact", ru: "Контакты", fr: "Contact", am: "Կապ" } },
];

export default function Navbar() {
  const { lang } = useParams();
  const currentLang = LANGS.includes(lang) ? lang : "en";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* BRAND */}
        <NavLink to={`/${currentLang}/home`} className="group flex items-center gap-3">
          <div
            className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/40 bg-black"
            style={{ boxShadow: "0 0 18px rgba(212,175,55,.15)" }}
          >
            <span
              className="text-[13px] font-[800] tracking-[0.1em]"
              style={{
                backgroundImage: "linear-gradient(90deg, #f6e6a7, #D4AF37, #FFD700)",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              DG
            </span>
          </div>

          <div className="leading-tight">
            <div className="text-[12px] tracking-[0.35em] text-white/90">{BRAND.name[currentLang]}</div>
            <div className="text-[11px] tracking-[0.28em] text-white/50">{BRAND.tagline[currentLang]}</div>
          </div>
        </NavLink>

        {/* NAV */}
        <nav className="hidden items-center gap-6 md:flex">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.key}
              to={`/${currentLang}/${item.key}`}
              className={({ isActive }) =>
                [
                  "relative text-[11px] tracking-[0.28em] uppercase transition",
                  isActive ? "text-white" : "text-white/65 hover:text-white",
                ].join(" ")
              }
            >
              {({ isActive }) => (
                <>
                  {item.label[currentLang] ?? item.label.en}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 h-[2px] w-6 -translate-x-1/2 bg-white/60" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* LANG */}
        <LanguageSwitcher />
      </div>
    </header>
  );
}
