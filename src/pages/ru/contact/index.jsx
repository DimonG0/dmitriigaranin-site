import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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

const softFloat = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: { duration: 9, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function EnContact() {
  const [copied, setCopied] = useState(false);

  // TODO: замени на свои контакты позже
  const CONTACT = useMemo(
    () => ({
      email: "booking@dmitriigaranin.com",
      telegram: "@dmitriigaranin",
      instagram: "@dmitriigaranin",
      notes:
        "For serious proposals only. Please include budget, dates, location (EU/US), and brief context.",
    }),
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      // fallback: ничего страшного — пользователь может выделить вручную
      setCopied(false);
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden bg-[#0a0a0a] text-white">
      {/* BACKDROP */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "radial-gradient(1200px 700px at 20% 12%, rgba(212,175,55,0.16), transparent 60%), radial-gradient(1000px 650px at 86% 16%, rgba(210,210,210,0.10), transparent 58%), radial-gradient(1100px 820px at 50% 92%, rgba(255,215,0,0.10), transparent 62%)",
          }}
        />
        {/* neon halos */}
        <motion.div
          className="absolute -left-56 top-40 h-[600px] w-[600px] rounded-full blur-3xl"
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
          className="absolute -right-56 top-20 h-[600px] w-[600px] rounded-full blur-3xl"
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
        {/* Header */}
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
              Private booking channel
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                The{" "}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(90deg, #ffffff 0%, #f6e6a7 18%, #D4AF37 45%, #FFD700 60%, #b08b1b 100%)",
                  }}
                >
                  Contact
                </span>{" "}
                you were looking for
              </span>
              <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                rare access • curated • discreet • international
              </span>
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <Chip>EN</Chip>
            <Chip>INVITE-ONLY</Chip>
            <Chip>EU / US</Chip>
          </div>
        </motion.div>

{/* Body */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          {/* LEFT: Vault */}
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
                    "radial-gradient(900px 420px at 22% 0%, rgba(255,215,0,0.12), transparent 62%), radial-gradient(720px 520px at 94% 40%, rgba(210,210,210,0.10), transparent 60%)",
                }}
              />

              <div className="relative">
                <SectionTitle over="Protocol" title="Discreet. Direct. Verified." />
                <p className="mt-4 text-sm text-zinc-300 leading-relaxed">
                  Private enquiries only. If you have a clear brief, include references and timeline.
                </p>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: (сюда твой второй столбец, если он есть) */}
        </div>
      </section>
    </main>
  );
}