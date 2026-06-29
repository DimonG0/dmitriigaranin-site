// src/lib/copy.ts

export const LANGS = ["en", "ru", "fr", "am"] as const;
export type Lang = (typeof LANGS)[number];

export type NavKeys = "home" | "about" | "portfolio" | "reviews" | "behind" | "contact";

export type CopyBlock = {
  brand: string;
  tagline: string;

  nav: Record<NavKeys, string>;

  seo: {
    baseTitle: string;
    baseDesc: string;
  };

  home: {
    note: string;
    sub: string;
    signatureTitle: string;
    signatureText: string;
    portraitAlt: string;
    tileOverline: string;
    tileCta: string;
  };

  about: {
    p1: string;
    p2: string;
    stats: Array<{ k: string; v: string }>;
  };

  behind: {
    heroTitleLeft: string;
    heroTitleAccent: string;
    heroTagline: string;

    sectionOver: string;
    title: string;
    desc: string;

    chip: string;
    note: string;

    cards: Array<{ title: string; desc: string }>;
  };

  contact: {
    pill: string;
    h1: string;
    sub: string;

    protocolOver: string;
    protocolTitle: string;
    guidelines: string[];

    emailLabel: string;
    emailTitle: string;
    copyEmailBtn: string;

    meta: {
      availabilityLabel: string;
      availabilityValue: string;
      locationLabel: string;
      locationValue: string;
      responseLabel: string;
      responseValue: string;
    };
  };

  portfolio: {
    pill: string;
    h1a: string;
    h1b: string;
    sub: string;

    counters: {
      projects: string; // e.g. "projects"
    };

    categories: {
      all: string;
      film: string;
      theatre: string;
      series: string;
      bloggers: string;
      cinema: string;
    };

    empty: {
      title: string;
      desc: string;
    };

    card: {
      cta: string;
    };

    modal: {
      close: string;
    };

    items: Array<{
      id: string;
      category: "film" | "series" | "bloggers" | "cinema";
      title: string;
      subtitle: string;
      year: string;
      badge: string;
      cover: string;
      tags: string[];
      description: string;
    }>;
  };

  reviews: {
    pill: string;
    h1a: string;
    h1b: string;
    strap: string; // маленькая строка под h1
    sub: string;

    sections: {
      focus: string;
      signal: string;
    };

    left: {
      title1: string;
      lines: Array<{ label: string; value: string }>;
      title2: string;
      desc2: string;
    };

    empty: {
      title: string;
      desc: string;
    };

    notes: {
      title: string;
      text: string;
    };

    badge: string; // "verified tone"
    list: Array<{ q: string; a: string }>;
  };
};

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

    seo: {
      baseTitle: "Dmitrii Garanin — Actor for Cinema, Series and Media Projects",
      baseDesc: "Official portfolio of actor Dmitrii Garanin: cinema, series, blogger collaborations, editorial portraits, reviews and booking contacts.",
    },

    home: {
      note: "Minimal noise. Maximum signal.",
      sub: "A luxury-first personal platform: showreel, portfolio, editorial presence, and direct contact.",
      signatureTitle: "Signature",
      signatureText: "Black & gold restraint. Cinematic pacing. Private positioning.",
      portraitAlt: "Portrait",
      tileOverline: "Explore",
      tileCta: "Open →",
    },

    about: {
      p1: "A controlled presence across acting, creative direction, and premium digital production.",
      p2: "Focused on taste, precision, and clean execution — from camera work to product interfaces.",
      stats: [
        { k: "Years", v: "10+" },
        { k: "Projects", v: "50+" },
        { k: "Clients", v: "100+" },
      ],
    },

    behind: {
      heroTitleLeft: "Backstage",
      heroTitleAccent: "Access",
      heroTagline: "Exclusive • Noir • Controlled",

      sectionOver: "Concept",
      title: "A closed club. A private archive.",
      desc: "Behind-the-scenes is presented like a private vault: calm pacing, premium texture, and curated access.",

      chip: "Restricted access",
      note: "This section contains materials available only to verified collaborators and partners.",

      cards: [
        { title: "Process", desc: "Methodical and controlled creative workflow." },
        { title: "Archive", desc: "Curated unreleased material and drafts." },
        { title: "Access", desc: "Invitation-only viewing permissions." },
      ],
    },

    contact: {
      pill: "Private booking channel",
      h1: "Direct contact",
      sub: "discreet • curated • international",

      protocolOver: "Protocol",
      protocolTitle: "For serious proposals only",
      guidelines: [
        "Clear subject line and concise context.",
        "Links to references / brief, if available.",
        "Timelines and location (if relevant).",
      ],

      emailLabel: "Primary",
      emailTitle: "Email vault",
      copyEmailBtn: "Copy email",

      meta: {
        availabilityLabel: "Availability",
        availabilityValue: "Limited",
        locationLabel: "Location",
        locationValue: "Worldwide",
        responseLabel: "Response",
        responseValue: "24–48h",
      },
    },

    portfolio: {
      pill: "Luxury Portfolio",
      h1a: "Luxury",
      h1b: "Portfolio",
      sub: "Curated archive • Private access • Premium positioning",

      counters: { projects: "projects" },

      categories: {
        all: "All styles",
        film: "Films",
        theatre: "Theatre",
        series: "Series",
        bloggers: "Blogger projects",
        cinema: "Cinema",
      },

      empty: {
        title: "No projects in this category",
        desc: "Select another category or check back later for new additions.",
      },

      card: { cta: "Click to view details" },
      modal: { close: "Close" },

      items: [
        {
          id: "vault-01",
          category: "bloggers",
          title: "Private Campaign — Platinum Edition",
          subtitle: "Luxury brand collaboration (confidential)",
          year: "2026",
          badge: "NDA",
          cover: "https://picsum.photos/seed/lux1/1400/900",
          tags: ["Brand", "Direction", "Premium"],
          description: "High-end visual campaign with a restrained, cinematic tone. Private distribution, curated audience.",
        },
        {
          id: "vault-02",
          category: "film",
          title: "Screen Presence — Noir Cut",
          subtitle: "Acting / showreel sequence",
          year: "2025",
          badge: "SHOWREEL",
          cover: "https://picsum.photos/seed/lux2/1400/900",
          tags: ["Actor", "Camera", "Drama"],
          description: "A compact sequence built around micro-expression, silence, and controlled intensity.",
        },
        {
          id: "vault-03",
          category: "cinema",
          title: "Editorial Portrait — Gold Dust",
          subtitle: "Magazine-grade portrait set",
          year: "2025",
          badge: "EDITORIAL",
          cover: "https://picsum.photos/seed/lux3/1400/900",
          tags: ["Portrait", "Styling", "Art"],
          description: "A minimal, expensive palette: matte black, warm gold edges, and soft neon reflections.",
        },
        {
          id: "vault-04",
          category: "cinema",
          title: "DG System — Product Aesthetic",
          subtitle: "UX concept / premium interface",
          year: "2026",
          badge: "IT",
          cover: "https://picsum.photos/seed/lux4/1400/900",
          tags: ["UI", "Motion", "Luxury"],
          description: "A premium product interface concept where motion feels like an expensive material.",
        },
      ],
    },

    reviews: {
      pill: "Private feedback",
      h1a: "Trusted",
      h1b: "Presence",
      strap: "curated • discreet • professional",
      sub: "Selected words from professionals who value precision, restraint, and cinematic discipline.",

      sections: {
        focus: "What they notice",
        signal: "What it communicates",
      },

      left: {
        title1: "Precision. Restraint. Discipline.",
        lines: [
          { label: "Camera presence", value: "Controlled intensity" },
          { label: "Taste level", value: "International / editorial" },
          { label: "Delivery", value: "Clean, fast, reliable" },
          { label: "Signal", value: "No noise — only intent" },
        ],
        title2: "Premium positioning.",
        desc2: 'This section is curated. No "mass reviews" — only statements that match the tone of a private portfolio.',
      },

      empty: {
        title: "No reviews available",
        desc: "Reviews will be displayed here when available.",
      },

      notes: {
        title: "Protocol",
        text: "References are available upon request. Discretion is part of the process.",
      },

      badge: "verified tone",

      list: [
        { q: "Very controlled, premium tone. Exactly the level we needed.", a: "Producer" },
        { q: "No noise — only intent. Clean delivery and presence.", a: "Director" },
      ],
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

    seo: {
      baseTitle: "Дмитрий Гаранин — актер кино, сериалов и медиа-проектов",
      baseDesc: "Официальный сайт актера Дмитрия Гаранина: портфолио, актерские фото, кино, сериалы, проекты с блогерами, отзывы и контакты.",
    },

    home: {
      note: "Минимум слов. Максимум эффекта.",
      sub: "Люксовая платформа: шоу-рил, портфолио, редакционное присутствие и прямой контакт.",
      signatureTitle: "Подпись",
      signatureText: "Сдержанный black & gold. Кинематографичный ритм. Приватное позиционирование.",
      portraitAlt: "Портрет",
      tileOverline: "Раздел",
      tileCta: "Открыть →",
    },

    about: {
      p1: "Сдержанное присутствие на стыке актёрства, креативного продакшена и премиальной цифровой подачи.",
      p2: "Фокус на вкусе, точности и чистом исполнении — от кадра до интерфейса продукта.",
      stats: [
        { k: "Опыт", v: "10+ лет" },
        { k: "Проекты", v: "50+" },
        { k: "Клиенты", v: "100+" },
      ],
    },

    behind: {
      heroTitleLeft: "За кулисами",
      heroTitleAccent: "Доступ",
      heroTagline: "Эксклюзив • Нуар • Контроль",

      sectionOver: "Концепция",
      title: "Закрытый клуб. Приватный архив.",
      desc: "Раздел «За кадром» оформлен как сейф: спокойный темп, премиальная текстура и доступ по отбору.",

      chip: "Доступ ограничен",
      note: "Материалы доступны только подтверждённым партнёрам и коллабораторам.",

      cards: [
        { title: "Процесс", desc: "Методичная и управляемая работа." },
        { title: "Архив", desc: "Кураторские черновики и материалы, не публикуемые массово." },
        { title: "Доступ", desc: "Просмотр по приглашению." },
      ],
    },

    contact: {
      pill: "Приватный канал связи",
      h1: "Контакт напрямую",
      sub: "деликатно • выборочно • международно",

      protocolOver: "Протокол",
      protocolTitle: "Только серьёзные предложения",
      guidelines: [
        "Коротко и по делу: контекст в 3–6 строк.",
        "Ссылки на референсы/бриф (если есть).",
        "Сроки и локация (если применимо).",
      ],

      emailLabel: "Основной",
      emailTitle: "Email-сейф",
      copyEmailBtn: "Скопировать email",

      meta: {
        availabilityLabel: "Доступность",
        availabilityValue: "Ограничено",
        locationLabel: "Локация",
        locationValue: "Worldwide",
        responseLabel: "Ответ",
        responseValue: "24–48ч",
      },
    },

    portfolio: {
      pill: "Портфолио",
      h1a: "Luxury",
      h1b: "Портфолио",
      sub: "Кураторский архив • Приватный доступ • Премиальная подача",

      counters: { projects: "проектов" },

      categories: {
        all: "Все стили",
        film: "Фильмы",
        theatre: "Театр",
        series: "Сериалы",
        bloggers: "Проекты с блогерами",
        cinema: "Кино",
      },

      empty: {
        title: "В этой категории пока нет проектов",
        desc: "Выберите другую категорию или загляните позже — архив пополняется.",
      },

      card: { cta: "Открыть детали" },
      modal: { close: "Закрыть" },

      // можно переводить отдельно, но пока — тот же массив (заголовки можно оставить как названия проектов)
      items: (null as any), // будет подмешано из EN через i18n merge
    },

    reviews: {
      pill: "Отзывы",
      h1a: "Доверие",
      h1b: "К присутствию",
      strap: "кураторски • деликатно • профессионально",
      sub: "Выдержки от людей, которые ценят точность, сдержанность и кинематографичную дисциплину.",

      sections: { focus: "Что отмечают", signal: "Что это транслирует" },

      left: {
        title1: "Точность. Сдержанность. Дисциплина.",
        lines: [
          { label: "Подача в кадре", value: "Контролируемая интенсивность" },
          { label: "Уровень вкуса", value: "Международно / editorial" },
          { label: "Исполнение", value: "Чисто, быстро, надёжно" },
          { label: "Сигнал", value: "Без шума — только намерение" },
        ],
        title2: "Премиальное позиционирование.",
        desc2: "Раздел отобран. Не «массовые отзывы», а только те, что совпадают с тоном приватного портфолио.",
      },

      empty: {
        title: "Пока нет отзывов",
        desc: "Когда появятся — они будут отображаться здесь.",
      },

      notes: {
        title: "Протокол",
        text: "Рекомендации и подтверждения — по запросу. Дискретность — часть процесса.",
      },

      badge: "подтверждено",
      list: [
        { q: "Очень сдержанный, премиальный тон. Именно тот уровень, который нам был нужен.", a: "Продюсер" },
        { q: "Никакого шума — только намерение. Чистая подача и присутствие.", a: "Режиссёр" },
      ],
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

    seo: {
      baseTitle: "Dmitrii Garanin — Acteur pour cinéma, séries et projets média",
      baseDesc: "Portfolio officiel de l'acteur Dmitrii Garanin : cinéma, séries, collaborations blogueurs, portraits éditoriaux, avis et contacts.",
    },

    home: {
      note: "Moins de mots. Plus d’impact.",
      sub: "Plateforme de luxe : showreel, portfolio, présence éditoriale et contact direct.",
      signatureTitle: "Signature",
      signatureText: "Sobriété black & gold. Rythme cinématographique. Positionnement privé.",
      portraitAlt: "Portrait",
      tileOverline: "Explorer",
      tileCta: "Ouvrir →",
    },

    about: {
      p1: "Une présence maîtrisée entre jeu, direction créative et production digitale premium.",
      p2: "Focus sur le goût, la précision et une exécution nette — de la caméra à l’interface produit.",
      stats: [
        { k: "Années", v: "10+" },
        { k: "Projets", v: "50+" },
        { k: "Clients", v: "100+" },
      ],
    },

    behind: {
      heroTitleLeft: "Accès",
      heroTitleAccent: "Coulisses",
      heroTagline: "Exclusif • Noir • Contrôlé",

      sectionOver: "Concept",
      title: "Un club fermé. Une archive privée.",
      desc: "Les coulisses sont présentées comme un coffre : rythme calme, texture premium, accès curaté.",

      chip: "Accès restreint",
      note: "Matériaux disponibles uniquement pour les partenaires et collaborateurs vérifiés.",

      cards: [
        { title: "Process", desc: "Flux créatif méthodique et contrôlé." },
        { title: "Archive", desc: "Matériaux inédits et brouillons curatés." },
        { title: "Accès", desc: "Visionnage sur invitation." },
      ],
    },

    contact: {
      pill: "Canal privé",
      h1: "Contact direct",
      sub: "discret • curaté • international",

      protocolOver: "Protocole",
      protocolTitle: "Propositions sérieuses uniquement",
      guidelines: [
        "Objet clair + contexte concis.",
        "Liens / brief si disponible.",
        "Délais et localisation (si pertinent).",
      ],

      emailLabel: "Principal",
      emailTitle: "Coffre email",
      copyEmailBtn: "Copier l’email",

      meta: {
        availabilityLabel: "Disponibilité",
        availabilityValue: "Limitée",
        locationLabel: "Localisation",
        locationValue: "Worldwide",
        responseLabel: "Réponse",
        responseValue: "24–48h",
      },
    },

    portfolio: {
      pill: "Portfolio",
      h1a: "Luxury",
      h1b: "Portfolio",
      sub: "Archive curatée • Accès privé • Positionnement premium",
      counters: { projects: "projets" },
      categories: {
        all: "Tous les styles",
        film: "Films",
        theatre: "Théâtre",
        series: "Séries",
        bloggers: "Projets avec blogueurs",
        cinema: "Cinéma",
      },
      empty: {
        title: "Aucun projet dans cette catégorie",
        desc: "Choisissez une autre catégorie ou revenez plus tard.",
      },
      card: { cta: "Voir les détails" },
      modal: { close: "Fermer" },
      items: (null as any),
    },

    reviews: {
      pill: "Avis",
      h1a: "Présence",
      h1b: "fiable",
      strap: "curaté • discret • professionnel",
      sub: "Extraits de professionnels qui valorisent précision, retenue et discipline cinématographique.",
      sections: { focus: "Ce qu’ils remarquent", signal: "Ce que cela communique" },
      left: {
        title1: "Précision. Retenue. Discipline.",
        lines: [
          { label: "Présence caméra", value: "Intensité contrôlée" },
          { label: "Niveau de goût", value: "International / éditorial" },
          { label: "Exécution", value: "Net, rapide, fiable" },
          { label: "Signal", value: "Pas de bruit — seulement l’intention" },
        ],
        title2: "Positionnement premium.",
        desc2: "Section curatée. Pas d’avis de masse — uniquement des phrases cohérentes avec le ton du portfolio.",
      },
      empty: { title: "Aucun avis", desc: "Les avis s’afficheront ici lorsqu’ils seront disponibles." },
      notes: { title: "Protocole", text: "Références sur demande. La discrétion fait partie du processus." },
      badge: "ton vérifié",
      list: [
        { q: "Très maîtrisé, ton premium. Exactement le niveau dont nous avions besoin.", a: "Producteur" },
        { q: "Aucun bruit — seulement l’intention. Livraison et présence impeccables.", a: "Réalisateur" },
      ],
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

    seo: {
      baseTitle: "Դմիտրի Գարանին — դերասան կինոյի, սերիալների և մեդիայի համար",
      baseDesc: "Դմիտրի Գարանինի պաշտոնական պորտֆոլիո՝ կինո, սերիալներ, բլոգերների նախագծեր, կարծիքներ և կապ։",
    },

    home: {
      note: "Քիչ բառեր։ Մեծ ազդակ։",
      sub: "Luxury հարթակ՝ շոուռիլ, պորտֆոլիո, խմբագրական ներկայություն և ուղիղ կապ։",
      signatureTitle: "Ստորագրություն",
      signatureText: "Black & gold զսպվածություն։ Կինեմատոգրաֆիկ ռիթմ։ Պրիվատ դիրքավորում։",
      portraitAlt: "Դիմանկար",
      tileOverline: "Բաժին",
      tileCta: "Բացել →",
    },

    about: {
      p1: "Կառավարելի ներկայություն դերասանական, կրեատիվ և պրեմիում թվային արտադրության խաչմերուկում։",
      p2: "Շեշտը՝ ճաշակի, ճշգրտության և մաքուր կատարման վրա՝ կադրից մինչև ինտերֆեյս։",
      stats: [
        { k: "Տարիներ", v: "10+" },
        { k: "Նախագծեր", v: "50+" },
        { k: "Հաճախորդներ", v: "100+" },
      ],
    },

    behind: {
      heroTitleLeft: "Կադրից",
      heroTitleAccent: "դուրս",
      heroTagline: "Էքսկլյուզիվ • Նուար • Վերահսկում",

      sectionOver: "Կոնցեպտ",
      title: "Փակ ակումբ։ Պրիվատ արխիվ։",
      desc: "«Կադրից դուրս»-ը ներկայացված է ինչպես սեյֆ՝ հանգիստ ռիթմ, պրեմիում տեքստուրա և ընտրովի հասանելիություն։",

      chip: "Սահմանափակ հասանելիություն",
      note: "Նյութերը հասանելի են միայն հաստատված գործընկերներին և համագործակիցներին։",

      cards: [
        { title: "Գործընթաց", desc: "Մեթոդական և վերահսկվող աշխատանքային հոսք։" },
        { title: "Արխիվ", desc: "Չհրապարակված նյութեր և տարբերակներ՝ ընտրված։" },
        { title: "Մուտք", desc: "Դիտում՝ միայն հրավերով։" },
      ],
    },

    contact: {
      pill: "Պրիվատ կապի ալիք",
      h1: "Ուղիղ կապ",
      sub: "զուսպ • ընտրված • միջազգային",

      protocolOver: "Պրոտոկոլ",
      protocolTitle: "Միայն լուրջ առաջարկների համար",
      guidelines: [
        "Հստակ վերնագիր + կարճ կոնտեքստ։",
        "Հղումներ/բրիֆ՝ եթե կա։",
        "Ժամկետներ և տեղանք (եթե պետք է)։",
      ],

      emailLabel: "Հիմնական",
      emailTitle: "Email սեյֆ",
      copyEmailBtn: "Պատճենել email-ը",

      meta: {
        availabilityLabel: "Հասանելիություն",
        availabilityValue: "Սահմանափակ",
        locationLabel: "Տարածք",
        locationValue: "Worldwide",
        responseLabel: "Պատասխան",
        responseValue: "24–48ժ",
      },
    },

    portfolio: {
      pill: "Պորտֆոլիո",
      h1a: "Luxury",
      h1b: "Portfolio",
      sub: "Ընտրված արխիվ • Պրիվատ մուտք • Պրեմիում դիրքավորում",
      counters: { projects: "նախագիծ" },
      categories: {
        all: "Բոլոր ոճերը",
        film: "Ֆիլմեր",
        theatre: "Թատրոն",
        series: "Սերիալներ",
        bloggers: "Բլոգերների նախագծեր",
        cinema: "Կինո",
      },
      empty: {
        title: "Այս կատեգորիայում նախագծեր չկան",
        desc: "Ընտրիր այլ կատեգորիա կամ վերադարձիր ավելի ուշ։",
      },
      card: { cta: "Դիտել մանրամասներ" },
      modal: { close: "Փակել" },
      items: (null as any),
    },

    reviews: {
      pill: "Կարծիքներ",
      h1a: "Վստահելի",
      h1b: "ներկայություն",
      strap: "ընտրված • զուսպ • պրոֆեսիոնալ",
      sub: "Ընտրված մեջբերումներ այն մարդկանցից, ովքեր գնահատում են ճշգրտությունը և զսպվածությունը։",
      sections: { focus: "Ինչ են նկատում", signal: "Ինչ է փոխանցում" },
      left: {
        title1: "Ճշգրտություն։ Զսպվածություն։ Կարգապահություն։",
        lines: [
          { label: "Կադրային ներկայություն", value: "Վերահսկվող ինտենսիվություն" },
          { label: "Ճաշակ", value: "International / editorial" },
          { label: "Կատարում", value: "Մաքուր, արագ, վստահելի" },
          { label: "Սիգնալ", value: "Առանց աղմուկի՝ միայն մտադրություն" },
        ],
        title2: "Պրեմիում դիրքավորում։",
        desc2: "Բաժինը ընտրված է․ ոչ զանգվածային կարծիքներ, այլ միայն համապատասխան տոնով արտահայտություններ։",
      },
      empty: { title: "Կարծիքներ չկան", desc: "Երբ լինեն՝ կերևան այստեղ։" },
      notes: { title: "Պրոտոկոլ", text: "Հղումներ՝ ըստ պահանջի։ Զսպվածությունը գործընթացի մաս է։" },
      badge: "ստուգված տոն",
      list: [
        { q: "Շատ վերահսկված, պրեմիում տոն։ Ճիշտ այն մակարդակը, որ մեզ պետք էր։", a: "Պրոդյուսեր" },
        { q: "Ոչ մի աղմուկ — միայն մտադրություն։ Մաքուր մատուցում և ներկայություն։", a: "Ռեժիսոր" },
      ],
    },
  },
};
