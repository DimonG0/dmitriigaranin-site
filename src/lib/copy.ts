// src/lib/copy.ts

export const LANGS = ["en", "ru", "fr", "am"] as const;
export type Lang = (typeof LANGS)[number];

/* ===== Base types ===== */

export type NavKeys =
  | "home"
  | "about"
  | "portfolio"
  | "reviews"
  | "behind"
  | "contact";

export type CopyBlock = {
  brand: string;
  tagline: string;

  nav: Record<NavKeys, string>;

  home: {
    note: string;
    sub: string;
  };

  seo: {
    baseTitle: string;
    baseDesc: string;
  };
};

/* ===== COPY ===== */

export const copy: Record<Lang, CopyBlock> = {
  en: {
    brand: "Dmitrii Garanin",
    tagline: "Actor • Creative • IT — International Portfolio",

    nav: {
      home: "Home",
      about: "About",
      portfolio: "Portfolio",
      reviews: "Reviews",
      behind: "Behind",
      contact: "Contact",
    },

    home: {
      note: "Minimal noise. Maximum signal.",
      sub:
        "A luxury-first personal platform: showreel, portfolio, editorial presence, and direct contact.",
    },

    seo: {
      baseTitle:
        "Dmitrii Garanin — Actor / Creative / IT | International Luxury Portfolio",
      baseDesc:
        "Luxury black & gold personal brand site: showreel, portfolio, reviews and contact.",
    },
  },

  ru: {
    brand: "Дмитрий Гаранин",
    tagline: "Актёр • Креатив • IT — Международное портфолио",

    nav: {
      home: "Главная",
      about: "О себе",
      portfolio: "Портфолио",
      reviews: "Отзывы",
      behind: "За кадром",
      contact: "Контакты",
    },

    home: {
      note: "Минимум слов. Максимум эффекта.",
      sub:
        "Люксовая платформа: шоу-рил, портфолио, редакционное присутствие и прямой контакт.",
    },

    seo: {
      baseTitle:
        "Дмитрий Гаранин — актёр / креатив / IT | Luxury International Portfolio",
      baseDesc:
        "Black & gold персональный сайт: шоу-рил, портфолио, отзывы и контакты.",
    },
  },

  fr: {
    brand: "Dmitrii Garanin",
    tagline: "Acteur • Créatif • IT — Portfolio international",

    nav: {
      home: "Accueil",
      about: "À propos",
      portfolio: "Portfolio",
      reviews: "Avis",
      behind: "Coulisses",
      contact: "Contact",
    },

    home: {
      note: "Moins de mots. Plus d’impact.",
      sub:
        "Plateforme de luxe : showreel, portfolio, présence éditoriale et contact direct.",
    },

    seo: {
      baseTitle:
        "Dmitrii Garanin — Acteur / Créatif / IT | Portfolio luxe international",
      baseDesc:
        "Site personnel black & gold : showreel, portfolio, avis et contact.",
    },
  },

  am: {
    brand: "Դմիտրի Գարանին",
    tagline: "Դերասան • Կրեատիվ • IT — Միջազգային պորտֆոլիո",

    nav: {
      home: "Գլխավոր",
      about: "Իմ մասին",
      portfolio: "Պորտֆոլիո",
      reviews: "Կարծիքներ",
      behind: "Կադրից դուրս",
      contact: "Կապ",
    },

    home: {
      note: "Քիչ բառեր։ Մեծ ազդակ։",
      sub:
        "Luxury հարթակ՝ շոուռիլ, պորտֆոլիո, խմբագրական ներկայություն և ուղիղ կապ։",
    },

    seo: {
      baseTitle:
        "Դմիտրի Գարանին — դերասան / կրեատիվ / IT | Luxury International Portfolio",
      baseDesc:
        "Black & gold անձնական կայք՝ շոուռիլ, պորտֆոլիո, կարծիքներ և կապ։",
    },
  },
};
