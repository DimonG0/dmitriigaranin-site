// src/pages/portfolio.jsx
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

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

const visualPortfolioItems = [
  {
    id: "headshot-2026",
    category: "film",
    title: "Headshot 2026",
    subtitle: "Natural light portrait for casting and profile use",
    year: "2026",
    badge: "HEADSHOT",
    cover: "/portfolio-media/dmitrii-headshot-2026.jpg",
    tags: ["Actor", "Portrait", "Casting"],
    description:
      "A clean, warm portrait built around direct presence, open light, and a natural screen-ready expression.",
  },
  {
    id: "character-paris",
    category: "film",
    title: "Character Creates The Role",
    subtitle: "Cinematic winter character study",
    year: "2025",
    badge: "CHARACTER",
    cover: "/portfolio-media/actor-character-paris.jpg",
    tags: ["Drama", "Mood", "Poster"],
    description:
      "A darker, atmospheric frame with strong dramatic tension and a clear character-first tone.",
  },
  {
    id: "looks-beyond",
    category: "creative",
    title: "The Boy Who Looks Beyond",
    subtitle: "Editorial poster portrait",
    year: "2025",
    badge: "EDITORIAL",
    cover: "/portfolio-media/boy-who-looks-beyond.jpg",
    tags: ["Portrait", "Editorial", "Youth"],
    description:
      "A poetic outdoor portrait with soft restraint, negative space, and a strong magazine-cover feeling.",
  },
  {
    id: "choice-beyond-status",
    category: "brand",
    title: "The Choice Beyond Status",
    subtitle: "Luxury interior editorial frame",
    year: "2026",
    badge: "LUXURY",
    cover: "/portfolio-media/choice-beyond-status.jpg",
    tags: ["Editorial", "Luxury", "Presence"],
    description:
      "A composed interior image with a polished, old-world visual language and quiet confidence.",
  },
  {
    id: "new-generation-studio",
    category: "brand",
    title: "New Generation Actor",
    subtitle: "Minimal studio actor card",
    year: "2026",
    badge: "ACTOR",
    cover: "/portfolio-media/new-generation-actor-studio.jpg",
    tags: ["Actor", "Brand", "Profile"],
    description:
      "A sharp actor-card layout with clean contrast, formal positioning, and a direct casting-ready look.",
  },
  {
    id: "new-generation-palace",
    category: "film",
    title: "Actor Manifesto",
    subtitle: "Period-role inspired presentation",
    year: "2026",
    badge: "STAGE",
    cover: "/portfolio-media/new-generation-actor-palace.jpg",
    tags: ["Theatre", "Cinema", "History"],
    description:
      "A larger-format acting manifesto with theatrical detail, historical atmosphere, and premium gold accents.",
  },
];

export default function Portfolio() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const p = copy?.portfolio ?? {};

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const categories = p?.categories ?? {};
  const CATEGORIES = [
    { id: "all", label: SAFE(categories?.all, "All") },
    { id: "film", label: SAFE(categories?.film, "Film / TV") },
    { id: "brand", label: SAFE(categories?.brand, "Luxury / Brand") },
    { id: "creative", label: SAFE(categories?.creative, "Creative") },
    { id: "tech", label: SAFE(categories?.tech, "IT / Product") },
  ];

  const items = visualPortfolioItems;
  const visibleCategories = CATEGORIES.filter(
    (category) => category.id === "all" || items.some((item) => item.category === category.id)
  );

  const filtered = active === "all" ? items : items.filter((x) => x?.category === active);

  const pill = SAFE(p?.pill, SAFE(copy?.nav?.portfolio, "Portfolio"));
  const h1a = SAFE(p?.h1a, "Luxury");
  const h1b = SAFE(p?.h1b, "Portfolio");
  const sub = SAFE(p?.sub, "");
  const projectsWord = SAFE(p?.counters?.projects, "Projects");
  const cardCta = SAFE(p?.card?.cta, "Click to view details");
  const emptyTitle = SAFE(p?.empty?.title, "No projects in this category");
  const emptyDesc = SAFE(p?.empty?.desc, "Select another category or check back later.");
  const closeText = SAFE(p?.modal?.close, "Close");

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <Motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {pill}
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                {h1a}{" "}
                <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  {h1b}
                </span>
              </span>
              {!!sub && (
                <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                  {sub}
                </span>
              )}
            </h1>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {(lang || "en").toUpperCase()}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {filtered.length} {String(projectsWord).toUpperCase()}
            </span>
          </div>
        </Motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {visibleCategories.map((c) => {
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

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, idx) => (
            <PortfolioCard
              key={it?.id ?? `${it?.title ?? "item"}-${idx}`}
              item={it}
              index={idx}
              onOpen={() => setOpen(it)}
              cta={cardCta}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <Motion.div
            className="mt-16 text-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12">
              <div className="text-[40px] font-[900] text-white/30">∅</div>
              <div className="mt-4 text-[18px] font-[700] text-white/70">{emptyTitle}</div>
              <p className="mt-2 text-white/50">{emptyDesc}</p>
            </div>
          </Motion.div>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <Motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0b0b]"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={open?.cover}
                  alt={SAFE(open?.title, "")}
                  className="max-h-[72vh] w-full bg-black object-contain"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/fallback/1400/900";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2">
                    {!!open?.badge && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80">
                        {open.badge}
                      </span>
                    )}
                    {!!open?.year && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60">
                        {open.year}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[28px] font-[900]">{SAFE(open?.title, "")}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {(Array.isArray(open?.tags) ? open.tags : []).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {!!open?.description && (
                  <div className="mb-6 text-sm text-white/70">{open.description}</div>
                )}

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="text-[12px] tracking-[0.22em] uppercase text-white/50">
                    {SAFE(open?.subtitle, "")}
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {closeText}
                  </button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function PortfolioCard({ item, index, onOpen, cta }) {
  const tags = Array.isArray(item?.tags) ? item.tags : [];

  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="group cursor-pointer"
      onClick={onOpen}
    >
      <div className="overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06]">
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          <img
            src={item?.cover}
            alt={SAFE(item?.title, "")}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/seed/fallback/1400/900";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            {!!item?.badge && (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        <div className="p-5">
          <div className="text-[11px] tracking-[0.22em] uppercase text-[#D4AF37]/80">
            {SAFE(item?.year, "")}
          </div>
          <div className="mt-1 text-[18px] font-[800] text-white">{SAFE(item?.title, "")}</div>
          <div className="text-[14px] text-white/70">{SAFE(item?.subtitle, "")}</div>

          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="text-[11px] tracking-[0.22em] uppercase text-white/50">{cta}</div>
            <span className="text-[#D4AF37] transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Motion.div>
  );
}
