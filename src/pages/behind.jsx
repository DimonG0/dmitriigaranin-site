import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";

import Chip from "../ui/Chip";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import Badge from "../ui/Badge";

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
  const c = t(lang);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white luxe-grain">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:pt-20">
        <Motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="max-w-3xl">
          <Badge>{c.nav.behind}</Badge>

          <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
            <span className="block text-[40px] font-[800] md:text-[56px]">
              {c.behind.heroTitleLeft}{" "}
              <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                {c.behind.heroTitleAccent}
              </span>
            </span>
          </h1>

          <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/65">
            {c.behind.heroTagline}
          </p>
        </Motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <Motion.div className="md:col-span-7" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionTitle over={c.behind.sectionOver} title={c.behind.title} desc={c.behind.desc} />

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={`/${lang}/portfolio`} className="lux-btn-primary">
                  {c.nav.portfolio} →
                </Link>
                <Link to={`/${lang}/contact`} className="lux-btn-secondary">
                  {c.nav.contact} →
                </Link>
              </div>
            </div>
          </Motion.div>

          <Motion.div className="md:col-span-5" variants={fadeUp} initial="hidden" animate="show" custom={1.4}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-col gap-3">
                <Chip>{c.behind.chip}</Chip>
                <p className="text-[14px] text-white/75">{c.behind.note}</p>
              </div>
            </div>
          </Motion.div>
        </div>

        <Motion.div
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          {c.behind.cards.map((item, i) => (
            <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Tag>{item.title}</Tag>
              <p className="mt-3 text-[14px] text-white/75">{item.desc}</p>
            </div>
          ))}
        </Motion.div>
      </section>
    </main>
  );
}
