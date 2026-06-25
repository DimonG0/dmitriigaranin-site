import { motion as Motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { fallbackSocialPosts, fetchSocialPosts } from "../lib/socialFeed";
import portrait from "../assets/ph_zel_2.jpg";

const categoryLabels = {
  en: {
    all: "All",
    philosophy: "Philosophy",
    "dima-photo": "Dima photos",
    backstage: "Backstage",
    cinema: "Cinema",
    brand: "Brand",
    work: "Work",
    archive: "Archive",
  },
  ru: {
    all: "Все",
    philosophy: "Мысли",
    "dima-photo": "Фото Димы",
    backstage: "За кадром",
    cinema: "Кино",
    brand: "Бренд",
    work: "Работа",
    archive: "Архив",
  },
  fr: {
    all: "Tout",
    philosophy: "Philosophie",
    "dima-photo": "Photos de Dima",
    backstage: "Coulisses",
    cinema: "Cinéma",
    brand: "Marque",
    work: "Travail",
    archive: "Archive",
  },
  am: {
    all: "Բոլորը",
    philosophy: "Մտքեր",
    "dima-photo": "Դիմայի լուսանկարներ",
    backstage: "Կուլիսներ",
    cinema: "Կինո",
    brand: "Բրենդ",
    work: "Աշխատանք",
    archive: "Արխիվ",
  },
};

const copy = {
  en: {
    kicker: "Live social archive",
    title: "Every post becomes part of the visual vault.",
    desc: "A single premium feed for Instagram, VK, Pinterest, Facebook, and future channels.",
    all: "All",
    open: "Open post",
    loading: "Loading social photos",
    categories: "Sort by signal",
    sources: "Source",
  },
  ru: {
    kicker: "Живой social-архив",
    title: "Каждый пост становится частью визуального архива.",
    desc: "Единая премиальная лента для Instagram, VK, Pinterest, Facebook и будущих каналов.",
    all: "Все",
    open: "Открыть пост",
    loading: "Загружаем social-фото",
    categories: "Сортировка по сигналу",
    sources: "Источник",
  },
  fr: {
    kicker: "Archive sociale live",
    title: "Chaque post rejoint le coffre visuel.",
    desc: "Un feed premium pour Instagram, VK, Pinterest, Facebook et les futurs canaux.",
    all: "Tout",
    open: "Ouvrir le post",
    loading: "Chargement des photos sociales",
    categories: "Tri par signal",
    sources: "Source",
  },
  am: {
    kicker: "Կենդանի social արխիվ",
    title: "Յուրաքանչյուր հրապարակում դառնում է տեսողական արխիվի մաս։",
    desc: "Պրեմիում մեկ հոսք Instagram-ի, VK-ի, Pinterest-ի, Facebook-ի և ապագա ալիքների համար։",
    all: "Բոլորը",
    open: "Բացել հրապարակումը",
    loading: "Բեռնվում են social լուսանկարները",
    categories: "Տեսակավորում ըստ ազդակի",
    sources: "Աղբյուր",
  },
};

const fallbackTitleCopy = {
  ru: {
    "fallback-instagram-01": "Актёрский портрет 2026",
    "fallback-vk-01": "Выбор выше статуса",
    "fallback-pinterest-01": "Мальчик, который смотрит дальше",
    "fallback-facebook-01": "Актёр нового поколения",
    "fallback-instagram-02": "Актёрский манифест",
    "fallback-pinterest-02": "Персонаж создаёт роль",
  },
  fr: {
    "fallback-instagram-01": "Portrait acteur 2026",
    "fallback-vk-01": "Le choix au-delà du statut",
    "fallback-pinterest-01": "Le garçon qui regarde au-delà",
    "fallback-facebook-01": "Acteur nouvelle génération",
    "fallback-instagram-02": "Manifeste d'acteur",
    "fallback-pinterest-02": "Le personnage crée le rôle",
  },
  am: {
    "fallback-instagram-01": "Դերասանի դիմանկար 2026",
    "fallback-vk-01": "Ընտրություն կարգավիճակից վեր",
    "fallback-pinterest-01": "Տղան, որը նայում է հեռուն",
    "fallback-facebook-01": "Նոր սերնդի դերասան",
    "fallback-instagram-02": "Դերասանական մանիֆեստ",
    "fallback-pinterest-02": "Կերպարը ստեղծում է դերը",
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(8px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function SocialWall({ lang = "en" }) {
  const [posts, setPosts] = useState(fallbackSocialPosts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activePlatform, setActivePlatform] = useState("all");
  const [loading, setLoading] = useState(true);
  const text = copy[lang] || copy.en;
  const labels = categoryLabels[lang] || categoryLabels.en;
  const localizedTitles = fallbackTitleCopy[lang] || {};

  useEffect(() => {
    const controller = new AbortController();

    fetchSocialPosts(controller.signal)
      .then((items) => setPosts(items))
      .catch((error) => {
        if (error?.name !== "AbortError") setPosts(fallbackSocialPosts);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, []);

  const platforms = useMemo(() => {
    const names = Array.from(new Set(posts.map((post) => post.platform).filter(Boolean)));
    return ["all", ...names];
  }, [posts]);

  const categories = useMemo(() => {
    const names = Array.from(new Set(posts.map((post) => post.category).filter(Boolean)));
    return ["all", ...names];
  }, [posts]);

  const filteredPosts = posts.filter((post) => {
    const categoryMatch = activeCategory === "all" || post.category === activeCategory;
    const platformMatch = activePlatform === "all" || post.platform === activePlatform;
    return categoryMatch && platformMatch;
  });

  return (
    <section className="relative border-y border-[#d4af37]/15 bg-[#050505]/85 px-4 py-20 text-white md:px-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/70 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(115deg, transparent 0%, rgba(212,175,55,0.08) 38%, transparent 62%), repeating-linear-gradient(90deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 118px)",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-120px" }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-[#d4af37]">
              {text.kicker}
            </div>
            <h2 className="mt-4 max-w-3xl text-[34px] font-black leading-[1.05] md:text-[52px]">
              <span className="bg-gradient-to-r from-white via-[#f6e6a7] to-[#d4af37] bg-clip-text text-transparent">
                {text.title}
              </span>
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-white/[0.62]">{text.desc}</p>
          </div>

          <div className="flex max-w-xl flex-col gap-4 md:items-end">
            <FilterGroup
              label={text.categories}
              items={categories}
              active={activeCategory}
              getLabel={(category) => labels[category] || category}
              onChange={setActiveCategory}
            />
            <FilterGroup
              label={text.sources}
              items={platforms}
              active={activePlatform}
              getLabel={(platform) => (platform === "all" ? text.all : platform)}
              onChange={setActivePlatform}
            />
          </div>
        </Motion.div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPosts.map((post, index) => (
            <SocialCard
              key={post.id}
              post={{ ...post, title: localizedTitles[post.id] || post.title }}
              index={index}
              openLabel={text.open}
              categoryLabels={labels}
            />
          ))}
        </div>

        {loading && (
          <div className="mt-5 text-[10px] uppercase tracking-[0.28em] text-white/35">
            {text.loading}
          </div>
        )}
      </div>
    </section>
  );
}

function FilterGroup({ label, items, active, getLabel, onChange }) {
  return (
    <div className="w-full md:max-w-xl">
      <div className="mb-2 text-[9px] font-bold uppercase tracking-[0.28em] text-white/35 md:text-right">
        {label}
      </div>
      <div className="flex flex-wrap gap-2 md:justify-end">
            {items.map((item) => {
              const selected = active === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => onChange(item)}
                  className={[
                    "min-h-10 border px-4 text-[10px] font-bold uppercase tracking-[0.22em] transition",
                    "rounded-[8px]",
                    selected
                      ? "border-[#d4af37]/70 bg-[#d4af37]/[0.16] text-[#ffe8a3]"
                      : "border-white/10 bg-black/40 text-white/55 hover:border-[#d4af37]/45 hover:text-white",
                  ].join(" ")}
                >
                  {getLabel(item)}
                </button>
              );
            })}
      </div>
    </div>
  );
}

function SocialCard({ post, index, openLabel, categoryLabels: labels }) {
  const large = index === 0 || index === 4;
  const href = post.url || undefined;

  const content = (
    <Motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      custom={index}
      className={[
        "group relative overflow-hidden rounded-[8px] border border-white/10 bg-black shadow-[0_20px_70px_rgba(0,0,0,0.45)]",
        large ? "sm:row-span-2" : "",
      ].join(" ")}
    >
      <div className={large ? "aspect-[4/5] h-full" : "aspect-[4/5]"}>
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full bg-black object-contain opacity-[0.9] saturate-[0.94] transition duration-700 group-hover:scale-[1.025] group-hover:opacity-100"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.src = portrait;
          }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-95" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#f7d778]/80 to-transparent opacity-0 transition group-hover:opacity-100" />

      <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-3">
        <span className="rounded-[6px] border border-[#d4af37]/35 bg-black/60 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.22em] text-[#ffe8a3] backdrop-blur">
          {post.platform}
        </span>
        {!!post.date && (
          <span className="rounded-[6px] border border-white/10 bg-black/45 px-2.5 py-1 text-[9px] uppercase tracking-[0.18em] text-white/[0.58] backdrop-blur">
            {post.date}
          </span>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white">
          {post.title}
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-3 text-[9px] uppercase tracking-[0.22em] text-white/[0.42]">
          <span>{labels[post.category] || post.tone}</span>
          {href && <span className="text-[#d4af37]">{openLabel}</span>}
        </div>
      </div>
    </Motion.article>
  );

  if (!href) return content;

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label={`${openLabel}: ${post.title}`}>
      {content}
    </a>
  );
}
