import { useEffect, useRef, useState } from "react";
import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { usePageSeo } from "../lib/usePageSeo";

import Chip from "../ui/Chip";
import SectionTitle from "../ui/SectionTitle";
import Tag from "../ui/Tag";
import Badge from "../ui/Badge";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.12 + i * 0.08, ease },
  }),
};

const archiveText = {
  en: {
    loginTitle: "Private archive",
    loginDesc: "Enter the invitation code to unlock closed materials.",
    codePlaceholder: "Access code",
    unlock: "Unlock archive",
    signingIn: "Checking...",
    authenticated: "Access is open. Files are served only through the protected backend.",
    openChip: "Access open",
    admin: "Admin",
    viewer: "Partner",
    logout: "Log out",
    vaultOver: "Private vault",
    vaultTitle: "Archive materials",
    vaultDesc: "Materials stay in private storage and downloads pass through server-side access checks.",
    emptyTitle: "Archive is ready",
    emptyDesc: "No private materials have been uploaded yet.",
    uploadTitle: "Add material",
    uploadDesc: "Admin upload writes the file into private storage and updates the archive manifest.",
    titlePlaceholder: "Title",
    descriptionPlaceholder: "Short note",
    categoryPlaceholder: "Category",
    fileLabel: "File",
    upload: "Upload",
    uploading: "Uploading...",
    delete: "Delete",
    download: "Download",
    size: "Size",
    uploaded: "Uploaded",
    itemsLabel: "materials",
    invalidCode: "The access code was not accepted.",
    unavailable: "The archive server is not available in this run.",
    generalError: "Request failed. Please try again.",
    missingFile: "Choose a file first.",
    fileTooLarge: "The file is larger than the archive limit.",
    uploadDone: "Material added to the private archive.",
    deleteDone: "Material removed.",
    confirmDelete: "Remove this private material?",
    configProblem: "Archive secrets and private storage need to be configured.",
  },
  ru: {
    loginTitle: "Вход в приватный архив",
    loginDesc: "Введите персональный код приглашения, чтобы открыть закрытые материалы.",
    codePlaceholder: "Код доступа",
    unlock: "Открыть архив",
    signingIn: "Проверяю...",
    authenticated: "Доступ открыт. Материалы выдаются только через защищенный сервер.",
    openChip: "Доступ открыт",
    admin: "Админ",
    viewer: "Партнер",
    logout: "Выйти",
    vaultOver: "Приватный сейф",
    vaultTitle: "Материалы архива",
    vaultDesc: "Файлы хранятся в приватном хранилище и скачиваются только после проверки доступа.",
    emptyTitle: "Архив готов",
    emptyDesc: "Пока нет загруженных приватных материалов.",
    uploadTitle: "Добавить материал",
    uploadDesc: "Загрузка доступна только администратору.",
    titlePlaceholder: "Название",
    descriptionPlaceholder: "Короткая заметка",
    categoryPlaceholder: "Категория",
    fileLabel: "Файл",
    upload: "Загрузить",
    uploading: "Загружаю...",
    delete: "Удалить",
    download: "Скачать",
    size: "Размер",
    uploaded: "Добавлено",
    itemsLabel: "материалов",
    invalidCode: "Код доступа не подошел.",
    unavailable: "Сервер архива сейчас недоступен.",
    generalError: "Запрос не прошел. Попробуйте еще раз.",
    missingFile: "Сначала выберите файл.",
    fileTooLarge: "Файл больше лимита архива.",
    uploadDone: "Материал добавлен в приватный архив.",
    deleteDone: "Материал удален.",
    confirmDelete: "Удалить этот приватный материал?",
    configProblem: "Для архива нужно настроить секреты и приватное хранилище.",
  },
};

function resolveArchiveText(lang) {
  return archiveText[lang] || archiveText.en;
}

async function requestJson(path, options = {}) {
  const response = await fetch(path, {
    credentials: "same-origin",
    ...options,
  });
  const contentType = response.headers.get("content-type") || "";

  if (!contentType.includes("application/json")) {
    throw new Error("api_unavailable");
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "request_failed");
  }

  return data;
}

function errorMessage(error, text) {
  const code = error?.message;

  if (code === "invalid_code") return text.invalidCode;
  if (code === "api_unavailable") return text.unavailable;
  if (code === "archive_not_configured" || code === "archive_storage_not_configured") return text.configProblem;
  if (code === "missing_file") return text.missingFile;
  if (code === "file_too_large") return text.fileTooLarge;

  return text.generalError;
}

function formatBytes(value) {
  const bytes = Number(value || 0);
  if (!bytes) return "0 KB";

  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const amount = bytes / 1024 ** index;

  return `${amount.toFixed(amount >= 10 || index === 0 ? 0 : 1)} ${units[index]}`;
}

function formatDate(value, lang) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "-";

  return new Intl.DateTimeFormat(lang, { dateStyle: "medium" }).format(date);
}

