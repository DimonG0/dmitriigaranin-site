import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";

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
  const copy = t(lang);

  const contactInfo = {
    email: "booking@dmitriigaranin.com",
    telegram: "@dmitriigaranin",
    instagram: "@dmitriigaranin",
    note: "For serious proposals only. Please include budget, dates, location, and brief context.",
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactInfo.email);
      document.querySelector(".copy-button").textContent = "Copied ✓";
      setTimeout(() => {
        document.querySelector(".copy-button").textContent = "Copy email";
      }, 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
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
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {SAFE(copy?.nav?.contact, "Private booking channel")}
            </div>

            <h1 className="mt-6 leading-[1.05] tracking-[-0.02em]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                The{" "}
                <span className="bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
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
                {contactInfo.note}
              </p>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-3">
                  Guidelines
                </div>
                <ul className="space-y-2 text-[13px] text-white/60">
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Include project budget and timeline</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Specify location and travel requirements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#D4AF37] mt-1">•</span>
                    <span>Provide creative direction and mood references</span>
                  </li>
                </ul>
              </div>
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

              <div className="mt-6">
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-2">
                  Professional inquiries
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white/80">
                  {contactInfo.email}
                </div>
              </div>

              <button
                onClick={copyEmail}
                className="copy-button mt-4 w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-3 text-[11px] tracking-[0.22em] uppercase text-[#f6e6a7] transition-all hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20 active:scale-95"
              >
                Copy email
              </button>

              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="text-[10px] tracking-[0.22em] uppercase text-white/55 mb-3">
                  Alternative channels
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag>{contactInfo.telegram}</Tag>
                  <Tag>{contactInfo.instagram}</Tag>
                </div>
              </div>

              <div className="mt-6 text-[11px] text-white/50">
                Response time: 24–48 hours for verified inquiries
              </div>
            </Card>
          </motion.div>
        </div>

        {/* ADDITIONAL INFO */}
        <motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">
              Availability
            </div>
            <div className="mt-2 text-[14px] text-white/75">
              Limited booking slots for 2026
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">
              Location
            </div>
            <div className="mt-2 text-[14px] text-white/75">
              Based in Europe, available worldwide
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">
              Response
            </div>
            <div className="mt-2 text-[14px] text-white/75">
              Confirmation within 48 hours
            </div>
          </div>
        </motion.div>
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
    <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-white/70 hover:bg-white/10 transition-colors">
      {children}
    </span>
  );
}