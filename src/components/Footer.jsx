import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { LANGS } from "../lib/routes";
import { SOCIAL_LINKS } from "../lib/socialLinks";

export default function Footer() {
  const { lang } = useParams();
  const safeLang = LANGS.includes(lang) ? lang : "en";
  const copy = t(safeLang);

  const year = new Date().getFullYear();
  const email = "hello@dmitriigaranin.com";

  const brand = copy?.brand ?? "Dmitrii Garanin";
  const tagline = copy?.tagline ?? "";
  const rights = copy?.footer?.rights ?? "All rights reserved";
  const contactLabel = copy?.footer?.contact ?? "Private contact";

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      {/* ===== BACKDROP GLOW ===== */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px 420px at 12% 0%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(900px 420px at 88% 25%, rgba(255,255,255,0.06), transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* ===== LEFT ===== */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/55">
              &copy; {year} {brand} &mdash; {rights}
            </div>

            {tagline && (
              <div className="text-[10px] tracking-[0.32em] uppercase text-white/35">
                {tagline}
              </div>
            )}
          </div>

          {/* ===== RIGHT ===== */}
          <div className="flex flex-col items-start gap-3 md:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/55 backdrop-blur">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{
                  background: "#D4AF37",
                  boxShadow: "0 0 12px rgba(212,175,55,.55)",
                }}
              />
              {contactLabel}
            </div>

            <a
              href={`mailto:${email}`}
              className="text-[11px] tracking-[0.28em] uppercase text-[#D4AF37]/90 transition hover:text-[#FFD700]"
            >
              {email}
            </a>

            <div className="flex flex-wrap justify-start gap-2 md:justify-end">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${link.label}`}
                  className="rounded-[8px] border border-white/10 bg-white/[0.035] px-3 py-2 text-[9px] font-bold uppercase tracking-[0.22em] text-white/45 transition hover:border-[#D4AF37]/55 hover:text-[#f6e6a7]"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

        {/* ===== FOOT BAR ===== */}
        <div className="mt-5 flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-white/35">
          <span>NOIR &bull; GOLD &bull; CONTROLLED</span>
          <span>{safeLang.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
