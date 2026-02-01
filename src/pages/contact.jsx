import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.0, delay: 0.12 + i * 0.08, ease },
  }),
};

const slowPulse = {
  initial: { opacity: 0.22 },
  animate: {
    opacity: [0.16, 0.34, 0.16],
    transition: { duration: 8.5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function Contact() {
  const { lang = "en" } = useParams();
  const [copied, setCopied] = useState(false);

  const CONTACT = useMemo(
    () => ({
      email: "booking@dmitriigaranin.com",
      telegram: "@dmitriigaranin",
      instagram: "@dmitriigaranin",
      note:
        "For serious proposals only. Please include budget, dates, location, and brief context.",
    }),
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute inset-0"
          variants={slowPulse}
          initial="initial"
          animate="animate"
          style={{
            background:
              "radial-gradient(1200px 700px at 20% 12%, rgba(212,175,55,0.16), transparent 60%)",
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              Private booking channel
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                The{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700]">
                  contact
                </span>{" "}
                you were looking for
              </span>
              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                rare access • curated • discreet • international
              </span>
            </h1>
          </div>

          <div className="flex gap-2">
            <Chip>{lang.toUpperCase()}</Chip>
            <Chip>INVITE-ONLY</Chip>
            <Chip>EU / US</Chip>
          </div>
        </motion.div>

        {/* BODY */}
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
              <SectionTitle over="Protocol" title="Discreet. Direct. Verified." />
              <p className="mt-4 text-sm text-white/70 leading-relaxed">
                {CONTACT.note}
              </p>
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
              <SectionTitle over="Primary" title="Email vault" />

              <div className="mt-4 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white/80">
                {CONTACT.email}
              </div>

              <button
                onClick={copyEmail}
                className="mt-4 w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-3 text-[11px] tracking-[0.22em] uppercase text-[#f6e6a7] transition hover:bg-[#D4AF37]/20"
              >
                {copied ? "Copied" : "Copy email"}
              </button>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{CONTACT.telegram}</Tag>
                <Tag>{CONTACT.instagram}</Tag>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

/* ===== helpers ===== */

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

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
      {children}
    </span>
  );
}

function Tag({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70">
      {children}
    </span>
  );
}
