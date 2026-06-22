import portrait from "../assets/ph_zel_2.jpg";
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
    id: "fallback-instagram-01",
    platform: "Instagram",
    title: "Noir editorial frame",
    date: "2026",
    image: "https://picsum.photos/seed/dg-social-instagram-01/1200/1500",
    url: SOCIAL_URLS.instagram,
    tone: "portrait",
    category: "dima-photo",
  },
  {
    id: "fallback-vk-01",
    platform: "VK",
    title: "Backstage motion cut",
    date: "2026",
    image: "https://picsum.photos/seed/dg-social-vk-01/1200/1600",
    url: SOCIAL_URLS.vk,
    tone: "video",
    category: "backstage",
  },
  {
    id: "fallback-pinterest-01",
    platform: "Pinterest",
    title: "Showreel moodboard",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-pinterest-01/1600/1000",
    url: SOCIAL_URLS.pinterest,
    tone: "cinema",
    category: "cinema",
  },
  {
    id: "fallback-facebook-01",
    platform: "Facebook",
    title: "Private campaign still",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-facebook-01/1400/1200",
    url: SOCIAL_URLS.facebook,
    tone: "brand",
    category: "brand",
  },
  {
    id: "fallback-instagram-02",
    platform: "Instagram",
    title: "Gold edge portrait",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-instagram-02/1200/1500",
    url: SOCIAL_URLS.instagram,
    tone: "archive",
    category: "dima-photo",
  },
  {
    id: "fallback-portrait-01",
    platform: "Archive",
    title: "Signature portrait",
    date: "2026",
    image: portrait,
    url: "",
    tone: "signature",
    category: "dima-photo",
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
