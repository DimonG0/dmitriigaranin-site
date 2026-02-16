import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, delay: 0.12 + i * 0.08, ease },
  }),
};

export default function Portfolio() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const CATEGORIES = useMemo(
    () => [
      { id: "all", label: copy.portfolio.categories.all },
      { id: "film", label: copy.portfolio.categories.film },
      { id: "brand", label: copy.portfolio.categories.brand },
      { id: "creative", label: copy.portfolio.categories.creative },
      { id: "tech", label: copy.portfolio.categories.tech },
    ],
    [copy]
  );

  const items = useMemo(() => copy.portfolio.items, [copy]);

  const filtered = active === "all" ? items : items.filter((x) => x.category === active);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {copy.portfolio.pill}
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                {copy.portfolio.h1a}{" "}
                <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  {copy.portfolio.h1b}
                </span>
              </span>
              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                {copy.portfolio.sub}
              </span>
            </h1>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {lang.toUpperCase()}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {filtered.length} {copy.portfolio.counters.projects.toUpperCase()}
            </span>
          </div>
        </motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`rounded-full border px-5 py-2 text-[11px] tracking-[0.28em] uppercase transition-all duration-200 ${
                  on
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40 hover:bg-white/10"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.map((it, idx) => (
            <PortfolioCard key={it.id} item={it} index={idx} onOpen={() => setOpen(it)} cta={copy.portfolio.card.cta} />
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div className="mt-16 text-center" variants={fadeUp} initial="hidden" animate="show">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12">
              <div className="text-[40px] font-[900] text-white/30">∅</div>
              <div className="mt-4 text-[18px] font-[700] text-white/70">
                {copy.portfolio.empty.title}
              </div>
              <p className="mt-2 text-white/50">{copy.portfolio.empty.desc}</p>
            </div>
          </motion.div>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={open.cover}
                  alt={open.title}
                  className="h-64 w-full object-cover md:h-80"
                  onError={(e) => {
                    e.currentTarget.src = `https://picsum.photos/seed/fallback/1400/900`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80">
                      {open.badge}
                    </span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60">
                      {open.year}
                    </span>
                  </div>
                  <h3 className="mt-4 text-[28px] font-[900]">{open.title}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {open.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mb-6 text-sm text-white/70">{open.description}</div>

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="text-[12px] tracking-[0.22em] uppercase text-white/50">{open.subtitle}</div>
                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {copy.portfolio.modal.close}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function PortfolioCard({ item, index, onOpen, cta }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06]">
        <div className="relative overflow-hidden">
          <img
            src={item.cover}
            alt={item.title}
            className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.src = `https://picsum.photos/seed/fallback/1400/900`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
              {item.badge}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[12px] tracking-[0.22em] uppercase text-white/80">{item.year}</div>
            <div className="mt-1 text-[18px] font-[800]">{item.title}</div>
          </div>
        </div>

        <div className="p-5">
          <div className="text-[14px] text-white/70">{item.subtitle}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag, idx) => (
              <span
                key={idx}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] tracking-[0.22em] uppercase text-white/50">{cta}</div>
            <span className="text-[#D4AF37] transition-transform group-hover:translate-x-1">→</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
