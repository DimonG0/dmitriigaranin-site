export const SOCIAL_LINKS = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@dmitrii_garanln",
    url: "https://www.instagram.com/dmitrii_garanln/",
  },
  {
    id: "vk",
    label: "VK",
    handle: "dimagaraninofficial",
    url: "https://vk.com/dimagaraninofficial",
  },
  {
    id: "pinterest",
    label: "Pinterest",
    handle: "dmitrii_garanin",
    url: "https://ph.pinterest.com/dmitrii_garanin/",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Dimon.G0",
    url: "https://www.facebook.com/Dimon.G0/",
  },
];

export const SOCIAL_URLS = SOCIAL_LINKS.reduce(
  (urls, link) => ({ ...urls, [link.id]: link.url }),
  {}
);
