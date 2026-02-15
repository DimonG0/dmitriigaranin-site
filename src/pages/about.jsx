import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  return (
    <div className="relative">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-24 md:pt-28">
        {/* HEADER */}
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {SAFE(copy?.nav?.about, "About")}
          </div>

          <h1 className="mt-6 text-[40px] font-[800] tracking-[-0.02em] md:text-[56px] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
            {SAFE(copy?.brand, "Dmitrii Garanin")}
          </h1>

          <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

          <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/60">
            {SAFE(copy?.tagline, "Actor • Creative • IT")}
          </p>
        </motion.div>

        {/* TEXT */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <p className="text-[14px] leading-relaxed text-white/75">
            {SAFE(copy?.about?.p1, "First paragraph about your background, experience, and creative philosophy.")}
          </p>
          <p className="text-[14px] leading-relaxed text-white/75">
            {SAFE(copy?.about?.p2, "Second paragraph detailing specific skills, projects, or collaborations.")}
          </p>
        </motion.div>

        {/* STATS */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {(Array.isArray(copy?.about?.stats) ? copy.about.stats : [
            { k: "Years", v: "10+" },
            { k: "Projects", v: "50+" },
            { k: "Clients", v: "100+" },
          ]).map((s, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-4">
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{s.k}</div>
              <div className="mt-2 text-[13px] font-[700] text-white/80">{s.v}</div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <Link
            to={`/${lang}/portfolio`}
            className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-[#f7e7b2] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20 transition-colors"
          >
            {SAFE(copy?.nav?.portfolio, "Portfolio")} →
          </Link>

          <Link
            to={`/${lang}/contact`}
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-white/80 hover:bg-white/10 hover:border-white/25 transition-colors"
          >
            {SAFE(copy?.nav?.contact, "Contact")} →
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
