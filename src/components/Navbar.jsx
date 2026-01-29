import { NavLink, useLocation } from "react-router-dom";

const langs = ["en", "ru", "fr", "hy"];
const items = [
  { key: "home", label: { en: "Home", ru: "Главная", fr: "Accueil", hy: "Գլխավոր" } },
  { key: "about", label: { en: "About", ru: "О себе", fr: "À propos", hy: "Իմ մասին" } },
  { key: "portfolio", label: { en: "Portfolio", ru: "Портфолио", fr: "Portfolio", hy: "Պորտֆոլիո" } },
  { key: "reviews", label: { en: "Reviews", ru: "Отзывы", fr: "Avis", hy: "Կարծիքներ" } },
  { key: "behind", label: { en: "Behind", ru: "За кадром", fr: "Backstage", hy: "Կուլիսներ" } },
  { key: "contact", label: { en: "Contact", ru: "Контакты", fr: "Contact", hy: "Կապ" } },
];

function getLangFromPath(pathname) {
  const p = pathname.split("/").filter(Boolean);
  return langs.includes(p[0]) ? p[0] : "en";
}

export default function Navbar() {
  const { pathname } = useLocation();
  const lang = getLangFromPath(pathname);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <NavLink to={`/${lang}/home`} className="group flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-full border border-[#D4AF37]/40 bg-gradient-to-b from-[#D4AF37]/15 to-transparent">
            <span className="font-semibold tracking-[0.25em] text-[#D4AF37]">DG</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm tracking-[0.35em] text-white/90">DMITRII GARANIN</div>
            <div className="text-[11px] tracking-[0.28em] text-white/50">ACTOR • CREATIVE • IT</div>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-6 md:flex">
          {items.map((it) => (
            <NavLink
              key={it.key}
              to={`/${lang}/${it.key}`}
              className={({ isActive }) =>
                [
                  "text-xs tracking-[0.28em] uppercase transition",
                  isActive ? "text-[#D4AF37]" : "text-white/70 hover:text-white",
                ].join(" ")
              }
            >
              {it.label[lang] ?? it.label.en}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {langs.map((l) => (
            <NavLink
              key={l}
              to={`/${l}/home`}
              className={({ isActive }) =>
                [
                  "rounded-full px-3 py-1 text-[11px] tracking-[0.25em] uppercase transition",
                  isActive ? "bg-[#D4AF37]/15 text-[#D4AF37] ring-1 ring-[#D4AF37]/40" : "text-white/60 hover:text-white",
                ].join(" ")
              }
            >
              {l}
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
}