export default function Behind() {
  const { lang = "en" } = useParams();
  const c = t(lang);
  const text = resolveArchiveText(lang);
  const fileInputRef = useRef(null);

  const [session, setSession] = useState({ authenticated: false, role: null });
  const [items, setItems] = useState([]);
  const [code, setCode] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [archiveLoading, setArchiveLoading] = useState(false);
  const [uploadFields, setUploadFields] = useState({
    title: "",
    description: "",
    category: "",
  });

  const isAdmin = session.authenticated && session.role === "admin";

  usePageSeo(lang, "behind");

  useEffect(() => {
    let active = true;

    async function loadSession() {
      setLoading(true);
      setNotice("");

      try {
        const sessionData = await requestJson("/api/archive/session");
        if (!active) return;

        setSession({
          authenticated: sessionData.authenticated,
          role: sessionData.role,
        });

        if (sessionData.authenticated) {
          setArchiveLoading(true);
          const itemData = await requestJson("/api/archive/items");
          if (active) setItems(itemData.items || []);
        }
      } catch (error) {
        if (active) setNotice(errorMessage(error, text));
      } finally {
        if (active) {
          setLoading(false);
          setArchiveLoading(false);
        }
      }
    }

    loadSession();

    return () => {
      active = false;
    };
  }, [text]);

  async function refreshItems() {
    setArchiveLoading(true);

    try {
      const itemData = await requestJson("/api/archive/items");
      setItems(itemData.items || []);
    } catch (error) {
      setNotice(errorMessage(error, text));
    } finally {
      setArchiveLoading(false);
    }
  }

  async function handleLogin(event) {
    event.preventDefault();
    setBusy(true);
    setNotice("");

    try {
      const sessionData = await requestJson("/api/archive/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ code }),
      });

      setSession({
        authenticated: true,
        role: sessionData.role,
      });
      setCode("");
      await refreshItems();
    } catch (error) {
      setNotice(errorMessage(error, text));
    } finally {
      setBusy(false);
    }
  }

  async function handleLogout() {
    setBusy(true);
    setNotice("");

    try {
      await requestJson("/api/archive/logout", { method: "POST" });
    } catch {
      // The local UI still clears the session if the cookie has already expired.
    } finally {
      setSession({ authenticated: false, role: null });
      setItems([]);
      setBusy(false);
    }
  }

  async function handleUpload(event) {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];

    if (!file) {
      setNotice(text.missingFile);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", uploadFields.title);
    formData.append("description", uploadFields.description);
    formData.append("category", uploadFields.category);

    setBusy(true);
    setNotice("");

    try {
      await requestJson("/api/archive/items", {
        method: "POST",
        body: formData,
      });

      setUploadFields({ title: "", description: "", category: "" });
      if (fileInputRef.current) fileInputRef.current.value = "";
      setNotice(text.uploadDone);
      await refreshItems();
    } catch (error) {
      setNotice(errorMessage(error, text));
    } finally {
      setBusy(false);
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(text.confirmDelete)) return;

    setBusy(true);
    setNotice("");

    try {
      await requestJson(`/api/archive/items?id=${encodeURIComponent(item.id)}`, {
        method: "DELETE",
      });

      setNotice(text.deleteDone);
      await refreshItems();
    } catch (error) {
      setNotice(errorMessage(error, text));
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white luxe-grain">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-16 md:pt-20">
        <Motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="max-w-3xl">
          <Badge>{c.nav.behind}</Badge>

          <h1 className="mt-6 break-words leading-[1.05]">
            <span className="block text-[40px] font-[800] md:text-[56px]">
              {c.behind.heroTitleLeft}{" "}
              <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                {c.behind.heroTitleAccent}
              </span>
            </span>
          </h1>

          <p className="mt-3 text-[13px] leading-6 tracking-[0.24em] uppercase text-white/65 md:tracking-[0.35em]">
            {c.behind.heroTagline}
          </p>
        </Motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-12">
          <Motion.div className="md:col-span-7" variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <SectionTitle over={c.behind.sectionOver} title={c.behind.title} desc={c.behind.desc} />

              <div className="mt-7 flex flex-wrap gap-3">
                <Link to={`/${lang}/portfolio`} className="lux-btn-primary">
                  {c.nav.portfolio} →
                </Link>
                <Link to={`/${lang}/contact`} className="lux-btn-secondary">
                  {c.nav.contact} →
                </Link>
              </div>
            </div>
          </Motion.div>

          <Motion.div className="md:col-span-5" variants={fadeUp} initial="hidden" animate="show" custom={1.4}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-col gap-4">
                <Chip>{session.authenticated ? text.openChip : c.behind.chip}</Chip>

                <div>
                  <h2 className="text-[22px] font-[800] text-white">{text.loginTitle}</h2>
                  <p className="mt-2 text-[14px] leading-6 text-white/70">
                    {session.authenticated ? text.authenticated : text.loginDesc}
                  </p>
                </div>

                {loading ? (
                  <div className="h-11 rounded-full border border-white/10 bg-white/[0.04] loading-shimmer" />
                ) : session.authenticated ? (
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                    <span className="text-[12px] uppercase tracking-[0.22em] text-[#f6e6a7]">
                      {isAdmin ? text.admin : text.viewer}
                    </span>
                    <button type="button" onClick={handleLogout} disabled={busy} className="lux-btn-secondary">
                      {text.logout}
                    </button>
                  </div>
                ) : (
                  <form className="flex flex-col gap-3" onSubmit={handleLogin}>
                    <input
                      className="contact-input"
                      type="password"
                      autoComplete="current-password"
                      value={code}
                      onChange={(event) => setCode(event.target.value)}
                      placeholder={text.codePlaceholder}
                    />
                    <button type="submit" className="lux-btn-primary" disabled={busy || !code.trim()}>
                      {busy ? text.signingIn : text.unlock}
                    </button>
                  </form>
                )}

                {notice ? <p className="text-[13px] leading-6 text-[#f6e6a7]">{notice}</p> : null}
              </div>
            </div>
          </Motion.div>
        </div>

        <Motion.div
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3"
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={2}
        >
          {c.behind.cards.map((item) => (
            <div key={item.title} className="h-full rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Tag>{item.title}</Tag>
              <p className="mt-3 text-[14px] text-white/75">{item.desc}</p>
            </div>
          ))}
        </Motion.div>

        {session.authenticated ? (
          <Motion.section className="mt-14" variants={fadeUp} initial="hidden" animate="show" custom={2.4}>
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Tag>{text.vaultOver}</Tag>
                <h2 className="mt-4 text-[28px] font-[800] leading-tight text-white md:text-[36px]">
                  {text.vaultTitle}
                </h2>
                <p className="mt-3 text-[14px] leading-6 text-white/70">{text.vaultDesc}</p>
              </div>
              <div className="text-[12px] uppercase tracking-[0.22em] text-white/50">
                {items.length} {text.itemsLabel}
              </div>
            </div>

            {isAdmin ? (
              <form
                className="mt-7 grid grid-cols-1 gap-4 rounded-3xl border border-[#D4AF37]/20 bg-[#D4AF37]/[0.04] p-5 md:grid-cols-2"
                onSubmit={handleUpload}
              >
                <div className="md:col-span-2">
                  <Tag>{text.uploadTitle}</Tag>
                  <p className="mt-3 text-[13px] leading-6 text-white/65">{text.uploadDesc}</p>
                </div>
                <input
                  className="contact-input"
                  value={uploadFields.title}
                  onChange={(event) => setUploadFields((current) => ({ ...current, title: event.target.value }))}
                  placeholder={text.titlePlaceholder}
                />
                <input
                  className="contact-input"
                  value={uploadFields.category}
                  onChange={(event) => setUploadFields((current) => ({ ...current, category: event.target.value }))}
                  placeholder={text.categoryPlaceholder}
                />
                <textarea
                  className="contact-input min-h-[96px] resize-y md:col-span-2"
                  value={uploadFields.description}
                  onChange={(event) => setUploadFields((current) => ({ ...current, description: event.target.value }))}
                  placeholder={text.descriptionPlaceholder}
                />
                <label className="contact-input flex flex-col gap-2 md:col-span-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-white/45">{text.fileLabel}</span>
                  <input ref={fileInputRef} type="file" className="text-[13px] text-white/70" />
                </label>
                <button type="submit" className="lux-btn-primary md:col-span-2" disabled={busy}>
                  {busy ? text.uploading : text.upload}
                </button>
              </form>
            ) : null}

            <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-3">
              {archiveLoading ? (
                <div className="h-36 rounded-2xl border border-white/10 bg-white/[0.04] loading-shimmer md:col-span-3" />
              ) : items.length ? (
                items.map((item) => (
                  <article key={item.id} className="flex min-h-[250px] flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <Tag>{item.category}</Tag>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">
                        {formatBytes(item.size)}
                      </span>
                    </div>

                    <h3 className="mt-5 text-[20px] font-[800] leading-tight text-white">{item.title}</h3>
                    <p className="mt-3 flex-grow text-[14px] leading-6 text-white/68">
                      {item.description || item.filename}
                    </p>

                    <dl className="mt-5 grid gap-2 border-t border-white/10 pt-4 text-[12px] text-white/55">
                      <div className="flex items-center justify-between gap-4">
                        <dt>{text.size}</dt>
                        <dd>{formatBytes(item.size)}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <dt>{text.uploaded}</dt>
                        <dd>{formatDate(item.uploadedAt, lang)}</dd>
                      </div>
                    </dl>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a href={item.downloadUrl} className="lux-btn-primary">
                        {text.download}
                      </a>
                      {isAdmin ? (
                        <button type="button" onClick={() => handleDelete(item)} className="lux-btn-secondary" disabled={busy}>
                          {text.delete}
                        </button>
                      ) : null}
                    </div>
                  </article>
                ))
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:col-span-3">
                  <Tag>{text.vaultOver}</Tag>
                  <h3 className="mt-4 text-[22px] font-[800] text-white">{text.emptyTitle}</h3>
                  <p className="mt-3 text-[14px] leading-6 text-white/70">{text.emptyDesc}</p>
                </div>
              )}
            </div>
          </Motion.section>
        ) : null}
      </section>
    </main>
  );
}
