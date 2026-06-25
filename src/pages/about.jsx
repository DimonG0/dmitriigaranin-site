import { motion as Motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { t } from "../lib/i18n";
import { usePageSeo } from "../lib/usePageSeo";
import { SOCIAL_LINKS, THREADS_LINK } from "../lib/socialLinks";

const fadeUp = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const content = {
  en: {
    pill: "About",
    title: "Dmitrii Garanin",
    strap: "Actor with a creative and IT/product background",
    lead:
      "Dmitrii Garanin is building a screen and stage career from an unusual base: management discipline, digital product thinking, corporate media projects, international exposure, and formal acting training at VGIK.",
    origin:
      "The route is important: not a random portfolio, but a visible path from business and presentation work into acting, character work, theatre, cinema, voice, and editorial image-making.",
    facts: [
      ["Base", "Management, IT, presentation logic"],
      ["Acting school", "VGIK acting formation and graduation"],
      ["Current focus", "Cinema, theatre, voice, editorial projects"],
    ],
    timelineTitle: "Origin timeline",
    timeline: [
      {
        label: "Business and product base",
        title: "Management first, performance later",
        text:
          "The early foundation was not only creative. It included management, systems thinking, digital products, and the habit of presenting complex ideas clearly.",
      },
      {
        label: "KAMAZ and conference media",
        title: "Corporate-scale projects",
        text:
          "The KAMAZ/conference chapter belongs to the practical side of the biography: media, presentation, coordination, and work around a large industrial brand context.",
      },
      {
        label: "Expo Dubai",
        title: "International perspective",
        text:
          "The Dubai Expo trip added a global reference point: large pavilions, national storytelling, technology, audience flow, and the scale of public presentation.",
      },
      {
        label: "VGIK",
        title: "Acting training and graduation",
        text:
          "VGIK is the formal acting chapter: craft, discipline, camera awareness, stage language, character construction, and a professional artistic frame.",
      },
      {
        label: "Now",
        title: "Actor, creative, digital presence",
        text:
          "The current direction combines acting, theatre and screen work, voice, editorial portraiture, and a premium digital portfolio built around a clear public identity.",
      },
    ],
    projectsTitle: "What belongs here",
    projects: [
      "KAMAZ and conference-related media / presentation projects",
      "Photo and media materials from exhibition or conference contexts",
      "Expo Dubai trip and international visual references",
      "VGIK completion and actor portfolio materials",
      "Cinema, theatre, voiceover, advertising and fashion positioning",
    ],
    sourcesTitle: "Public links",
    sourcesIntro:
      "Open profiles and context links for the public footprint. Exact articles can be added here as soon as you send or confirm them.",
    ctaPortfolio: "Open portfolio",
    ctaContact: "Contact",
  },
  ru: {
    pill: "О себе",
    title: "Дмитрий Гаранин",
    strap: "Актер с бэкграундом в креативе, IT и продуктовой логике",
    lead:
      "Дмитрий Гаранин строит актерскую карьеру не с пустого места: за ней стоят менеджмент, IT/продуктовое мышление, корпоративные медиа-проекты, международный опыт и актерская школа ВГИК.",
    origin:
      "Здесь важен маршрут: это не случайная витрина фотографий, а понятная история перехода от бизнеса, презентаций и медиа к актерству, образам, театру, кино, озвучиванию и редакционной подаче.",
    facts: [
      ["База", "Менеджмент, IT, презентационная логика"],
      ["Актерская школа", "ВГИК, актерская подготовка и выпуск"],
      ["Фокус сейчас", "Кино, театр, озвучивание, editorial-проекты"],
    ],
    timelineTitle: "Откуда все началось",
    timeline: [
      {
        label: "Бизнес и продуктовая база",
        title: "Сначала управление, потом сцена",
        text:
          "Стартовая база была не только творческой: менеджмент, системное мышление, цифровые продукты и навык понятно упаковывать сложные идеи.",
      },
      {
        label: "KAMAZ и конференции",
        title: "Проекты крупного масштаба",
        text:
          "Этап KAMAZ/конференций относится к практической части биографии: медиа, презентации, координация и работа в контексте большого индустриального бренда.",
      },
      {
        label: "Expo Dubai",
        title: "Международная перспектива",
        text:
          "Поездка на Expo в Дубай добавила глобальную оптику: павильоны, национальный сторителлинг, технологии, движение аудитории и масштаб публичной презентации.",
      },
      {
        label: "ВГИК",
        title: "Актерская школа и выпуск",
        text:
          "ВГИК — формальная актерская глава: ремесло, дисциплина, камера, сцена, построение персонажа и профессиональная художественная рамка.",
      },
      {
        label: "Сейчас",
        title: "Актер, креатив, цифровое присутствие",
        text:
          "Текущее направление соединяет актерство, театр и экран, озвучивание, портретную подачу и премиальное цифровое портфолио с ясной публичной идентичностью.",
      },
    ],
    projectsTitle: "Что сюда входит",
    projects: [
      "KAMAZ и конференционные медиа / презентационные проекты",
      "Фото и медиа-материалы из выставочных или конференционных контекстов",
      "Поездка на Expo Dubai и международные визуальные референсы",
      "Окончание ВГИК и актерские портфолио-материалы",
      "Кино, театр, озвучивание, реклама и fashion-позиционирование",
    ],
    sourcesTitle: "Публичные ссылки",
    sourcesIntro:
      "Открытые профили и контекстные ссылки. Точные статьи можно добавить в этот блок сразу, как только вы пришлете или подтвердите их.",
    ctaPortfolio: "Открыть портфолио",
    ctaContact: "Контакт",
  },
  fr: {
    pill: "À propos",
    title: "Dmitrii Garanin",
    strap: "Acteur avec une base créative, IT et produit",
    lead:
      "Dmitrii Garanin construit une trajectoire d'acteur à partir d'une base inhabituelle : discipline de management, pensée produit digitale, projets médias corporate, exposition internationale et formation d'acteur au VGIK.",
    origin:
      "Le parcours compte : ce n'est pas une vitrine aléatoire, mais une progression lisible du business, des présentations et des médias vers le jeu, les personnages, le théâtre, le cinéma, la voix et l'image éditoriale.",
    facts: [
      ["Base", "Management, IT, logique de présentation"],
      ["Formation", "VGIK, formation et diplôme d'acteur"],
      ["Focus actuel", "Cinéma, théâtre, voix, projets éditoriaux"],
    ],
    timelineTitle: "Chronologie d'origine",
    timeline: [
      {
        label: "Business et produit",
        title: "Management d'abord, scène ensuite",
        text:
          "La première base n'était pas seulement créative. Elle réunissait management, pensée système, produits digitaux et capacité à présenter clairement des idées complexes.",
      },
      {
        label: "KAMAZ et médias de conférence",
        title: "Projets à grande échelle",
        text:
          "Le chapitre KAMAZ/conférences appartient au côté pratique de la biographie : médias, présentation, coordination et travail autour d'un grand contexte industriel.",
      },
      {
        label: "Expo Dubai",
        title: "Perspective internationale",
        text:
          "Le voyage à l'Expo de Dubai a ajouté un repère global : pavillons, narration nationale, technologie, flux d'audience et échelle de présentation publique.",
      },
      {
        label: "VGIK",
        title: "Formation d'acteur et diplôme",
        text:
          "Le VGIK représente le chapitre formel du jeu : métier, discipline, conscience caméra, langage scénique, construction du personnage et cadre artistique professionnel.",
      },
      {
        label: "Aujourd'hui",
        title: "Acteur, créatif, présence digitale",
        text:
          "La direction actuelle relie jeu, théâtre, écran, voix, portrait éditorial et portfolio digital premium autour d'une identité publique claire.",
      },
    ],
    projectsTitle: "Ce qui appartient ici",
    projects: [
      "Médias et présentations liés à KAMAZ et aux conférences",
      "Photos et matériaux médias issus de contextes d'exposition ou de conférence",
      "Voyage à l'Expo Dubai et références visuelles internationales",
      "Fin du VGIK et matériaux de portfolio acteur",
      "Cinéma, théâtre, voix off, publicité et positionnement fashion",
    ],
    sourcesTitle: "Liens publics",
    sourcesIntro:
      "Profils ouverts et liens de contexte pour la présence publique. Les articles précis pourront être ajoutés ici dès qu'ils seront envoyés ou confirmés.",
    ctaPortfolio: "Ouvrir le portfolio",
    ctaContact: "Contact",
  },
  am: {
    pill: "Իմ մասին",
    title: "Դմիտրի Գարանին",
    strap: "Դերասան՝ կրեատիվ, IT և պրոդուկտային հիմքով",
    lead:
      "Դմիտրի Գարանինը դերասանական ճանապարհ է կառուցում ոչ սովորական հիմքից՝ մենեջմենթ, թվային պրոդուկտային մտածողություն, կորպորատիվ մեդիա նախագծեր, միջազգային փորձ և դերասանական կրթություն ՎԳԻԿ-ում։",
    origin:
      "Այս ճանապարհը կարևոր է. սա պատահական լուսանկարների հավաքածու չէ, այլ տեսանելի անցում բիզնեսից, ներկայացումներից և մեդիայից դեպի դերասանություն, կերպար, թատրոն, կինո, ձայն և խմբագրական կերպար։",
    facts: [
      ["Հիմք", "Մենեջմենթ, IT, ներկայացման տրամաբանություն"],
      ["Դերասանական դպրոց", "ՎԳԻԿ, դերասանական պատրաստում և ավարտ"],
      ["Ներկայիս ֆոկուս", "Կինո, թատրոն, ձայն, խմբագրական նախագծեր"],
    ],
    timelineTitle: "Սկզբի ժամանակագիծ",
    timeline: [
      {
        label: "Բիզնես և պրոդուկտային հիմք",
        title: "Սկզբում կառավարում, հետո բեմ",
        text:
          "Առաջին հիմքը միայն ստեղծագործական չէր. այն ներառում էր մենեջմենթ, համակարգային մտածողություն, թվային պրոդուկտներ և բարդ գաղափարները պարզ ներկայացնելու հմտություն։",
      },
      {
        label: "KAMAZ և կոնֆերանսների մեդիա",
        title: "Մեծ մասշտաբի նախագծեր",
        text:
          "KAMAZ-ի և կոնֆերանսների փուլը կենսագրության գործնական կողմն է՝ մեդիա, ներկայացումներ, համակարգում և աշխատանք մեծ արդյունաբերական բրենդի համատեքստում։",
      },
      {
        label: "Expo Dubai",
        title: "Միջազգային դիտանկյուն",
        text:
          "Dubai Expo-ի այցը ավելացրեց գլոբալ հղում՝ պավիլիոններ, ազգային պատմում, տեխնոլոգիա, հանդիսատեսի հոսք և հանրային ներկայացման մասշտաբ։",
      },
      {
        label: "ՎԳԻԿ",
        title: "Դերասանական կրթություն և ավարտ",
        text:
          "ՎԳԻԿ-ը դերասանական ճանապարհի պաշտոնական գլուխն է՝ վարպետություն, կարգապահություն, տեսախցիկի գիտակցում, բեմական լեզու, կերպարի կառուցում և մասնագիտական գեղարվեստական շրջանակ։",
      },
      {
        label: "Հիմա",
        title: "Դերասան, կրեատիվ, թվային ներկայություն",
        text:
          "Ներկայիս ուղղությունը միավորում է դերասանություն, թատրոն և էկրան, ձայն, խմբագրական դիմանկար և պրեմիում թվային պորտֆոլիո՝ հստակ հանրային ինքնությամբ։",
      },
    ],
    projectsTitle: "Ինչ է ներառված այստեղ",
    projects: [
      "KAMAZ-ի և կոնֆերանսների հետ կապված մեդիա / ներկայացման նախագծեր",
      "Ցուցահանդեսային կամ կոնֆերանսային համատեքստերի լուսանկարներ և մեդիա նյութեր",
      "Expo Dubai այց և միջազգային տեսողական հղումներ",
      "ՎԳԻԿ-ի ավարտ և դերասանական պորտֆոլիոյի նյութեր",
      "Կինո, թատրոն, ձայնագրում, գովազդ և fashion դիրքավորում",
    ],
    sourcesTitle: "Հանրային հղումներ",
    sourcesIntro:
      "Բաց պրոֆիլներ և համատեքստային հղումներ հանրային ներկայության համար։ Ճշգրիտ հոդվածները կարելի է ավելացնել այստեղ, երբ դրանք ուղարկվեն կամ հաստատվեն։",
    ctaPortfolio: "Բացել պորտֆոլիոն",
    ctaContact: "Կապ",
  },
};

const contextLinks = [
  { label: "VGIK", url: "https://vgik.info/" },
  { label: "KAMAZ", url: "https://kamaz.ru/" },
  { label: "Expo 2020 Dubai", url: "https://www.expo2020dubai.com/" },
];

export default function About() {
  const { lang = "en" } = useParams();
  const copy = t(lang);
  const page = content[lang] || content.en;
  const sourceLinks = [...SOCIAL_LINKS, THREADS_LINK, ...contextLinks];

  usePageSeo(lang, "about");

  return (
    <main className="relative min-h-[calc(100vh-1px)] overflow-hidden text-white">
      <section className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-24 pt-24 md:pt-28">
        <Motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] tracking-[0.22em] uppercase text-white/70 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
              {page.pill}
            </div>

            <h1 className="mt-6 break-words text-[42px] font-[900] leading-[0.98] md:text-[68px]">
              <span className="bg-gradient-to-r from-white via-[#f6e6a7] to-[#D4AF37] bg-clip-text text-transparent">
                {page.title}
              </span>
            </h1>

            <p className="mt-4 max-w-3xl text-[12px] font-semibold uppercase leading-6 tracking-[0.24em] text-white/55 md:tracking-[0.34em]">
              {page.strap}
            </p>
          </div>

          <div className="lg:col-span-5">
            <p className="text-[15px] leading-8 text-white/74">{page.lead}</p>
          </div>
        </Motion.div>

        <Motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3"
        >
          {page.facts.map(([label, value]) => (
            <div key={label} className="h-full rounded-[8px] border border-white/10 bg-white/[0.04] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#D4AF37]">
                {label}
              </div>
              <div className="mt-3 text-[14px] leading-6 text-white/78">{value}</div>
            </div>
          ))}
        </Motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <Motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="lg:col-span-5"
          >
            <div className="grid grid-cols-5 gap-3">
              <div className="col-span-3 overflow-hidden rounded-[8px] border border-white/10 bg-black">
                <img
                  src="/portfolio-media/dmitrii-headshot-2026.jpg"
                  alt={page.title}
                  className="aspect-[4/5] h-full w-full object-cover object-[center_24%]"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-3">
                <div className="overflow-hidden rounded-[8px] border border-white/10 bg-black">
                  <img
                    src="/portfolio-media/media-exhibit.jpg"
                    alt="Media exhibit"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
                <div className="overflow-hidden rounded-[8px] border border-white/10 bg-black">
                  <img
                    src="/portfolio-media/new-generation-actor-palace.jpg"
                    alt="Actor portfolio"
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </div>
            </div>

            <p className="mt-6 border-l border-[#D4AF37]/55 pl-5 text-[14px] leading-7 text-white/70">
              {page.origin}
            </p>
          </Motion.div>

          <Motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2.4}
            className="lg:col-span-7"
          >
            <div className="mb-5 flex items-end justify-between gap-4">
              <h2 className="text-[28px] font-[900] uppercase leading-tight text-white md:text-[38px]">
                {page.timelineTitle}
              </h2>
              <div className="hidden h-px flex-1 bg-gradient-to-r from-[#D4AF37]/45 to-transparent md:block" />
            </div>

            <div className="space-y-3">
              {page.timeline.map((item, index) => (
                <TimelineItem key={item.title} item={item} index={index} />
              ))}
            </div>
          </Motion.div>
        </div>

        <Motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={3}
          className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12"
        >
          <div className="lg:col-span-5">
            <h2 className="text-[26px] font-[900] uppercase leading-tight text-white md:text-[34px]">
              {page.projectsTitle}
            </h2>
            <div className="mt-5 space-y-2">
              {page.projects.map((item) => (
                <div key={item} className="flex gap-3 text-[14px] leading-7 text-white/72">
                  <span className="mt-3 h-px w-5 shrink-0 bg-[#D4AF37]" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <h2 className="text-[26px] font-[900] uppercase leading-tight text-white md:text-[34px]">
              {page.sourcesTitle}
            </h2>
            <p className="mt-4 max-w-2xl text-[14px] leading-7 text-white/62">{page.sourcesIntro}</p>

            <div className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {sourceLinks.map((link) => (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[8px] border border-white/10 bg-white/[0.04] px-4 py-3 transition hover:border-[#D4AF37]/55 hover:bg-[#D4AF37]/10"
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-[#f6e6a7]">
                    {link.label}
                  </span>
                  <span className="mt-1 block truncate text-[11px] text-white/52">
                    {link.handle || link.url.replace(/^https?:\/\//, "")}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </Motion.div>

        <Motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={4}
          className="mt-14 flex flex-wrap items-center gap-4"
        >
          <Link
            to={`/${lang}/portfolio`}
            className="rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 px-7 py-3 text-[12px] font-[700] uppercase tracking-[0.22em] text-[#f7e7b2] transition-colors hover:border-[#D4AF37]/80 hover:bg-[#D4AF37]/20"
          >
            {page.ctaPortfolio || copy.nav.portfolio}
            {" ->"}
          </Link>

          <Link
            to={`/${lang}/contact`}
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-[12px] font-[700] uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-white/25 hover:bg-white/10"
          >
            {page.ctaContact || copy.nav.contact}
            {" ->"}
          </Link>
        </Motion.div>
      </section>
    </main>
  );
}

function TimelineItem({ item, index }) {
  return (
    <div className="grid grid-cols-[52px_minmax(0,1fr)] gap-4 rounded-[8px] border border-white/10 bg-white/[0.035] p-4">
      <div className="text-[11px] font-black text-[#D4AF37]">{String(index + 1).padStart(2, "0")}</div>
      <div className="min-w-0">
        <div className="break-words text-[10px] font-bold uppercase leading-5 tracking-[0.2em] text-white/42 md:tracking-[0.26em]">
          {item.label}
        </div>
        <div className="mt-2 break-words text-[18px] font-[900] leading-tight text-white">{item.title}</div>
        <p className="mt-2 text-[14px] leading-7 text-white/66">{item.text}</p>
      </div>
    </div>
  );
}
