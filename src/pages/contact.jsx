import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";

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

export default function Contact() {
  const { lang = "en" } = useParams();
  const c = t(lang);

  const email = "booking@dmitriigaranin.com";
  const telegram = "@dmitriigaranin";
  const instagram = "@dmitriigaranin";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // no UI fallback text here — silent fail is ok
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
            {c.contact.pill}
          </div>

          <h1 className="mt-6 text-[38px] font-[900] leading-[1.05] md:text-[58px]">
            <span className="bg-gradient-to-r from-white via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
              {c.contact.h1}
            </span>
          </h1>

          <p className="mt-3 text-[13px] tracking-[0.35em] uppercase text-white/65">
            {c.contact.sub}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <motion.div className="md:col-span-7" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <Card>
              <SectionTitle over={c.contact.protocolOver} title={c.contact.protocolTitle} />
              <ul className="mt-6 space-y-2 text-[13px] text-white/65">
                {c.contact.guidelines.map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#D4AF37]">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>

          <motion.div className="md:col-span-5" variants={fadeUp} initial="hidden" animate="show" custom={1.6}>
            <Card>
              <SectionTitle over={c.contact.emailOver} title={c.contact.emailTitle} />

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white/80">
                {email}
              </div>

              <button
                onClick={copyEmail}
                className="mt-4 w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-3 text-[11px] tracking-[0.22em] uppercase text-[#f6e6a7] hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20 transition"
              >
                {c.contact.copyEmail}
              </button>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{telegram}</Tag>
                <Tag>{instagram}</Tag>
              </div>
            </Card>
          </motion.div>
        </div>

        <motion.div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3" variants={fadeUp} initial="hidden" animate="show" custom={2}>
          <Meta label={c.contact.meta.availabilityLabel} value={c.contact.meta.availabilityValue} />
          <Meta label={c.contact.meta.locationLabel} value={c.contact.meta.locationValue} />
          <Meta label={c.contact.meta.responseLabel} value={c.contact.meta.responseValue} />
        </motion.div>
      </section>
    </main>
  );
}

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
      <div className="text-[10px] tracking-[0.22em] uppercase text-white/55">{over}</div>
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
      <div className="text-[12px] tracking-[0.22em] uppercase text-white/55">{label}</div>
      <div className="mt-2 text-[14px] text-white/75">{value}</div>
    </div>
  );
}
