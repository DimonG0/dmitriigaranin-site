import { motion } from "framer-motion";
import { Link } from "react-router-dom";

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

export default function EnHome() {
  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP: luxury textures + glows */}
      <div className="pointer-events-none absolute inset-0">
        {/* velvet grain */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 10%, rgba(212,175,55,0.12), transparent 60%), radial-gradient(1000px 600px at 80% 30%, rgba(160,160,160,0.10), transparent 55%), radial-gradient(1200px 800px at 50% 90%, rgba(255,215,0,0.08), transparent 62%)",
          }}
        />
        {/* subtle noise (CSS-only) */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23n)' opacity='.55'/%3E%3C/svg%3E\")",
          }}
        />
        {/* gold filament line */}
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
        {/* neon accent (very subtle) */}
        <div
          className="absolute -right-40 top-40 h-[420px] w-[420px] rounded-full blur-3xl opacity-[0.12]"
          style={{ background: "radial-gradient(circle, rgba(120,120,255,.8), transparent 60%)" }}
        />
      </div>

      {/* HERO */}
      <section className="relative mx-auto flex w-full max-w-6xl flex-col px-5 pb-20 pt-14 md:pt-20">
        {/* tiny top label */}
        <motion.div
          className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={0}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "#D4AF37", boxShadow: "0 0 14px rgba(212,175,55,.55)" }}
          />
          International • Actor • Creative • IT
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-10 md:mt-14 md:grid-cols-12 md:gap-8">
          {/* left: typography */}
          <div className="md:col-span-7">
            <motion.h1
              className="leading-[0.95] tracking-[-0.02em]"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
            >
              <span className="block text-[44px] font-[600] md:text-[64px] lg:text-[76px]">
                Dmitrii{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #f6e6a7 0%, #D4AF37 35%, #FFD700 55%, #b08b1b 100%)",
                    textShadow: "0 0 30px rgba(212,175,55,.15)",
                  }}
                >
                  Garanin
                </span>
              </span>

              <span className="mt-4 block text-[14px] font-[400] tracking-[0.35em] uppercase text-white/70 md:text-[15px]">
                Luxury Portfolio / Showreel / Contact
              </span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-xl text-[15px] leading-relaxed text-white/70 md:text-[16px]"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
            >
              A curated presence designed like a private club: minimal text, cinematic visuals,
              and polished presentation for castings, collaborations, and international opportunities.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={3}
            >
              <Link
                to="/en/video"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[600] tracking-[0.22em] uppercase text-[#f7e7b2] transition hover:border-[#FFD700]/80 hover:bg-[#D4AF37]/15"
                style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
              >
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ background: "#FFD700", boxShadow: "0 0 18px rgba(255,215,0,.55)" }}
                />
                Watch showreel
                <span className="opacity-70 transition group-hover:translate-x-0.5">→</span>
              </Link>

              <Link
                to="/en/contact"
                className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/12 bg-white/5 px-7 py-3 text-[12px] font-[600] tracking-[0.22em] uppercase text-white/80 backdrop-blur transition hover:border-white/20 hover:bg-white/7"
              >
                Contact
                <span className="opacity-60 transition group-hover:translate-x-0.5">→</span>
              </Link>

              <Link
                to="/en/portfolio"
                className="inline-flex items-center justify-center text-[12px] font-[600] tracking-[0.22em] uppercase text-white/60 transition hover:text-white/80"
              >
                View portfolio
              </Link>
            </motion.div>

            {/* micro stats */}
            <motion.div
              className="mt-10 grid max-w-xl grid-cols-2 gap-4 md:grid-cols-3"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4}
            >
              <Stat label="Languages" value="EN / RU / HY / FR" />
              <Stat label="Focus" value="Film • Ads • Digital" />
              <Stat label="Availability" value="EU / US-ready" />
            </motion.div>
          </div>

          {/* right: luxury card */}
          <div className="md:col-span-5">
            <motion.div
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6 backdrop-blur"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2.5}
            >
              {/* metallic edge */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.55]"
                style={{
                  background:
                    "radial-gradient(900px 420px at 30% 0%, rgba(255,215,0,0.10), transparent 62%), radial-gradient(700px 420px at 90% 40%, rgba(212,175,55,0.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-2xl border border-[#D4AF37]/40 bg-[#0a0a0a]"
                      style={{ boxShadow: "0 0 20px rgba(212,175,55,.15)" }}
                      aria-label="DG"
                    >
                      <span
                        className="text-[14px] font-[800] tracking-[0.18em]"
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
                        Signature Card
                      </div>
                      <div className="mt-1 text-[14px] font-[600] text-white/85">
                        Private Access — Portfolio
                      </div>
                    </div>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60">
                    2026
                  </span>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                    <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
                      Positioning
                    </div>
                    <div className="mt-2 text-[13px] leading-relaxed text-white/75">
                      Cinematic presence with premium minimalism. Built for casting directors,
                      producers, agencies, and high-end collaborations.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <MiniPill label="Showreel" value="Video + Captions" />
                    <MiniPill label="Delivery" value="Fast, clean, pro" />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Tag>Film Noir</Tag>
                    <Tag>Luxury Ads</Tag>
                    <Tag>Tech / Creative</Tag>
                    <Tag>International</Tag>
                  </div>
                </div>

                {/* bottom divider */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent" />

                {/* social */}
                <div className="mt-5 flex items-center justify-between">
                  <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">
                    Social
                  </div>
                  <div className="flex items-center gap-3">
                    <SocialLink label="Instagram" href="#" />
                    <SocialLink label="IMDb" href="#" />
                    <SocialLink label="Telegram" href="#" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* note */}
            <motion.div
              className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-[12px] leading-relaxed text-white/60"
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={4.2}
            >
              Tip: put your showreel file into <span className="text-white/80">/public/showreel.mp4</span>{" "}
              — then we’ll add a cinematic background video layer.
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION: quick navigation tiles */}
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Tile
            to="/en/about"
            title="About"
            desc="Biography, positioning, languages, key highlights."
          />
          <Tile
            to="/en/portfolio"
            title="Portfolio"
            desc="Selected projects: frames, posters, digital work."
          />
          <Tile
            to="/en/behind"
            title="Behind the Scenes"
            desc="Private archive: backstage and process."
          />
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3">
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{label}</div>
      <div className="mt-1 text-[12px] font-[600] text-white/80">{value}</div>
    </div>
  );
}

