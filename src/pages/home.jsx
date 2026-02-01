import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { useSeo } from "../lib/useSeo";
import { t } from "../lib/i18n";

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
    title: "Dmitrii Garanin — Actor · Creative · IT",
    description:
      "A curated luxury portfolio combining acting, creative direction, and digital presence.",
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
              "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 600px at 80% 30%, rgba(160,160,160,0.10), transparent 55%), radial-gradient(1200px 800px at 50% 90%, rgba(255,215,0,0.08), transparent 62%)",
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
          custom={0}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          {copy.tagline}
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* LEFT */}
          <div className="md:col-span-7">
            <motion.h1
              className="leading-[0.95] tracking-[-0.02em]"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              <span className="block text-[44px] font-[600] md:text-[76px]">
                {copy.brand.split(" ")[0]}{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700]">
                  {copy.brand.split(" ")[1]}
                </span>
              </span>
              <span className="mt-4 block text-[14px] tracking-[0.35em] uppercase text-white/70">
                {copy.home.note}
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
             {copy.home.sub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <Link to={`/${lang}/contact`} className="lux-btn-primary">
                {copy.nav.contact} →
              </Link>
              <Link to={`/${lang}/portfolio`} className="lux-btn-secondary">
                {copy.nav.portfolio}
              </Link>
            </motion.div>
          </div>

          {/* RIGHT CARD */}
          <div className="md:col-span-5">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2.6}
            >
              <div className="text-[12px] tracking-[0.22em] uppercase text-white/60">
                {copy.home.signatureTitle ?? "Signature Card"}
              </div>
              <div className="mt-3 text-[14px] text-white/75">
                {copy.home.signatureText ?? "Cinematic presence with premium minimalism. Built for casting directors, producers, agencies, and high-end collaborations."}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Film Noir</Tag>
                <Tag>Luxury Ads</Tag>
                <Tag>International</Tag>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* QUICK NAV */}
      <section className="mx-auto w-full max-w-[1400px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tile to={`/${lang}/about`} title={copy.nav.about} desc={copy.about?.short ?? "Positioning & identity."} />
          <Tile to={`/${lang}/portfolio`} title="Portfolio" desc="Selected work." />
          <Tile to={`/${lang}/behind`} title="Behind" desc="Private archive." />
        </div>
      </section>
    </main>
  );
}

/* ===== helpers ===== */

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}

function Tile({ to, title, desc }) {
  return (
    <Link
      to={to}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition hover:border-[#D4AF37]/40"
    >
      <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
        Explore
      </div>
      <div className="mt-2 text-[22px] font-[700] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
        {title}
      </div>
      <p className="mt-3 text-[13px] text-white/65">{desc}</p>
    </Link>
  );
}
