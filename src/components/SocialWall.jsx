import { motion as Motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { fallbackSocialPosts, fetchSocialPosts } from "../lib/socialFeed";
import portrait from "../assets/ph_zel_2.jpg";

const copy = {
  en: {
    kicker: "Live social archive",
    title: "Every post becomes part of the visual vault.",
    desc: "A single premium feed for Instagram, TikTok, YouTube, Facebook, LinkedIn, and future channels.",
    all: "All",
    open: "Open post",
    loading: "Loading social photos",
  },
  ru: {
    kicker: "Live social archive",
    title: "Social photos, curated like a private magazine.",
    desc: "One premium feed for Instagram, TikTok, YouTube, Facebook, LinkedIn, and future channels.",
    all: "All",
    open: "Open post",
    loading: "Loading social photos",
  },
  fr: {
    kicker: "Live social archive",
    title: "Every post becomes part of the visual vault.",
    desc: "A premium feed for Instagram, TikTok, YouTube, Facebook, LinkedIn, and future channels.",
    all: "All",
    open: "Open post",
    loading: "Loading social photos",
  },
  am: {
    kicker: "Live social archive",
    title: "Every post becomes part of the visual vault.",
    desc: "A premium feed for Instagram, TikTok, YouTube, Facebook, LinkedIn, and future channels.",
    all: "All",
    open: "Open post",
    loading: "Loading social photos",
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
  const [active, setActive] = useState("all");
  const [loading, setLoading] = useState(true);
  const text = copy[lang] || copy.en;

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

  const filteredPosts = active === "all" ? posts : posts.filter((post) => post.platform === active);

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

          <div className="flex flex-wrap gap-2 md:justify-end">
            {platforms.map((platform) => {
              const selected = active === platform;
              return (
                <button
                  key={platform}
                  type="button"
                  onClick={() => setActive(platform)}
                  className={[
                    "min-h-10 border px-4 text-[10px] font-bold uppercase tracking-[0.22em] transition",
                    "rounded-[8px]",
                    selected
                      ? "border-[#d4af37]/70 bg-[#d4af37]/[0.16] text-[#ffe8a3]"
                      : "border-white/10 bg-black/40 text-white/55 hover:border-[#d4af37]/45 hover:text-white",
                  ].join(" ")}
                >
                  {platform === "all" ? text.all : platform}
                </button>
              );
            })}
          </div>
        </Motion.div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPosts.map((post, index) => (
            <SocialCard key={post.id} post={post} index={index} openLabel={text.open} />
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

function SocialCard({ post, index, openLabel }) {
  const large = index % 7 === 0;
  const wide = index % 5 === 2;
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
        wide ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <div className={large ? "aspect-[4/5] h-full" : wide ? "aspect-[16/9]" : "aspect-[4/5]"}>
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover opacity-[0.88] saturate-[0.92] transition duration-700 group-hover:scale-[1.035] group-hover:opacity-100"
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
          <span>{post.tone}</span>
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
