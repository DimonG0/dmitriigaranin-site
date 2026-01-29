import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.10 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const shimmer = {
  initial: { opacity: 0.25 },
  animate: {
    opacity: [0.18, 0.45, 0.18],
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function EnAbout() {
  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 18% 12%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 650px at 86% 24%, rgba(200,200,200,0.10), transparent 58%), radial-gradient(1200px 800px at 50% 92%, rgba(255,215,0,0.08), transparent 62%)",
          }}
        />
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.06]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={shimmer}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.85), rgba(255,215,0,.95), rgba(212,175,55,.85), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
        <div
          className="absolute -left-48 top-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-[0.10]"
          style={{ background: "radial-gradient(circle, rgba(120,255,220,.7), transparent 60%)" }}
        />
        <div
          className="absolute -right-44 top-24 h-[520px] w-[520px] rounded-full blur-3xl opacity-[0.10]"
          style={{ background: "radial-gradient(circle, rgba(120,120,255,.7), transparent 60%)" }}
        />
      </div>

      {/* CONTENT */}
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        {/* top bar */}
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
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
              About / Private Profile
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[40px] font-[700] md:text-[56px]">
                Dmitrii{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #f6e6a7 0%, #D4AF37 35%, #FFD700 55%, #b08b1b 100%)",
                  }}
                >
                  Garanin
                </span>
              </span>

              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                Actor • Creative • IT • International
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip>EN</Chip>
            <Chip>RU</Chip>
            <Chip>HY</Chip>
            <Chip>FR</Chip>
          </div>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* left: portrait + details */}
          <motion.div
            className="md:col-span-5"
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
                    "radial-gradient(900px 420px at 30% 0%, rgba(255,215,0,0.10), transparent 62%), radial-gradient(700px 420px at 90% 40%, rgba(212,175,55,0.10), transparent 60%)",
                }}
              />

              {/* portrait placeholder */}
              <div className="relative">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-12 w-12 place-items-center rounded-2xl border border-[#D4AF37]/40 bg-[#0a0a0a]"
                    style={{ boxShadow: "0 0 20px rgba(212,175,55,.15)" }}
                  >
                    <span
                      className="text-[14px] font-[900] tracking-[0.18em]"
                      style={{
                        backgroundImage:
                          "linear-gradient(90deg, #f6e6a7, #D4AF37, #FFD700, #b08b1b)",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      DG
                    </span>
                  </div>
                  <div>
                    <div className="text-[12px] tracking-[0.18em] uppercase text-white/60">
                      Identity
                    </div>
                    <div className="mt-1 text-[14px] font-[700] text-white/85">
                      Private Profile Card
                    </div>
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-black/35">
                  <div className="aspect-[4/5] w-full">
                    {/* Replace with your image later: /public/portrait.jpg */}
                    <div className="flex h-full w-full items-center justify-center">
                      <div className="text-center px-6">
                        <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
                          Portrait placeholder
                        </div>
                        <div className="mt-2 text-[13px] leading-relaxed text-white/65">
                          Put your portrait at{" "}
                          <span className="text-white/80">/public/portrait.jpg</span> and we’ll
                          connect it.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* quick facts */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Mini label="Base" value="International" />
                  <Mini label="Languages" value="EN / RU / HY / FR" />
                  <Mini label="Aesthetic" value="Luxury / Noir" />
                  <Mini label="Work" value="Film • Ads • Digital" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* right: biography + positioning */}
          <div className="md:col-span-7">
            <motion.div
              className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1.6}
            >
              <SectionTitle over="Biography" title="A modern presence with classic weight." />
              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <p className="text-[14px] leading-relaxed text-white/70">
                  I build a premium, minimal presence: cinematic tone, clean delivery, and an
                  international-ready profile. This page is designed as a private dossier — simple,
                  expensive, and direct.
                </p>
                <p className="text-[14px] leading-relaxed text-white/70">
                  Actor / Creative / IT background: I understand production, pacing, and detail. I
                  work fast, stay precise, and deliver clean assets for casting, agencies, and
                  collaborations.
                </p>
              </div>

              <div className="mt-7 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

              <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Card
                  title="Positioning"
                  text="Luxury minimalism. Film noir energy. International presentation."
                />
                <Card
                  title="For"
                  text="Castings • Commercials • Digital campaigns • Creative collaborations"
                />
                <Card
                  title="Signature"
                  text="Calm intensity, controlled presence, premium visual direction."
                />
                <Card title="Delivery" text="Clean, structured, fast communication." />
              </div>
            </motion.div>

            <motion.div
              className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-6"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2.2}
            >
              <SectionTitle over="Social" title="Minimal links. Maximum signal." />
              <div className="mt-5 flex flex-wrap gap-3">
                <Social href="#" label="Instagram" />
                <Social href="#" label="IMDb" />
                <Social href="#" label="YouTube" />
                <Social href="#" label="Telegram" />
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  to="/en/video"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-[#f7e7b2] transition hover:border-[#FFD700]/80 hover:bg-[#D4AF37]/15"
                >
                  Watch showreel <span className="opacity-70 transition group-hover:translate-x-0.5">→</span>
                </Link>

                <Link
                  to="/en/contact"
                  className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-7 py-3 text-[12px] font-[700] tracking-[0.22em] uppercase text-white/80 backdrop-blur transition hover:border-white/20 hover:bg-white/7"
                >
                  Contact <span className="opacity-60 transition group-hover:translate-x-0.5">→</span>
                </Link>

                <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
                  Private club tone — no noise
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* bottom: luxury manifesto */}
        <motion.div
          className="mt-10 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-white/[0.03] to-white/[0.04] p-6"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2.8}
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">
                Lux principle
              </div>
              <div className="mt-2 text-[14px] font-[700] text-white/80">
                Minimum text. Maximum atmosphere. Premium control.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Tag>Opulence</Tag>
              <Tag>Sumptuousness</Tag>
              <Tag>Lavishness</Tag>
              <Tag>Extravagance</Tag>
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
      <div className="mt-1 text-[12px] font-[700] text-white/80">{value}</div>
    </div>
  );
}

function SectionTitle({ over, title }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{over}</div>
      <div
        className="mt-2 text-[22px] font-[800] tracking-[-0.01em]"
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

function Social({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[10px] font-[800] tracking-[0.22em] uppercase text-white/65 transition hover:border-[#D4AF37]/50 hover:text-[#f6e6a7]"
      title={label}
    >
      {label}
    </a>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}
