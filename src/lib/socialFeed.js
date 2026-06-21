import portrait from "../assets/ph_zel_2.jpg";

export const SOCIAL_FEED_URL = import.meta.env?.VITE_SOCIAL_FEED_URL || "/social-feed.json";

export const fallbackSocialPosts = [
  {
    id: "fallback-instagram-01",
    platform: "Instagram",
    title: "Noir editorial frame",
    date: "2026",
    image: "https://picsum.photos/seed/dg-social-instagram-01/1200/1500",
    url: "https://www.instagram.com/",
    tone: "portrait",
  },
  {
    id: "fallback-tiktok-01",
    platform: "TikTok",
    title: "Backstage motion cut",
    date: "2026",
    image: "https://picsum.photos/seed/dg-social-tiktok-01/1200/1600",
    url: "https://www.tiktok.com/",
    tone: "video",
  },
  {
    id: "fallback-youtube-01",
    platform: "YouTube",
    title: "Showreel still",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-youtube-01/1600/1000",
    url: "https://www.youtube.com/",
    tone: "cinema",
  },
  {
    id: "fallback-linkedin-01",
    platform: "LinkedIn",
    title: "Product aesthetic",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-linkedin-01/1400/1100",
    url: "https://www.linkedin.com/",
    tone: "tech",
  },
  {
    id: "fallback-facebook-01",
    platform: "Facebook",
    title: "Private campaign still",
    date: "2025",
    image: "https://picsum.photos/seed/dg-social-facebook-01/1400/1200",
    url: "https://www.facebook.com/",
    tone: "brand",
  },
  {
    id: "fallback-portrait-01",
    platform: "Archive",
    title: "Signature portrait",
    date: "2026",
    image: portrait,
    url: "",
    tone: "signature",
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
