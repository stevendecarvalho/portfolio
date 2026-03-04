export type SearchKind = "page" | "article" | "film" | "event" | "person" | "other";

import accueil from "../assets/images/previews/home.jpg";

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
    img: accueil,
    kind: "page",
    keywords: ["home"],
  },
];
