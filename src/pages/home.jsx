import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";
import { useSeo } from "../lib/useSeo";

export default function Home() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const [firstName, ...rest] = SAFE(copy.brand, "").split(" ");
  const lastName = rest.join(" ");

  useSeo({
    title: SAFE(copy.seo?.baseTitle),
    description: SAFE(copy.seo?.baseDesc),
    url: `https://dmitriigaranin.com/${lang}/home`,
    lang,
  });

  const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    show: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, delay: 0.12 + i * 0.08 },
    }),
  };

  return (
    <main className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* BACKDROP — теперь ограничен */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%)",
          }}
        />
      </div>

      <section className="relative z-10 mx-auto max-w-[1400px] px-6 pb-24 pt-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
          {SAFE(copy.tagline)}
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-10 text-[44px] md:text-[76px] font-[600] leading-[0.95]"
        >
          {firstName}{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700]">
            {lastName}
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
          className="mt-6 max-w-xl text-white/70"
        >
          {SAFE(copy.home?.sub)}
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-10 flex gap-4"
        >
          <Link to={`/${lang}/contact`} className="lux-btn-primary">
            {SAFE(copy.nav?.contact)} →
          </Link>
          <Link to={`/${lang}/portfolio`} className="lux-btn-secondary">
            {SAFE(copy.nav?.portfolio)}
          </Link>
        </motion.div>
      </section>
    </main>
  );
}
