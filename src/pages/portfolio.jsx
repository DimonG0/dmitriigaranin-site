// src/pages/portfolio.jsx
import { AnimatePresence, motion as Motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { t, SAFE } from "../lib/i18n";
import { resolveLang } from "../lib/routes";
import { usePageSeo } from "../lib/usePageSeo";

const ease = [0.22, 1, 0.36, 1];
const fallbackCover = "/portfolio-media/dmitriy-garanin-golden-hour-river-portrait.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 16, filter: "blur(10px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.05, delay: 0.12 + i * 0.08, ease },
  }),
};

const portfolioFrames = [
  {
    id: "golden-hour-river",
    category: "cinema",
    year: "2026",
    cover: "/portfolio-media/dmitriy-garanin-golden-hour-river-portrait.jpg",
    focus: "center 42%",
  },
  {
    id: "classical-art-museum",
    category: "theatre",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-classical-art-museum-portrait.jpg",
    focus: "center 34%",
  },
  {
    id: "helicopter-portrait",
    category: "bloggers",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-helicopter-portrait.jpg",
    focus: "center 38%",
  },
  {
    id: "tropical-island",
    category: "cinema",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-tropical-island-portrait.jpg",
    focus: "center 42%",
  },
  {
    id: "evening-marina",
    category: "film",
    year: "2026",
    cover: "/portfolio-media/dmitriy-garanin-vecher-v-marine-portret.jpg",
    focus: "center 42%",
  },
  {
    id: "european-cafe",
    category: "bloggers",
    year: "2026",
    cover: "/portfolio-media/dmitriy-garanin-european-cafe-lifestyle-portrait.jpg",
    focus: "center 40%",
  },
  {
    id: "historic-city",
    category: "film",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-historic-city-portrait.jpg",
    focus: "center 39%",
  },
  {
    id: "summer-stone-wall",
    category: "theatre",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-summer-stone-wall-portrait.jpg",
    focus: "center 44%",
  },
  {
    id: "motorcycle-rider",
    category: "film",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-motorcycle-rider-portrait.jpg",
    focus: "center 42%",
  },
  {
    id: "evening-city",
    category: "series",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-evening-city-portrait.jpg",
    focus: "60% 36%",
  },
  {
    id: "sport-lifestyle",
    category: "series",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-sport-lifestyle-portrait.jpg",
    focus: "center 34%",
  },
  {
    id: "green-sweater",
    category: "bloggers",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-mens-fashion-portrait-green-sweater.jpg",
    focus: "center 42%",
  },
  {
    id: "minimalist-casual",
    category: "cinema",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-minimalist-casual-portrait.jpg",
    focus: "center 30%",
  },
  {
    id: "golden-hour-close",
    category: "cinema",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-golden-hour-portrait.jpg",
    focus: "center 36%",
  },
  {
    id: "living-room-casual",
    category: "bloggers",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-casual-modern-living-room-portrait.jpg",
    focus: "center 34%",
  },
  {
    id: "summer-beach-sunglasses",
    category: "cinema",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-summer-beach-sunglasses-portrait.jpg",
    focus: "center 38%",
  },
  {
    id: "tropical-luxury",
    category: "bloggers",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-tropical-luxury-portrait.jpg",
    focus: "center 42%",
  },
  {
    id: "morning-selfie",
    category: "series",
    year: "2026",
    cover: "/portfolio-media/dmitrii-garanin-morning-selfie.jpg",
    focus: "center 28%",
  },
];

