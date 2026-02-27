export type Btn = { label: string; href: string; variant?: "primary" | "ghost" };

export type Social = {
  label: string;
  href: string;
  icon: "facebook" | "x" | "instagram" | "tiktok" | "youtube" | "linkedin" | "whatsapp";
  target?: "_blank" | "_self";
  rel?: string;
};


export type CardItem = {
  title: string;
  href: string;
  img: string;
  desc?: string;
};

export type Block =
  | { type: "title"; text: string; badge?: string }
  | { type: "richText"; text: string }
  | { type: "buttonRow"; buttons: Btn[] }
  | { type: "socialRow"; socials: Social[] }
  | { type: "cardGrid"; items: CardItem[]; cols?: 1 | 2 | 3; compact?: boolean }
  | { type: "imageFill"; src: string; alt: string; href?: string; overlay?: boolean };

  // Paramètres de layout pour le mega menu
  export type MegaLayout = {
    widthPx?: number;
    maxWidthVw?: number;
    paddingPx?: number;
    colGapPx?: number;
    outerMtPx?: number;
    frameClass?: string;
  };
  export type MegaColumn = { width?: 1 | 2 | 3 | 4 | 5; blocks: Block[] };
  export type NavItem = {
    label: string;
    href?: string;
    mega?: {
      columns: MegaColumn[];
      maxWidth?: "md" | "lg" | "xl";
      layout?: MegaLayout;
      gridTemplateColumns?: string;
    };
  };

  // Données de navigation
  export const navLinks = [
    { label: "Accueil", href: "/" },

    { label: "À propos",
      mega: {
        layout: {
          widthPx: 1100,
          maxWidthVw: 92,
          paddingPx: 10,
          colGapPx: 10,
          outerMtPx: 0,
          frameClass: "border border-cyan-400/20 bg-cosmic-black/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.55)]",
        },

        gridTemplateColumns:
          "240px 1fr 1fr 1fr 340px",

        columns: [
          // Présentation + socials
          {
            width: 1,
            blocks: [
              { type: "title", text: "Qui suis-je ?", badge: "" },
              {
                type: "richText",
                text:
                  "Créatif multidisciplinaire, Steven DE CARVALHO évolue à la croisée du digital, du cinéma et de la direction artistique.\n\nChef de projet, UX designer et réalisateur, il conçoit des expériences visuelles et numériques alliant exigence esthétique, performance technique et impact culturel.",
              },
              {
                type: "socialRow",
                socials: [
                  { label: "Facebook", href: "https://www.facebook.com/people/Steven-Insights/61585398478536/?locale=fr_FR", icon: "facebook" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/steven-de-carvalho", target: "_blank", icon: "linkedin" },
                  { label: "Instagram", href: "https://www.instagram.com/steven.insights/", target: "_blank", icon: "instagram" },
                  { label: "YouTube", href: "https://www.youtube.com/@stevendecarvalho2021", target: "_blank", icon: "youtube" },
                  { label: "WhatsApp", href: "https://wa.me/33661332501", target: "_blank", icon: "whatsapp" },
                ],
              },
            ],
          },

          // Colonne 2 : 3 cartes
          {
            width: 1,
            blocks: [
              {
                type: "cardGrid",
                cols: 1,
                items: [
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/festival.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/histoire.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/engagements.jpg" },
                ],
              },
            ],
          },

          // Colonne 3 : 3 cartes
          {
            width: 1,
            blocks: [
              {
                type: "cardGrid",
                cols: 1,
                items: [
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/festival.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/histoire.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/engagements.jpg" },
                ],
              },
            ],
          },

          // Colonne 4 : 3 cartes
          {
            width: 1,
            blocks: [
              {
                type: "cardGrid",
                cols: 1,
                items: [
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/festival.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/histoire.jpg" },
                  { title: "A venir...", href: "/coming-soon", img: "/assets/menu/engagements.jpg" },
                ],
              },
            ],
          },

          // Colonne 5 : image full height
          {
            width: 1,
            blocks: [
              {
                type: "imageFill",
                src: "/assets/menu/paris.jpg",
                alt: "Paris",
                href: "/festival",
                overlay: true,
              },
            ],
          },
        ],
      },
    },

    { label: "Expertises", href: "/2026" },
    { label: "Projets", href: "/mediatheque" },
    { label: "Blog", href: "/infos-pratiques" },
    { label: "Contact", href: "/presse" },
  ];
