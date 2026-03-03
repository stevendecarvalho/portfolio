export type SearchKind = "page" | "article" | "film" | "event" | "person" | "other";

export type SearchEntry = {
  id: string;
  title: string;
  href: string;
  img: string;
  kind: SearchKind;
  subtitle?: string;
  keywords?: string[];
};

export const searchIndex: SearchEntry[] = [
  {
    id: "accueil",
    title: "Accueil",
    href: "/",
    img: "/assets/menu/festival.jpg",
    kind: "page",
    subtitle: "Page d'accueil",
    keywords: ["home"],
  },
];
