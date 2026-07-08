import { LANGS, ROUTES, DEFAULT_LANG, DEFAULT_ROUTE, buildPath, resolveLang, resolveRoute } from "./routes.js";

export const SITE_ORIGIN = "https://dmitriigaranin.com";
export const SITE_NAME = "Dmitrii Garanin";
export const DEFAULT_SEO_IMAGE = `${SITE_ORIGIN}/portfolio-media/dmitriy-garanin-golden-hour-river-portrait.jpg`;

export const PORTFOLIO_IMAGE_SITEMAP_ITEMS = [
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitriy-garanin-golden-hour-river-portrait.jpg`,
    title: "Dmitrii Garanin golden hour river cinematic portrait",
    caption:
      "Cinematic golden hour river portrait of Dmitrii Garanin for actor portfolio, editorial media and screen presence discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-classical-art-museum-portrait.jpg`,
    title: "Dmitrii Garanin classical art museum actor portrait",
    caption:
      "Classical museum actor portrait of Dmitrii Garanin with theatre, sculpture, character and editorial portfolio signals.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-helicopter-portrait.jpg`,
    title: "Dmitrii Garanin helicopter editorial portrait",
    caption:
      "Private flight editorial portrait of Dmitrii Garanin for premium media, lifestyle and brand positioning.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-tropical-island-portrait.jpg`,
    title: "Dmitrii Garanin tropical island white shirt portrait",
    caption:
      "International tropical island portrait of Dmitrii Garanin for cinema, travel, lifestyle and editorial search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitriy-garanin-vecher-v-marine-portret.jpg`,
    title: "Dmitrii Garanin evening marina cinematic portrait",
    caption:
      "Evening marina portrait of Dmitrii Garanin with noir film mood, port atmosphere and character-led visual positioning.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitriy-garanin-european-cafe-lifestyle-portrait.jpg`,
    title: "Dmitrii Garanin European cafe lifestyle portrait",
    caption:
      "European cafe lifestyle portrait of Dmitrii Garanin for social, editorial, premium media and public profile discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-historic-city-portrait.jpg`,
    title: "Dmitrii Garanin historic city white shirt portrait",
    caption:
      "Historic city portrait of Dmitrii Garanin for actor portfolio, travel, cinema, European architecture and editorial search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-summer-stone-wall-portrait.jpg`,
    title: "Dmitrii Garanin summer stone wall full body portrait",
    caption:
      "Full-body summer portrait of Dmitrii Garanin near a stone wall with theatre poster clarity and outdoor character presence.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-motorcycle-rider-portrait.jpg`,
    title: "Dmitrii Garanin motorcycle rider helmet portrait",
    caption:
      "Action-ready motorcycle rider portrait of Dmitrii Garanin for film, movement, action character and cinematic portfolio search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-evening-city-portrait.jpg`,
    title: "Dmitrii Garanin evening city portrait with headphones",
    caption:
      "Evening city portrait of Dmitrii Garanin with headphones for urban series, youth drama and contemporary media positioning.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-sport-lifestyle-portrait.jpg`,
    title: "Dmitrii Garanin sport lifestyle portrait",
    caption:
      "Sport lifestyle portrait of Dmitrii Garanin with active red and blue visual energy for series, media and lifestyle search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-mens-fashion-portrait-green-sweater.jpg`,
    title: "Dmitrii Garanin green sweater fashion portrait",
    caption:
      "Soft green sweater fashion portrait of Dmitrii Garanin for lifestyle, editorial, casting and public image discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-minimalist-casual-portrait.jpg`,
    title: "Dmitrii Garanin minimalist mirror casual portrait",
    caption:
      "Minimalist mirror portrait of Dmitrii Garanin for casting, clean public identity and actor profile search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-golden-hour-portrait.jpg`,
    title: "Dmitrii Garanin golden hour close-up portrait",
    caption:
      "Warm golden hour close-up portrait of Dmitrii Garanin for headshot, casting, screen presence and editorial discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-casual-modern-living-room-portrait.jpg`,
    title: "Dmitrii Garanin casual modern living room portrait",
    caption:
      "Modern living room editorial portrait of Dmitrii Garanin with youth fashion and lifestyle positioning.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-summer-beach-sunglasses-portrait.jpg`,
    title: "Dmitrii Garanin summer beach sunglasses portrait",
    caption:
      "Sunlit beach sunglasses close-up portrait of Dmitrii Garanin for summer luxury, fashion and editorial search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-tropical-luxury-portrait.jpg`,
    title: "Dmitrii Garanin tropical luxury portrait",
    caption:
      "Tropical luxury resort portrait of Dmitrii Garanin for fashion, lifestyle, premium media and international image discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-morning-selfie.jpg`,
    title: "Dmitrii Garanin morning selfie portrait",
    caption:
      "Natural morning selfie portrait of Dmitrii Garanin for personal, softer actor profile and social media discovery.",
  },
];

