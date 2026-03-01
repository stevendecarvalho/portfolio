import heroSlide001 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import heroSlide002 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import heroSlide003 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-003.jpg";

import heroSlide001_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-001.jpg";

import previewASLCDanse_001 from "../assets/images/imgProjets/preview-projet-festival-aslc-danse-001.jpg";
import previewFEAE_001 from "../assets/images/imgProjets/preview-projet-festival-leurope-autour-de-leurope-001.jpg";
import previewIzziFit from "../assets/images/imgProjets/preview-projet-festival-izzi-fit-academy-001.jpg";

import aboutFutureImage from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-about-future.jpg";
import biographyImage from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-biography.jpg";

import aboutFutureImage_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-about-future-light.jpg";
import biographyImage_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-biography-light.jpg";

import universeBannerVideoDark from "../assets/videos/steven-de-carvalho-galaxy-banner.mp4";
import earthBannerVideoDark from "../assets/videos/steven-de-carvalho-earth-galaxy-banner2.mp4";

import parisBannerVideoLight from "../assets/videos/steven-de-carvalho-future-paris-banner.mp4";
import earthBannerVideoLight from "../assets/videos/steven-de-carvalho-earth-galaxy-banner2.mp4";

import serviceDevWeb from "../assets/images/home/realisations-sites-internet-webdesign.jpg";
import serviceSEO from "../assets/images/home/realisations-referencement-seo.jpg";
import serviceSocialMedia from "../assets/images/home/realisations-social-media.jpg";
import serviceGraphisme from "../assets/images/home/realisations-design-graphique.jpg";
import serviceBranding from "../assets/images/home/realisations-communication-branding.jpg";
import serviceMarketing from "../assets/images/home/realisations-marketing.jpg";
import serviceIntelligenceArtificielle from "../assets/images/home/realisations-intelligence-artificielle.jpg";
import servicePhotographie from "../assets/images/home/realisations-photographies.jpg";
import serviceCinema from "../assets/images/home/realisations-creation-contenus-videos.jpg";

import serviceDevWebLight from "../assets/images/home/realisations-sites-internet-webdesign-light.jpg";
import serviceSEOLight from "../assets/images/home/realisations-referencement-seo-light.jpg";
import serviceSocialMediaLight from "../assets/images/home/realisations-social-media-light.jpg";
import serviceGraphismeLight from "../assets/images/home/realisations-design-graphique-light.jpg";
import serviceBrandingLight from "../assets/images/home/realisations-communication-branding-light.jpg";
import serviceMarketingLight from "../assets/images/home/realisations-marketing-light.jpg";
import serviceIntelligenceArtificielleLight from "../assets/images/home/realisations-intelligence-artificielle-light.jpg";
import servicePhotographieLight from "../assets/images/home/realisations-photographies-light.jpg";
import serviceCinemaLight from "../assets/images/home/realisations-creation-contenus-videos-light.jpg";

import alexandre_izzi from "../assets/testimonials/temoignages-alexandre-izzi.jpg";
import sebastien_vaugeois from "../assets/testimonials/sebastien-vaugeois.jpeg";
import laurie_lesseigne from "../assets/testimonials/Laurie-Lesseigne.jpg";

export const heroImages = [
  heroSlide001,
  heroSlide002,
  heroSlide003,
];

export const heroImagesLight = [
  heroSlide001_Light
];

export const heroImagesByTheme = {
  dark: heroImages,
  light: heroImagesLight,
} as const;

export const aboutSlidesByTheme = {
  dark: [aboutFutureImage, biographyImage],
  light: [aboutFutureImage_Light, biographyImage_Light],
} as const;

export type imgProjetsItem = {
  srcByTheme: {
    dark: string;
    light: string;
  };
  title: string;
  href: string;
};

