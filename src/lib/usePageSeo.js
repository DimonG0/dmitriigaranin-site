import { useMemo } from "react";
import { useSeo } from "./useSeo.js";
import {
  DEFAULT_SEO_IMAGE,
  SEO_LANGUAGE_TAGS,
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

function getSameAsUrls() {
  return [...SOCIAL_LINKS.map((link) => link.url), THREADS_LINK.url];
}

function buildStructuredData({ lang, route, title, description, url, image }) {
  const languageTag = SEO_LANGUAGE_TAGS[lang] || SEO_LANGUAGE_TAGS.en;
  const pageType = ROUTE_SCHEMA_TYPES[route] || "WebPage";
  const personId = `${SITE_ORIGIN}/#person`;
  const websiteId = `${SITE_ORIGIN}/#website`;
  const imageId = `${SITE_ORIGIN}/#primaryimage`;
  const pageId = `${url}#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE_NAME,
        alternateName: ["Dmitrii Garanin", "Дмитрий Гаранин", "Դմիտրի Գարանին"],
        url: SITE_ORIGIN,
        image: {
          "@id": imageId,
        },
        jobTitle: lang === "ru" ? "Актер" : "Actor",
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "VGIK",
          url: "https://vgik.info/",
        },
        knowsAbout: PERSON_KNOWS_ABOUT[lang] || PERSON_KNOWS_ABOUT.en,
        sameAs: getSameAsUrls(),
      },
      {
        "@type": "ImageObject",
        "@id": imageId,
        url: image,
        contentUrl: image,
        caption: "Dmitrii Garanin actor portfolio portrait",
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        name: SITE_NAME,
        alternateName: "Dmitrii Garanin Official Portfolio",
        url: SITE_ORIGIN,
        inLanguage: Object.values(SEO_LANGUAGE_TAGS),
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
        inLanguage: languageTag,
        isPartOf: {
          "@id": websiteId,
        },
        about: {
          "@id": personId,
        },
        mainEntity: {
          "@id": personId,
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
    ],
  };
}

export function usePageSeo(lang = "en", route = "home") {
  const seo = getRouteSeo(lang, route);
  const url = buildAbsoluteUrl(lang, route);
  const alternates = useMemo(() => getAlternateLinks(route), [route]);
  const structuredData = useMemo(
    () =>
      buildStructuredData({
        lang,
        route,
        title: seo.title,
        description: seo.description,
        url,
        image: DEFAULT_SEO_IMAGE,
      }),
    [lang, route, seo.description, seo.title, url]
  );

  useSeo({
    title: seo.title,
    description: seo.description,
    url,
    lang,
    image: DEFAULT_SEO_IMAGE,
    imageAlt: "Dmitrii Garanin actor portfolio portrait",
    alternates,
    siteName: SITE_NAME,
    type: route === "home" ? "profile" : "website",
    structuredData,
  });

  return seo;
}
