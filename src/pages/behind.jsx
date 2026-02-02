import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(7px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, delay: 0.12 + i * 0.08, ease },
  }),
};

const shimmerLine = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.1, 0.4, 0.1],
    transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Behind() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 18% 10%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(1000px 650px at 86% 18%, rgba(210,210,210,0.10), transparent 58%), radial-gradient(1200px 800px at 48% 92%, rgba(255,215,0,0.09), transparent 62%)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={shimmerLine}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      {/* CONTENT */}
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <motion.div
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {SAFE(copy?.nav?.behind, "Behind the scenes / Private Archive")}
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[800] md:text-[56px]">
                Backstage{" "}
                <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  Access
                </span>
              </span>
              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                Exclusive • Noir • Controlled • Cinematic
              </span>
            </h1>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <motion.div
            className="md:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionTitle over="Concept" title="A closed club. A private archive." />
              <p className="mt-4 text-[14px] text-white/70">
                Behind-the-scenes is presented like an exclusive vault: calm pacing, premium texture,
                and curated access.
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={`/${lang}/portfolio`}
                  className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] tracking-[0.22em] uppercase text-[#f7e7b2] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20 transition-colors"
                >
                  View portfolio →
                </Link>

                <Link
                  to={`/${lang}/contact`}
                  className="rounded-full border border-white/12 bg-white/5 px-7 py-3 text-[12px] tracking-[0.22em] uppercase text-white/80 hover:bg-white/10 hover:border-white/25 transition-colors"
                >
                  Request access →
                </Link>
              </div>
            </div>
          </motion.div>
          
          {/* Добавьте дополнительные секции при необходимости */}
          <motion.div
            className="md:col-span-5 mt-6 md:mt-0"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.5}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">
                Note
              </div>
              <div className="mt-3 text-[14px] text-white/75">
                This section contains exclusive content available to verified collaborators and partners only.
              </div>
            </div>
          </motion.div>
        </div>

        {/* Дополнительные карточки */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          {[
            { title: "Process", desc: "Methodical approach to creative work" },
            { title: "Archive", desc: "Curated collection of unreleased material" },
            { title: "Access", desc: "Strictly controlled viewing permissions" },
          ].map((item, index) => (
            <div
              key={index}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">
                {item.title}
              </div>
              <div className="mt-2 text-[14px] text-white/75">
                {item.desc}
              </div>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

/* ===== helpers ===== */
function SectionTitle({ over, title }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{over}</div>
      <div className="mt-2 text-[22px] font-[900] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
        {title}
      </div>
    </div>
  );
}