export const SEO_LOCALES = {
  en: "en_US",
  ru: "ru_RU",
  fr: "fr_FR",
  am: "hy_AM",
};

export const SEO_LANGUAGE_TAGS = {
  en: "en",
  ru: "ru",
  fr: "fr",
  am: "hy",
};

export const SEO_HREFLANG_TAGS = {
  en: "en",
  ru: "ru-RU",
  fr: "fr-FR",
  am: "hy-AM",
};

export const SEO_REGIONS = {
  en: {
    region: "US",
    place: "United States",
    audience: "Global English-speaking casting, cinema, series and media professionals",
  },
  ru: {
    region: "RU",
    place: "Russia",
    audience: "Russia and Russian-speaking casting, cinema, series, theatre and media professionals",
  },
  fr: {
    region: "FR",
    place: "France",
    audience: "French-speaking cinema, theatre, editorial and media professionals",
  },
  am: {
    region: "AM",
    place: "Armenia",
    audience: "Armenia and Armenian-speaking cinema, theatre, casting and media professionals",
  },
};

export const SEO_LANGUAGE_NAMES = {
  en: "English",
  ru: "Russian",
  fr: "French",
  am: "Armenian",
};

const ROUTE_KEYWORD_HINTS = {
  en: {
    home: "Dmitrii Garanin, Dmitry Garanin, official site, actor, cinema actor, series actor, theatre actor, VGIK, actor portfolio, casting, media projects",
    about: "Dmitrii Garanin biography, actor biography, VGIK, theatre and cinema actor, creative background, media projects",
    portfolio: "Dmitrii Garanin actor portfolio, official photos, headshots, casting photos, cinema portraits, editorial portraits, showreel, VGIK actor",
    reviews: "Dmitrii Garanin reviews, professional references, casting notes, actor presence, media signals",
    behind: "Dmitrii Garanin behind the scenes, acting process, backstage, theatre process, cinema process",
    contact: "contact Dmitrii Garanin, book actor, casting contact, cinema collaboration, media collaboration",
  },
  ru: {
    home: "Дмитрий Гаранин, Дмитрий Гаранин актер, Дмитрий Гаранин актёр, официальный сайт Дмитрия Гаранина, актер кино, актёр кино, сериалы, театр, ВГИК, Россия, Яндекс",
    about: "Дмитрий Гаранин биография, кто такой Дмитрий Гаранин, актер ВГИК, актёр ВГИК, театр и кино, творческий путь, Россия",
    portfolio: "Дмитрий Гаранин портфолио, актерское портфолио, актёрское портфолио, официальные фото, кастинг, актерские фото, актёрские фото, ВГИК, кино, сериалы, Россия, Яндекс",
    reviews: "Дмитрий Гаранин отзывы, рекомендации, профессиональные отзывы, актерское присутствие, актёрское присутствие, кастинг, медиа",
    behind: "Дмитрий Гаранин закулисье, актерский процесс, актёрский процесс, съемки, съёмки, театр, кино, ВГИК",
    contact: "контакты Дмитрий Гаранин, связаться с Дмитрием Гараниным, актер на съемки, актёр на съёмки, кастинг, кино, сериалы, реклама",
  },
  fr: {
    home: "Dmitrii Garanin, acteur, portfolio officiel, cinema, series, theatre, VGIK, casting, projets media",
    about: "Dmitrii Garanin biographie, acteur VGIK, theatre et cinema, parcours creatif, projets media",
    portfolio: "Dmitrii Garanin portfolio acteur, photos officielles, casting, portraits cinema, portraits editoriaux",
    reviews: "Dmitrii Garanin avis, references professionnelles, presence camera, casting",
    behind: "Dmitrii Garanin coulisses, processus acteur, backstage, cinema, theatre",
    contact: "contact Dmitrii Garanin, booking acteur, casting, cinema, series, medias",
  },
  am: {
    home: "Դմիտրի Գարանին, Դմիտրի Գարանին դերասան, պաշտոնական կայք, դերասան, կինո, սերիալներ, թատրոն, ՎԳԻԿ, Հայաստան",
    about: "Դմիտրի Գարանին կենսագրություն, դերասան ՎԳԻԿ, թատրոն եւ կինո, ստեղծագործական ուղի, Հայաստան",
    portfolio: "Դմիտրի Գարանին պորտֆոլիո, դերասանական պորտֆոլիո, պաշտոնական լուսանկարներ, քասթինգ, կինո, թատրոն, Հայաստան",
    reviews: "Դմիտրի Գարանին կարծիքներ, մասնագիտական հղումներ, դերասանական ներկայություն, քասթինգ",
    behind: "Դմիտրի Գարանին կուլիսներ, դերասանական գործընթաց, կինո, թատրոն",
    contact: "կապ Դմիտրի Գարանին, դերասանի կոնտակտ, քասթինգ, կինո, սերիալներ, համագործակցություն",
  },
};

