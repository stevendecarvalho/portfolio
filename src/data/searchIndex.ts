export type SearchKind = "page" | "article" | "film" | "event" | "person" | "other";

export type SearchEntry = {
  id: string;
  title: string;
  href: string;
  img: string;          // preview image
  kind: SearchKind;     // page / article / autre
  subtitle?: string;    // optionnel (ex: catégorie, année, auteur…)
  keywords?: string[];  // optionnel (pour matcher plus large)
};

export const searchIndex: SearchEntry[] = [
  {
    id: "festival",
    title: "Le festival",
    href: "/festival",
    img: "/assets/menu/festival.jpg",
    kind: "page",
    subtitle: "À propos",
    keywords: ["europe", "autour", "paris"],
  },
  {
    id: "press",
    title: "Espace presse",
    href: "/presse",
    img: "/assets/menu/contact.jpg",
    kind: "page",
    subtitle: "Infos & contacts",
    keywords: ["media", "dossier", "communiqué"],
  },
];
