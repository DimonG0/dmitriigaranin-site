import { motion as Motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { SOCIAL_LINKS } from "../lib/socialLinks";

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

  const email = import.meta.env?.VITE_CONTACT_EMAIL || "dmitry1040@gmail.com";
  const ccEmail = import.meta.env?.VITE_CONTACT_CC_EMAIL || "hello@dmitriigaranin.com";
  const contactEndpoint =
    import.meta.env?.VITE_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${email}`;
  const telegram = "@Dmitrii_GaRaNin";

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent("Private request from dmitriigaranin.com");
    const body = encodeURIComponent("Name:\nEmail:\n\nMessage:\n");
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Silent fallback: the direct email remains visible.
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("_honey") || "").trim()) {
      setStatus("sent");
      form.reset();
      return;
    }

    data.set("_subject", "New private request from dmitriigaranin.com");
    data.set("_template", "table");
    data.set("_captcha", "false");
    data.set("_cc", ccEmail);

    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });

      if (!response.ok) throw new Error("Message delivery failed");

      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError("Message was not sent. Use direct email instead.");
    }
  };

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <Motion.div variants={fadeUp} initial="hidden" animate="show" className="max-w-4xl">
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
        </Motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <Motion.div
            className="md:col-span-7"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
          >
            <Card>
              <SectionTitle over="Private request" title="Write directly here" />

              <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="_honey"
                  className="hidden"
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Name">
                    <input
                      name="name"
                      type="text"
                      required
                      maxLength={80}
                      autoComplete="name"
                      className="contact-input"
                      placeholder="Your name"
                    />
                  </Field>

                  <Field label="Email">
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      className="contact-input"
                      placeholder="you@email.com"
                    />
                  </Field>
                </div>

                <Field label="Subject">
                  <input
                    name="subject"
                    type="text"
                    required
                    maxLength={120}
                    className="contact-input"
                    placeholder="Booking / collaboration / private request"
                  />
                </Field>

                <Field label="Message">
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={2500}
                    rows={7}
                    className="contact-input resize-none"
                    placeholder="Tell me what you want to discuss."
                  />
                </Field>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="border border-[#D4AF37]/60 bg-[#D4AF37] px-6 py-3 text-[11px] font-black uppercase tracking-[0.24em] text-black transition-all duration-200 hover:bg-[#f6e6a7] disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? "Sending..." : "Send message"}
                  </button>

                  <a
                    href={mailto}
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 transition hover:text-[#f6e6a7]"
                  >
                    Email direct
                  </a>
                </div>

                {status === "sent" && (
                  <div className="border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-3 text-[12px] uppercase tracking-[0.18em] text-[#f6e6a7]">
                    Message sent. I will receive it by email.
                  </div>
                )}

                {status === "error" && (
                  <div className="border border-red-400/35 bg-red-500/10 px-4 py-3 text-[12px] text-red-100">
                    {error}
                  </div>
                )}
              </form>
            </Card>
          </Motion.div>

          <Motion.div
            className="md:col-span-5"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1.6}
          >
            <Card>
              <SectionTitle over={c.contact.protocolOver} title={c.contact.protocolTitle} />

              <ul className="mt-6 space-y-2 text-[13px] text-white/65">
                {c.contact.guidelines.map((g, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-[#D4AF37]">-</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

              <div className="mt-7">
                <SectionTitle over={c.contact.emailLabel} title={c.contact.emailTitle} />
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 font-mono text-sm text-white/80">
                {email}
              </div>

              <button
                onClick={copyEmail}
                className="mt-4 w-full rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 py-3 text-[11px] tracking-[0.22em] uppercase text-[#f6e6a7] transition hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20"
              >
                {c.contact.copyEmailBtn}
              </button>

              <div className="mt-6">
                <SectionTitle over="Social links" title="Official profiles" />
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${link.label}`}
                      className="rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-[#D4AF37]/55 hover:bg-[#D4AF37]/10"
                    >
                      <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#f6e6a7]">
                        {link.label}
                      </span>
                      <span className="mt-1 block text-[11px] text-white/52">{link.handle}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <Tag>{telegram}</Tag>
              </div>
            </Card>
          </Motion.div>
        </div>

        <Motion.div
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          <Meta label={c.contact.meta.availabilityLabel} value={c.contact.meta.availabilityValue} />
          <Meta label={c.contact.meta.locationLabel} value={c.contact.meta.locationValue} />
          <Meta label={c.contact.meta.responseLabel} value={c.contact.meta.responseValue} />
        </Motion.div>
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

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[10px] font-bold uppercase tracking-[0.22em] text-white/45">
        {label}
      </span>
      {children}
    </label>
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
