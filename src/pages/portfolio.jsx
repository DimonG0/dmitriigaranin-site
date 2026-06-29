// src/pages/portfolio.jsx
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";
import { usePageSeo } from "../lib/usePageSeo";

const ease = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, delay: 0.12 + i * 0.08, ease },
  }),
};

const visualPortfolioItems = [
  {
    id: "official-photo-2026",
    category: "cinema",
    title: "Dmitrii Garanin Official Actor Photo 2026",
    subtitle: "Official portrait for casting, biography pages, and press use",
    year: "2026",
    badge: "OFFICIAL",
    cover: "/portfolio-media/dmitrii-garanin-official-photo-2026.jpg",
    alt: "Dmitrii Garanin official actor photo 2026, VGIK actor portrait",
    tags: ["Dmitrii Garanin", "Actor", "VGIK"],
    description:
      "A direct official portrait for searches around who Dmitrii Garanin is, actor biography pages, casting profiles, and professional media references.",
  },
  {
    id: "rooftop-city-portrait",
    category: "film",
    title: "Dmitrii Garanin Rooftop City Portrait",
    subtitle: "Urban cinematic actor portrait with a strong screen presence",
    year: "2026",
    badge: "CITY",
    cover: "/portfolio-media/dmitriy-garanin-akter-vgik-portret-na-kryshe-goroda.jpg",
    alt: "Dmitriy Garanin actor VGIK rooftop city portrait",
    tags: ["Actor", "Cinema", "Portrait"],
    description:
      "A cinematic rooftop portrait of Dmitrii Garanin, built for actor portfolio discovery, image search, and editorial context around cinema, youth, and urban drama.",
  },
  {
    id: "tropical-vgik-portrait",
    category: "bloggers",
    title: "Dmitrii Garanin Tropical Editorial Portrait",
    subtitle: "Warm lifestyle frame for media, social, and brand positioning",
    year: "2026",
    badge: "EDITORIAL",
    cover: "/portfolio-media/dmitrii-garanin-actor-vgik-tropical-portrait.jpg",
    alt: "Dmitrii Garanin actor VGIK tropical portrait",
    tags: ["Editorial", "Media", "Lifestyle"],
    description:
      "A bright tropical actor portrait that expands the public visual identity of Dmitrii Garanin with a relaxed, premium, and international editorial tone.",
  },
  {
    id: "cinematic-pool-portrait",
    category: "cinema",
    title: "Dmitry Garanin Cinematic Pool Portrait",
    subtitle: "Natural poolside portrait with a calm cinematic mood",
    year: "2026",
    badge: "PORTRAIT",
    cover: "/portfolio-media/dmitry-garanin-actor-vgik-cinematic-portrait-pool.jpg",
    alt: "Dmitry Garanin actor VGIK cinematic pool portrait",
    tags: ["Portrait", "Casting", "Cinema"],
    description:
      "A poolside portrait with natural light, soft character presence, and clear actor portfolio value for searches around Dmitry Garanin and VGIK acting materials.",
  },
  {
    id: "headshot-2026",
    category: "cinema",
    title: "Headshot 2026",
    subtitle: "Natural light portrait for casting and profile use",
    year: "2026",
    badge: "HEADSHOT",
    cover: "/portfolio-media/dmitrii-headshot-2026.jpg",
    tags: ["Actor", "Portrait", "Casting"],
    description:
      "A clean, warm portrait built around direct presence, open light, and a natural screen-ready expression.",
  },
  {
    id: "vgik-racing-cinema-portrait",
    category: "cinema",
    title: "Dmitrii Garanin VGIK Actor Racing Cinema Portrait",
    subtitle: "Theatre and film actor portrait with action-screen energy",
    year: "2026",
    badge: "CINEMA",
    cover: "/portfolio-media/dmitrii-garanin-vgik-actor-racing-cinema-portrait.jpg",
    alt: "Dmitrii Garanin VGIK graduate theatre and cinema actor racing portrait",
    tags: ["Dmitrii Garanin", "VGIK graduate", "Theatre actor", "Cinema actor", "Casting"],
    description:
      "A cinematic action-style portrait of Dmitrii Garanin, a theatre and film actor with VGIK training, prepared as actor portfolio, casting and press material for Google, Yandex, cinema and media discovery.",
  },
  {
    id: "vgik-theatre-cinema-headshot-white",
    category: "theatre",
    title: "Dmitrii Garanin Theatre and Cinema Actor Headshot",
    subtitle: "Clean actor headshot for press, casting and biography pages",
    year: "2026",
    badge: "VGIK",
    cover: "/portfolio-media/dmitrii-garanin-vgik-theatre-cinema-headshot-white.jpg",
    alt: "Dmitrii Garanin theatre and cinema actor VGIK graduate headshot",
    tags: ["Dmitrii Garanin", "Theatre", "Cinema", "VGIK", "Actor headshot"],
    description:
      "A clean close actor headshot of Dmitrii Garanin for biography pages, casting profiles, theatre and cinema references, interview requests and official actor portfolio indexing.",
  },
  {
    id: "vgik-actor-close-up-portrait",
    category: "film",
    title: "Dmitrii Garanin Cinematic Close-Up Actor Portrait",
    subtitle: "Intense screen close-up for cinema, series and character work",
    year: "2026",
    badge: "CLOSE-UP",
    cover: "/portfolio-media/dmitrii-garanin-vgik-actor-close-up-portrait.jpg",
    alt: "Dmitrii Garanin VGIK actor close-up portrait for cinema and theatre casting",
    tags: ["Close-up", "Actor portrait", "VGIK", "Cinema", "Theatre"],
    description:
      "A close-up portrait focused on screen presence, useful for searches around Dmitrii Garanin actor, VGIK graduate, theatre and cinema performer, casting portrait and character-driven media materials.",
  },
  {
    id: "theatre-cinema-vgik-soft-portrait",
    category: "theatre",
    title: "Dmitrii Garanin Soft Editorial Actor Portrait",
    subtitle: "Natural actor portrait for theatre, cinema and editorial media",
    year: "2026",
    badge: "PORTRAIT",
    cover: "/portfolio-media/dmitrii-garanin-theatre-cinema-vgik-soft-portrait.jpg",
    alt: "Dmitrii Garanin theatre and cinema actor soft editorial portrait VGIK",
    tags: ["Editorial", "Theatre actor", "Cinema actor", "VGIK", "Press"],
    description:
      "A soft editorial portrait of Dmitrii Garanin that supports search signals for theatre actor, cinema actor, VGIK graduate, actor biography, press image and professional portfolio materials.",
  },
  {
    id: "vgik-theatre-actor-stage-costume",
    category: "theatre",
    title: "Dmitrii Garanin Theatre Actor Stage Costume Portrait",
    subtitle: "Stage-ready visual for theatre, movement and character roles",
    year: "2026",
    badge: "THEATRE",
    cover: "/portfolio-media/dmitrii-garanin-vgik-theatre-actor-stage-costume.jpg",
    alt: "Dmitrii Garanin VGIK graduate theatre actor stage costume portrait",
    tags: ["Theatre", "Stage", "Actor", "VGIK", "Character"],
    description:
      "A theatre-led actor portrait of Dmitrii Garanin in stage costume, positioned for searches about theatre and film actor Dmitrii Garanin, VGIK background, character work and media interviews.",
  },
  {
    id: "actor-vgik-editorial-white-shirt",
    category: "bloggers",
    title: "Dmitrii Garanin Editorial Actor Portrait",
    subtitle: "Public-facing actor image for media, interviews and collaborations",
    year: "2026",
    badge: "MEDIA",
    cover: "/portfolio-media/dmitrii-garanin-actor-vgik-editorial-white-shirt.jpg",
    alt: "Dmitrii Garanin actor VGIK editorial portrait for cinema theatre media",
    tags: ["Media", "Interview", "Actor portfolio", "VGIK", "Cinema"],
    description:
      "An editorial portrait of Dmitrii Garanin for media discovery, interview context, actor profile pages, casting visibility and theatre-cinema portfolio indexing across search engines.",
  },
  {
    id: "vgik-actor-hoodie-portrait",
    category: "cinema",
    title: "Dmitrii Garanin Casual Casting Actor Portrait",
    subtitle: "Natural profile image for actor casting and screen presence",
    year: "2026",
    badge: "CASTING",
    cover: "/portfolio-media/dmitrii-garanin-vgik-actor-hoodie-portrait.jpg",
    alt: "Dmitrii Garanin VGIK actor casual casting portrait theatre cinema",
    tags: ["Casting", "Actor", "VGIK", "Theatre", "Cinema"],
    description:
      "A natural casual casting portrait of Dmitrii Garanin, reinforcing actor portfolio signals for Google and Yandex around VGIK graduate, theatre actor, cinema actor and professional media presence.",
  },
];