const portfolioItemCopy = {
  en: {
    "golden-hour-river": {
      title: "Golden Hour River Frame",
      subtitle: "Cinematic portrait in reflected evening light",
      badge: "CINEMA",
      alt: "Dmitrii Garanin golden hour river cinematic portrait",
      tags: ["Cinema", "Golden hour", "Screen presence"],
      description:
        "A warm river portrait built around stillness, reflected light, and a screen-ready calm.",
    },
    "classical-art-museum": {
      title: "Classical Museum Presence",
      subtitle: "Actor portrait with theatrical architecture and sculpture",
      badge: "THEATRE",
      alt: "Dmitrii Garanin classical art museum actor portrait",
      tags: ["Theatre", "Classical", "Character"],
      description:
        "A restrained museum frame that connects classical form, actor discipline, and quiet authority.",
    },
    "helicopter-portrait": {
      title: "Private Flight Editorial",
      subtitle: "Luxury mobility frame for media and brand positioning",
      badge: "MEDIA",
      alt: "Dmitrii Garanin helicopter lifestyle editorial portrait",
      tags: ["Editorial", "Luxury", "Media"],
      description:
        "A clean high-status visual with aviation scale, useful for premium lifestyle and public-image contexts.",
    },
    "tropical-island": {
      title: "Island White Shirt",
      subtitle: "International travel portrait with calm cinematic restraint",
      badge: "TRAVEL",
      alt: "Dmitrii Garanin tropical island white shirt portrait",
      tags: ["Travel", "Cinema", "Lifestyle"],
      description:
        "A bright coastal frame that keeps the image relaxed, international, and visually polished.",
    },
    "evening-marina": {
      title: "Evening Marina Cut",
      subtitle: "Noir-leaning port portrait for film and character mood",
      badge: "FILM",
      alt: "Dmitrii Garanin evening marina cinematic portrait",
      tags: ["Film", "Noir", "Port"],
      description:
        "A dusk marina image with a quiet dramatic charge, built for story-led visual positioning.",
    },
    "european-cafe": {
      title: "European Cafe Lifestyle",
      subtitle: "Editorial social frame with warm urban evening energy",
      badge: "LIFESTYLE",
      alt: "Dmitrii Garanin European cafe lifestyle portrait",
      tags: ["Lifestyle", "Editorial", "City"],
      description:
        "A public-facing cafe image that feels social, polished, and suitable for premium media presence.",
    },
    "historic-city": {
      title: "Historic City Walk",
      subtitle: "Clean white look against old European architecture",
      badge: "CITY",
      alt: "Dmitrii Garanin historic city white shirt portrait",
      tags: ["Film", "City", "Editorial"],
      description:
        "A city portrait with architectural depth, useful for travel, character, and cinematic context.",
    },
    "summer-stone-wall": {
      title: "Stone Wall Summer Study",
      subtitle: "Full-body outdoor frame with theatre-poster clarity",
      badge: "STUDY",
      alt: "Dmitrii Garanin summer stone wall full body portrait",
      tags: ["Theatre", "Outdoor", "Poster"],
      description:
        "A composed outdoor study with strong lines, natural texture, and a clear actor silhouette.",
    },
    "motorcycle-rider": {
      title: "Motorcycle Rider Close-Up",
      subtitle: "Action-ready image with protected gaze and movement energy",
      badge: "ACTION",
      alt: "Dmitrii Garanin motorcycle rider helmet portrait",
      tags: ["Action", "Film", "Movement"],
      description:
        "A kinetic close-up that adds speed, risk, and physical screen energy to the portfolio.",
    },
    "evening-city": {
      title: "Evening City Signal",
      subtitle: "Urban dusk portrait with headphones and modern character tone",
      badge: "SERIES",
      alt: "Dmitrii Garanin evening city portrait with headphones",
      tags: ["Series", "Urban", "Youth"],
      description:
        "A contemporary city frame that reads naturally for series, youth drama, and street-level stories.",
    },
    "sport-lifestyle": {
      title: "Sport Lifestyle Signal",
      subtitle: "Athletic red-and-blue frame with direct camera charm",
      badge: "SPORT",
      alt: "Dmitrii Garanin sport lifestyle red shirt portrait",
      tags: ["Sport", "Series", "Energy"],
      description:
        "A brighter active-life image that opens the portfolio beyond formal portraits and editorial scenes.",
    },
    "green-sweater": {
      title: "Green Sweater Interior",
      subtitle: "Soft fashion portrait with relaxed transport intimacy",
      badge: "FASHION",
      alt: "Dmitrii Garanin green sweater fashion portrait",
      tags: ["Fashion", "Lifestyle", "Soft"],
      description:
        "A close lifestyle portrait with tactile color, fashion texture, and controlled softness.",
    },
    "minimalist-casual": {
      title: "Minimalist Mirror Portrait",
      subtitle: "Clean monochrome casual frame for casting and identity",
      badge: "CASTING",
      alt: "Dmitrii Garanin minimalist mirror casual portrait",
      tags: ["Casting", "Minimal", "Portrait"],
      description:
        "A restrained black-and-white styling frame that keeps the face, profile, and identity readable.",
    },
    "golden-hour-close": {
      title: "Golden Hour Close-Up",
      subtitle: "Warm direct portrait with focused eye contact",
      badge: "HEADSHOT",
      alt: "Dmitrii Garanin golden hour close-up portrait",
      tags: ["Headshot", "Warm light", "Casting"],
      description:
        "A close, warm portrait that carries direct presence without overstatement.",
    },
    "living-room-casual": {
      title: "Modern Living Room Editorial",
      subtitle: "Relaxed interior portrait with youth-fashion attitude",
      badge: "EDITORIAL",
      alt: "Dmitrii Garanin casual modern living room portrait",
      tags: ["Editorial", "Interior", "Fashion"],
      description:
        "A contemporary interior image with casual styling, useful for lifestyle and social visual language.",
    },
    "summer-beach-sunglasses": {
      title: "Beach Sunglasses Close-Up",
      subtitle: "Sunlit summer portrait with sharp premium styling",
      badge: "SUMMER",
      alt: "Dmitrii Garanin summer beach sunglasses close-up portrait",
      tags: ["Summer", "Close-up", "Style"],
      description:
        "A tight sunlit frame with crisp styling and a strong luxury-summer signal.",
    },
    "tropical-luxury": {
      title: "Tropical Luxury Court",
      subtitle: "Golden resort frame with fashion and leisure positioning",
      badge: "LUXURY",
      alt: "Dmitrii Garanin tropical luxury portrait",
      tags: ["Luxury", "Tropical", "Fashion"],
      description:
        "A warm resort portrait that adds leisure, style, and premium atmosphere to the public image.",
    },
    "morning-selfie": {
      title: "Morning Selfie",
      subtitle: "Natural intimate frame for a softer personal register",
      badge: "PERSONAL",
      alt: "Dmitrii Garanin morning selfie portrait",
      tags: ["Personal", "Soft", "Natural"],
      description:
        "A lighter personal portrait that makes the portfolio feel alive without losing polish.",
    },
  },
  ru: {
    "golden-hour-river": {
      title: "Золотой час на воде",
      subtitle: "Кинематографичный портрет в отражённом вечернем свете",
      badge: "КИНО",
      alt: "Дмитрий Гаранин кинематографичный портрет на реке в золотой час",
      tags: ["Кино", "Золотой час", "Присутствие"],
      description:
        "Тёплый речной кадр на спокойствии, отражениях и сдержанной экранной подаче.",
    },
    "classical-art-museum": {
      title: "Классическое музейное присутствие",
      subtitle: "Актёрский портрет среди архитектуры и скульптуры",
      badge: "ТЕАТР",
      alt: "Дмитрий Гаранин актёрский портрет в классическом музее",
      tags: ["Театр", "Классика", "Персонаж"],
      description:
        "Сдержанный музейный кадр соединяет классическую форму, актёрскую дисциплину и спокойный авторитет.",
    },
    "helicopter-portrait": {
      title: "Private Flight Editorial",
      subtitle: "Люксовый кадр мобильности для медиа и брендинга",
      badge: "МЕДИА",
      alt: "Дмитрий Гаранин lifestyle editorial портрет у вертолёта",
      tags: ["Editorial", "Люкс", "Медиа"],
      description:
        "Чистый статусный визуал с авиационным масштабом для премиального lifestyle и публичного образа.",
    },
    "tropical-island": {
      title: "Белая рубашка на острове",
      subtitle: "Международный travel-портрет с кинематографичной сдержанностью",
      badge: "TRAVEL",
      alt: "Дмитрий Гаранин тропический остров портрет в белой рубашке",
      tags: ["Travel", "Кино", "Lifestyle"],
      description:
        "Светлый прибрежный кадр: расслабленный, международный и визуально отполированный.",
    },
    "evening-marina": {
      title: "Вечерний порт",
      subtitle: "Портовый портрет с нуарным настроением для кинообраза",
      badge: "ФИЛЬМ",
      alt: "Дмитрий Гаранин вечерний порт кинематографичный портрет",
      tags: ["Фильм", "Нуар", "Порт"],
      description:
        "Марина на закате даёт тихое драматическое напряжение и хорошо работает для сюжетной подачи.",
    },
    "european-cafe": {
      title: "Европейское кафе",
      subtitle: "Социальный editorial-кадр с тёплой городской энергией",
      badge: "LIFESTYLE",
      alt: "Дмитрий Гаранин lifestyle портрет в европейском кафе",
      tags: ["Lifestyle", "Editorial", "Город"],
      description:
        "Публичный кафе-кадр: социальный, собранный и уместный для премиального медиа-присутствия.",
    },
    "historic-city": {
      title: "Прогулка по историческому городу",
      subtitle: "Чистый белый образ на фоне старой европейской архитектуры",
      badge: "ГОРОД",
      alt: "Дмитрий Гаранин портрет в историческом городе в белой рубашке",
      tags: ["Фильм", "Город", "Editorial"],
      description:
        "Городской портрет с архитектурной глубиной для travel, персонажа и кинематографичного контекста.",
    },
    "summer-stone-wall": {
      title: "Летний этюд у каменной стены",
      subtitle: "Ростовой outdoor-кадр с ясностью театрального постера",
      badge: "ЭТЮД",
      alt: "Дмитрий Гаранин летний ростовой портрет у каменной стены",
      tags: ["Театр", "Outdoor", "Постер"],
      description:
        "Собранный outdoor-этюд с сильными линиями, природной фактурой и чистым актёрским силуэтом.",
    },
    "motorcycle-rider": {
      title: "Motorcycle Rider Close-Up",
      subtitle: "Экшен-кадр с защищённым взглядом и энергией движения",
      badge: "ЭКШЕН",
      alt: "Дмитрий Гаранин портрет в мотоциклетном шлеме",
      tags: ["Экшен", "Фильм", "Движение"],
      description:
        "Кинетичный крупный план добавляет в портфолио скорость, риск и физическую экранную энергию.",
    },
    "evening-city": {
      title: "Вечерний городской сигнал",
      subtitle: "Сумеречный urban-портрет с наушниками и современным тоном",
      badge: "СЕРИАЛ",
      alt: "Дмитрий Гаранин вечерний городской портрет с наушниками",
      tags: ["Сериал", "Urban", "Молодость"],
      description:
        "Современный городской кадр естественно читается для сериалов, молодёжной драмы и уличных историй.",
    },
    "sport-lifestyle": {
      title: "Sport Lifestyle Signal",
      subtitle: "Спортивный красно-синий кадр с прямым обаянием камеры",
      badge: "СПОРТ",
      alt: "Дмитрий Гаранин спортивный lifestyle портрет в красной форме",
      tags: ["Спорт", "Сериал", "Энергия"],
      description:
        "Более яркий активный кадр расширяет портфолио за пределы формальных портретов и editorial-сцен.",
    },
    "green-sweater": {
      title: "Зелёный свитер",
      subtitle: "Мягкий fashion-портрет с камерной lifestyle-близостью",
      badge: "FASHION",
      alt: "Дмитрий Гаранин fashion портрет в зелёном свитере",
      tags: ["Fashion", "Lifestyle", "Мягкость"],
      description:
        "Близкий lifestyle-портрет с тактильным цветом, фактурой и управляемой мягкостью.",
    },
    "minimalist-casual": {
      title: "Минималистичный mirror-портрет",
      subtitle: "Чистый монохромный casual-кадр для кастинга и идентичности",
      badge: "КАСТИНГ",
      alt: "Дмитрий Гаранин минималистичный casual портрет в зеркале",
      tags: ["Кастинг", "Минимализм", "Портрет"],
      description:
        "Сдержанный чёрно-белый styling-кадр, где лицо, профиль и идентичность остаются читаемыми.",
    },
    "golden-hour-close": {
      title: "Крупный план в золотой час",
      subtitle: "Тёплый прямой портрет с фокусом на взгляде",
      badge: "HEADSHOT",
      alt: "Дмитрий Гаранин крупный портрет в золотой час",
      tags: ["Headshot", "Тёплый свет", "Кастинг"],
      description:
        "Крупный тёплый портрет с прямым присутствием без лишнего нажима.",
    },
    "living-room-casual": {
      title: "Modern Living Room Editorial",
      subtitle: "Расслабленный интерьерный портрет с youth-fashion настроением",
      badge: "EDITORIAL",
      alt: "Дмитрий Гаранин casual портрет в современной гостиной",
      tags: ["Editorial", "Интерьер", "Fashion"],
      description:
        "Современный интерьерный кадр с casual-стилизацией для lifestyle и социального визуального языка.",
    },
    "summer-beach-sunglasses": {
      title: "Пляжный close-up в очках",
      subtitle: "Солнечный летний портрет с премиальной стилизацией",
      badge: "ЛЕТО",
      alt: "Дмитрий Гаранин летний пляжный портрет в солнцезащитных очках",
      tags: ["Лето", "Close-up", "Стиль"],
      description:
        "Плотный солнечный кадр с чёткой стилизацией и сильным luxury-summer сигналом.",
    },
    "tropical-luxury": {
      title: "Tropical Luxury Court",
      subtitle: "Золотой resort-кадр с fashion и leisure-позиционированием",
      badge: "ЛЮКС",
      alt: "Дмитрий Гаранин тропический luxury портрет",
      tags: ["Люкс", "Тропики", "Fashion"],
      description:
        "Тёплый resort-портрет добавляет публичному образу отдых, стиль и премиальную атмосферу.",
    },
    "morning-selfie": {
      title: "Утреннее селфи",
      subtitle: "Естественный личный кадр для более мягкого регистра",
      badge: "ЛИЧНОЕ",
      alt: "Дмитрий Гаранин утренний селфи портрет",
      tags: ["Личное", "Мягко", "Естественно"],
      description:
        "Более лёгкий личный портрет делает портфолио живым, не разрушая его полированность.",
    },
  },
  fr: {
    "golden-hour-river": {
      title: "Cadre rivière à l’heure dorée",
      subtitle: "Portrait cinématographique dans une lumière du soir réfléchie",
      badge: "CINÉMA",
      alt: "Dmitrii Garanin portrait cinématographique au bord de la rivière à l’heure dorée",
      tags: ["Cinéma", "Heure dorée", "Présence"],
      description:
        "Un portrait chaud sur l’eau, construit autour du calme, des reflets et d’une présence prête pour l’écran.",
    },
    "classical-art-museum": {
      title: "Présence au musée classique",
      subtitle: "Portrait d’acteur entre architecture théâtrale et sculpture",
      badge: "THÉÂTRE",
      alt: "Dmitrii Garanin portrait d’acteur dans un musée classique",
      tags: ["Théâtre", "Classique", "Personnage"],
      description:
        "Un cadre muséal retenu qui relie forme classique, discipline d’acteur et autorité calme.",
    },
    "helicopter-portrait": {
      title: "Éditorial vol privé",
      subtitle: "Image de mobilité luxe pour médias et positionnement de marque",
      badge: "MÉDIA",
      alt: "Dmitrii Garanin portrait éditorial lifestyle près d’un hélicoptère",
      tags: ["Éditorial", "Luxe", "Média"],
      description:
        "Un visuel statutaire et propre, avec une échelle aviation, pour un contexte premium et public.",
    },
    "tropical-island": {
      title: "Chemise blanche sur l’île",
      subtitle: "Portrait voyage international avec retenue cinématographique",
      badge: "VOYAGE",
      alt: "Dmitrii Garanin portrait tropical chemise blanche sur une île",
      tags: ["Voyage", "Cinéma", "Lifestyle"],
      description:
        "Un cadre côtier lumineux, détendu, international et visuellement poli.",
    },
    "evening-marina": {
      title: "Coupe marina du soir",
      subtitle: "Portrait portuaire à tonalité noir pour film et personnage",
      badge: "FILM",
      alt: "Dmitrii Garanin portrait cinématographique du soir dans une marina",
      tags: ["Film", "Noir", "Port"],
      description:
        "Une image de marina au crépuscule, avec une charge dramatique calme et une vraie logique narrative.",
    },
    "european-cafe": {
      title: "Lifestyle café européen",
      subtitle: "Cadre éditorial social avec énergie urbaine chaude",
      badge: "LIFESTYLE",
      alt: "Dmitrii Garanin portrait lifestyle dans un café européen",
      tags: ["Lifestyle", "Éditorial", "Ville"],
      description:
        "Une image publique de café, sociale, soignée et adaptée à une présence média premium.",
    },
    "historic-city": {
      title: "Promenade en ville historique",
      subtitle: "Silhouette blanche nette sur architecture européenne ancienne",
      badge: "VILLE",
      alt: "Dmitrii Garanin portrait en ville historique chemise blanche",
      tags: ["Film", "Ville", "Éditorial"],
      description:
        "Un portrait urbain avec profondeur architecturale pour le voyage, le personnage et le contexte cinéma.",
    },
    "summer-stone-wall": {
      title: "Étude d’été au mur de pierre",
      subtitle: "Cadre extérieur en pied avec clarté d’affiche théâtrale",
      badge: "ÉTUDE",
      alt: "Dmitrii Garanin portrait estival en pied près d’un mur de pierre",
      tags: ["Théâtre", "Extérieur", "Affiche"],
      description:
        "Une étude extérieure composée, avec lignes fortes, texture naturelle et silhouette d’acteur lisible.",
    },
    "motorcycle-rider": {
      title: "Gros plan motard",
      subtitle: "Image prête pour l’action avec regard protégé et énergie de mouvement",
      badge: "ACTION",
      alt: "Dmitrii Garanin portrait avec casque de moto",
      tags: ["Action", "Film", "Mouvement"],
      description:
        "Un gros plan cinétique qui ajoute vitesse, risque et énergie physique au portfolio.",
    },
    "evening-city": {
      title: "Signal ville du soir",
      subtitle: "Portrait urbain au crépuscule avec casque audio et ton contemporain",
      badge: "SÉRIE",
      alt: "Dmitrii Garanin portrait urbain du soir avec casque audio",
      tags: ["Série", "Urbain", "Jeunesse"],
      description:
        "Un cadre de ville contemporain, naturel pour les séries, le drame jeune et les histoires de rue.",
    },
    "sport-lifestyle": {
      title: "Signal sport lifestyle",
      subtitle: "Cadre rouge et bleu avec charme direct caméra",
      badge: "SPORT",
      alt: "Dmitrii Garanin portrait sport lifestyle en haut rouge",
      tags: ["Sport", "Série", "Énergie"],
      description:
        "Une image active plus lumineuse qui ouvre le portfolio au-delà des portraits formels et éditoriaux.",
    },
    "green-sweater": {
      title: "Pull vert intérieur",
      subtitle: "Portrait mode doux avec intimité lifestyle",
      badge: "FASHION",
      alt: "Dmitrii Garanin portrait fashion en pull vert",
      tags: ["Fashion", "Lifestyle", "Doux"],
      description:
        "Un portrait lifestyle proche, avec couleur tactile, texture mode et douceur maîtrisée.",
    },
    "minimalist-casual": {
      title: "Portrait miroir minimaliste",
      subtitle: "Cadre casual monochrome pour casting et identité",
      badge: "CASTING",
      alt: "Dmitrii Garanin portrait casual minimaliste au miroir",
      tags: ["Casting", "Minimal", "Portrait"],
      description:
        "Une image noir et blanc retenue où le visage, le profil et l’identité restent immédiatement lisibles.",
    },
    "golden-hour-close": {
      title: "Gros plan heure dorée",
      subtitle: "Portrait chaud et direct centré sur le regard",
      badge: "HEADSHOT",
      alt: "Dmitrii Garanin portrait gros plan à l’heure dorée",
      tags: ["Headshot", "Lumière chaude", "Casting"],
      description:
        "Un portrait proche et chaud, avec présence directe sans excès.",
    },
    "living-room-casual": {
      title: "Éditorial salon moderne",
      subtitle: "Portrait intérieur détendu avec attitude youth-fashion",
      badge: "ÉDITORIAL",
      alt: "Dmitrii Garanin portrait casual dans un salon moderne",
      tags: ["Éditorial", "Intérieur", "Fashion"],
      description:
        "Une image intérieure contemporaine, utile pour le lifestyle et le langage visuel social.",
    },
    "summer-beach-sunglasses": {
      title: "Gros plan plage et lunettes",
      subtitle: "Portrait d’été ensoleillé avec styling premium",
      badge: "ÉTÉ",
      alt: "Dmitrii Garanin portrait d’été plage lunettes de soleil",
      tags: ["Été", "Gros plan", "Style"],
      description:
        "Un cadre serré et solaire, avec styling net et signal luxury-summer marqué.",
    },
    "tropical-luxury": {
      title: "Court tropical luxe",
      subtitle: "Cadre resort doré entre mode et loisir",
      badge: "LUXE",
      alt: "Dmitrii Garanin portrait tropical luxe",
      tags: ["Luxe", "Tropical", "Fashion"],
      description:
        "Un portrait resort chaud qui ajoute loisir, style et atmosphère premium à l’image publique.",
    },
    "morning-selfie": {
      title: "Selfie du matin",
      subtitle: "Cadre naturel intime pour un registre plus doux",
      badge: "PERSONNEL",
      alt: "Dmitrii Garanin selfie portrait du matin",
      tags: ["Personnel", "Doux", "Naturel"],
      description:
        "Un portrait personnel plus léger qui rend le portfolio vivant sans perdre son niveau de finition.",
    },
  },
  am: {
    "golden-hour-river": {
      title: "Ոսկե ժամ գետի վրա",
      subtitle: "Կինեմատոգրաֆիկ դիմանկար երեկոյան արտացոլված լույսում",
      badge: "ԿԻՆՈ",
      alt: "Դմիտրի Գարանին ոսկե ժամ գետի վրա կինեմատոգրաֆիկ դիմանկար",
      tags: ["Կինո", "Ոսկե ժամ", "Ներկայություն"],
      description:
        "Տաք գետային կադր՝ հանգստության, արտացոլումների և էկրանային զուսպ ներկայության վրա կառուցված։",
    },
    "classical-art-museum": {
      title: "Դասական թանգարանային ներկայություն",
      subtitle: "Դերասանական դիմանկար թատերական ճարտարապետության և քանդակի մեջ",
      badge: "ԹԱՏՐՈՆ",
      alt: "Դմիտրի Գարանին դերասանական դիմանկար դասական թանգարանում",
      tags: ["Թատրոն", "Դասական", "Կերպար"],
      description:
        "Զուսպ թանգարանային կադր, որը կապում է դասական ձևը, դերասանական կարգապահությունը և հանգիստ վստահությունը։",
    },
    "helicopter-portrait": {
      title: "Private Flight Editorial",
      subtitle: "Լյուքս շարժման կադր մեդիայի և բրենդային դիրքավորման համար",
      badge: "ՄԵԴԻԱ",
      alt: "Դմիտրի Գարանին ուղղաթիռի մոտ lifestyle editorial դիմանկար",
      tags: ["Editorial", "Լյուքս", "Մեդիա"],
      description:
        "Մաքուր կարգավիճակային վիզուալ ավիացիոն մասշտաբով՝ պրեմիում lifestyle-ի և հանրային կերպարի համար։",
    },
    "tropical-island": {
      title: "Սպիտակ վերնաշապիկ կղզում",
      subtitle: "Միջազգային travel դիմանկար կինեմատոգրաֆիկ զսպվածությամբ",
      badge: "TRAVEL",
      alt: "Դմիտրի Գարանին տրոպիկական կղզի սպիտակ վերնաշապիկով դիմանկար",
      tags: ["Travel", "Կինո", "Lifestyle"],
      description:
        "Լուսավոր ծովափնյա կադր՝ հանգիստ, միջազգային և վիզուալ հղկված տրամադրությամբ։",
    },
    "evening-marina": {
      title: "Երեկոյան նավահանգիստ",
      subtitle: "Նուարային տրամադրությամբ port դիմանկար ֆիլմային կերպարի համար",
      badge: "ՖԻԼՄ",
      alt: "Դմիտրի Գարանին երեկոյան նավահանգիստ կինեմատոգրաֆիկ դիմանկար",
      tags: ["Ֆիլմ", "Նուար", "Port"],
      description:
        "Մայրամուտի marina-կադր՝ լուռ դրամատիկ լարվածությամբ և պատմողական վիզուալ տրամաբանությամբ։",
    },
    "european-cafe": {
      title: "Եվրոպական սրճարան",
      subtitle: "Սոցիալական editorial կադր տաք քաղաքային էներգիայով",
      badge: "LIFESTYLE",
      alt: "Դմիտրի Գարանին lifestyle դիմանկար եվրոպական սրճարանում",
      tags: ["Lifestyle", "Editorial", "Քաղաք"],
      description:
        "Հանրային սրճարանային կադր՝ սոցիալական, հավաքված և պրեմիում մեդիա ներկայությանը համապատասխան։",
    },
    "historic-city": {
      title: "Պատմական քաղաքի զբոսանք",
      subtitle: "Մաքուր սպիտակ կերպար հին եվրոպական ճարտարապետության ֆոնին",
      badge: "ՔԱՂԱՔ",
      alt: "Դմիտրի Գարանին պատմական քաղաքում սպիտակ վերնաշապիկով դիմանկար",
      tags: ["Ֆիլմ", "Քաղաք", "Editorial"],
      description:
        "Քաղաքային դիմանկար ճարտարապետական խորությամբ՝ travel-ի, կերպարի և կինեմատոգրաֆիկ համատեքստի համար։",
    },
    "summer-stone-wall": {
      title: "Ամառային էտյուդ քարե պատի մոտ",
      subtitle: "Ամբողջ հասակով outdoor կադր թատերական պաստառի հստակությամբ",
      badge: "ԷՏՅՈՒԴ",
      alt: "Դմիտրի Գարանին ամառային ամբողջ հասակով դիմանկար քարե պատի մոտ",
      tags: ["Թատրոն", "Outdoor", "Պաստառ"],
      description:
        "Հավաքված outdoor էտյուդ՝ ուժեղ գծերով, բնական տեքստուրայով և մաքուր դերասանական սիլուետով։",
    },
    "motorcycle-rider": {
      title: "Motorcycle Rider Close-Up",
      subtitle: "Action կադր պաշտպանված հայացքով և շարժման էներգիայով",
      badge: "ACTION",
      alt: "Դմիտրի Գարանին մոտոցիկլետային սաղավարտով դիմանկար",
      tags: ["Action", "Ֆիլմ", "Շարժում"],
      description:
        "Կինետիկ խոշոր պլան, որը պորտֆոլիոյին ավելացնում է արագություն, ռիսկ և ֆիզիկական էկրանային էներգիա։",
    },
    "evening-city": {
      title: "Երեկոյան քաղաքային ազդակ",
      subtitle: "Urban դիմանկար ականջակալներով և ժամանակակից կերպարի տոնով",
      badge: "ՍԵՐԻԱԼ",
      alt: "Դմիտրի Գարանին երեկոյան քաղաքային դիմանկար ականջակալներով",
      tags: ["Սերիալ", "Urban", "Երիտասարդություն"],
      description:
        "Ժամանակակից քաղաքային կադր, որը բնական է սերիալների, երիտասարդական դրամայի և փողոցային պատմությունների համար։",
    },
    "sport-lifestyle": {
      title: "Sport Lifestyle Signal",
      subtitle: "Կարմիր-կապույտ սպորտային կադր ուղիղ camera charm-ով",
      badge: "ՍՊՈՐՏ",
      alt: "Դմիտրի Գարանին sport lifestyle դիմանկար կարմիր հագուստով",
      tags: ["Սպորտ", "Սերիալ", "Էներգիա"],
      description:
        "Ավելի պայծառ ակտիվ կադր, որը պորտֆոլիոն բացում է ֆորմալ դիմանկարներից և editorial տեսարաններից դուրս։",
    },
    "green-sweater": {
      title: "Կանաչ սվիտեր",
      subtitle: "Փափուկ fashion դիմանկար lifestyle մտերմությամբ",
      badge: "FASHION",
      alt: "Դմիտրի Գարանին կանաչ սվիտերով fashion դիմանկար",
      tags: ["Fashion", "Lifestyle", "Փափուկ"],
      description:
        "Մոտ lifestyle դիմանկար՝ շոշափելի գույնով, fashion տեքստուրայով և վերահսկված փափկությամբ։",
    },
    "minimalist-casual": {
      title: "Մինիմալ mirror դիմանկար",
      subtitle: "Մաքուր մոնոխրոմ casual կադր քասթինգի և ինքնության համար",
      badge: "ՔԱՍԹԻՆԳ",
      alt: "Դմիտրի Գարանին մինիմալ casual դիմանկար հայելու մեջ",
      tags: ["Քասթինգ", "Մինիմալ", "Դիմանկար"],
      description:
        "Զուսպ սև-սպիտակ styling կադր, որտեղ դեմքը, պրոֆիլը և ինքնությունը հստակ ընթեռնելի են։",
    },
    "golden-hour-close": {
      title: "Խոշոր պլան ոսկե ժամին",
      subtitle: "Տաք ուղիղ դիմանկար՝ հայացքի վրա ֆոկուսով",
      badge: "HEADSHOT",
      alt: "Դմիտրի Գարանին ոսկե ժամ խոշոր դիմանկար",
      tags: ["Headshot", "Տաք լույս", "Քասթինգ"],
      description:
        "Մոտիկ, տաք դիմանկար՝ ուղիղ ներկայությամբ, առանց ավելորդ ճնշման։",
    },
    "living-room-casual": {
      title: "Modern Living Room Editorial",
      subtitle: "Հանգիստ ինտերիերային դիմանկար youth-fashion տրամադրությամբ",
      badge: "EDITORIAL",
      alt: "Դմիտրի Գարանին casual դիմանկար ժամանակակից հյուրասենյակում",
      tags: ["Editorial", "Ինտերիեր", "Fashion"],
      description:
        "Ժամանակակից ինտերիերային կադր casual styling-ով՝ lifestyle-ի և սոցիալական վիզուալ լեզվի համար։",
    },
    "summer-beach-sunglasses": {
      title: "Լողափնյա close-up ակնոցներով",
      subtitle: "Արևոտ ամառային դիմանկար պրեմիում styling-ով",
      badge: "ԱՄԱՌ",
      alt: "Դմիտրի Գարանին ամառային լողափնյա դիմանկար արևային ակնոցներով",
      tags: ["Ամառ", "Close-up", "Ոճ"],
      description:
        "Խիտ արևոտ կադր՝ հստակ styling-ով և ուժեղ luxury-summer ազդակով։",
    },
    "tropical-luxury": {
      title: "Tropical Luxury Court",
      subtitle: "Ոսկեգույն resort կադր fashion և leisure դիրքավորմամբ",
      badge: "ԼՅՈՒՔՍ",
      alt: "Դմիտրի Գարանին tropical luxury դիմանկար",
      tags: ["Լյուքս", "Տրոպիկ", "Fashion"],
      description:
        "Տաք resort դիմանկար, որը հանրային կերպարին ավելացնում է հանգիստ, ոճ և պրեմիում մթնոլորտ։",
    },
    "morning-selfie": {
      title: "Առավոտյան սելֆի",
      subtitle: "Բնական անձնական կադր ավելի փափուկ ռեգիստրի համար",
      badge: "ԱՆՁՆԱԿԱՆ",
      alt: "Դմիտրի Գարանին առավոտյան սելֆի դիմանկար",
      tags: ["Անձնական", "Փափուկ", "Բնական"],
      description:
        "Ավելի թեթև անձնական դիմանկար, որը պորտֆոլիոն կենդանի է դարձնում՝ պահպանելով հղկվածությունը։",
    },
  },
};

