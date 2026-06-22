import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { useSeo } from "../lib/useSeo";
import SocialWall from "../components/SocialWall";
import { SOCIAL_LINKS } from "../lib/socialLinks";

const heroPortrait = "/portfolio-media/dmitrii-headshot-2026.jpg";

function Tile({ to, title, over, open, index }) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-[8px] border border-white/10 bg-black/55 p-6 transition-all duration-300 hover:border-[#d4af37]/55 hover:bg-[#0d0b07]"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative">
        <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/80">
          {over}
        </div>
        <div className="mt-3 text-[23px] font-black leading-tight text-white">{title}</div>
        <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-4 text-[10px] uppercase tracking-[0.24em] text-white/[0.42] transition group-hover:text-[#f6e6a7]">
          <span>{open}</span>
          <span className="text-[#d4af37]">{number}</span>
        </div>
      </div>
    </Link>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const signals = [
  { k: "NOIR", v: "Controlled" },
  { k: "GOLD", v: "Premium" },
  { k: "GLOBAL", v: "Selective" },
];

export default function Home() {
  const { lang = "en" } = useParams();
  const c = t(lang);

  useSeo({
    title: c.seo.baseTitle,
    description: c.seo.baseDesc,
    url: `https://dmitriigaranin.com/${lang}/home`,
    lang,
  });

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative min-h-[88svh] overflow-hidden border-b border-[#d4af37]/20 px-4 pb-14 pt-28 md:px-6 md:pt-32">
        <div className="absolute inset-0">
          <img
            src={heroPortrait}
            alt={c.home.portraitAlt}
            className="absolute inset-y-0 right-0 h-full w-full object-cover object-[center_24%] opacity-[0.5] saturate-[0.92] md:w-[58%] md:opacity-[0.74]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.96)_28%,rgba(3,3,3,0.62)_58%,rgba(3,3,3,0.18)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,transparent_38%,#030303_100%)]" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "linear-gradient(110deg, transparent 0%, transparent 46%, rgba(212,175,55,0.16) 50%, transparent 56%, transparent 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.035) 0 1px, transparent 1px 126px)",
            }}
          />
        </div>

        <div className="relative mx-auto flex min-h-[calc(88svh-9rem)] max-w-6xl flex-col justify-center">
          <Motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-4xl">
            <div className="inline-flex items-center gap-3 border border-[#d4af37]/35 bg-black/50 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#f6e6a7] backdrop-blur">
              <span className="h-px w-8 bg-[#d4af37]" />
              {c.tagline}
            </div>
          </Motion.div>

          <Motion.div variants={fadeUp} initial="hidden" animate="show" custom={1} className="mt-8 max-w-4xl">
            <h1 className="text-[54px] font-black uppercase leading-[0.92] md:text-[92px] lg:text-[116px]">
              <span className="block text-white">{c.brand}</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[16px] leading-8 text-white/[0.68] md:text-[18px]">
              {c.home.sub}
            </p>
            <span className="mt-5 block text-[11px] font-semibold uppercase tracking-[0.34em] text-white/[0.48]">
              {c.home.note}
            </span>
          </Motion.div>

          <Motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <Link
              to={`/${lang}/contact`}
              className="border border-[#d4af37]/60 bg-[#d4af37] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-black transition-all duration-200 hover:bg-[#f6e6a7]"
            >
              {c.nav.contact}
            </Link>

            <Link
              to={`/${lang}/portfolio`}
              className="border border-white/15 bg-black/45 px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-white/[0.78] transition-all duration-200 hover:border-[#d4af37]/55 hover:text-[#f6e6a7]"
            >
              {c.nav.portfolio}
            </Link>
          </Motion.div>

          <Motion.div
            className="mt-5 flex flex-wrap items-center gap-2"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2.4}
          >
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${link.label}`}
                className="rounded-[8px] border border-white/10 bg-black/35 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em] text-white/58 transition hover:border-[#d4af37]/55 hover:text-[#f6e6a7]"
              >
                {link.label}
              </a>
            ))}
          </Motion.div>

          <Motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-12 grid max-w-3xl grid-cols-1 border border-white/10 bg-black/35 backdrop-blur sm:grid-cols-3"
          >
            {signals.map((item) => (
              <div key={item.k} className="border-b border-white/10 p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#d4af37]">
                  {item.k}
                </div>
                <div className="mt-2 text-[13px] uppercase tracking-[0.18em] text-white/[0.68]">{item.v}</div>
              </div>
            ))}
          </Motion.div>
        </div>
      </section>

      <SocialWall lang={lang} />

      <section className="mx-auto w-full max-w-6xl px-4 py-20 md:px-6">
        <div className="mb-8 flex items-end justify-between gap-5">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-[0.32em] text-[#d4af37]">
              {c.home.tileOverline}
            </div>
            <h2 className="mt-3 text-[30px] font-black uppercase leading-none text-white md:text-[44px]">
              Private index
            </h2>
          </div>
          <div className="hidden h-px flex-1 bg-gradient-to-r from-[#d4af37]/45 to-transparent md:block" />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <Tile to={`/${lang}/about`} title={c.nav.about} over={c.home.tileOverline} open={c.home.tileCta} index={0} />
          <Tile to={`/${lang}/portfolio`} title={c.nav.portfolio} over={c.home.tileOverline} open={c.home.tileCta} index={1} />
          <Tile to={`/${lang}/behind`} title={c.nav.behind} over={c.home.tileOverline} open={c.home.tileCta} index={2} />
        </div>
      </section>
    </main>
  );
}
