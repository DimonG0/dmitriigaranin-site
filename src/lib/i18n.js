export const copy = {
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
      h1: "Black. Gold. Presence.",
      sub:
        "A luxury-first personal platform: showreel, portfolio, editorial presence, and direct contact.",
      cta1: "Watch Showreel",
      cta2: "View Portfolio",
      note: "Minimal noise. Maximum signal.",
    },

    about: {
      h1: "About",
      p1:
        "International-minded actor and creator. I build worlds on camera — and systems in code.",
      p2: "Languages: Armenian, English, Russian, French.",
      stats: [
        { k: "Focus", v: "Cinematic presence" },
        { k: "Style", v: "Luxury editorial / noir" },
        { k: "Work", v: "Film • Digital • IT" },
      ],
    },

    portfolio: {
      pill: "Private portfolio vault",
      h1a: "Luxury",
      h1b: "Portfolio",
      sub:
        "A curated archive of screen presence, luxury collaborations, editorial work, and premium digital concepts.",
      intro:
        "Not a public dump. Each entry is selected and positioned like a private art book.",
    },

    reviews: {
      pill: "Private feedback",
      h1a: "Trusted",
      h1b: "Presence",
      sub:
        "Selected words from professionals who value precision, restraint, and cinematic discipline.",

      sections: {
        focus: "What they notice",
        signal: "What it communicates",
      },

      list: [
        {
          q: "A rare screen presence. Calm, controlled, and impossible to ignore.",
          a: "Film Producer",
        },
        {
          q: "Minimalism that feels expensive. Every frame is deliberate.",
          a: "Creative Director",
        },
        {
          q: "He understands pacing, silence, and camera language better than most.",
          a: "Casting Consultant",
        },
        {
          q: "International level of taste. No noise — only signal.",
          a: "Brand Strategist",
        },
      ],

      notes: {
        title: "Protocol",
        text:
          "References are available upon request. Discretion is part of the process.",
      },
    },

    behind: {
      h1: "Behind the Scenes",
      sub: "Private archive: process, craft, atmosphere.",
    },

    contact: {
      h1: "Contact",
      sub: "Business inquiries, collaborations, casting, IT projects.",
      emailLabel: "Email",
      socialsLabel: "Social",
      cta: "Copy Email",
    },

    footer: {
      rights: "All rights reserved",
      contact: "Private contact",
    },

    seo: {
      baseTitle:
        "Dmitrii Garanin — Actor / Creative / IT | International Luxury Portfolio",
      baseDesc:
        "Luxury black & gold personal brand site: showreel, portfolio, reviews and contact.",
      siteUrl: "https://dmitriigaranin.com",
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

    about: {
      h1: "О себе",
      p1:
        "Актёр и креативщик с международным мышлением. Работаю с присутствием — в кадре и в системах.",
      p2: "Языки: армянский, английский, русский, французский.",
      stats: [
        { k: "Фокус", v: "Экранное присутствие" },
        { k: "Стиль", v: "Luxury editorial / noir" },
        { k: "Работа", v: "Кино • Digital • IT" },
      ],
    },

    reviews: {
      pill: "Частные отзывы",
      h1a: "Доверие",
      h1b: "профессионалов",
      sub:
        "Слова от людей, для которых важны точность, сдержанность и экранная дисциплина.",

      sections: {
        focus: "Что замечают",
        signal: "Что это транслирует",
      },

      list: [
        {
          q:
            "Редкое экранное присутствие: спокойное, контролируемое, невозможно игнорировать.",
          a: "Кинопродюсер",
        },
        {
          q:
            "Минимализм, который выглядит дорого. Каждый кадр — намерение.",
          a: "Креативный директор",
        },
        {
          q:
            "Понимает темп, тишину и язык камеры лучше большинства.",
          a: "Кастинг-консультант",
        },
        {
          q:
            "Международный уровень вкуса. Без шума — только сигнал.",
          a: "Бренд-стратег",
        },
      ],

      notes: {
        title: "Протокол",
        text:
          "Рекомендации предоставляются по запросу. Дискретность — часть процесса.",
      },
    },

    footer: {
      rights: "Все права защищены",
      contact: "Частный контакт",
    },
  },
};

export const SAFE = (v, fallback = "") =>
  v === undefined || v === null ? fallback : v;

export const pick = (obj, path, fallback = "") => {
  try {
    return path.split(".").reduce((o, k) => o?.[k], obj) ?? fallback;
  } catch {
    return fallback;
  }
};

export function t(lang = "en") {
  const base = copy.en;
  const current = copy[lang] ?? base;

  if (import.meta.env.DEV) {
    for (const k in base) {
      if (!(k in current)) {
        console.warn(`[i18n] missing key "${k}" in lang "${lang}"`);
      }
    }
  }

  return new Proxy(current, {
    get(target, prop) {
      return target[prop] ?? base[prop];
    },
  });
}
