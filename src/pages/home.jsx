import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { useSeo } from "../lib/useSeo";

const SAFE = (v, fallback = "") =>
  typeof v === "string" && v.length ? v : fallback;

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const glowPulse = {
  initial: { opacity: 0.35 },
  animate: {
    opacity: [0.25, 0.55, 0.25],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Home() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  useSeo({
    title: copy.seo?.baseTitle ?? "Dmitrii Garanin",
    description: copy.seo?.baseDesc ?? "",
    url: `https://dmitriigaranin.com/${lang}/home`,
    lang,
  });

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={glowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.8), rgba(255,215,0,.95), rgba(212,175,55,.8), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      {/* HERO */}
      <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-14 md:pt-20">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          {SAFE(copy.tagline, "Actor • Creative • IT")}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.h1
              className="leading-[0.95] tracking-[-0.02em]"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <span className="block text-[44px] font-[600] md:text-[76px]">
                {SAFE(copy.brand, "Dmitrii Garanin")}
              </span>

              <span className="mt-4 block text-[14px] tracking-[0.35em] uppercase text-white/70">
                {SAFE(copy.home?.note, "Luxury Portfolio")}
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              {SAFE(copy.home?.sub)}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="show"
            >
              <Link to={`/${lang}/contact`} className="lux-btn-primary">
                {SAFE(copy.nav?.contact, "Contact")} →
              </Link>
              <Link to={`/${lang}/portfolio`} className="lux-btn-secondary">
                {SAFE(copy.nav?.portfolio, "Portfolio")}
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
