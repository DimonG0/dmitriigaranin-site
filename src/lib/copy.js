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

  home: {
    note: string;
    sub: string;
    signatureTitle: string;
    signatureText: string;
  };

  about: {
    p1: string;
    p2: string;
    stats: Array<{ k: string; v: string }>;
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

    home: {
      note: "Luxury Portfolio",
      sub: "Your professional description here. Highlight your experience, style, and approach to creative work.",
      signatureTitle: "Signature",
      signatureText: "Cinematic presence with premium minimalism. A focus on subtlety, timing, and frame-perfect delivery.",
    },

    about: {
      p1: "First paragraph about your background, experience, and creative philosophy. Describe your journey and what drives you.",
      p2: "Second paragraph detailing specific skills, projects, or collaborations. Mention your approach to work and what sets you apart.",
      stats: [
        { k: "Years Experience", v: "10+" },
        { k: "Projects Completed", v: "50+" },
        { k: "International Clients", v: "100+" },
      ],
    },

    reviews: {
      pill: "Private feedback",
      h1a: "Trusted",
      h1b: "Presence",
      sub: "Selected words from professionals who value precision, restraint, and cinematic discipline.",
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
        text: "References are available upon request. Discretion is part of the process.",
      },
    },

    footer: {
      rights: "All rights reserved",
      contact: "Private contact",
    },

    seo: {
      baseTitle: "Dmitrii Garanin — Actor / Creative / IT | International Luxury Portfolio",
      baseDesc: "Luxury black & gold personal site: showreel, portfolio, reviews and contact.",
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

    home: {
      note: "Люксовое портфолио",
      sub: "Ваше профессиональное описание. Расскажите о вашем опыте, стиле и подходе к творческой работе.",
      signatureTitle: "Подпись",
      signatureText: "Кинематографическое присутствие с премиальным минимализмом. Акцент на тонкости, тайминге и идеальном кадре.",
    },

    about: {
      p1: "Первый параграф о вашем бэкграунде, опыте и творческой философии. Опишите ваш путь и что вами движет.",
      p2: "Второй параграф с деталями о навыках, проектах или коллаборациях. Расскажите о вашем подходе к работе и что вас выделяет.",
      stats: [
        { k: "Лет опыта", v: "10+" },
        { k: "Завершённых проектов", v: "50+" },
        { k: "Международных клиентов", v: "100+" },
      ],
    },

    reviews: {
      pill: "Частные отзывы",
      h1a: "Доверие",
      h1b: "профессионалов",
      sub: "Слова от людей, для которых важны точность, сдержанность и экранная дисциплина.",
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
        text: "Рекомендации предоставляются по запросу. Дискретность — часть процесса.",
      },
    },

    footer: {
      rights: "Все права защищены",
      contact: "Частный контакт",
    },

    seo: {
      baseTitle: "Дмитрий Гаранин — актёр / креатив / IT | Luxury International Portfolio",
      baseDesc: "Личный сайт в стиле black & gold: шоу-рил, портфолио, отзывы и контакты.",
      siteUrl: "https://dmitriigaranin.com",
    },
  },

  fr: {
    brand: "Dmitrii Garanin",
    tagline: "Acteur • Créatif • IT — Portfolio International",

    nav: {
      home: "Accueil",
      about: "À propos",
      portfolio: "Portfolio",
      reviews: "Avis",
      behind: "Coulisses",
      contact: "Contact",
    },

    home: {
      note: "Portfolio de Luxe",
      sub: "Votre description professionnelle. Mettez en avant votre expérience, votre style et votre approche du travail créatif.",
      signatureTitle: "Signature",
      signatureText: "Présence cinématographique avec un minimalisme premium. L'accent est mis sur la subtilité, le timing et la livraison parfaite.",
    },

    about: {
      p1: "Premier paragraphe sur votre parcours, votre expérience et votre philosophie créative. Décrivez votre parcours et ce qui vous motive.",
      p2: "Deuxième paragraphe détaillant des compétences spécifiques, des projets ou des collaborations. Mentionnez votre approche du travail et ce qui vous distingue.",
      stats: [
        { k: "Années d'expérience", v: "10+" },
        { k: "Projets achevés", v: "50+" },
        { k: "Clients internationaux", v: "100+" },
      ],
    },

    reviews: {
      pill: "Retour privé",
      h1a: "Confiance",
      h1b: "Présence",
      sub: "Mots sélectionnés de professionnels qui valorisent la précision, la retenue et la discipline cinématographique.",
      sections: {
        focus: "Ce qu'ils remarquent",
        signal: "Ce que cela communique",
      },
      list: [
        {
          q: "Une rare présence à l'écran. Calme, contrôlée et impossible à ignorer.",
          a: "Producteur de film",
        },
        {
          q: "Un minimalisme qui paraît luxueux. Chaque image est délibérée.",
          a: "Directeur créatif",
        },
        {
          q: "Il comprend le rythme, le silence et le langage de la caméra mieux que la plupart.",
          a: "Consultant en casting",
        },
        {
          q: "Un niveau international de goût. Pas de bruit — seulement du signal.",
          a: "Stratège de marque",
        },
      ],
      notes: {
        title: "Protocole",
        text: "Les références sont disponibles sur demande. La discrétion fait partie du processus.",
      },
    },

    footer: {
      rights: "Tous droits réservés",
      contact: "Contact privé",
    },

    seo: {
      baseTitle: "Dmitrii Garanin — Acteur / Créatif / IT | Portfolio International de Luxe",
      baseDesc: "Site personnel luxueux noir et or : démo, portfolio, avis et contact.",
      siteUrl: "https://dmitriigaranin.com",
    },
  },

  am: {
    brand: "Դմիտրի Գարանին",
    tagline: "Դերասան • Կրեատիվ • IT — Միջազգային պորտֆոլիո",

    nav: {
      home: "Գլխավոր",
      about: "Մասին",
      portfolio: "Պորտֆոլիո",
      reviews: "Կարծիքներ",
      behind: "Կադրերից դուրս",
      contact: "Կապ",
    },

    home: {
      note: "Լյուքս պորտֆոլիո",
      sub: "Ձեր մասնագիտական նկարագրությունը: Ներկայացրեք ձեր փորձը, ոճը և ստեղծագործական աշխատանքին մոտեցումը:",
      signatureTitle: "Ստորագրություն",
      signatureText: "Կինեմատոգրաֆիկ ներկայություն պրեմիում մինիմալիզմով: Կենտրոնացում նրբությունների, ժամանակի և կադրի կատարյալ մատուցման վրա:",
    },

    about: {
      p1: "Առաջին պարբերություն ձեր բեկգրաունդի, փորձի և ստեղծագործական փիլիսոփայության մասին: Նկարագրեք ձեր ճանապարհը և ձեզ շարժառիթները:",
      p2: "Երկրորդ պարբերություն հատուկ հմտությունների, նախագծերի կամ համագործակցությունների մասին: Նշեք ձեր աշխատանքին մոտեցումը և ձեզ առանձնացնող գործոնները:",
      stats: [
        { k: "Փորձի տարիներ", v: "10+" },
        { k: "Ավարտված նախագծեր", v: "50+" },
        { k: "Միջազգային հաճախորդներ", v: "100+" },
      ],
    },

    reviews: {
      pill: "Մասնավոր արձագանքներ",
      h1a: "Վստահելի",
      h1b: "ներկայություն",
      sub: "Ընտրված խոսքեր մասնագետներից, ովքեր գնահատում են ճշգրտությունը, զսպվածությունը և կինեմատոգրաֆիկ կարգապահությունը:",
      sections: {
        focus: "Ինչ են նկատում",
        signal: "Ինչ է դա հաղորդում",
      },
      list: [
        {
          q: "Հազվագյուտ էկրանային ներկայություն: Հանգիստ, վերահսկվող և անտեսելի:",
          a: "Ֆիլմի պրոդյուսեր",
        },
        {
          q: "Մինիմալիզմ, որը թանկարժեք է թվում: Յուրաքանչյուր կադր միտումնավոր է:",
          a: "Կրեատիվ տնօրեն",
        },
        {
          q: "Նա հասկանում է տեմպը, լռությունը և տեսախցիկի լեզուն ավելի լավ, քան մեծամասնությունը:",
          a: "Կաստինգի խորհրդատու",
        },
        {
          q: "Ոճի միջազգային մակարդակ: Անաղմուկ — միայն ազդանշան:",
          a: "Բրենդի ռազմավար",
        },
      ],
      notes: {
        title: "Պրոտոկոլ",
        text: "Տեղեկանքներ տրամադրվում են պահանջով: Խոհեմությունը գործընթացի մաս է:",
      },
    },

    footer: {
      rights: "Բոլոր իրավունքները պաշտպանված են",
      contact: "Մասնավոր կապ",
    },

    seo: {
      baseTitle: "Դմիտրի Գարանին — Դերասան / Կրեատիվ / IT | Միջազգային Լյուքս Պորտֆոլիո",
      baseDesc: "Լյուքս սև և ոսկյա անձնական կայք՝ շոու-ռիլ, պորտֆոլիո, կարծիքներ և կապ:",
      siteUrl: "https://dmitriigaranin.com",
    },
  },
};

/**
 * TRANSLATION HELPER
 * Safely returns translation object for the given language
 */
export function t(lang: string = "en"): CopyLang {
  // Type guard to ensure lang is a valid key
  const validatedLang = lang in copy ? (lang as Lang) : "en";
  return copy[validatedLang];
}

/**
 * SAFE HELPER
 * Safely returns value or fallback if undefined/null
 */
export const SAFE = (value: any, fallback: string = ""): string => {
  return value !== undefined && value !== null ? String(value) : fallback;
};

/**
 * PICK HELPER
 * Safely retrieves nested property from object using dot notation
 */
export const pick = (
  obj: any,
  path: string,
  fallback: any = ""
): any => {
  if (!obj || typeof obj !== "object") return fallback;
  
  const keys = path.split(".");
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === "object" && key in result) {
      result = result[key];
    } else {
      return fallback;
    }
  }
  
  return result !== undefined && result !== null ? result : fallback;
};

/**
 * GET TEXT HELPER (optional, for more concise usage)
 * Combines SAFE and pick for common use case
 */
export const getText = (
  lang: string,
  path: string,
  fallback: string = ""
): string => {
  const data = t(lang);
  return SAFE(pick(data, path), fallback);
};