function getPortfolioItems(lang) {
  const itemCopy = portfolioItemCopy[lang] ?? {};

  return portfolioFrames.map((frame) => ({
    ...frame,
    ...(portfolioItemCopy.en[frame.id] ?? {}),
    ...(itemCopy[frame.id] ?? {}),
  }));
}

export default function Portfolio() {
  const { lang: routeLang = "en" } = useParams();
  const lang = resolveLang(routeLang);
  const copy = t(lang);

  const p = copy?.portfolio ?? {};

  const [active, setActive] = useState("all");
  const [open, setOpen] = useState(null);

  const items = getPortfolioItems(lang);

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
          {CATEGORIES.map((category) => {
            const on = active === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActive(category.id)}
                className={`min-h-10 whitespace-nowrap rounded-full border px-4 py-2 text-[12px] font-[700] leading-none transition-all duration-200 ${
                  on
                    ? "border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#FFD700]"
                    : "border-white/10 bg-white/5 text-white/70 hover:border-[#D4AF37]/40 hover:bg-white/10"
                }`}
              >
                {category.label}
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
                  decoding="async"
                  onError={(event) => {
                    event.currentTarget.src = fallbackCover;
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

                <div className="flex items-center justify-between gap-5 border-t border-white/10 pt-6">
                  <div className="text-[12px] tracking-[0.22em] uppercase text-white/50">
                    {SAFE(open?.subtitle, "")}
                  </div>
                  <button
                    onClick={() => setOpen(null)}
                    className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 transition-colors hover:bg-white/10 hover:text-white"
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

  function handleKeyDown(event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen();
    }
  }

  return (
    <Motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={index}
      className="group flex h-full cursor-pointer"
      onClick={onOpen}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="flex h-full w-full flex-col overflow-hidden rounded-[8px] border border-white/10 bg-white/[0.03] transition-all duration-300 hover:border-[#D4AF37]/40 hover:bg-white/[0.06]">
        <div className="relative aspect-[4/5] overflow-hidden bg-black">
          <img
            src={item?.cover}
            alt={SAFE(item?.alt, SAFE(item?.title, ""))}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
            style={{ objectPosition: item?.focus || "center" }}
            loading="lazy"
            decoding="async"
            onError={(event) => {
              event.currentTarget.src = fallbackCover;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />
          <div className="absolute top-4 right-4">
            {!!item?.badge && (
              <span className="rounded-full border border-white/20 bg-black/35 px-3 py-1 text-[10px] tracking-[0.22em] uppercase text-white/85 backdrop-blur">
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
