import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { useSeo } from "../lib/useSeo";
import portrait from "../assets/ph_zel_2.jpg";
import SectionTitle from "../ui/SectionTitle";
import Badge from "../ui/Badge";

function Tile({ to, title, over, open }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-200 hover:border-[#D4AF37]/40 hover:bg-white/[0.08]"
    >
      <div className="relative">
        <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">{over}</div>
        <div className="mt-2 text-[22px] font-[700] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
          {title}
        </div>
        <div className="mt-2 text-[12px] tracking-[0.22em] uppercase text-white/35 transition group-hover:text-white/60">
          {open}
        </div>
      </div>
    </Link>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

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
      <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-14 md:pt-20">
        <motion.div variants={fadeUp} initial="hidden" animate="show">
          <Badge subtle>{c.tagline}</Badge>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* LEFT */}
          <div className="md:col-span-7">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <SectionTitle title={c.brand} desc={c.home.sub} />
              <span className="mt-4 block text-[14px] tracking-[0.35em] uppercase text-white/70">
                {c.home.note}
              </span>
            </motion.div>

            <motion.p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              {c.home.sub}
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <Link
                to={`/${lang}/contact`}
                className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-[#f7e7b2] transition-all duration-200 hover:border-[#FFD700]/80 hover:bg-[#D4AF37]/20"
              >
                {c.nav.contact} →
              </Link>

              <Link
                to={`/${lang}/portfolio`}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-white/80 transition-all duration-200 hover:border-white/25 hover:bg-white/10"
              >
                {c.nav.portfolio}
              </Link>
            </motion.div>
          </div>

        {/* RIGHT */}
<div className="md:col-span-5">
  {/* сдвигаем ВЕСЬ правый блок: рамку + подпись */}
  <div className="flex flex-col gap-6 -mt-10 -ml-3">
    {/* PORTRAIT (gold premium frame) */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        custom={2.4}
        className="relative overflow-hidden rounded-3xl border border-[#D4AF37]/45 bg-black/30 p-3 md:-translate-y-10 md:-translate-x-3 transform will-change-transform"
    >
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(900px 420px at 20% 0%, rgba(255,215,0,0.14), transparent 60%), radial-gradient(800px 520px at 90% 40%, rgba(212,175,55,0.12), transparent 62%)",
        }}
      />

      {/* inner frame */}
      <div className="relative overflow-hidden rounded-2xl border border-[#FFD700]/35 bg-black/40">
        <img
          src={portrait}
          alt={c?.home?.portraitAlt || "Portrait"}
          className="w-full h-auto object-contain"
          loading="eager"
          decoding="async"
          draggable={false}
        />
      </div>
    </motion.div>

    {/* SIGNATURE (black & gold restrained) */}
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={2.6}
      className="relative z-10 overflow-hidden rounded-3xl border border-[#D4AF37]/45 bg-black/30 p-3 -translate-y-10 -translate-x-3"
    >
      <div className="text-[12px] tracking-[0.22em] uppercase text-white/60">
        {c.home.signatureTitle}
      </div>
      <div className="mt-3 text-[14px] text-white/75">{c.home.signatureText}</div>
    </motion.div>
  </div>
</div>
</div>
  </section>
      <section className="mx-auto w-full max-w-[1400px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tile to={`/${lang}/about`} title={c.nav.about} over={c.home.tileOver} open={c.home.tileOpen} />
          <Tile to={`/${lang}/portfolio`} title={c.nav.portfolio} over={c.home.tileOver} open={c.home.tileOpen} />
          <Tile to={`/${lang}/behind`} title={c.nav.behind} over={c.home.tileOver} open={c.home.tileOpen} />
        </div>
      </section>
    </main>
  );
}
