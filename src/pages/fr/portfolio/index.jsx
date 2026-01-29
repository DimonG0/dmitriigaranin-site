import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";

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

function Chip({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
      <span
        className="inline-block h-1.5 w-1.5 rounded-full"
        style={{ background: "#D4AF37", boxShadow: "0 0 14px rgba(212,175,55,.55)" }}
      />
      {children}
    </span>
  );
}

function SectionTitle({ over, title, desc }) {
  return (
    <div>
      <div className="text-[11px] tracking-[0.35em] uppercase text-white/55">
        {over}
      </div>
      <h2 className="mt-2 text-[22px] font-[800] tracking-[-0.01em] md:text-[28px]">
        <span
          className="bg-clip-text text-transparent"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #f6e6a7 18%, #D4AF37 45%, #FFD700 60%, #b08b1b 100%)",
          }}
        >
          {title}
        </span>
      </h2>
      {desc ? (
        <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70">{desc}</p>
      ) : null}
    </div>
  );
}

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "film", label: "Film / TV" },
  { id: "brand", label: "Luxury / Brand" },
  { id: "creative", label: "Creative" },
  { id: "tech", label: "IT / Product" },
];

export default function EnPortfolio() {
  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  // TODO: Замени на реальные кейсы + реальные картинки/видео
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
      {
        id: "vault-05",
        category: "brand",
        title: "Superstar Album — Visual Identity",
        subtitle: "Luxury-premium cover concepts",
        year: "2024",
        badge: "ALBUM",
        cover: "https://picsum.photos/seed/lux5/1400/900",
        tags: ["Identity", "Cover", "Premium"],
        description:
          "An exclusive visual identity built for prestige: minimal typography, maximal presence.",
      },
      {
        id: "vault-06",
        category: "film",
        title: "Backstage — Private Archive",
        subtitle: "Behind-the-scenes (selected frames)",
        year: "2024",
        badge: "PRIVATE",
        cover: "https://picsum.photos/seed/lux6/1400/900",
        tags: ["BTS", "Film", "Atmosphere"],
        description:
          "Selected frames only — private access, small circle, no public dump.",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    if (active === "all") return items;
    return items.filter((x) => x.category === active);
  }, [items, active]);

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 720px at 20% 10%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(980px 660px at 86% 12%, rgba(210,210,210,0.10), transparent 58%), radial-gradient(1150px 860px at 50% 92%, rgba(255,215,0,0.10), transparent 62%)",
          }}
        />

        {/* neon halos */}
        <motion.div
          className="absolute -left-56 top-52 h-[620px] w-[620px] rounded-full blur-3xl"
          variants={slowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "radial-gradient(circle, rgba(120,255,220,.75), transparent 58%)",
            opacity: 0.1,
          }}
        />
        <motion.div
          className="absolute -right-56 top-24 h-[620px] w-[620px] rounded-full blur-3xl"
          variants={slowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "radial-gradient(circle, rgba(120,120,255,.75), transparent 58%)",
            opacity: 0.1,
          }}
        />

        {/* velvet grain */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E\")",
          }}
        />

        {/* top shimmer */}
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
          custom={0}
        >
          <div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span
                className="inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "#D4AF37", boxShadow: "0 0 14px rgba(212,175,55,.55)" }}
              />
              Private portfolio vault
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                Luxury{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #ffffff 0%, #f6e6a7 18%, #D4AF37 45%, #FFD700 60%, #b08b1b 100%)",
                  }}
                >
                  Portfolio
                </span>
              </span>
              <span className="mt-3 block text-[12px] tracking-[0.35em] uppercase text-white/65">
                curated archive • premium album • superstar-grade positioning
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
              Not a public dump. This is a curated selection: film/TV presence,
              luxury collaborations, editorial aesthetics, and premium tech
              concepts — presented like a private art book.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip>EN</Chip>
            <Chip>EXCLUSIVE</Chip>
            <Chip>CURATED</Chip>
          </div>
        </motion.div>

        {/* FILTERS */}
        <motion.div
          className="mt-10 flex flex-wrap gap-2"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
        >
          {CATEGORIES.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={[
                  "group relative overflow-hidden rounded-full border px-5 py-2 text-[11px] tracking-[0.28em] uppercase backdrop-blur transition",
                  on
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40 hover:text-white",
                ].join(" ")}
              >
                <span className="relative z-10">{c.label}</span>
                <span
                  className={[
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    on ? "opacity-100" : "",
                  ].join(" ")}
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(212,175,55,0.10), transparent)",
                  }}
                />
              </button>
            );
          })}
        </motion.div>

        {/* GRID */}
        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {/* LEFT: statement card */}
          <motion.div
            className="md:col-span-4"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur"
              variants={slowFloat}
              initial="initial"
              animate="animate"
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.6]"
                style={{
                  background:
                    "radial-gradient(900px 420px at 22% 0%, rgba(255,215,0,0.12), transparent 62%), radial-gradient(720px 520px at 94% 40%, rgba(210,210,210,0.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <SectionTitle
                  over="Album notes"
                  title="A private luxury archive."
                  desc="Each entry is treated like a premium release: restrained copy, cinematic mood, and deliberate scarcity."
                />

                <div className="mt-6 space-y-3 text-sm text-white/70">
                  <Line label="Curation" value="Manual selection" />
                  <Line label="Distribution" value="Invite / NDA-ready" />
                  <Line label="Markets" value="EU / US" />
                  <Line label="Aesthetic" value="Black / Gold / Platinum / Neon" />
                </div>

                <div className="mt-7 rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                    Booking protocol
                  </div>
                  <div className="mt-2 text-sm leading-7 text-white/75">
                    Serious proposals only. Include{" "}
                    <span className="text-[#FFD700]">budget</span>,{" "}
                    <span className="text-[#FFD700]">dates</span>,{" "}
                    <span className="text-[#FFD700]">location</span>, and a short
                    brief. Quality over quantity.
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT: cards */}
          <motion.div
            className="md:col-span-8"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {filtered.map((it, idx) => (
                <PortfolioCard
                  key={it.id}
                  item={it}
                  index={idx}
                  onOpen={() => setOpen(it)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-4 md:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-[#0b0b0b] shadow-2xl"
              initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
              animate={{
                y: 0,
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.55, ease },
              }}
              exit={{ y: 14, opacity: 0, transition: { duration: 0.25 } }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pointer-events-none absolute inset-0">
                <div
                  className="absolute inset-0 opacity-[0.22]"
                  style={{
                    background:
                      "radial-gradient(900px 500px at 20% 20%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(900px 520px at 85% 10%, rgba(210,210,210,0.10), transparent 60%)",
                  }}
                />
              </div>

              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5">
                  <div className="md:col-span-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                      <img
                        src={open.cover}
                        alt={open.title}
                        className="h-full w-full object-cover opacity-[0.92]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/30" />
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        <Badge>{open.badge}</Badge>
                        <Badge subtle>{open.year}</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-2 p-6 md:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="text-[11px] tracking-[0.35em] uppercase text-white/55">
                          Private entry
                        </div>
                        <h3 className="mt-2 text-[20px] font-[900] leading-[1.15] tracking-[-0.01em]">
                          <span
                            className="bg-clip-text text-transparent"
                            style={{
                              backgroundImage:
                                "linear-gradient(90deg, #ffffff 0%, #f6e6a7 18%, #D4AF37 45%, #FFD700 60%, #b08b1b 100%)",
                            }}
                          >
                            {open.title}
                          </span>
                        </h3>
                        <p className="mt-2 text-sm leading-7 text-white/70">
                          {open.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={() => setOpen(null)}
                        className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.28em] uppercase text-white/70 hover:border-[#D4AF37]/40 hover:text-white"
                      >
                        Close
                      </button>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {open.tags.map((t) => (
                        <Badge key={t} subtle>
                          {t}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                      <div className="text-[11px] tracking-[0.28em] uppercase text-white/60">
                        Description
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/75">
                        {open.description}
                      </p>
                    </div>

                    <div className="mt-6 rounded-2xl border border-[#D4AF37]/25 bg-[#D4AF37]/[0.07] p-4">
                      <div className="text-[11px] tracking-[0.28em] uppercase text-[#FFD700]/90">
                        Access level
                      </div>
                      <p className="mt-2 text-sm leading-7 text-white/80">
                        Selected materials only. Full package on request
                        (proposal + terms).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4 text-xs text-white/55">
                  <span>© Dmitrii Garanin — Private Portfolio Vault</span>
                  <span className="tracking-[0.3em] uppercase">EN</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
}

function Line({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="text-white/55">{label}</div>
      <div className="text-white/80">{value}</div>
    </div>
  );
}

function Badge({ children, subtle = false }) {
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-[11px] tracking-[0.24em] uppercase backdrop-blur",
        subtle
          ? "border-white/10 bg-white/5 text-white/70"
          : "border-[#D4AF37]/40 bg-[#D4AF37]/10 text-[#FFD700]",
      ].join(" ")}
      style={
        subtle
          ? undefined
          : { boxShadow: "0 0 22px rgba(212,175,55,.10)" }
      }
    >
      {children}
    </span>
  );
}

function PortfolioCard({ item, index, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] text-left backdrop-blur transition hover:border-[#D4AF37]/35"
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
    >
      {/* image */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
        <img
          src={item.cover}
          alt={item.title}
          className="h-full w-full object-cover opacity-[0.78] transition duration-700 ease-out group-hover:scale-[1.04] group-hover:opacity-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/35" />

        {/* premium shine */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(120deg, transparent 20%, rgba(255,215,0,0.12), transparent 60%)",
          }}
        />

        <div className="absolute left-4 top-4 flex items-center gap-2">
          <Badge>{item.badge}</Badge>
          <Badge subtle>{item.year}</Badge>
        </div>
      </div>

      {/* content */}
      <div className="relative p-5">
        <div className="text-[11px] tracking-[0.35em] uppercase text-white/55">
          Premium entry
        </div>

        <div className="mt-2 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[18px] font-[900] tracking-[-0.01em]">
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, #ffffff 0%, #f6e6a7 18%, #D4AF37 45%, #FFD700 60%, #b08b1b 100%)",
                }}
              >
                {item.title}
              </span>
            </div>
            <div className="mt-1 line-clamp-1 text-sm text-white/70">
              {item.subtitle}
            </div>
          </div>

          <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-[11px] tracking-[0.28em] uppercase text-white/70 transition group-hover:border-[#D4AF37]/40 group-hover:text-white">
            Open
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((t) => (
            <Badge key={t} subtle>
              {t}
            </Badge>
          ))}
        </div>

        {/* bottom line */}
        <div
          className="mt-5 h-px w-full"
          style={{
            background:
              "linear-gradient(90deg, rgba(212,175,55,0), rgba(212,175,55,0.55), rgba(212,175,55,0))",
          }}
        />

        <div className="mt-4 text-xs text-white/55">
          Curated • Minimal copy • Maximum presence
        </div>
      </div>

      {/* neon edges */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div
          className="absolute -left-10 top-10 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(120,255,220,0.14)" }}
        />
        <div
          className="absolute -right-10 bottom-8 h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(120,120,255,0.14)" }}
        />
      </div>
    </motion.button>
  );
}
