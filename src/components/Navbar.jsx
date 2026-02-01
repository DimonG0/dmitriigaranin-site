import LanguageSwitcher from "./LanguageSwitcher";
import { NavLink, useParams } from "react-router-dom";
import { LANGS } from "../lib/routes";

const brand = {
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

const items = [
  { key: "home", label: { en: "Home", ru: "Главная", fr: "Accueil", am: "Գլխավոր" } },
  { key: "about", label: { en: "About", ru: "О себе", fr: "À propos", am: "Իմ մասին" } },
  { key: "portfolio", label: { en: "Portfolio", ru: "Портфолио", fr: "Portfolio", am: "Պորտֆոլիո" } },
  { key: "reviews", label: { en: "Reviews", ru: "Отзывы", fr: "Avis", am: "Կարծիքներ" } },
  { key: "behind", label: { en: "Behind", ru: "За кадром", fr: "Backstage", am: "Կուլիսներ" } },
  { key: "contact", label: { en: "Contact", ru: "Контакты", fr: "Contact", am: "Կապ" } },
];

export default function Navbar() {
  const { lang } = useParams();

  // защита
  const currentLang = LANGS.includes(lang) ? lang : "en";

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">

        {/* BRAND */}
        <NavLink to={`/${currentLang}/home`} className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/15 to-transparent">
            <span className="font-semibold tracking-[0.05em] text-[#D4AF37]">DG</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm tracking-[0.35em] text-white/90">
              {brand.name[currentLang]}
              <span className="font-semibold tracking-[-0.05em] scale-x-[0.95] text-[#D4AF37]">
              {brand.initials[lang]}
              </span>
            </div>
            <div className="text-[11px] tracking-[0.28em] text-white/50">
              {brand.tagline[currentLang]}
            </div>
          </div>
        </NavLink>

        {/* NAV */}
        <nav className="hidden items-center gap-6 md:flex">
          {items.map((it) => (
            <NavLink
              key={it.key}
              to={`/${currentLang}/${it.key}`}
              className={({ isActive }) =>
                [
                  "text-xs tracking-[0.28em] uppercase transition",
                  isActive
                    ? "text-[#D4AF37]"
                    : "text-white/70 hover:text-white",
                ].join(" ")
              }
            >
              {it.label[currentLang] ?? it.label.en}
            </NavLink>
          ))}
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
