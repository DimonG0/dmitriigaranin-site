import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";

export default function Footer() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const year = new Date().getFullYear();
  const email = "hello@dmitriigaranin.com";

  return (
    <footer className="relative border-t border-white/10 bg-black">
      {/* subtle backdrop */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.10]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(900px 420px at 15% 0%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(900px 420px at 85% 20%, rgba(210,210,210,0.06), transparent 60%)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* LEFT */}
          <div className="flex flex-col gap-2">
            <div className="text-[11px] tracking-[0.28em] uppercase text-white/55">
              © {year} {copy.brand} — {copy.footer?.rights ?? "All rights reserved"}
            </div>

            <div className="text-[10px] tracking-[0.32em] uppercase text-white/35">
              {copy.tagline}
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] tracking-[0.28em] uppercase text-white/55">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#D4AF37", boxShadow: "0 0 12px rgba(212,175,55,.55)" }}
              />
              {copy.footer?.contact ?? "Private contact"}
            </div>

            <a
              href={`mailto:${email}`}
              className="text-[11px] tracking-[0.28em] uppercase text-[#D4AF37]/90 transition hover:text-[#FFD700]"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

        <div className="mt-5 flex items-center justify-between text-[10px] tracking-[0.35em] uppercase text-white/35">
          <span>NOIR • GOLD • CONTROLLED</span>
          <span>{String(lang).toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