function MiniPill({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{label}</div>
      <div className="mt-2 text-[12px] font-[700] text-white/80">{value}</div>
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

function SocialLink({ label, href }) {
  return (
    <a
      href={href}
      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65 transition hover:border-[#D4AF37]/50 hover:text-[#f6e6a7]"
      rel="noreferrer"
      target="_blank"
      title={label}
    >
      {label}
    </a>
  );
}

function Tile({ to, title, desc }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-6"
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(900px 360px at 30% 0%, rgba(255,215,0,0.10), transparent 65%), radial-gradient(700px 360px at 90% 50%, rgba(212,175,55,0.10), transparent 62%)",
        }}
      />
      <div className="relative">
        <div className="text-[11px] tracking-[0.22em] uppercase text-white/55">Explore</div>
        <div
          className="mt-3 text-[22px] font-[700] tracking-[-0.01em]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, #ffffff 0%, #f6e6a7 22%, #D4AF37 55%, #ffffff 100%)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          {title}
        </div>
        <p className="mt-3 text-[13px] leading-relaxed text-white/65">{desc}</p>

        <Link
          to={to}
          className="mt-6 inline-flex items-center gap-2 text-[11px] font-[700] tracking-[0.22em] uppercase text-[#f6e6a7] opacity-80 transition group-hover:opacity-100"
        >
          Open <span className="transition group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </motion.div>
  );
}