export const imgProjets: imgProjetsItem[] = [
  {
    srcByTheme: {
      dark: previewASLCDanse_001,
      light: previewASLCDanse_001,
    },
    title: "ASLC Danse",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewFEAE_001,
      light: previewFEAE_001,
    },
    title: "Festival L'Europe autour de l'Europe",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewIzziFit,
      light: previewIzziFit,
    },
    title: "IZZI FIT Academy",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewASLCDanse_001,
      light: previewASLCDanse_001,
    },
    title: "ASLC Danse",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewFEAE_001,
      light: previewFEAE_001,
    },
    title: "Festival L'Europe autour de l'Europe",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewIzziFit,
      light: previewIzziFit,
    },
    title: "IZZI FIT Academy",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewASLCDanse_001,
      light: previewASLCDanse_001,
    },
    title: "ASLC Danse",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewFEAE_001,
      light: previewFEAE_001,
    },
    title: "Festival L'Europe autour de l'Europe",
    href: "#"
  },
  {
    srcByTheme: {
      dark: previewIzziFit,
      light: previewIzziFit,
    },
    title: "IZZI FIT Academy",
    href: "#"
  },
];

export const bannerVideosByTheme = {
  dark: {
    universe: universeBannerVideoDark,
    earth: earthBannerVideoDark,
  },
  light: {
    universe: parisBannerVideoLight,
    earth: earthBannerVideoLight,
  },
} as const;

export type ServiceItem = {
  srcByTheme: {
    dark: string;
    light: string;
  };
  title: string;
  desc: string;
  href: string;
};

export const services: ServiceItem[] = [
  {
    srcByTheme: {
      dark: serviceDevWeb,
      light: serviceDevWebLight,
    },
    title: "Développement Web",
    desc: "Webdesign et création de sites web modernes et performants",
    href: "/services/developpement-web"
  },
  {
    srcByTheme: {
      dark: serviceSEO,
      light: serviceSEOLight,
    },
    title: "Référencement SEO",
    desc: "Optimisation pour les moteurs de recherche et visibilité en ligne",
    href: "/services/referencement-seo"
  },
  {
    srcByTheme: {
      dark: serviceSocialMedia,
      light: serviceSocialMediaLight,
    },
    title: "Social Media",
    desc: "Gestion et animation de vos réseaux sociaux",
    href: "/services/social-media"
  },
  {
    srcByTheme: {
      dark: serviceGraphisme,
      light: serviceGraphismeLight,
    },
    title: "Graphisme",
    desc: "Création de visuels structurés et esthétiques pour tout vos supports",
    href: "/services/graphisme"
  },
  {
    srcByTheme: {
      dark: serviceBranding,
      light: serviceBrandingLight,
    },
    title: "Logos & Branding",
    desc: "Création d’identités de marque fortes et impactantes",
    href: "/services/branding",
  },
  {
    srcByTheme: {
      dark: serviceMarketing,
      light: serviceMarketingLight,
    },
    title: "Stratégies Marketing",
    desc: "Stratégies digitales pour booster votre croissance",
    href: "/services/strategies-marketing"
  },
  {
    srcByTheme: {
      dark: serviceIntelligenceArtificielle,
      light: serviceIntelligenceArtificielleLight,
    },
    title: "Intelligence artificielle",
    desc: "Optimisation des flux de travail, génération de contenus et systèmes intelligents sur mesure.",
    href: "/services/intelligence-artificielle"
  },
  {
    srcByTheme: {
      dark: servicePhotographie,
      light: servicePhotographieLight,
    },
    title: "Photographie",
    desc: "Captures professionnelles pour tous vos besoins visuels",
    href: "/services/photographie"
  },
  {
    srcByTheme: {
      dark: serviceCinema,
      light: serviceCinemaLight,
    },
    title: "Vidéo - Cinéma",
    desc: "Production vidéo et contenus cinématographiques",
    href: "/services/video-cinema"
  },
];

