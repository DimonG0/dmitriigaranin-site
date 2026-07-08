import { SOCIAL_URLS } from "./socialLinks";

export const SOCIAL_FEED_URL = import.meta.env?.VITE_SOCIAL_FEED_URL || "/social-feed.json";

const CATEGORY_KEYWORDS = [
  {
    id: "philosophy",
    words: [
      "philosophy",
      "quote",
      "thought",
      "idea",
      "reflection",
      "insight",
      "wisdom",
      "meaning",
      "mindset",
      "stoic",
      "stoicism",
      "mysl",
      "filosof",
      "tsitata",
    ],
  },
  {
    id: "dima-photo",
    words: [
      "dima",
      "dmitrii",
      "dmitry",
      "garanin",
      "portrait",
      "photo",
      "headshot",
      "selfie",
      "look",
      "face",
      "editorial",
      "signature",
    ],
  },
  {
    id: "backstage",
    words: ["backstage", "behind", "bts", "rehearsal", "scene", "set", "motion", "process"],
  },
  {
    id: "cinema",
    words: ["showreel", "film", "actor", "acting", "cinema", "camera", "role", "screen"],
  },
  {
    id: "brand",
    words: ["brand", "campaign", "luxury", "gold", "private", "platinum", "fashion"],
  },
  {
    id: "work",
    words: ["product", "tech", "system", "interface", "ui", "it", "linkedin", "digital"],
  },
];

const cleanCategory = (value) =>
  String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[_\s]+/g, "-");

export function inferSocialCategory(item = {}) {
  const explicit = cleanCategory(item.category || item.group || item.collection);
  if (explicit) return explicit;

  const text = [
    item.title,
    item.caption,
    item.description,
    item.board,
    item.boardName,
    item.tone,
    item.type,
    item.platform,
    ...(Array.isArray(item.tags) ? item.tags : []),
    ...(Array.isArray(item.keywords) ? item.keywords : []),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const match = CATEGORY_KEYWORDS.find((category) =>
    category.words.some((word) => text.includes(word))
  );

  return match?.id || "archive";
}

export const fallbackSocialPosts = [
  {
    id: "en-social-move-with-the-tide",
    platform: "Instagram",
    title: "Move with the tide",
    date: "2026",
    image: "/portfolio-media/dmitrii-garanin-move-with-the-tide-trust-your-way-tropical-actor-portrait.png",
    url: SOCIAL_URLS.instagram,
    tone: "poster",
    category: "philosophy",
    presentation: "poster",
  },
  {
    id: "en-social-create-your-moment",
    platform: "VK",
    title: "Create your moment",
    date: "2026",
    image: "/portfolio-media/dmitrii-garanin-create-your-moment-today-here-now-actor-portrait.png",
    url: SOCIAL_URLS.vk,
    tone: "poster",
    category: "philosophy",
    presentation: "poster",
  },
  {
    id: "en-social-dreams-dont-work",
    platform: "Pinterest",
    title: "Dreams don't work until you do",
    date: "2026",
    image: "/portfolio-media/dmitrii-garanin-dreams-dont-work-until-you-do-actor-portrait.png",
    url: SOCIAL_URLS.pinterest,
    tone: "poster",
    category: "philosophy",
    presentation: "poster",
  },
  {
    id: "en-social-live-today",
    platform: "Facebook",
    title: "Stay soft. Stay true",
    date: "2026",
    image: "/portfolio-media/dmitriy-garanin-stay-soft-stay-true-actor-card.png",
    url: SOCIAL_URLS.facebook,
    tone: "poster",
    category: "philosophy",
    presentation: "poster",
  },
];

export const russianSocialPosts = [
  {
    id: "ru-social-official-portrait",
    platform: "Instagram",
    title: "Остаться собой",
    date: "2026",
    image: "/portfolio-media/ru-social-official-portrait-luxury.png",
    url: SOCIAL_URLS.instagram,
    tone: "portrait",
    category: "dima-photo",
  },
  {
    id: "ru-social-zhivi-segodnya-final-portrait",
    platform: "VK",
    title: "Живи сегодня",
    date: "2025",
    image: "/portfolio-media/ru-social-zhivi-segodnya-final-portrait.png",
    url: SOCIAL_URLS.vk,
    tone: "philosophy",
    category: "philosophy",
  },
  {
    id: "ru-social-pool-portrait",
    platform: "Pinterest",
    title: "Мечты работают",
    date: "2025",
    image: "/portfolio-media/ru-social-pool-portrait.png",
    url: SOCIAL_URLS.pinterest,
    tone: "brand",
    category: "brand",
  },
  {
    id: "ru-social-ne-zhdi-momenta-portrait",
    platform: "Facebook",
    title: "Не жди момента",
    date: "2025",
    image: "/portfolio-media/ru-social-ne-zhdi-momenta-portrait.png",
    url: SOCIAL_URLS.facebook,
    tone: "philosophy",
    category: "philosophy",
  },
];

export function normalizeSocialPosts(payload) {
  const list = Array.isArray(payload) ? payload : payload?.items;
  if (!Array.isArray(list)) return fallbackSocialPosts;

  const normalized = list
    .map((item, index) => ({
      id: String(item?.id || `${item?.platform || "post"}-${index}`),
      platform: String(item?.platform || item?.network || "Social"),
      title: String(item?.title || item?.caption || "Social post"),
      date: String(item?.date || item?.publishedAt || ""),
      image: String(item?.image || item?.imageUrl || item?.thumbnail || ""),
      url: String(item?.url || item?.postUrl || ""),
      tone: String(item?.tone || item?.type || "post"),
      category: inferSocialCategory(item),
      presentation: String(item?.presentation || item?.layout || "card"),
    }))
    .filter((item) => item.image);

  return normalized.length ? normalized : fallbackSocialPosts;
}

export async function fetchSocialPosts(signal) {
  try {
    const response = await fetch(SOCIAL_FEED_URL, {
      signal,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error(`Social feed failed: ${response.status}`);
    return normalizeSocialPosts(await response.json());
  } catch (error) {
    if (error?.name === "AbortError") throw error;
    return fallbackSocialPosts;
  }
}
