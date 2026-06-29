import { LANGS, ROUTES, DEFAULT_LANG, DEFAULT_ROUTE, buildPath, resolveLang, resolveRoute } from "./routes.js";

export const SITE_ORIGIN = "https://dmitriigaranin.com";
export const SITE_NAME = "Dmitrii Garanin";
export const DEFAULT_SEO_IMAGE = `${SITE_ORIGIN}/portfolio-media/dmitrii-headshot-2026.jpg`;

export const PORTFOLIO_IMAGE_SITEMAP_ITEMS = [
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-official-photo-2026.jpg`,
    title: "Dmitrii Garanin official actor photo 2026",
    caption:
      "Official actor photo of Dmitrii Garanin for casting, biography, VGIK actor portfolio and media references.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitriy-garanin-akter-vgik-portret-na-kryshe-goroda.jpg`,
    title: "Dmitriy Garanin actor VGIK rooftop city portrait",
    caption:
      "Cinematic rooftop portrait of Dmitriy Garanin, actor portfolio image for cinema, VGIK and editorial search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-actor-vgik-tropical-portrait.jpg`,
    title: "Dmitrii Garanin actor VGIK tropical portrait",
    caption:
      "Tropical editorial portrait of Dmitrii Garanin for actor portfolio, media presence and international visual identity.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitry-garanin-actor-vgik-cinematic-portrait-pool.jpg`,
    title: "Dmitry Garanin actor VGIK cinematic pool portrait",
    caption:
      "Cinematic poolside actor portrait of Dmitry Garanin for casting materials, portfolio discovery and image search.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-vgik-actor-racing-cinema-portrait.jpg`,
    title: "Dmitrii Garanin VGIK graduate theatre and cinema actor portrait",
    caption:
      "Cinematic racing portrait of Dmitrii Garanin, theatre and film actor, VGIK graduate, for casting, press, Google and Yandex image discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-vgik-theatre-cinema-headshot-white.jpg`,
    title: "Dmitrii Garanin theatre and cinema actor headshot",
    caption:
      "Clean actor headshot of Dmitrii Garanin for biography pages, casting profiles, theatre, cinema, VGIK references and media interviews.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-vgik-actor-close-up-portrait.jpg`,
    title: "Dmitrii Garanin cinematic close-up actor portrait",
    caption:
      "Close-up portrait of Dmitrii Garanin, VGIK actor, theatre and cinema performer, for casting, screen presence and character work.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-theatre-cinema-vgik-soft-portrait.jpg`,
    title: "Dmitrii Garanin theatre cinema VGIK editorial portrait",
    caption:
      "Soft editorial actor portrait of Dmitrii Garanin for theatre, cinema, VGIK biography, press materials, interviews and search indexing.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-vgik-theatre-actor-stage-costume.jpg`,
    title: "Dmitrii Garanin theatre actor stage costume portrait",
    caption:
      "Stage costume portrait of Dmitrii Garanin, VGIK graduate and theatre actor, for theatre, cinema, character roles and media discovery.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-actor-vgik-editorial-white-shirt.jpg`,
    title: "Dmitrii Garanin editorial actor portrait for media",
    caption:
      "Editorial portrait of Dmitrii Garanin for media, interviews, actor portfolio pages, casting visibility, theatre, cinema and VGIK search signals.",
  },
  {
    loc: `${SITE_ORIGIN}/portfolio-media/dmitrii-garanin-vgik-actor-hoodie-portrait.jpg`,
    title: "Dmitrii Garanin natural casting actor portrait",
    caption:
      "Natural casting portrait of Dmitrii Garanin, VGIK graduate, theatre and cinema actor, for Google, Yandex, portfolio and press discovery.",
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

export const SEO_LANGUAGE_NAMES = {
  en: "English",
  ru: "Russian",
  fr: "French",
  am: "Armenian",
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
      title: "Reviews and Professional Signals — Dmitrii Garanin Actor",
      description:
        "References, professional signals and curated feedback for Dmitrii Garanin: acting presence, camera work, media projects and private collaboration context.",
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
      title: "Отзывы и рекомендации — Дмитрий Гаранин, актер",
      description:
        "Отзывы, профессиональные сигналы и рекомендации для Дмитрия Гаранина: актерское присутствие, работа в кадре, медиа и творческие проекты.",
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
      title: "Avis et signaux professionnels — Dmitrii Garanin acteur",
      description:
        "Références, signaux professionnels et retours sélectionnés pour Dmitrii Garanin : présence caméra, jeu d'acteur et projets média.",
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
      title: "Կարծիքներ և մասնագիտական ազդակներ — Դմիտրի Գարանին",
      description:
        "Դմիտրի Գարանինի մասնագիտական կարծիքներ և ազդակներ՝ դերասանական ներկայություն, տեսախցիկի աշխատանք, մեդիա և ստեղծագործական նախագծեր։",
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
  return ROUTE_SEO[safeLang]?.[safeRoute] || ROUTE_SEO[DEFAULT_LANG][safeRoute] || ROUTE_SEO[DEFAULT_LANG][DEFAULT_ROUTE];
}

export function getAlternateLinks(route = DEFAULT_ROUTE) {
  const safeRoute = resolveRoute(route);
  return LANGS.map((lang) => ({
    lang,
    hreflang: SEO_LANGUAGE_TAGS[lang] || lang,
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
