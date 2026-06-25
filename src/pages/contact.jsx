import { motion as Motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { usePageSeo } from "../lib/usePageSeo";
import { SOCIAL_LINKS, THREADS_LINK } from "../lib/socialLinks";

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

const contactUiCopy = {
  en: {
    formOver: "Private request",
    formTitle: "Write directly here",
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@email.com",
    subject: "Subject",
    subjectPlaceholder: "Booking / collaboration / private request",
    message: "Message",
    messagePlaceholder: "Tell me what you want to discuss.",
    send: "Send message",
    sending: "Sending...",
    directEmail: "Email direct",
    sent: "Message sent. I will receive it by email.",
    error: "Message was not sent. Use direct email instead.",
    socialOver: "Social links",
    socialTitle: "Official profiles",
    openSocial: "Open",
    mailSubject: "Private request from dmitriigaranin.com",
    mailBody: "Name:\nEmail:\n\nMessage:\n",
  },
  ru: {
    formOver: "Приватный запрос",
    formTitle: "Напишите напрямую здесь",
    name: "Имя",
    namePlaceholder: "Ваше имя",
    email: "Email",
    emailPlaceholder: "you@email.com",
    subject: "Тема",
    subjectPlaceholder: "Бронирование / сотрудничество / приватный запрос",
    message: "Сообщение",
    messagePlaceholder: "Кратко опишите, что хотите обсудить.",
    send: "Отправить сообщение",
    sending: "Отправка...",
    directEmail: "Написать на email",
    sent: "Сообщение отправлено. Я получу его на email.",
    error: "Сообщение не отправлено. Используйте прямой email.",
    socialOver: "Социальные ссылки",
    socialTitle: "Официальные профили",
    openSocial: "Открыть",
    mailSubject: "Приватный запрос с dmitriigaranin.com",
    mailBody: "Имя:\nEmail:\n\nСообщение:\n",
  },
  fr: {
    formOver: "Demande privée",
    formTitle: "Écrire directement ici",
    name: "Nom",
    namePlaceholder: "Votre nom",
    email: "Email",
    emailPlaceholder: "vous@email.com",
    subject: "Objet",
    subjectPlaceholder: "Booking / collaboration / demande privée",
    message: "Message",
    messagePlaceholder: "Dites-moi ce que vous souhaitez discuter.",
    send: "Envoyer le message",
    sending: "Envoi...",
    directEmail: "Email direct",
    sent: "Message envoyé. Je le recevrai par email.",
    error: "Le message n'a pas été envoyé. Utilisez l'email direct.",
    socialOver: "Liens sociaux",
    socialTitle: "Profils officiels",
    openSocial: "Ouvrir",
    mailSubject: "Demande privée depuis dmitriigaranin.com",
    mailBody: "Nom:\nEmail:\n\nMessage:\n",
  },
  am: {
    formOver: "Փրիվատ հարցում",
    formTitle: "Գրել անմիջապես այստեղ",
    name: "Անուն",
    namePlaceholder: "Ձեր անունը",
    email: "Email",
    emailPlaceholder: "you@email.com",
    subject: "Թեմա",
    subjectPlaceholder: "Ամրագրում / համագործակցություն / փրիվատ հարցում",
    message: "Հաղորդագրություն",
    messagePlaceholder: "Գրեք, թե ինչ եք ցանկանում քննարկել։",
    send: "Ուղարկել հաղորդագրությունը",
    sending: "Ուղարկվում է...",
    directEmail: "Ուղիղ email",
    sent: "Հաղորդագրությունն ուղարկված է։ Ես այն կստանամ email-ով։",
    error: "Հաղորդագրությունը չի ուղարկվել։ Օգտագործեք ուղիղ email-ը։",
    socialOver: "Սոցիալական հղումներ",
    socialTitle: "Պաշտոնական պրոֆիլներ",
    openSocial: "Բացել",
    mailSubject: "Փրիվատ հարցում dmitriigaranin.com-ից",
    mailBody: "Անուն:\nEmail:\n\nՀաղորդագրություն:\n",
  },
};

export default function Contact() {
  const { lang = "en" } = useParams();
  const c = t(lang);
  const ui = contactUiCopy[lang] || contactUiCopy.en;

  usePageSeo(lang, "contact");

  const email = import.meta.env?.VITE_CONTACT_EMAIL || "dmitry1040@gmail.com";
  const ccEmail = import.meta.env?.VITE_CONTACT_CC_EMAIL || "hello@dmitriigaranin.com";
  const contactEndpoint =
    import.meta.env?.VITE_CONTACT_ENDPOINT || `https://formsubmit.co/ajax/${email}`;

  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const mailto = useMemo(() => {
    const subject = encodeURIComponent(ui.mailSubject);
    const body = encodeURIComponent(ui.mailBody);
    return `mailto:${email}?subject=${subject}&body=${body}`;
  }, [email, ui.mailBody, ui.mailSubject]);

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
      setError(ui.error);
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
              <SectionTitle over={ui.formOver} title={ui.formTitle} />

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
                  <Field label={ui.name}>
                    <input
                      name="name"
                      type="text"
                      required
                      maxLength={80}
                      autoComplete="name"
                      className="contact-input"
                      placeholder={ui.namePlaceholder}
                    />
                  </Field>

                  <Field label={ui.email}>
                    <input
                      name="email"
                      type="email"
                      required
                      maxLength={120}
                      autoComplete="email"
                      className="contact-input"
                      placeholder={ui.emailPlaceholder}
                    />
                  </Field>
                </div>

                <Field label={ui.subject}>
                  <input
                    name="subject"
                    type="text"
                    required
                    maxLength={120}
                    className="contact-input"
                    placeholder={ui.subjectPlaceholder}
                  />
                </Field>

                <Field label={ui.message}>
                  <textarea
                    name="message"
                    required
                    minLength={10}
                    maxLength={2500}
                    rows={7}
                    className="contact-input resize-none"
                    placeholder={ui.messagePlaceholder}
                  />
                </Field>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="min-h-11 border border-[#D4AF37]/60 bg-[#D4AF37] px-6 py-3 text-center text-[11px] font-black uppercase leading-4 tracking-[0.24em] text-black transition-all duration-200 hover:bg-[#f6e6a7] disabled:cursor-wait disabled:opacity-60"
                  >
                    {status === "sending" ? ui.sending : ui.send}
                  </button>

                  <a
                    href={mailto}
                    className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 transition hover:text-[#f6e6a7]"
                  >
                    {ui.directEmail}
                  </a>
                </div>

                {status === "sent" && (
                  <div className="border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-3 text-[12px] uppercase tracking-[0.18em] text-[#f6e6a7]">
                    {ui.sent}
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
                <SectionTitle over={ui.socialOver} title={ui.socialTitle} />
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${ui.openSocial} ${link.label}`}
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
                <Tag href={THREADS_LINK.url} label={`${ui.openSocial} ${THREADS_LINK.label}`}>
                  {THREADS_LINK.handle}
                </Tag>
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
    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur">
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

function Tag({ children, href, label }) {
  const className =
    "rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10px] tracking-[0.22em] uppercase text-white/70 transition hover:border-[#D4AF37]/55 hover:text-[#f6e6a7]";

  if (href) {
    return (
      <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={className}>
        {children}
      </a>
    );
  }

  return <span className={className}>{children}</span>;
}

function Meta({ label, value }) {
  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
      <div className="break-words text-[12px] leading-5 tracking-[0.18em] uppercase text-white/55 md:tracking-[0.22em]">{label}</div>
      <div className="mt-2 text-[14px] text-white/75">{value}</div>
    </div>
  );
}