export const ROUTE_SEO = {
  en: {
    home: {
      title: "Dmitrii Garanin — Actor for Cinema, Series and Media Projects",
      description:
        "Official portfolio of actor Dmitrii Garanin: cinema, series, showreel-style visuals, blogger collaborations, editorial portraits, reviews and booking contacts.",
    },
    about: {
      title: "Dmitrii Garanin — Actor Biography, VGIK and Creative Background",
      description:
        "Biography of Dmitrii Garanin: actor, VGIK training, cinema and theatre direction, corporate media experience, international references and creative projects.",
    },
    portfolio: {
      title: "Dmitrii Garanin — Actor Portfolio, VGIK Portraits and Official Photos",
      description:
        "Official actor portfolio of Dmitrii Garanin, VGIK graduate and theatre and cinema actor: portraits, casting materials, editorial images, press photos, interviews, cinema and media projects.",
      keywords:
        "Dmitrii Garanin, Dmitry Garanin, Dmitrii Garanin actor, VGIK graduate, VGIK actor, theatre actor, cinema actor, actor portfolio, official actor photo, casting portrait, actor interview",
    },
    reviews: {
      title: "Reference Desk and Professional Signals — Dmitrii Garanin Actor",
      description:
        "Reference Desk for Dmitrii Garanin: anonymized professional signals, source-logging protocol, acting presence, camera work, media angles and private collaboration context.",
    },
    behind: {
      title: "Behind the Scenes — Dmitrii Garanin Acting and Creative Process",
      description:
        "Behind-the-scenes view of Dmitrii Garanin's acting, creative direction, editorial image-making and premium portfolio development process.",
    },
    contact: {
      title: "Contact Dmitrii Garanin — Booking, Cinema, Series and Collaborations",
      description:
        "Contact actor Dmitrii Garanin for cinema, series, blogger projects, editorial media, advertising, private collaborations and professional requests.",
    },
  },
  ru: {
    home: {
      title: "Дмитрий Гаранин — актер кино, сериалов и медиа-проектов",
      description:
        "Официальный сайт актера Дмитрия Гаранина: портфолио, актерские фото, кино, сериалы, проекты с блогерами, отзывы и контакты для съемок.",
    },
    about: {
      title: "Дмитрий Гаранин — биография актера, ВГИК, кино и проекты",
      description:
        "Биография Дмитрия Гаранина: актер, обучение во ВГИК, кино и театр, корпоративные медиа-проекты, международный опыт и творческий путь.",
    },
    portfolio: {
      title: "Дмитрий Гаранин — актёр ВГИК, портфолио и официальные фото",
      description:
        "Кто такой Дмитрий Гаранин: выпускник ВГИК, актёр театра и кино, официальное портфолио, актёрские фото, кастинг, интервью, кинематографичные портреты и медиа-проекты.",
      keywords:
        "Дмитрий Гаранин, кто такой Дмитрий Гаранин, Дмитрий Гаранин актер, Дмитрий Гаранин актёр, выпускник ВГИК, актер ВГИК, актёр театра и кино, портфолио актера, актерские фото, интервью Дмитрий Гаранин, Яндекс Дмитрий Гаранин",
    },
    reviews: {
      title: "Reference Desk и профессиональные сигналы — Дмитрий Гаранин",
      description:
        "Reference Desk Дмитрия Гаранина: анонимизированные профессиональные сигналы, протокол учета источников, актерское присутствие, работа в кадре, медиа-углы и контекст для интервью.",
    },
    behind: {
      title: "Закулисье и процесс — актерские проекты Дмитрия Гаранина",
      description:
        "Закулисье работы Дмитрия Гаранина: актерский процесс, кино, театр, медиа-подача, визуальные материалы и премиальное портфолио.",
    },
    contact: {
      title: "Контакты Дмитрия Гаранина — съемки, кино, сериалы, проекты",
      description:
        "Связаться с актером Дмитрием Гараниным: съемки в кино и сериалах, проекты с блогерами, реклама, медиа, editorial и сотрудничество.",
    },
  },
  fr: {
    home: {
      title: "Dmitrii Garanin — Acteur pour cinéma, séries et projets média",
      description:
        "Portfolio officiel de l'acteur Dmitrii Garanin : cinéma, séries, visuels éditoriaux, collaborations avec blogueurs, avis et contacts professionnels.",
    },
    about: {
      title: "Dmitrii Garanin — Biographie d'acteur, VGIK et parcours créatif",
      description:
        "Biographie de Dmitrii Garanin : acteur, formation au VGIK, cinéma, théâtre, expérience média corporate, références internationales et projets créatifs.",
    },
    portfolio: {
      title: "Dmitrii Garanin — portfolio acteur, VGIK et photos officielles",
      description:
        "Portfolio officiel de Dmitrii Garanin, acteur de théâtre et de cinéma formé au VGIK : portraits, casting, photos presse, interviews, cinéma, séries et médias.",
      keywords:
        "Dmitrii Garanin, Dmitry Garanin, acteur Dmitrii Garanin, formation VGIK, acteur théâtre cinéma, portfolio acteur, photo officielle acteur, portrait cinéma, interview acteur",
    },
    reviews: {
      title: "Reference Desk et signaux professionnels — Dmitrii Garanin",
      description:
        "Reference Desk de Dmitrii Garanin : signaux professionnels anonymisés, protocole de source, présence caméra, jeu d'acteur, angles média et contexte privé.",
    },
    behind: {
      title: "Behind the Scenes — processus d'acteur de Dmitrii Garanin",
      description:
        "Aperçu du processus de Dmitrii Garanin : jeu d'acteur, direction créative, image éditoriale et développement d'un portfolio premium.",
    },
    contact: {
      title: "Contact Dmitrii Garanin — casting, cinéma, séries et médias",
      description:
        "Contacter l'acteur Dmitrii Garanin pour cinéma, séries, projets avec blogueurs, publicité, médias éditoriaux et collaborations privées.",
    },
  },
  am: {
    home: {
      title: "Դմիտրի Գարանին — դերասան կինոյի, սերիալների և մեդիայի համար",
      description:
        "Դմիտրի Գարանինի պաշտոնական պորտֆոլիո՝ կինո, սերիալներ, դերասանական լուսանկարներ, բլոգերների նախագծեր, կարծիքներ և կապ։",
    },
    about: {
      title: "Դմիտրի Գարանին — դերասանի կենսագրություն, ՎԳԻԿ և ստեղծագործական ուղի",
      description:
        "Դմիտրի Գարանինի կենսագրությունը՝ դերասան, ՎԳԻԿ, կինո և թատրոն, կորպորատիվ մեդիա նախագծեր, միջազգային փորձ և ստեղծագործական ուղի։",
    },
    portfolio: {
      title: "Դմիտրի Գարանին — դերասանական պորտֆոլիո, ՎԳԻԿ և պաշտոնական լուսանկարներ",
      description:
        "Դմիտրի Գարանինի պաշտոնական պորտֆոլիո՝ ՎԳԻԿ շրջանավարտ, թատրոնի և կինոյի դերասան, դիմանկարներ, քասթինգ, մամուլի լուսանկարներ, հարցազրույցներ և մեդիա նախագծեր։",
      keywords:
        "Դմիտրի Գարանին, Դմիտրի Գարանին դերասան, ՎԳԻԿ շրջանավարտ, թատրոնի և կինոյի դերասան, դերասանական պորտֆոլիո, պաշտոնական դերասանական լուսանկար, հարցազրույց",
    },
    reviews: {
      title: "Reference Desk և մասնագիտական ազդակներ — Դմիտրի Գարանին",
      description:
        "Դմիտրի Գարանինի Reference Desk՝ անանուն մասնագիտական ազդակներ, աղբյուրների գրանցման պրոտոկոլ, դերասանական ներկայություն, տեսախցիկի աշխատանք և մեդիա համատեքստ։",
    },
    behind: {
      title: "Կուլիսներ և գործընթաց — Դմիտրի Գարանինի դերասանական նախագծեր",
      description:
        "Դմիտրի Գարանինի աշխատանքի կուլիսները՝ դերասանական գործընթաց, կինո, թատրոն, մեդիա կերպար և պրեմիում պորտֆոլիո։",
    },
    contact: {
      title: "Կապ Դմիտրի Գարանինի հետ — կինո, սերիալներ և համագործակցություն",
      description:
        "Կապ հաստատել դերասան Դմիտրի Գարանինի հետ՝ կինո, սերիալներ, բլոգերների նախագծեր, գովազդ, մեդիա և համագործակցություն։",
    },
  },
};

