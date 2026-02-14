import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";
import { useSeo } from "../lib/useSeo";
import SectionTitle from "../ui/SectionTitle";
import Badge from "../ui/Badge";

function Tile({ to, title }) {
  return (
    <Link
      to={to}
      className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-all hover:border-[#D4AF37]/40 hover:bg-white/[0.08]"
    >
      <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">Explore</div>
      <div className="mt-2 text-[22px] font-[700] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
        {title}
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

const glowPulse = {
  initial: { opacity: 0.35 },
  animate: { opacity: [0.25, 0.55, 0.25], transition: { duration: 6, repeat: Infinity, ease: "easeInOut" } },
};

export default function Home() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  useSeo({
    title: SAFE(copy.seo?.baseTitle, "Dmitrii Garanin"),
    description: SAFE(copy.seo?.baseDesc, ""),
    url: `https://dmitriigaranin.com/${lang}/home`,
    lang,
  });

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 650px at 85% 25%, rgba(200,200,200,0.08), transparent 58%)",
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

      <section className="relative mx-auto w-full max-w-[1400px] px-6 pb-20 pt-14 md:pt-20">
        <motion.div
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <Badge subtle>{SAFE(copy.tagline, "")}</Badge>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <SectionTitle
                over={SAFE(copy.nav?.home, "Home")}
                title={SAFE(copy.brand, "Dmitrii Garanin")}
                desc={SAFE(copy.home?.sub, "")}
              />
              <span className="mt-4 block text-[14px] tracking-[0.35em] uppercase text-white/70">
                {SAFE(copy.home?.note, "Luxury Portfolio")}
              </span>
            </motion.div>

            <motion.p
              className="mt-7 max-w-xl text-[16px] leading-relaxed text-white/70"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              {SAFE(copy.home?.sub, "")}
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap items-center gap-4" variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <Link
                to={`/${lang}/contact`}
                className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-6 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-[#f7e7b2] transition-all duration-200 hover:border-[#FFD700]/80 hover:bg-[#D4AF37]/20"
              >
                {SAFE(copy.nav?.contact, "Contact")} →
              </Link>

              <Link
                to={`/${lang}/portfolio`}
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-white/80 transition-all duration-200 hover:border-white/25 hover:bg-white/10"
              >
                {SAFE(copy.nav?.portfolio, "Portfolio")}
              </Link>
            </motion.div>
          </div>

          <div className="md:col-span-5">
            <motion.div
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2.6}
            >
              <div className="text-[12px] tracking-[0.22em] uppercase text-white/60">
                {SAFE(copy.home?.signatureTitle, "Signature")}
              </div>
              <div className="mt-3 text-[14px] text-white/75">
                {SAFE(copy.home?.signatureText, "")}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1400px] px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tile to={`/${lang}/about`} title={SAFE(copy.nav?.about, "About")} />
          <Tile to={`/${lang}/portfolio`} title={SAFE(copy.nav?.portfolio, "Portfolio")} />
          <Tile to={`/${lang}/behind`} title={SAFE(copy.nav?.behind, "Behind")} />
        </div>
      </section>
    </main>
  );
}
