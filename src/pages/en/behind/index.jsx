import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(7px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, delay: 0.12 + i * 0.08, ease },
  }),
};

const slowFloat = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
  },
};

const shimmerLine = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.10, 0.40, 0.10],
    transition: { duration: 7.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function EnBehind() {
  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        {/* luxe gradients */}
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 18% 10%, rgba(212,175,55,0.14), transparent 60%), radial-gradient(1000px 650px at 86% 18%, rgba(210,210,210,0.10), transparent 58%), radial-gradient(1200px 800px at 48% 92%, rgba(255,215,0,0.09), transparent 62%)",
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
        {/* neon halos */}
        <div
          className="absolute -left-56 top-44 h-[560px] w-[560px] rounded-full blur-3xl opacity-[0.10]"
          style={{ background: "radial-gradient(circle, rgba(120,255,220,.75), transparent 60%)" }}
        />
        <div
          className="absolute -right-56 top-24 h-[560px] w-[560px] rounded-full blur-3xl opacity-[0.10]"
          style={{ background: "radial-gradient(circle, rgba(120,120,255,.75), transparent 60%)" }}
        />
        {/* shimmer top line */}
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={shimmerLine}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      {/* CONTENT */}
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        {/* Header */}
        <motion.div
          className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between"
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
              Behind the scenes / Private Archive
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[800] md:text-[56px]">
                Backstage{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #f6e6a7 0%, #D4AF37 35%, #FFD700 55%, #b08b1b 100%)",
                  }}
                >
                  Access
                </span>
              </span>
              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                Exclusive • Noir • Controlled • Cinematic
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip>PRIVATE</Chip>
            <Chip>ARCHIVE</Chip>
            <Chip>EN</Chip>
          </div>
        </motion.div>

        {/* Hero card */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <motion.div
            className="md:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.55]"
                style={{
                  background:
                    "radial-gradient(900px 420px at 25% 0%, rgba(255,215,0,0.11), transparent 62%), radial-gradient(700px 420px at 92% 35%, rgba(212,175,55,0.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <SectionTitle over="Concept" title="A closed club. A private archive." />
                <p className="mt-4 text-[14px] leading-relaxed text-white/70">
                  Behind-the-scenes is presented like an exclusive vault: carefully selected frames,
                  calm pacing, premium texture. No noise — only signal, atmosphere, and craft.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <Mini label="Tone" value="Luxury Noir" />
                  <Mini label="Access" value="Curated" />
                  <Mini label="Format" value="Photos / Clips" />
                </div>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link
                    to="/en/portfolio"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[800] tracking-[0.22em] uppercase text-[#f7e7b2] transition hover:border-[#FFD700]/80 hover:bg-[#D4AF37]/15"
                  >
                    View portfolio{" "}
                    <span className="opacity-70 transition group-hover:translate-x-0.5">→</span>
                  </Link>

                  <Link
                    to="/en/contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-7 py-3 text-[12px] font-[800] tracking-[0.22em] uppercase text-white/80 backdrop-blur transition hover:border-white/20 hover:bg-white/7"
                  >
                    Request access{" "}
                    <span className="opacity-60 transition group-hover:translate-x-0.5">→</span>
                  </Link>

                  <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-4 py-3 text-[10px] tracking-[0.22em] uppercase text-white/55">
                    Limited release
                  </span>
                </div>

                <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

                <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card title="Backstage clips" text="Short, cinematic fragments with minimal overlays." />
                  <Card title="Set stills" text="Monochrome / warm tone. Velvet shadows, gold accents." />
                  <Card title="Sound & mood" text="Quiet prestige. Slow transitions. Elegant timing." />
                  <Card title="Detail" text="Textures, light, micro-moments — the craft, not the noise." />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Archive tiles */}
          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.6}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionTitle over="Archive" title="Selected frames." />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <FrameTile label="Set 01" note="Noir stills" />
                <FrameTile label="Set 02" note="Gold dust" />
                <FrameTile label="Set 03" note="Neon accents" />
                <FrameTile label="Set 04" note="Quiet luxury" />
              </div>

              <motion.div
                className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-5"
                variants={slowFloat}
                initial="initial"
                animate="animate"
              >
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">
                  Private note
                </div>
                <div className="mt-2 text-[13px] leading-relaxed text-white/70">
                  Replace these placeholders with real BTS photos/videos later (public folder).
                  Keep everything curated — like a limited edition drop.
                </div>
              </motion.div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>Private Archive</Tag>
                <Tag>Backstage Access</Tag>
                <Tag>Limited Series</Tag>
              </div>
            </div>
          </motion.div>
        </div>

        {/* bottom strip */}
        <motion.div
          className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.03] to-white/[0.04] p-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2.4}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">
                Club standard
              </div>
              <div className="mt-2 text-[14px] font-[800] text-white/80">
                Slow luxury motion • matte black • gold / platinum • neon rim light
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag>Opulence</Tag>
              <Tag>Sumptuousness</Tag>
              <Tag>Affluence</Tag>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
      {children}
    </span>
  );
}

function Mini({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{label}</div>
      <div className="mt-1 text-[12px] font-[800] text-white/80">{value}</div>
    </div>
  );
}

function SectionTitle({ over, title }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{over}</div>
      <div
        className="mt-2 text-[22px] font-[900] tracking-[-0.01em]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #ffffff 0%, #f6e6a7 22%, #D4AF37 55%, #ffffff 100%)",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {title}
      </div>
    </div>
  );
}

function Card({ title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
      <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">{title}</div>
      <div className="mt-2 text-[13px] leading-relaxed text-white/70">{text}</div>
    </div>
  );
}

function FrameTile({ label, note }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/35 p-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px 240px at 30% 10%, rgba(255,215,0,0.10), transparent 65%), radial-gradient(560px 240px at 80% 70%, rgba(120,255,220,0.10), transparent 70%)",
        }}
      />
      <div className="relative">
        <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{label}</div>
        <div className="mt-2 text-[12px] font-[800] text-white/80">{note}</div>
        <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/30 to-transparent" />
        <div className="mt-3 text-[10px] tracking-[0.18em] uppercase text-white/45">
          placeholder
        </div>
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}
