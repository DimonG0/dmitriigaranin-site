import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

import Badge from "../ui/Badge";
import Chip from "../ui/Chip";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";

/* ===== motion ===== */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay: 0.12 + i * 0.08,
      ease,
    },
  }),
};

const shimmer = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.12, 0.42, 0.12],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ===== page ===== */

export default function Behind() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white luxe-grain">

      {/* ===== BACKDROP ===== */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 18% 10%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(1000px 650px at 86% 20%, rgba(210,210,210,0.10), transparent 58%)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={shimmer}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      {/* ===== CONTENT ===== */}
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:pt-20">

        {/* ===== HEADER ===== */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
          className="max-w-3xl"
        >
          <Badge>
            {SAFE(copy?.nav?.behind, "Behind")}
          </Badge>

          <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
            <span className="block text-[40px] font-[800] md:text-[56px]">
              Backstage{" "}
              <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                Access
              </span>
            </span>
          </h1>

          <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/65">
            Exclusive • Noir • Controlled
          </p>
        </motion.div>

        {/* ===== MAIN GRID ===== */}
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">

          {/* LEFT */}
          <motion.div
            className="md:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionTitle
                over="Concept"
                title={SAFE(copy?.behind?.title, "A closed club. A private archive.")}
                desc={SAFE(
                  copy?.behind?.desc,
                  "Behind-the-scenes is presented like a private vault: calm pacing, premium texture, and curated access."
                )}
              />

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to={`/${lang}/portfolio`}
                  className="lux-btn-primary"
                >
                  {SAFE(copy?.nav?.portfolio, "Portfolio")} →
                </Link>

                <Link
                  to={`/${lang}/contact`}
                  className="lux-btn-secondary"
                >
                  {SAFE(copy?.nav?.contact, "Contact")} →
                </Link>
              </div>
            </div>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.4}
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-col gap-3">
                <Chip>Restricted access</Chip>
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

        {/* ===== CARDS ===== */}
        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          {[
            {
              title: "Process",
              desc: "Methodical and controlled creative workflow",
            },
            {
              title: "Archive",
              desc: "Curated unreleased material and drafts",
            },
            {
              title: "Access",
              desc: "Invitation-only viewing permissions",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/[0.04] p-5"
            >
              <Tag>{item.title}</Tag>
              <p className="mt-3 text-[14px] text-white/75">
                {item.desc}
              </p>
            </div>
          ))}
        </motion.div>
      </section>
    </main>
  );
}

