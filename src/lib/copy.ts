// src/lib/copy.ts

export type Lang = "en" | "ru" | "fr" | "am";

export type ReviewItem = {
  q: string;
  a: string;
};

export type CopyLang = {
  brand: string;
  tagline: string;

  nav: {
    home: string;
    about: string;
    portfolio: string;
    reviews: string;
    behind: string;
    contact: string;
  };

  reviews: {
    pill: string;
    h1a: string;
    h1b: string;
    sub: string;

    sections: {
      focus: string;
      signal: string;
    };

    list: ReviewItem[];

    notes: {
      title: string;
      text: string;
    };
  };

  footer: {
    rights: string;
    contact: string;
  };

  seo: {
    baseTitle: string;
    baseDesc: string;
    siteUrl: string;
  };
};

export const copy: Record<Lang, CopyLang> = {
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

    footer: {
      rights: "All rights reserved",
      contact: "Private contact",
    },

    seo: {
      baseTitle:
        "Dmitrii Garanin — Actor / Creative / IT | International Luxury Portfolio",
      baseDesc:
        "Luxury black & gold personal site: showreel, portfolio, reviews and contact.",
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
          q: "Редкое экранное присутствие: спокойное, контролируемое, невозможно игнорировать.",
          a: "Кинопродюсер",
        },
        {
          q: "Минимализм, который выглядит дорого. Каждый кадр — намерение.",
          a: "Креативный директор",
        },
        {
          q: "Понимает темп, тишину и язык камеры лучше большинства.",
          a: "Кастинг-консультант",
        },
        {
          q: "Международный уровень вкуса. Без шума — только сигнал.",
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

    seo: {
      baseTitle:
        "Дмитрий Гаранин — актёр / креатив / IT | Luxury International Portfolio",
      baseDesc:
        "Личный сайт в стиле black & gold: шоу-рил, портфолио, отзывы и контакты.",
      siteUrl: "https://dmitriigaranin.com",
    },
  },
};

/**
 * Translation helper
 */
export function t(lang: string = "en"): CopyLang {
  return copy[lang as Lang] ?? copy.en;
}