const portfolioItemCopy = {
  ru: {
    "official-photo-2026": {
      title: "Официальное фото Дмитрия Гаранина 2026",
      subtitle: "Актёрский портрет для кастинга, биографии и пресс-материалов",
      badge: "ОФИЦИАЛЬНО",
      alt: "Дмитрий Гаранин официальное фото актера 2026, портрет актера ВГИК",
      tags: ["Дмитрий Гаранин", "Актёр", "ВГИК"],
      description:
        "Прямой официальный портрет для запросов «кто такой Дмитрий Гаранин», актёрских биографий, кастинговых профилей и профессиональных медиа-материалов.",
    },
    "rooftop-city-portrait": {
      title: "Дмитрий Гаранин — портрет на крыше города",
      subtitle: "Городской кинематографичный портрет актёра с сильным экранным присутствием",
      badge: "ГОРОД",
      alt: "Дмитрий Гаранин актер ВГИК портрет на крыше города",
      tags: ["Актёр", "Кино", "Портрет"],
      description:
        "Кинематографичный портрет Дмитрия Гаранина на городской крыше: образ для актёрского портфолио, поиска по фото и запросов о кино, ВГИК и современной экранной подаче.",
    },
    "tropical-vgik-portrait": {
      title: "Дмитрий Гаранин — тропический editorial-портрет",
      subtitle: "Тёплый lifestyle-кадр для медиа, соцсетей и публичного образа",
      badge: "EDITORIAL",
      alt: "Дмитрий Гаранин актер ВГИК тропический портрет",
      tags: ["Editorial", "Медиа", "Образ"],
      description:
        "Яркий тропический портрет актёра, который расширяет визуальную идентичность Дмитрия Гаранина через расслабленный, премиальный и международный editorial-тон.",
    },
    "cinematic-pool-portrait": {
      title: "Дмитрий Гаранин — кинематографичный портрет у бассейна",
      subtitle: "Естественный портрет у бассейна с мягким экранным настроением",
      badge: "ПОРТРЕТ",
      alt: "Дмитрий Гаранин актер ВГИК кинематографичный портрет у бассейна",
      tags: ["Портрет", "Кастинг", "Кино"],
      description:
        "Портрет у бассейна с естественным светом, спокойным присутствием и ясной актёрской подачей для поиска «Дмитрий Гаранин актёр» и материалов портфолио ВГИК.",
    },
    "headshot-2026": {
      title: "Актёрский портрет 2026",
      subtitle: "Портрет при естественном свете для кастингов и профиля",
      badge: "ПОРТРЕТ",
      tags: ["Актёр", "Портрет", "Кастинг"],
      description:
        "Чистый и тёплый портрет, построенный на прямом присутствии, открытом свете и естественном экранном выражении.",
    },
    "character-paris": {
      title: "Персонаж создаёт роль",
      subtitle: "Кинематографичный зимний этюд персонажа",
      badge: "ПЕРСОНАЖ",
      tags: ["Драма", "Настроение", "Постер"],
      description:
        "Более тёмный атмосферный кадр с сильным драматическим напряжением и точным акцентом на персонаже.",
    },
    "looks-beyond": {
      title: "Мальчик, который смотрит дальше",
      subtitle: "Редакционный постер-портрет",
      badge: "РЕДАКЦИЯ",
      tags: ["Портрет", "Editorial", "Юность"],
      description:
        "Поэтичный портрет на природе: мягкая сдержанность, свободное пространство и ощущение журнальной обложки.",
    },
    "choice-beyond-status": {
      title: "Выбор выше статуса",
      subtitle: "Редакционный кадр в люксовом интерьере",
      badge: "ЛЮКС",
      tags: ["Editorial", "Люкс", "Присутствие"],
      description:
        "Собранный интерьерный образ с выверенным визуальным языком, старосветской фактурой и спокойной уверенностью.",
    },
    "new-generation-studio": {
      title: "Актёр нового поколения",
      subtitle: "Минималистичная студийная актёрская карточка",
      badge: "АКТЁР",
      tags: ["Актёр", "Бренд", "Профиль"],
      description:
        "Чёткая актёрская карточка с чистым контрастом, формальной посадкой и прямой кастинговой подачей.",
    },
    "new-generation-palace": {
      title: "Актёрский манифест",
      subtitle: "Подача в эстетике исторической роли",
      badge: "СЦЕНА",
      tags: ["Театр", "Кино", "История"],
      description:
        "Крупноформатный актёрский манифест с театральной деталью, исторической атмосферой и премиальными золотыми акцентами.",
    },
    "vgik-racing-cinema-portrait": {
      title: "Дмитрий Гаранин — актёр театра и кино, портрет ВГИК",
      subtitle: "Кинематографичный образ для кастинга, прессы и медиа",
      badge: "КИНО",
      alt: "Дмитрий Гаранин актёр театра и кино, выпускник ВГИК, кинематографичный портрет",
      tags: ["Дмитрий Гаранин", "актёр театра и кино", "ВГИК", "кастинг", "кино"],
      description:
        "Кинематографичный портрет Дмитрия Гаранина, актёра театра и кино, выпускника ВГИК. Материал для актёрского портфолио, кастинга, интервью, медиа-публикаций, Google и Яндекс поиска.",
    },
    "vgik-theatre-cinema-headshot-white": {
      title: "Дмитрий Гаранин — актёрский портрет для кино и театра",
      subtitle: "Чистый headshot для биографии, кастинга и пресс-материалов",
      badge: "ВГИК",
      alt: "Дмитрий Гаранин выпускник ВГИК актёр театра и кино портрет для кастинга",
      tags: ["Дмитрий Гаранин", "ВГИК", "театр", "кино", "актёрский портрет"],
      description:
        "Портрет Дмитрия Гаранина для страниц биографии, кастинговых профилей, театральных и кинопроектов. Чёткий поисковый сигнал: актёр театра и кино, выпускник ВГИК, официальный актёрский материал.",
    },
    "vgik-actor-close-up-portrait": {
      title: "Дмитрий Гаранин — крупный актёрский портрет",
      subtitle: "Экранный close-up для кино, сериалов и драматических ролей",
      badge: "CLOSE-UP",
      alt: "Дмитрий Гаранин актёр ВГИК крупный портрет для кино театра и сериалов",
      tags: ["Дмитрий Гаранин актёр", "крупный портрет", "ВГИК", "кино", "театр"],
      description:
        "Крупный портрет с акцентом на экранное присутствие Дмитрия Гаранина. Подходит для поиска по запросам актёр ВГИК, театр и кино, кастинговый портрет, драматический персонаж и медиа-материалы.",
    },
    "theatre-cinema-vgik-soft-portrait": {
      title: "Дмитрий Гаранин — мягкий editorial-портрет актёра",
      subtitle: "Естественный образ для театра, кино, прессы и интервью",
      badge: "ПОРТРЕТ",
      alt: "Дмитрий Гаранин актёр театра и кино выпускник ВГИК мягкий editorial портрет",
      tags: ["editorial", "актёр театра", "актёр кино", "ВГИК", "пресса"],
      description:
        "Мягкий editorial-портрет Дмитрия Гаранина усиливает поисковые сигналы для Google и Яндекс: актёр театра, актёр кино, выпускник ВГИК, биография, интервью и профессиональное портфолио.",
    },
    "vgik-theatre-actor-stage-costume": {
      title: "Дмитрий Гаранин — театральный образ и сценический портрет",
      subtitle: "Сценическая пластика, характер и актёрское присутствие",
      badge: "ТЕАТР",
      alt: "Дмитрий Гаранин выпускник ВГИК театральный актёр сценический костюм портрет",
      tags: ["театр", "сцена", "Дмитрий Гаранин", "ВГИК", "характер"],
      description:
        "Театральный портрет Дмитрия Гаранина в сценическом образе. Карточка подчёркивает ВГИК, театр, кино, работу с персонажем, актёрскую пластику и готовность к интервью и профессиональным публикациям.",
    },
    "actor-vgik-editorial-white-shirt": {
      title: "Дмитрий Гаранин — editorial-портрет для медиа",
      subtitle: "Публичный актёрский образ для интервью, прессы и проектов",
      badge: "МЕДИА",
      alt: "Дмитрий Гаранин актёр ВГИК editorial портрет для кино театра и медиа",
      tags: ["медиа", "интервью", "актёрское портфолио", "ВГИК", "кино"],
      description:
        "Editorial-портрет Дмитрия Гаранина для медиа, интервью, пресс-китов, актёрских профилей и кастинговой видимости. Основные сигналы: Дмитрий Гаранин, актёр, театр, кино, ВГИК.",
    },
    "vgik-actor-hoodie-portrait": {
      title: "Дмитрий Гаранин — естественный кастинговый портрет",
      subtitle: "Натуральный профиль для кино, театра и экранного присутствия",
      badge: "КАСТИНГ",
      alt: "Дмитрий Гаранин актёр ВГИК естественный кастинговый портрет театр кино",
      tags: ["кастинг", "актёр", "ВГИК", "театр", "кино"],
      description:
        "Естественный кастинговый портрет Дмитрия Гаранина для поисковой выдачи Google и Яндекс: выпускник ВГИК, актёр театра и кино, профессиональное портфолио, медиа и интервью.",
    },
  },
  fr: {
    "official-photo-2026": {
      title: "Photo officielle de Dmitrii Garanin 2026",
      subtitle: "Portrait acteur pour casting, biographie et presse",
      badge: "OFFICIEL",
      alt: "Photo officielle de Dmitrii Garanin acteur 2026, portrait acteur VGIK",
      tags: ["Dmitrii Garanin", "Acteur", "VGIK"],
      description:
        "Un portrait officiel direct pour les recherches sur Dmitrii Garanin, les biographies d'acteur, les profils de casting et les références média professionnelles.",
    },
    "rooftop-city-portrait": {
      title: "Dmitrii Garanin — portrait sur un toit urbain",
      subtitle: "Portrait cinématographique en ville avec une forte présence écran",
      badge: "VILLE",
      alt: "Dmitrii Garanin acteur VGIK portrait sur un toit en ville",
      tags: ["Acteur", "Cinéma", "Portrait"],
      description:
        "Un portrait urbain et cinématographique de Dmitrii Garanin, pensé pour le portfolio acteur, la recherche d'images et un contexte éditorial lié au cinéma.",
    },
    "tropical-vgik-portrait": {
      title: "Dmitrii Garanin — portrait éditorial tropical",
      subtitle: "Image lifestyle chaleureuse pour média, social et positionnement public",
      badge: "ÉDITORIAL",
      alt: "Dmitrii Garanin acteur VGIK portrait tropical",
      tags: ["Éditorial", "Média", "Lifestyle"],
      description:
        "Un portrait tropical lumineux qui élargit l'identité visuelle publique de Dmitrii Garanin avec un ton éditorial détendu, premium et international.",
    },
    "cinematic-pool-portrait": {
      title: "Dmitry Garanin — portrait cinématographique à la piscine",
      subtitle: "Portrait naturel au bord de la piscine avec une humeur calme",
      badge: "PORTRAIT",
      alt: "Dmitry Garanin acteur VGIK portrait cinématographique à la piscine",
      tags: ["Portrait", "Casting", "Cinéma"],
      description:
        "Un portrait au bord de la piscine, en lumière naturelle, avec une présence douce et une valeur claire pour le portfolio acteur de Dmitry Garanin.",
    },
    "headshot-2026": {
      title: "Portrait acteur 2026",
      subtitle: "Portrait en lumière naturelle pour casting et profil",
      badge: "PORTRAIT",
      tags: ["Acteur", "Portrait", "Casting"],
      description:
        "Un portrait net et chaleureux, construit autour d'une présence directe, d'une lumière ouverte et d'une expression naturelle prête pour l'écran.",
    },
    "character-paris": {
      title: "Le personnage crée le rôle",
      subtitle: "Étude de personnage hivernale et cinématographique",
      badge: "PERSONNAGE",
      tags: ["Drame", "Mood", "Affiche"],
      description:
        "Une image plus sombre et atmosphérique, avec une tension dramatique forte et une intention centrée sur le personnage.",
    },
    "looks-beyond": {
      title: "Le garçon qui regarde au-delà",
      subtitle: "Portrait-affiche éditorial",
      badge: "ÉDITORIAL",
      tags: ["Portrait", "Éditorial", "Jeunesse"],
      description:
        "Un portrait extérieur poétique, entre retenue douce, espace négatif et sensation de couverture magazine.",
    },
    "choice-beyond-status": {
      title: "Le choix au-delà du statut",
      subtitle: "Cadre éditorial en intérieur luxe",
      badge: "LUXE",
      tags: ["Éditorial", "Luxe", "Présence"],
      description:
        "Une image d'intérieur composée avec un langage visuel poli, une texture classique et une confiance discrète.",
    },
    "new-generation-studio": {
      title: "Acteur nouvelle génération",
      subtitle: "Carte acteur studio minimaliste",
      badge: "ACTEUR",
      tags: ["Acteur", "Marque", "Profil"],
      description:
        "Une carte acteur précise, au contraste net, à la posture formelle et à l'énergie directement exploitable pour le casting.",
    },
    "new-generation-palace": {
      title: "Manifeste d'acteur",
      subtitle: "Présentation inspirée d'un rôle d'époque",
      badge: "SCÈNE",
      tags: ["Théâtre", "Cinéma", "Histoire"],
      description:
        "Un manifeste grand format, porté par le détail théâtral, l'atmosphère historique et des accents dorés premium.",
    },
    "vgik-racing-cinema-portrait": {
      title: "Dmitrii Garanin — acteur de théâtre et de cinéma, portrait VGIK",
      subtitle: "Portrait cinématographique pour casting, presse et médias",
      badge: "CINÉMA",
      alt: "Dmitrii Garanin acteur de théâtre et de cinéma formé au VGIK portrait cinématographique",
      tags: ["Dmitrii Garanin", "acteur théâtre cinéma", "VGIK", "casting", "cinéma"],
      description:
        "Portrait cinématographique de Dmitrii Garanin, acteur de théâtre et de cinéma formé au VGIK. Image pensée pour portfolio acteur, casting, presse, interviews, Google, Yandex et recherche média.",
    },
    "vgik-theatre-cinema-headshot-white": {
      title: "Dmitrii Garanin — headshot acteur cinéma et théâtre",
      subtitle: "Portrait clair pour biographie, casting et presse",
      badge: "VGIK",
      alt: "Dmitrii Garanin acteur théâtre cinéma VGIK headshot pour casting",
      tags: ["Dmitrii Garanin", "VGIK", "théâtre", "cinéma", "portrait acteur"],
      description:
        "Headshot de Dmitrii Garanin pour pages biographiques, profils de casting, projets de théâtre et de cinéma. Signal clair : acteur théâtre et cinéma, formation VGIK, image officielle de portfolio.",
    },
    "vgik-actor-close-up-portrait": {
      title: "Dmitrii Garanin — gros plan acteur cinématographique",
      subtitle: "Close-up écran pour cinéma, séries et rôles dramatiques",
      badge: "CLOSE-UP",
      alt: "Dmitrii Garanin acteur VGIK gros plan pour cinéma théâtre et séries",
      tags: ["Dmitrii Garanin acteur", "gros plan", "VGIK", "cinéma", "théâtre"],
      description:
        "Portrait gros plan centré sur la présence écran de Dmitrii Garanin. Utile pour les recherches acteur VGIK, théâtre et cinéma, portrait de casting, personnage dramatique et documents médias.",
    },
    "theatre-cinema-vgik-soft-portrait": {
      title: "Dmitrii Garanin — portrait éditorial d'acteur",
      subtitle: "Image naturelle pour théâtre, cinéma, presse et interviews",
      badge: "PORTRAIT",
      alt: "Dmitrii Garanin acteur théâtre cinéma VGIK portrait éditorial doux",
      tags: ["éditorial", "acteur théâtre", "acteur cinéma", "VGIK", "presse"],
      description:
        "Portrait éditorial de Dmitrii Garanin renforçant les signaux de recherche : acteur de théâtre, acteur de cinéma, formation VGIK, biographie, interviews et portfolio professionnel.",
    },
    "vgik-theatre-actor-stage-costume": {
      title: "Dmitrii Garanin — portrait théâtre et costume de scène",
      subtitle: "Présence scénique, mouvement et travail de personnage",
      badge: "THÉÂTRE",
      alt: "Dmitrii Garanin acteur théâtre VGIK costume de scène portrait",
      tags: ["théâtre", "scène", "Dmitrii Garanin", "VGIK", "personnage"],
      description:
        "Portrait de Dmitrii Garanin en image de scène. La carte met en avant VGIK, théâtre, cinéma, travail du personnage, présence corporelle et contexte pour interviews et publications.",
    },
    "actor-vgik-editorial-white-shirt": {
      title: "Dmitrii Garanin — portrait éditorial pour médias",
      subtitle: "Image publique pour interviews, presse et collaborations",
      badge: "MÉDIA",
      alt: "Dmitrii Garanin acteur VGIK portrait éditorial cinéma théâtre médias",
      tags: ["médias", "interview", "portfolio acteur", "VGIK", "cinéma"],
      description:
        "Portrait éditorial de Dmitrii Garanin pour médias, interviews, press kits, profils d'acteur et visibilité casting. Signaux principaux : Dmitrii Garanin, acteur, théâtre, cinéma, VGIK.",
    },
    "vgik-actor-hoodie-portrait": {
      title: "Dmitrii Garanin — portrait casting naturel",
      subtitle: "Profil naturel pour cinéma, théâtre et présence écran",
      badge: "CASTING",
      alt: "Dmitrii Garanin acteur VGIK portrait casting naturel théâtre cinéma",
      tags: ["casting", "acteur", "VGIK", "théâtre", "cinéma"],
      description:
        "Portrait casting naturel de Dmitrii Garanin pour Google et Yandex : formation VGIK, acteur de théâtre et de cinéma, portfolio professionnel, médias et interviews.",
    },
  },
  am: {
    "official-photo-2026": {
      title: "Դմիտրի Գարանինի պաշտոնական լուսանկար 2026",
      subtitle: "Դերասանական դիմանկար քասթինգի, կենսագրության և մամուլի համար",
      badge: "ՊԱՇՏՈՆԱԿԱՆ",
      alt: "Դմիտրի Գարանին պաշտոնական դերասանական լուսանկար 2026, ՎԳԻԿ դերասանի դիմանկար",
      tags: ["Դմիտրի Գարանին", "Դերասան", "ՎԳԻԿ"],
      description:
        "Ուղիղ պաշտոնական դիմանկար՝ Դմիտրի Գարանինի մասին որոնումների, դերասանական կենսագրությունների, քասթինգի պրոֆիլների և մասնագիտական մեդիա նյութերի համար։",
    },
    "rooftop-city-portrait": {
      title: "Դմիտրի Գարանին — քաղաքային տանիքի դիմանկար",
      subtitle: "Քաղաքային կինեմատոգրաֆիկ դերասանական դիմանկար ուժեղ ներկայությամբ",
      badge: "ՔԱՂԱՔ",
      alt: "Դմիտրի Գարանին դերասան ՎԳԻԿ քաղաքային տանիքի դիմանկար",
      tags: ["Դերասան", "Կինո", "Դիմանկար"],
      description:
        "Դմիտրի Գարանինի քաղաքային կինեմատոգրաֆիկ դիմանկար՝ դերասանական պորտֆոլիոյի, պատկերների որոնման և կինոյի շուրջ խմբագրական համատեքստի համար։",
    },
    "tropical-vgik-portrait": {
      title: "Դմիտրի Գարանին — արևադարձային խմբագրական դիմանկար",
      subtitle: "Ջերմ lifestyle կադր մեդիայի, սոցիալական հարթակների և հանրային կերպարի համար",
      badge: "ԽՄԲԱԳՐԱԿԱՆ",
      alt: "Դմիտրի Գարանին դերասան ՎԳԻԿ արևադարձային դիմանկար",
      tags: ["Խմբագրական", "Մեդիա", "Կերպար"],
      description:
        "Լուսավոր արևադարձային դերասանական դիմանկար, որը ընդլայնում է Դմիտրի Գարանինի հանրային տեսողական ինքնությունը հանգիստ և պրեմիում տոնով։",
    },
    "cinematic-pool-portrait": {
      title: "Դմիտրի Գարանին — կինեմատոգրաֆիկ դիմանկար լողավազանի մոտ",
      subtitle: "Բնական լույսով հանգիստ դերասանական դիմանկար",
      badge: "ԴԻՄԱՆԿԱՐ",
      alt: "Դմիտրի Գարանին դերասան ՎԳԻԿ կինեմատոգրաֆիկ դիմանկար լողավազանի մոտ",
      tags: ["Դիմանկար", "Քասթինգ", "Կինո"],
      description:
        "Լողավազանի մոտ բնական լույսով դիմանկար՝ մեղմ ներկայությամբ և հստակ դերասանական արժեքով Դմիտրի Գարանինի պորտֆոլիոյի համար։",
    },
    "headshot-2026": {
      title: "Դերասանի դիմանկար 2026",
      subtitle: "Բնական լույսով դիմանկար քասթինգի և պրոֆիլի համար",
      badge: "ԴԻՄԱՆԿԱՐ",
      tags: ["Դերասան", "Դիմանկար", "Քասթինգ"],
      description:
        "Մաքուր և ջերմ դիմանկար՝ կառուցված ուղիղ ներկայության, բաց լույսի և էկրանին պատրաստ բնական արտահայտության շուրջ։",
    },
    "character-paris": {
      title: "Կերպարը ստեղծում է դերը",
      subtitle: "Կինեմատոգրաֆիկ ձմեռային կերպարի էտյուդ",
      badge: "ԿԵՐՊԱՐ",
      tags: ["Դրամա", "Տրամադրություն", "Պաստառ"],
      description:
        "Ավելի մուգ և մթնոլորտային կադր՝ ուժեղ դրամատիկ լարվածությամբ և կերպարից սկսվող հստակ տոնով։",
    },
    "looks-beyond": {
      title: "Տղան, որը նայում է հեռուն",
      subtitle: "Խմբագրական պաստառ-դիմանկար",
      badge: "ԽՄԲԱԳՐԱԿԱՆ",
      tags: ["Դիմանկար", "Խմբագրական", "Երիտասարդություն"],
      description:
        "Պոետիկ բացօթյա դիմանկար՝ մեղմ զսպվածությամբ, ազատ տարածությամբ և ամսագրային շապիկի զգացողությամբ։",
    },
    "choice-beyond-status": {
      title: "Ընտրություն կարգավիճակից վեր",
      subtitle: "Լյուքս ինտերիերի խմբագրական կադր",
      badge: "ԼՅՈՒՔՍ",
      tags: ["Խմբագրական", "Լյուքս", "Ներկայություն"],
      description:
        "Հավաքված ինտերիերային պատկեր՝ հղկված տեսողական լեզվով, դասական մթնոլորտով և հանգիստ վստահությամբ։",
    },
    "new-generation-studio": {
      title: "Նոր սերնդի դերասան",
      subtitle: "Մինիմալ ստուդիական դերասանական քարտ",
      badge: "ԴԵՐԱՍԱՆ",
      tags: ["Դերասան", "Բրենդ", "Պրոֆիլ"],
      description:
        "Սուր դերասանական քարտ՝ մաքուր հակադրությամբ, պաշտոնական դիրքով և քասթինգի համար պատրաստ ուղիղ տեսքով։",
    },
    "new-generation-palace": {
      title: "Դերասանական մանիֆեստ",
      subtitle: "Ժամանակաշրջանի դերից ներշնչված ներկայացում",
      badge: "ԲԵՄ",
      tags: ["Թատրոն", "Կինո", "Պատմություն"],
      description:
        "Մեծ ֆորմատի դերասանական մանիֆեստ՝ թատերական մանրամասներով, պատմական մթնոլորտով և պրեմիում ոսկեգույն շեշտերով։",
    },
    "vgik-racing-cinema-portrait": {
      title: "Դմիտրի Գարանին — թատրոնի և կինոյի դերասան, ՎԳԻԿ դիմանկար",
      subtitle: "Կինեմատոգրաֆիկ կերպար քասթինգի, մամուլի և մեդիայի համար",
      badge: "ԿԻՆՈ",
      alt: "Դմիտրի Գարանին թատրոնի և կինոյի դերասան ՎԳԻԿ շրջանավարտ կինեմատոգրաֆիկ դիմանկար",
      tags: ["Դմիտրի Գարանին", "թատրոնի և կինոյի դերասան", "ՎԳԻԿ", "քասթինգ", "կինո"],
      description:
        "Դմիտրի Գարանինի կինեմատոգրաֆիկ դիմանկար՝ թատրոնի և կինոյի դերասան, ՎԳԻԿ շրջանավարտ։ Նյութ դերասանական պորտֆոլիոյի, քասթինգի, մամուլի, հարցազրույցների, Google-ի և Yandex-ի որոնման համար։",
    },
    "vgik-theatre-cinema-headshot-white": {
      title: "Դմիտրի Գարանին — դերասանի headshot կինոյի և թատրոնի համար",
      subtitle: "Մաքուր դիմանկար կենսագրության, քասթինգի և մամուլի համար",
      badge: "ՎԳԻԿ",
      alt: "Դմիտրի Գարանին ՎԳԻԿ շրջանավարտ թատրոնի և կինոյի դերասան քասթինգի դիմանկար",
      tags: ["Դմիտրի Գարանին", "ՎԳԻԿ", "թատրոն", "կինո", "դերասանի դիմանկար"],
      description:
        "Դմիտրի Գարանինի դիմանկար կենսագրական էջերի, քասթինգի պրոֆիլների, թատերական և կինոնախագծերի համար։ Հստակ ազդանշան՝ թատրոնի և կինոյի դերասան, ՎԳԻԿ շրջանավարտ, պաշտոնական պորտֆոլիո։",
    },
    "vgik-actor-close-up-portrait": {
      title: "Դմիտրի Գարանին — կինեմատոգրաֆիկ խոշոր պլան",
      subtitle: "Էկրանային close-up կինոյի, սերիալների և դրամատիկ դերերի համար",
      badge: "CLOSE-UP",
      alt: "Դմիտրի Գարանին ՎԳԻԿ դերասան խոշոր պլան կինոյի թատրոնի և սերիալների համար",
      tags: ["Դմիտրի Գարանին դերասան", "խոշոր պլան", "ՎԳԻԿ", "կինո", "թատրոն"],
      description:
        "Խոշոր դիմանկար՝ կենտրոնացած Դմիտրի Գարանինի էկրանային ներկայության վրա։ Օգտակար է ՎԳԻԿ դերասան, թատրոն և կինո, քասթինգի դիմանկար, կերպար և մեդիա նյութեր որոնումների համար։",
    },
    "theatre-cinema-vgik-soft-portrait": {
      title: "Դմիտրի Գարանին — դերասանի editorial դիմանկար",
      subtitle: "Բնական կերպար թատրոնի, կինոյի, մամուլի և հարցազրույցների համար",
      badge: "ԴԻՄԱՆԿԱՐ",
      alt: "Դմիտրի Գարանին թատրոնի և կինոյի դերասան ՎԳԻԿ editorial դիմանկար",
      tags: ["editorial", "թատրոնի դերասան", "կինոյի դերասան", "ՎԳԻԿ", "մամուլ"],
      description:
        "Դմիտրի Գարանինի մեղմ editorial դիմանկարը ուժեղացնում է որոնման ազդանշանները՝ թատրոնի դերասան, կինոյի դերասան, ՎԳԻԿ շրջանավարտ, կենսագրություն, հարցազրույցներ և պրոֆեսիոնալ պորտֆոլիո։",
    },
    "vgik-theatre-actor-stage-costume": {
      title: "Դմիտրի Գարանին — թատրոնի կերպար և բեմական դիմանկար",
      subtitle: "Բեմական ներկայություն, շարժում և կերպարի աշխատանք",
      badge: "ԹԱՏՐՈՆ",
      alt: "Դմիտրի Գարանին ՎԳԻԿ թատրոնի դերասան բեմական հագուստ դիմանկար",
      tags: ["թատրոն", "բեմ", "Դմիտրի Գարանին", "ՎԳԻԿ", "կերպար"],
      description:
        "Դմիտրի Գարանինի թատերական դիմանկար բեմական կերպարով։ Քարտը ընդգծում է ՎԳԻԿ-ը, թատրոնը, կինոն, կերպարի աշխատանքը, դերասանական պլաստիկան և հարցազրույցների համատեքստը։",
    },
    "actor-vgik-editorial-white-shirt": {
      title: "Դմիտրի Գարանին — editorial դիմանկար մեդիայի համար",
      subtitle: "Հանրային դերասանական կերպար հարցազրույցների, մամուլի և նախագծերի համար",
      badge: "ՄԵԴԻԱ",
      alt: "Դմիտրի Գարանին դերասան ՎԳԻԿ editorial դիմանկար կինո թատրոն մեդիա",
      tags: ["մեդիա", "հարցազրույց", "դերասանական պորտֆոլիո", "ՎԳԻԿ", "կինո"],
      description:
        "Դմիտրի Գարանինի editorial դիմանկար մեդիայի, հարցազրույցների, մամուլի փաթեթների, դերասանական պրոֆիլների և քասթինգի տեսանելիության համար։ Հիմնական ազդանշաններ՝ Դմիտրի Գարանին, դերասան, թատրոն, կինո, ՎԳԻԿ։",
    },
    "vgik-actor-hoodie-portrait": {
      title: "Դմիտրի Գարանին — բնական քասթինգի դիմանկար",
      subtitle: "Բնական պրոֆիլ կինոյի, թատրոնի և էկրանային ներկայության համար",
      badge: "ՔԱՍԹԻՆԳ",
      alt: "Դմիտրի Գարանին ՎԳԻԿ դերասան բնական քասթինգի դիմանկար թատրոն կինո",
      tags: ["քասթինգ", "դերասան", "ՎԳԻԿ", "թատրոն", "կինո"],
      description:
        "Դմիտրի Գարանինի բնական քասթինգի դիմանկար Google-ի և Yandex-ի համար՝ ՎԳԻԿ շրջանավարտ, թատրոնի և կինոյի դերասան, պրոֆեսիոնալ պորտֆոլիո, մեդիա և հարցազրույցներ։",
    },
  },
};

