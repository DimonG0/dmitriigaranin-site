import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";

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

const slowPulse = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.12, 0.32, 0.12],
    transition: { duration: 9.5, repeat: Infinity, ease: "easeInOut" },
  },
};

const slowFloat = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
  },
};

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "film", label: "Film / TV" },
  { id: "brand", label: "Luxury / Brand" },
  { id: "creative", label: "Creative" },
  { id: "tech", label: "IT / Product" },
];

export default function Portfolio() {
  const { lang = "en" } = useParams();
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const items = useMemo(
    () => [
      {
        id: "vault-01",
        category: "brand",
        title: "Private Campaign — Platinum Edition",
        subtitle: "Luxury brand collaboration (confidential)",
        year: "2026",
        badge: "NDA",
        cover: "https://picsum.photos/seed/lux1/1400/900",
        tags: ["Brand", "Direction", "Premium"],
        description:
          "High-end visual campaign with a restrained, cinematic tone. Private distribution, curated audience.",
      },
      {
        id: "vault-02",
        category: "film",
        title: "Screen Presence — Noir Cut",
        subtitle: "Acting / showreel sequence",
        year: "2025",
        badge: "SHOWREEL",
        cover: "https://picsum.photos/seed/lux2/1400/900",
        tags: ["Actor", "Camera", "Drama"],
        description:
          "A compact sequence built around micro-expression, silence, and controlled intensity.",
      },
      {
        id: "vault-03",
        category: "creative",
        title: "Editorial Portrait — Gold Dust",
        subtitle: "Magazine-grade portrait set",
        year: "2025",
        badge: "EDITORIAL",
        cover: "https://picsum.photos/seed/lux3/1400/900",
        tags: ["Portrait", "Styling", "Art"],
        description:
          "A minimal, expensive palette: matte black, warm gold edges, and soft neon reflections.",
      },
      {
        id: "vault-04",
        category: "tech",
        title: "DG System — Product Aesthetic",
        subtitle: "UX concept / premium interface",
        year: "2026",
        badge: "IT",
        cover: "https://picsum.photos/seed/lux4/1400/900",
        tags: ["UI", "Motion", "Luxury"],
        description:
          "A premium product interface concept where motion feels like an expensive material.",
      },
    ],
    []
  );

  const filtered =
    active === "all" ? items : items.filter((x) => x.category === active);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={slowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        {/* HEADER */}
        <motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <h1 className="text-[38px] font-[900] md:text-[58px]">
              Luxury{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700]">
                Portfolio
              </span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm text-white/70">
              Curated archive. Private access. Premium positioning.
            </p>
          </div>

          <div className="text-[11px] tracking-[0.35em] uppercase text-white/55">
            {lang.toUpperCase()}
          </div>
        </motion.div>

        {/* FILTERS */}
        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={[
                  "rounded-full border px-5 py-2 text-[11px] tracking-[0.28em] uppercase transition",
                  on
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40",
                ].join(" ")}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {filtered.map((it, idx) => (
            <PortfolioCard
              key={it.id}
              item={it}
              index={idx}
              onOpen={() => setOpen(it)}
            />
          ))}
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b]"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
            >
              <img
                src={open.cover}
                alt={open.title}
                className="h-64 w-full object-cover"
              />
              <div className="p-6">
                <h3 className="text-[22px] font-[900]">{open.title}</h3>
                <p className="mt-2 text-sm text-white/70">
                  {open.description}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

/* ==== helpers ==== */

function PortfolioCard({ item, index, onOpen }) {
  return (
    <motion.button
      onClick={onOpen}
      className="rounded-3xl border border-white/10 bg-white/[0.03] text-left transition hover:border-[#D4AF37]/40"
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
    >
      <img
        src={item.cover}
        alt={item.title}
        className="h-48 w-full rounded-t-3xl object-cover"
      />
      <div className="p-5">
        <div className="text-[11px] tracking-[0.28em] uppercase text-white/55">
          {item.badge}
        </div>
        <div className="mt-2 text-[18px] font-[800]">{item.title}</div>
        <div className="mt-1 text-sm text-white/70">{item.subtitle}</div>
      </div>
    </motion.button>
  );
}