export const projects = [
  {
    title: "A venir...",
    desc: "A venir...",
    category: "Développement Web",
    img: "https://images.unsplash.com/photo-1687389806477-22be64a5480f?auto=format&fit=crop&w=1600&q=85",
    tags: ["React", "Node.js", "MongoDB"],
  }
];

export const clientLogos = [
  {
    name: "Savéol",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/11/steven-de-carvalho-website-references-saveol-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/11/steven-de-carvalho-website-references-saveol-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Le petit carré de chocolat",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-le-petit-carre-de-chocolat-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-le-petit-carre-de-chocolat-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Festival L'Europe autour de l'Europe",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-festival-leurope-autour-de-leurope-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-festival-leurope-autour-de-leurope-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Ville de Paris",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-ville-de-paris-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-ville-de-paris-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Festival du cinéma chinois de Paris",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-festival-du-cinema-chinois-de-paris-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-festival-du-cinema-chinois-de-paris-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "IZZI FIT ACADEMY",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-izzi-fit-academy-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/09/steven-de-carvalho-website-references-izzi-fit-academy-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Bouygues Construction",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-bouygues-construction-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-bouygues-construction-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Bouygues Telecom",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-bouygues-telecom-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-bouygues-telecom-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "IT Forum",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-it-forum-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-it-forum-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
  {
    name: "Grill O'Bois",
    srcByTheme: {
      dark: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-grillobois-white.png",
      light: "https://stevendecarvalho.com/wp-content/uploads/2025/10/steven-de-carvalho-website-references-grillobois-white.png",
    },
    href: "https://stevendecarvalho.com/portfolio/",
  },
];

export const testimonials = [
  {
    initials: "AI",
    avatar: alexandre_izzi,
    name: "Alexandre IZZI",
    role: "CEO - IZZI FIT ACADEMY",
    text: "Steven a su traduire avec une précision exceptionnelle l’essence de la IZZI FIT ACADEMY. Il ne s’est pas contenté de créer un simple site : il a bâti une véritable identité de marque, puissante, élégante et alignée avec les valeurs de notre accompagnement haut de gamme. \n Sa vision stratégique et son sens du détail ont été déterminants pour renforcer notre positionnement premium. Chaque élément – de notre nom d’entreprise au logo en passant par l’arborescence du site – tout a été pensé pour offrir une expérience fluide, cohérente et inspirante à nos prospects.<br/>Steven est bien plus qu’un créatif : c’est un partenaire de confiance, capable de capter l’ADN d’un projet et de le sublimer. Je recommande son travail les yeux fermés.",
    rating: 5,
  },
  {
    initials: "SV",
    avatar: sebastien_vaugeois,
    name: "Sébastien Vaugeois",
    role: "CEO - Evasion 2000",
    text: "Nous avons fait appel à Steven pour moderniser entièrement le design de notre site Evasion 2000, et le résultat a largement dépassé nos attentes ! Il a su capter l’esprit de notre entreprise et créer un univers visuel jeune, dynamique et plein de couleurs, parfaitement en phase avec notre image. \n Le nouveau site est à la fois attrayant, fluide et agréable à parcourir. Steven a également réalisé des flyers dans la même ligne graphique, ce qui apporte une vraie cohérence à notre communication. \n Sérieux, réactif et à l’écoute, il a su transformer nos idées en un design percutant et moderne.",
    rating: 5,
  },
  {
    initials: "LL",
    avatar: laurie_lesseigne,
    name: "Laurie LESSEIGNE",
    role: "Assistante DA - Agence RJS",
    text: "Steven est quelqu’un de déterminé, toujours prêt à relever les défis qui lui sont confiés. Il est particulièrement minutieux et veille toujours aux moindres détails. \n S’il est avant tout autonome, il fait également preuve d’un très grand esprit d’équipe. Sa présence est précieuse, tant par sa personnalité que par sa motivation. Je suis heureuse d’avoir pu collaborer avec Steven au sein de l’agence RJS. Je le recommande vivement !",
    rating: 5,
  },
];
