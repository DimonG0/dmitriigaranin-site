import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(9px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.95, delay: 0.12 + i * 0.08, ease },
  }),
};

const slowPulse = {
  initial: { opacity: 0.18 },
  animate: {
    opacity: [0.10, 0.34, 0.10],
    transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Reviews() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const reviews = copy?.reviews?.list ?? [];

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 720px at 20% 10%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(980px 660px at 86% 14%, rgba(210,210,210,0.10), transparent 58%), radial-gradient(1150px 860px at 50% 92%, rgba(255,215,0,0.10), transparent 62%)",
          }}
        />
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
        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {SAFE(copy?.reviews?.pill, "Private feedback")}
          </div>

          <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
            <span className="block text-[38px] font-[900] md:text-[58px]">
              {SAFE(copy?.reviews?.h1a, "Trusted")}{" "}
              <span className="bg-gradient-to-r from-white via-[#f6e6a7] via-40% via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                {SAFE(copy?.reviews?.h1b, "Presence")}
              </span>
            </span>
            <span className="mt-3 block text-[12px] tracking-[0.35em] uppercase text-white/65">
              curated • discreet • professional
            </span>
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70">
            {SAFE(copy?.reviews?.sub, "Selected words from professionals who value precision, restraint, and cinematic discipline.")}
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* LEFT: credibility card */}
          <motion.div
            className="md:col-span-4"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.55]"
                style={{
                  background:
                    "radial-gradient(900px 420px at 22% 0%, rgba(255,215,0,0.12), transparent 62%), radial-gradient(720px 520px at 94% 40%, rgba(210,210,210,0.10), transparent 60%)",
                }}
              />
              <div className="relative space-y-5">
                <SectionTitle
                  over={SAFE(copy?.reviews?.sections?.focus, "What they notice")}
                  title="Precision. Restraint. Discipline."
                />

                <div className="space-y-3 text-sm text-white/70">
                  <Line label="Camera presence" value="Controlled intensity" />
                  <Line label="Taste level" value="International / editorial" />
                  <Line label="Delivery" value="Clean, fast, reliable" />
                  <Line label="Signal" value="No noise — only intent" />
                </div>

                <div className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent" />

                <SectionTitle
                  over={SAFE(copy?.reviews?.sections?.signal, "What it communicates")}
                  title="Premium positioning."
                />
                <p className="text-sm leading-7 text-white/70">
                  This section is curated. No "mass reviews" — only statements that match the tone of
                  a private portfolio.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: endorsements */}
          <motion.div
            className="md:col-span-8"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
          >
            <div className="grid grid-cols-1 gap-5">
              {reviews.length > 0 ? (
                reviews.map((r, i) => (
                  <EndorsementCard key={`${r.a}-${i}`} quote={r.q} author={r.a} index={i} />
                ))
              ) : (
                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center">
                  <div className="text-[40px] font-[900] text-white/30">∅</div>
                  <div className="mt-4 text-[18px] font-[700] text-white/70">
                    No reviews available
                  </div>
                  <p className="mt-2 text-white/50">
                    Reviews will be displayed here when available.
                  </p>
                </div>
              )}
            </div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={reviews.length + 3}
              className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5"
            >
              <div className="text-[10px] tracking-[0.28em] uppercase text-white/55">
                {SAFE(copy?.reviews?.notes?.title, "Protocol")}
              </div>
              <div className="mt-2 text-[12px] leading-relaxed text-white/65">
                {SAFE(copy?.reviews?.notes?.text, "References are available upon request. Discretion is part of the process.")}
              </div>
            </motion.div>

            <div className="mt-6 text-center text-[11px] tracking-[0.35em] uppercase text-white/40">
              {(lang || "en").toUpperCase()}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({ over, title }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.28em] uppercase text-white/55">{over}</div>
      <div className="mt-2 text-[20px] font-[900] tracking-[-0.01em] bg-gradient-to-r from-white via-[#f6e6a7] via-40% via-[#D4AF37] to-white bg-clip-text text-transparent">
        {title}
      </div>
    </div>
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

function EndorsementCard({ quote, author, index }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06]"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(900px 360px at 30% 0%, rgba(255,215,0,0.10), transparent 65%), radial-gradient(700px 360px at 90% 60%, rgba(212,175,55,0.10), transparent 62%)",
        }}
      />

      <div className="relative">
        <div className="text-[20px] leading-relaxed font-[500] text-white/85">
          "{quote}"
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-[11px] tracking-[0.28em] uppercase text-white/55">— {author}</div>

          <span className="rounded-full border border-[#D4AF37]/30 bg-[#D4AF37]/[0.07] px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-[#FFD700]/80">
            verified tone
          </span>
        </div>

        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />
      </div>
    </motion.div>
  );
}