export function buildAbsoluteUrl(lang = DEFAULT_LANG, route = DEFAULT_ROUTE) {
  return `${SITE_ORIGIN}${buildPath(resolveLang(lang), resolveRoute(route))}`;
}

export function getRouteSeo(lang = DEFAULT_LANG, route = DEFAULT_ROUTE) {
  const safeLang = resolveLang(lang);
  const safeRoute = resolveRoute(route);
  const seo = ROUTE_SEO[safeLang]?.[safeRoute] || ROUTE_SEO[DEFAULT_LANG][safeRoute] || ROUTE_SEO[DEFAULT_LANG][DEFAULT_ROUTE];
  const keywordHint = ROUTE_KEYWORD_HINTS[safeLang]?.[safeRoute] || ROUTE_KEYWORD_HINTS[DEFAULT_LANG]?.[safeRoute];

  return {
    ...seo,
    keywords: [seo.keywords, keywordHint].filter(Boolean).join(", "),
  };
}

export function getAlternateLinks(route = DEFAULT_ROUTE) {
  const safeRoute = resolveRoute(route);
  return LANGS.map((lang) => ({
    lang,
    hreflang: SEO_HREFLANG_TAGS[lang] || SEO_LANGUAGE_TAGS[lang] || lang,
    href: buildAbsoluteUrl(lang, safeRoute),
  }));
}

export function getSitemapEntries() {
  return ROUTES.flatMap((route) =>
    LANGS.map((lang) => ({
      lang,
      route,
      url: buildAbsoluteUrl(lang, route),
      alternates: getAlternateLinks(route),
    }))
  );
}