export default function Portfolio() {
  const { lang = "en" } = useParams();
  const copy = t(lang);

  const p = copy?.portfolio ?? {};

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const itemCopy = portfolioItemCopy[lang] ?? {};
  const items = visualPortfolioItems.map((item) => ({
    ...item,
    ...(itemCopy[item.id] ?? {}),
  }));

  usePageSeo(lang, "portfolio", {
    image: items[0]?.cover,
    imageAlt: items[0]?.alt || items[0]?.title,
    collectionItems: items,
  });

  const categories = p?.categories ?? {};
  const CATEGORIES = [
    { id: "all", label: SAFE(categories?.all, "All styles") },
    ...[
      { id: "film", label: SAFE(categories?.film, "Films") },
      { id: "theatre", label: SAFE(categories?.theatre, "Theatre") },
      { id: "series", label: SAFE(categories?.series, "Series") },
      { id: "bloggers", label: SAFE(categories?.bloggers, "Blogger projects") },
      { id: "cinema", label: SAFE(categories?.cinema, "Cinema") },
    ].filter((category) => items.some((item) => item?.category === category.id)),
  ];

  const filtered = active === "all" ? items : items.filter((x) => x?.category === active);

  const pill = SAFE(p?.pill, SAFE(copy?.nav?.portfolio, "Portfolio"));
  const h1a = SAFE(p?.h1a, "Luxury");
  const h1b = SAFE(p?.h1b, "Portfolio");
  const sub = SAFE(p?.sub, "");
  const projectsWord = SAFE(p?.counters?.projects, "Projects");
  const cardCta = SAFE(p?.card?.cta, "Click to view details");
  const emptyTitle = SAFE(p?.empty?.title, "No projects in this category");
  const emptyDesc = SAFE(p?.empty?.desc, "Select another category or check back later.");
  const closeText = SAFE(p?.modal?.close, "Close");

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative mx-auto w-full max-w-6xl px-5 pb-24 pt-14 md:pt-20">
        <Motion.div
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {pill}
            </div>

            <h1 className="mt-6 break-words leading-[1.05]">
              <span className="block text-[38px] font-[900] md:text-[58px]">
                {h1a}{" "}
                <span className="bg-gradient-to-r from-[#f6e6a7] via-[#D4AF37] to-[#FFD700] bg-clip-text text-transparent">
                  {h1b}
                </span>
              </span>
              {!!sub && (
                <span className="mt-3 block text-[13px] tracking-[0.35em] uppercase text-white/65">
                  {sub}
                </span>
              )}
            </h1>
          </div>

          <div className="flex gap-2">
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {(lang || "en").toUpperCase()}
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] tracking-[0.22em] uppercase text-white/65">
              {filtered.length} {String(projectsWord).toUpperCase()}
            </span>
          </div>
        </Motion.div>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => {
            const on = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`min-h-10 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-[700] leading-none transition-all duration-200 ${
                  on
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40 hover:bg-white/10"
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((it, idx) => (
            <PortfolioCard
              key={it?.id ?? `${it?.title ?? "item"}-${idx}`}
              item={it}
              index={idx}
              onOpen={() => setOpen(it)}
              cta={cardCta}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <Motion.div
            className="mt-16 text-center"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-12">
              <div className="text-[40px] font-[900] text-white/30">∅</div>
              <div className="mt-4 text-[18px] font-[700] text-white/70">{emptyTitle}</div>
              <p className="mt-2 text-white/50">{emptyDesc}</p>
            </div>
          </Motion.div>
        )}
      </section>

      <AnimatePresence>
        {open && (
          <Motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setOpen(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            <Motion.div
              className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[8px] border border-white/10 bg-[#0b0b0b]"
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <img
                  src={open?.cover}
                  alt={SAFE(open?.alt, SAFE(open?.title, ""))}
                  className="max-h-[72vh] w-full bg-black object-contain"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/fallback/1400/900";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="inline-flex items-center gap-2">
                    {!!open?.badge && (
                      <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80">
                        {open.badge}
                      </span>
                    )}
                    {!!open?.year && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60">
                        {open.year}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-[28px] font-[900]">{SAFE(open?.title, "")}</h3>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                  {(Array.isArray(open?.tags) ? open.tags : []).map((tag, index) => (
                    <span
                      key={`${tag}-${index}`}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {!!open?.description && (
                  <div className="mb-6 text-sm text-white/70">{open.description}</div>
                )}

                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="text-[12px] tracking-[0.22em] uppercase text-white/50">
                    {SAFE(open?.subtitle, "")}
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    {closeText}
                  </button>
                </div>
              </div>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function PortfolioCard({ item, index, onOpen, cta }) {
  const tags = Array.isArray(item?.tags) ? item.tags : [];

  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="group flex h-full cursor-pointer"
      onClick={onOpen}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06]">
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          <img
            src={item?.cover}
            alt={SAFE(item?.alt, SAFE(item?.title, ""))}
            className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.025]"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/seed/fallback/1400/900";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
          <div className="absolute top-4 right-4">
            {!!item?.badge && (
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/80 backdrop-blur">
                {item.badge}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="text-[11px] tracking-[0.22em] uppercase text-[#D4AF37]/80">
            {SAFE(item?.year, "")}
          </div>
          <div className="mt-2 min-h-[3.1rem] text-[18px] font-[800] leading-tight text-white">
            {SAFE(item?.title, "")}
          </div>
          <div className="min-h-10 text-[14px] leading-5 text-white/70">
            {SAFE(item?.subtitle, "")}
          </div>
          {!!item?.description && (
            <p className="mt-3 min-h-[4.75rem] text-[13px] leading-6 text-white/50">
              {item.description}
            </p>
          )}

          <div className="mt-4 flex min-h-[3.25rem] flex-wrap content-start gap-2">
            {tags.map((tag, idx) => (
              <span
                key={`${tag}-${idx}`}
                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] tracking-[0.22em] uppercase text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex min-h-9 items-center justify-between gap-3 border-t border-white/10 pt-4">
            <div className="min-w-0 text-[11px] leading-4 tracking-[0.22em] uppercase text-white/50">{cta}</div>
            <span className="text-[#D4AF37] transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </div>
      </div>
    </Motion.div>
  );
}
