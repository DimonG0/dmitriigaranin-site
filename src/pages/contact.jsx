import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

/* ================= animation ================= */

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1, delay: 0.12 + i * 0.08, ease },
  }),
};

const slowPulse = {
  initial: { opacity: 0.22 },
  animate: {
    opacity: [0.16, 0.34, 0.16],
    transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
  },
};

/* ================= component ================= */

export default function Contact() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const email = "booking@dmitriigaranin.com";
  const telegram = "@dmitriigaranin";
  const instagram = "@dmitriigaranin";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch (e) {
      console.warn("Clipboard unavailable");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 12%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(900px 600px at 85% 25%, rgba(200,200,200,0.08), transparent 58%)",
          }}
        />
        <motion.div
          className="absolute left-1/2 top-0 h-[2px] w-[1200px] -translate-x-1/2"
          variants={slowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(212,175,55,.8), rgba(255,215,0,.95), rgba(212,175,55,.8), transparent)",
            boxShadow: "0 0 30px rgba(212,175,55,.35)",
          }}
        />
      </div>

      {/* CONTENT */}
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        {/* HEADER */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {SAFE(copy?.contact?.pill, "Private booking channel")}
          </div>

          <h1 className="mt-6 text-[38px] font-[900] leading-[1.05] md:text-[58px]">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              {SAFE(copy?.contact?.h1, "Direct contact")}
            </span>
          </h1>

          <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/65">
            {SAFE(copy?.contact?.sub, "discreet • curated • international")}
          </p>
        </motion.div>

        {/* GRID */}
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* LEFT */}
          <motion.div
            className="md:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <Card>
              <SectionTitle
                over="Protocol"
                title={SAFE(
                  copy?.contact?.note,
                  "For serious proposals only"
                )}
              />

              <ul className="mt-6 space-y-2 text-[13px] text-white/65">
                {(copy?.contact?.guidelines ?? []).map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* RIGHT */}
          <motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.6}
          >
            <Card>
              <SectionTitle
                over={SAFE(copy?.contact?.emailLabel, "Primary")}
                title="Email vault"
              />

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white/80">
                {email}
              </div>

              <button
                onClick={copyEmail}
                className="mt-4 w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-3 text-[11px] tracking-[0.22em] uppercase text-[#f6e6a7] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20 transition"
              >
                Copy email
              </button>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{telegram}</Tag>
                <Tag>{instagram}</Tag>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* META */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          <Meta
            label="Availability"
            value={SAFE(copy?.contact?.availability, "Limited")}
          />
          <Meta
            label="Location"
            value={SAFE(copy?.contact?.location, "Worldwide")}
          />
          <Meta
            label="Response"
            value={SAFE(copy?.contact?.response, "24–48h")}
          />
        </motion.div>
      </section>
    </main>
  );
}

/* ================= helpers ================= */

function Card({ children }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
      {children}
    </div>
  );
}

function SectionTitle({ over, title }) {
  return (
    <div>
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">
        {over}
      </div>
      <div className="mt-2 text-[22px] font-[900] bg-gradient-to-r from-white via-[#D4AF37] to-white bg-clip-text text-transparent">
        {title}
      </div>
    </div>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">
        {label}
      </div>
      <div className="mt-2 text-[14px] text-white/75">{value}</div>
    </div>
  );
}
