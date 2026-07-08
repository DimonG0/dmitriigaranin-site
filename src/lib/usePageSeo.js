import { useMemo } from "react";
import { useSeo } from "./useSeo.js";
import {
  DEFAULT_SEO_IMAGE,
  SEO_LANGUAGE_TAGS,
  SEO_REGIONS,
  SITE_NAME,
  SITE_ORIGIN,
  buildAbsoluteUrl,
  getAlternateLinks,
  getRouteSeo,
} from "./seoConfig.js";
import { SOCIAL_LINKS, THREADS_LINK } from "./socialLinks.js";

const ROUTE_SCHEMA_TYPES = {
  home: "ProfilePage",
  about: "AboutPage",
  portfolio: "CollectionPage",
  reviews: "ReviewPage",
  behind: "WebPage",
  contact: "ContactPage",
};

const PERSON_KNOWS_ABOUT = {
  en: ["actor", "cinema", "series", "theatre", "voiceover", "editorial portrait", "media projects"],
  ru: ["актер", "кино", "сериалы", "театр", "озвучивание", "актерское портфолио", "проекты с блогерами"],
  fr: ["acteur", "cinéma", "séries", "théâtre", "voix off", "portrait éditorial", "projets média"],
  am: ["դերասան", "կինո", "սերիալներ", "թատրոն", "ձայն", "դերասանական պորտֆոլիո"],
};

const PERSON_ALTERNATE_NAMES = {
  en: ["Dmitrii Garanin", "Dmitry Garanin", "Dmitrii Garanin actor", "Dmitry Garanin actor"],
  ru: ["Дмитрий Гаранин", "Дима Гаранин", "Дмитрий Гаранин актер", "Дмитрий Гаранин актёр", "Dmitrii Garanin", "Dmitry Garanin"],
  fr: ["Dmitrii Garanin", "Dmitry Garanin", "Dmitrii Garanin acteur"],
  am: ["Դմիտրի Գարանին", "Դմիտրի Գարանին դերասան", "Dmitrii Garanin", "Dmitry Garanin"],
};

const SUPPORTED_LANGUAGES = [
  { "@type": "Language", name: "English", alternateName: "en" },
  { "@type": "Language", name: "Russian", alternateName: "ru" },
  { "@type": "Language", name: "French", alternateName: "fr" },
  { "@type": "Language", name: "Armenian", alternateName: "hy" },
];

const EMPTY_COLLECTION_ITEMS = [];

function getSameAsUrls() {
  return [...SOCIAL_LINKS.map((link) => link.url), THREADS_LINK.url];
}

function toAbsoluteUrl(value) {
  if (!value) return undefined;
  return String(value).startsWith("http") ? String(value) : `${SITE_ORIGIN}${value}`;
}

function buildStructuredData({ lang, route, title, description, url, image, imageAlt, keywords, collectionItems = [] }) {
  const languageTag = SEO_LANGUAGE_TAGS[lang] || SEO_LANGUAGE_TAGS.en;
  const region = SEO_REGIONS[lang] || SEO_REGIONS.en;
  const pageType = ROUTE_SCHEMA_TYPES[route] || "WebPage";
  const personId = `${SITE_ORIGIN}/#person`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const imageId = `${SITE_ORIGIN}/#primaryimage`;
  const pageId = `${url}#webpage`;
  const portfolioImages = Array.isArray(collectionItems)
    ? collectionItems.filter((item) => item?.cover)
    : [];

  const graph = [
    {
      "@type": "Person",
      "@id": personId,
      name: SITE_NAME,
      alternateName: PERSON_ALTERNATE_NAMES[lang] || PERSON_ALTERNATE_NAMES.en,
      url: SITE_ORIGIN,
      image: {
        "@id": imageId,
      },
      description,
      jobTitle: lang === "ru" ? "Актер" : "Actor",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "VGIK",
        url: "https://vgik.info/",
      },
      knowsLanguage: SUPPORTED_LANGUAGES,
      knowsAbout: PERSON_KNOWS_ABOUT[lang] || PERSON_KNOWS_ABOUT.en,
      sameAs: getSameAsUrls(),
    },
    {
      "@type": "ImageObject",
      "@id": imageId,
      url: toAbsoluteUrl(image),
      contentUrl: toAbsoluteUrl(image),
      caption: imageAlt || "Dmitrii Garanin actor portfolio portrait",
      creator: {
        "@id": personId,
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: SITE_NAME,
      alternateName: "Dmitrii Garanin Official Portfolio",
      url: SITE_ORIGIN,
      inLanguage: Object.values(SEO_LANGUAGE_TAGS),
      audience: {
        "@type": "Audience",
        name: region.audience,
        geographicArea: {
          "@type": "Country",
          name: region.place,
        },
      },
      publisher: {
        "@id": personId,
      },
    },
    {
      "@type": pageType,
      "@id": pageId,
      url,
      name: title,
      description,
      keywords,
      inLanguage: languageTag,
      isAccessibleForFree: true,
      spatialCoverage: {
        "@type": "Country",
        name: region.place,
      },
      audience: {
        "@type": "Audience",
        name: region.audience,
        geographicArea: {
          "@type": "Country",
          name: region.place,
        },
      },
      isPartOf: {
        "@id": websiteId,
      },
      about: {
        "@id": personId,
      },
      mainEntity: {
        "@id": route === "portfolio" && portfolioImages.length ? `${url}#portfolio-item-list` : personId,
      },
      primaryImageOfPage: {
        "@id": imageId,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: buildAbsoluteUrl(lang, "home"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: title,
          item: url,
        },
      ],
    },
  ];

  if (route === "portfolio" && portfolioImages.length) {
    const imageObjects = portfolioImages.map((item, index) => {
      const itemId = `${url}#portfolio-image-${item.id || index + 1}`;
      const itemImage = toAbsoluteUrl(item.cover);

      return {
        "@type": "ImageObject",
        "@id": itemId,
        name: item.title,
        alternateName: item.alt,
        description: item.description,
        caption: item.alt || item.title,
        url: itemImage,
        contentUrl: itemImage,
        inLanguage: languageTag,
        creator: {
          "@id": personId,
        },
        about: {
          "@id": personId,
        },
      };
    });

    graph.push(
      {
        "@type": "ItemList",
        "@id": `${url}#portfolio-item-list`,
        name: title,
        description,
        numberOfItems: imageObjects.length,
        itemListElement: imageObjects.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@id": item["@id"],
          },
        })),
      },
      ...imageObjects
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

export function usePageSeo(lang = "en", route = "home", options = {}) {
  const seo = getRouteSeo(lang, route);
  const url = buildAbsoluteUrl(lang, route);
  const alternates = useMemo(() => getAlternateLinks(route), [route]);
  const image = options.image || DEFAULT_SEO_IMAGE;
  const imageAlt = options.imageAlt || "Dmitrii Garanin actor portfolio portrait";
  const collectionItems = Array.isArray(options.collectionItems)
    ? options.collectionItems
    : EMPTY_COLLECTION_ITEMS;
  const structuredData = useMemo(
    () =>
      buildStructuredData({
        lang,
        route,
        title: seo.title,
        description: seo.description,
        keywords: seo.keywords,
        url,
        image,
        imageAlt,
        collectionItems,
      }),
    [collectionItems, image, imageAlt, lang, route, seo.description, seo.keywords, seo.title, url]
  );

  useSeo({
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    url,
    lang,
    image,
    imageAlt,
    alternates,
    siteName: SITE_NAME,
    type: route === "home" ? "profile" : "website",
    structuredData,
  });

  return seo;
}
