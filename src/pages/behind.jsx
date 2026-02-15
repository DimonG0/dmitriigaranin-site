// src/pages/behind.jsx
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

import Chip from "../ui/Chip";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
  }),
};

export default function Behind() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:pt-20">
      {/* HEADER */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-3xl">
        {/* нейтральный бейдж */}
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-white/55" />
          {SAFE(copy?.nav?.behind, "Behind")}
        </div>

        <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
          <span className="block text-[40px] font-[800] md:text-[56px]">
            {SAFE(copy?.behind?.h1a, "Backstage")}{" "}
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
              {SAFE(copy?.behind?.h1b, "Access")}
            </span>
          </span>
        </h1>

        <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/65">
          {SAFE(copy?.behind?.sub, "Exclusive • Noir • Controlled")}
        </p>
      </motion.div>

      {/* MAIN GRID */}
      <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
        <motion.div className="md:col-span-7" variants={fadeUp} initial="hidden" animate="show" custom={1}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <SectionTitle
              over={SAFE(copy?.behind?.over, "Concept")}
              title={SAFE(copy?.behind?.title, "A closed club. A private archive.")}
              desc={SAFE(
                copy?.behind?.desc,
                "Behind-the-scenes is presented like a private vault: calm pacing, premium texture, and curated access."
              )}
            />

            <div className="mt-7 flex flex-wrap gap-3">
              <Link to={`/${lang}/portfolio`} className="lux-btn-primary">
                {SAFE(copy?.nav?.portfolio, "Portfolio")} →
              </Link>
              <Link to={`/${lang}/contact`} className="lux-btn-secondary">
                {SAFE(copy?.nav?.contact, "Contact")} →
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div className="md:col-span-5" variants={fadeUp} initial="hidden" animate="show" custom={1.4}>
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex flex-col gap-3">
              <Chip>{SAFE(copy?.behind?.chip, "Restricted access")}</Chip>
              <p className="text-[14px] text-white/75">
                {SAFE(
                  copy?.behind?.note,
                  "This section contains materials available only to verified collaborators and partners."
                )}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* CARDS */}
      <motion.div
        className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2}
      >
        {(copy?.behind?.cards ?? [
          { title: "Process", desc: "Methodical and controlled creative workflow" },
          { title: "Archive", desc: "Curated unreleased material and drafts" },
          { title: "Access", desc: "Invitation-only viewing permissions" },
        ]).map((item, i) => (
          <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <Tag>{item.title}</Tag>
            <p className="mt-3 text-[14px] text-white/75">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
