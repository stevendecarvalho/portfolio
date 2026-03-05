/////////////////
// HERO IMAGES //
/////////////////

import heroSlide001 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import heroSlide002 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import heroSlide003 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-003.jpg";

import heroSlide001_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-001.jpg";
import heroSlide002_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-002.jpg";
import heroSlide003_Light from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-003.jpg";

export const heroImages = [
  heroSlide001,
  heroSlide002,
  heroSlide003,
];

export const heroImagesLight = [
  heroSlide001_Light,
  heroSlide002_Light,
  heroSlide003_Light,
];

export const heroImagesByTheme = {
  dark: heroImages,
  light: heroImagesLight,
} as const;

export const aboutSlidesByTheme = {
  dark: [aboutFutureImage, biographyImage],
  light: [aboutFutureImage_Light, biographyImage_Light],
} as const;





//////////////////////
// LOGO DES CLIENTS //
//////////////////////

import saveolLogoWhite from "../assets/logos/steven-de-carvalho-website-references-saveol-white.png";
import saveolLogoColor from "../assets/logos/steven-de-carvalho-website-references-saveol-color.png";

import carreChocolatLogoWhite from "../assets/logos/steven-de-carvalho-website-references-le-petit-carre-de-chocolat-white.png";
import carreChocolatLogoColor from "../assets/logos/steven-de-carvalho-website-references-le-petit-carre-de-chocolat-color.png";

import feaeLogoWhite from "../assets/logos/steven-de-carvalho-website-references-festival-leurope-autour-de-leurope-white.png";
import feaeLogoColor from "../assets/logos/steven-de-carvalho-website-references-festival-leurope-autour-de-leurope-color.png";

import parisLogoWhite from "../assets/logos/steven-de-carvalho-website-references-ville-de-paris-white.png";
import parisLogoColor from "../assets/logos/steven-de-carvalho-website-references-ville-de-paris-color.png";

import fccpLogoWhite from "../assets/logos/steven-de-carvalho-website-references-festival-du-cinema-chinois-de-paris-white.png";
import fccpLogoColor from "../assets/logos/steven-de-carvalho-website-references-festival-du-cinema-chinois-de-paris-color.png";

import izzifitLogoWhite from "../assets/logos/steven-de-carvalho-website-references-izzi-fit-academy-white.png";
import izzifitLogoColor from "../assets/logos/steven-de-carvalho-website-references-izzi-fit-academy-color.png";

import bouygConstLogoWhite from "../assets/logos/steven-de-carvalho-website-references-bouygues-construction-white.png";
import bouygConstLogoColor from "../assets/logos/steven-de-carvalho-website-references-bouygues-construction-color.png";

import bouygTelLogoWhite from "../assets/logos/steven-de-carvalho-website-references-bouygues-telecom-white.png";
import bouygTelLogoColor from "../assets/logos/steven-de-carvalho-website-references-bouygues-telecom-color.png";

import itforumLogoWhite from "../assets/logos/steven-de-carvalho-website-references-it-forum-white.png";
import itforumLogoColor from "../assets/logos/steven-de-carvalho-website-references-it-forum-color.png";

import grilloboisLogoWhite from "../assets/logos/steven-de-carvalho-website-references-grillobois-white.png";
import grilloboisLogoColor from "../assets/logos/steven-de-carvalho-website-references-grillobois-color.png";

export const clientLogos = [
  {
    name: "Savéol",
    srcByTheme: { 
      dark: saveolLogoWhite,
      light: saveolLogoColor,
    },
    href: "#",
  },
  {
    name: "Le petit carré de chocolat",
    srcByTheme: {
      dark: carreChocolatLogoWhite,
      light: carreChocolatLogoColor,
    },
    href: "#",
  },
  {
    name: "Festival L'Europe autour de l'Europe",
    srcByTheme: {
      dark: feaeLogoWhite,
      light: feaeLogoColor,
    },
    href: "#",
  },
  {
    name: "Ville de Paris",
    srcByTheme: {
      dark: parisLogoWhite,
      light: parisLogoColor,
    },
    href: "#",
  },
  {
    name: "Festival du cinéma chinois de Paris",
    srcByTheme: {
      dark: fccpLogoWhite,
      light: fccpLogoColor,
    },
    href: "#",
  },
  {
    name: "IZZI FIT ACADEMY",
    srcByTheme: {
      dark: izzifitLogoWhite,
      light: izzifitLogoColor,
    },
    href: "#",
  },
  {
    name: "Bouygues Construction",
    srcByTheme: {
      dark: bouygConstLogoWhite,
      light: bouygConstLogoColor,
    },
    href: "#",
  },
  {
    name: "Bouygues Telecom",
    srcByTheme: {
      dark: bouygTelLogoWhite,
      light: bouygTelLogoColor,
    },
    href: "#",
  },
  {
    name: "IT Forum",
    srcByTheme: {
      dark: itforumLogoWhite,
      light: itforumLogoColor,
    },
    href: "#",
  },
  {
    name: "Grill O'Bois",
    srcByTheme: {
      dark: grilloboisLogoWhite,
      light: grilloboisLogoColor,
    },
    href: "#",
  },
];





//////////////////////////
// PREVIEWS DES PROJETS //
//////////////////////////

import previewASLCDanse_001 from "../assets/images/imgProjets/preview-projet-festival-aslc-danse-001.jpg";
import previewFEAE_001 from "../assets/images/imgProjets/preview-projet-festival-leurope-autour-de-leurope-001.jpg";
import previewIzziFit from "../assets/images/imgProjets/preview-projet-festival-izzi-fit-academy-001.jpg";

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





//////////////////////////
// PREVIEWS DES PROJETS //
//////////////////////////










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
import delphine_loubiere_caramelle from "../assets/testimonials/delphine-loubiere-caramelle.png";
import mehdi_choonee from "../assets/testimonials/mehdi-choonee.jpg";
import emma_martins from "../assets/testimonials/ema-martins.png";
import tristan_taupin from "../assets/testimonials/tristan-taupin.jpg";
import philippe_colzy from "../assets/testimonials/phillipe-colzy.jpg";
import laurie_lesseigne from "../assets/testimonials/Laurie-Lesseigne.jpg";
import annemarie_simon from "../assets/testimonials/anne-marie-simon.png";
import nicolas_tarot from "../assets/testimonials/nicolas-tarot.png";
import mai_tran from "../assets/testimonials/mai-tran.png";
import metodi_rokanov from "../assets/testimonials/metodi-rokanov.png";
import sylvain_dieudonne from "../assets/testimonials/sylvain-dieudonne.png";

export const testimonials = [
  {
    initials: "AI",
    avatar: alexandre_izzi,
    name: "Alexandre IZZI",
    role: "CEO - IZZI FIT ACADEMY",
    text: "Steven a su traduire avec une précision exceptionnelle l’essence de la IZZI FIT ACADEMY. Il ne s’est pas contenté de créer un simple site : il a bâti une véritable identité de marque, puissante, élégante et alignée avec les valeurs de notre accompagnement haut de gamme. \n\n Sa vision stratégique et son sens du détail ont été déterminants pour renforcer notre positionnement premium. Chaque élément – de notre nom d’entreprise au logo en passant par l’arborescence du site – tout a été pensé pour offrir une expérience fluide, cohérente et inspirante à nos prospects.\n\nSteven est bien plus qu’un créatif : c’est un partenaire de confiance, capable de capter l’ADN d’un projet et de le sublimer. Je recommande son travail les yeux fermés.",
    rating: 5,
  },
  {
    initials: "SV",
    avatar: sebastien_vaugeois,
    name: "Sébastien Vaugeois",
    role: "CEO - Evasion 2000",
    text: "Nous avons fait appel à Steven pour moderniser entièrement le design de notre site Evasion 2000, et le résultat a largement dépassé nos attentes ! Il a su capter l’esprit de notre entreprise et créer un univers visuel jeune, dynamique et plein de couleurs, parfaitement en phase avec notre image. \n\n Le nouveau site est à la fois attrayant, fluide et agréable à parcourir. Steven a également réalisé des flyers dans la même ligne graphique, ce qui apporte une vraie cohérence à notre communication. \n\n Sérieux, réactif et à l’écoute, il a su transformer nos idées en un design percutant et moderne.",
    rating: 5,
  },
  {
    initials: "DLC",
    avatar: delphine_loubiere_caramelle,
    name: "Delphine LOUBIÈRE CARAMELLE",
    role: "Professeure de danse - ASLC Danse",
    text: "Steven a su réaliser un site internet à notre image, et a un sens et un regard créatif et artistique aiguisé. Il cerne très vite ce dont on a besoin. Très professionnel et appliqué dans tous ce qu’il réalise.\n\nNous sommes ravis de notre collaboration avec Steven qui apporte un renouveau technologique et artistique à notre association.",
    rating: 5,
  },
  {
    initials: "MC",
    avatar: mehdi_choonee,
    name: "Mehdi Choonee",
    role: "E-merchandiser - Autodistribution",
    text: "Steven est avant tout une personne bienveillante, à l’écoute et qui donne le meilleur de soi-même dans tout ce qu’il entreprend. Il sait faire preuve de recul et place son bien-être et celui de ses proches personnellement comme professionnellement. Avant tout motivé, autonome, méticuleux et qui a ce sens du détail que peu de personnes peuvent avoir.\n\nEn résumé, c’est une personne ambitieuse, bienveillante, et sérieuse !",
    rating: 5,
  },
  {
    initials: "EM",
    avatar: emma_martins,
    name: "Emma MARTINS",
    role: "Photographe - Entrepreneuse",
    text: "Steven est une personne passionnée, déterminée et généreux dans tout ce qu’il entreprend. Je suis persuadée que sa détermination l’amènera loin !\n\nBravo pour tout ce que tu as déjà entrepris et hâte de voir les projets à venir… :)",
    rating: 5,
  },
  {
    initials: "TT",
    avatar: tristan_taupin,
    name: "Tristan TAUPIN",
    role: "Chef Gérant - API Restauration",
    text: "Steven est un collaborateur très agréable, à l’écoute et il a l’esprit d’équipe. Il s’est investi dans les missions qui lui ont été données.\n\nSteven est très réactif, rapide et trouve toujours des solutions. Il s’est très bien adapté à l’équipe.\n\nJe recommande Steven pour qu’il intègre une équipe à la même hauteur de ses compétences ! Je suis très content d’avoir travaillé avec quelqu’un comme lui dans l’équipe ! Je le recommande vivement !",
    rating: 5,
  },
  {
    initials: "PC",
    avatar: philippe_colzy,
    name: "Philippe COLZY",
    role: "Consultant Digital - Need Data SAS",
    text: "Steven a su faire preuve de beaucoup de professionnalisme et de détermination à travers notre projet partagé : Pablo avec Bouygues Construction.\n\nDes sujets complexes sur des nouvelles technologies digitaux auquel Steven a su mesurer facilement les enjeux et s’habituer aux différents modes et processus de développement.\n\nUn jeune homme serviable et très sérieux dans tout ce qu’il entreprend. Je ne lui souhaite que de la réussite dans ces prochains projets.",
    rating: 5,
  },
  {
    initials: "LL",
    avatar: laurie_lesseigne,
    name: "Laurie LESSEIGNE",
    role: "Assistante DA - Agence RJS",
    text: "Steven est quelqu’un de déterminé, toujours prêt à relever les défis qui lui sont confiés. Il est particulièrement minutieux et veille toujours aux moindres détails. \n\n S’il est avant tout autonome, il fait également preuve d’un très grand esprit d’équipe. Sa présence est précieuse, tant par sa personnalité que par sa motivation. Je suis heureuse d’avoir pu collaborer avec Steven au sein de l’agence RJS. Je le recommande vivement !",
    rating: 5,
  },
  {
    initials: "AMS",
    avatar: annemarie_simon,
    name: "Anne-Marie SIMON",
    role: "Chef de Projets - Agence Porte 7",
    text: "Un collaborateur précieux. Toujours prêt à relever les challenges ou apporter des solutions sur des sujets complexes.\n\nSteven est une valeur sûre : il aime aller au bout des projets, les optimiser et ne lâche jamais rien. Une constance inébranlable… et une personnalité rare, étonnante tant par sa générosité que par la qualité de son relationnel ou son esprit d’équipe.\n\nUn vrai professionnel et un talent qui s’ignore !",
    rating: 5,
  },
  {
    initials: "NT",
    avatar: nicolas_tarot,
    name: "Nicolas TAROT",
    role: "Instituteur - Éducation Nationale",
    text: "Steven est quelqu’un de fiable avec une grande assiduité et un grand sérieux ! Il prend le temps de comprendre le problème, d’y réfléchir et de voir les solutions. Il n’hésite pas à conseiller les personnes en informatique pour corriger leurs mauvaises habitudes.\n\nSeul défaut, son côté perfectionniste !",
    rating: 5,
  },
  {
    initials: "MT",
    avatar: mai_tran,
    name: "Maï TRAN",
    role: "Chef de Projets SI - CNSA",
    text: "Personne responsable, chaleureuse et très sincère dans ses propos, Steven a su tirer les différentes opportunités que la CNSA pouvait lui saisir en respectant toutes les contraintes professionnelles qui lui était demandé.\n\nJ’ai été agréablement surprise par son sens du détail, sa soif d’apprentissage et son sens de l’adaptation.\n\nJe recommande très fortement cette généreuse personnalité qui égaie nos journées par son charisme.",
    rating: 5,
  },
  {
    initials: "MK",
    avatar: metodi_rokanov,
    name: "Métodi ROKANOV",
    role: "Chef de Projets SI - CNSA",
    text: "Steven s’est pleinement investi dans les différentes missions qui lui ont été confiées, ne manquant pas par ailleurs de faire preuve d’initiatives et d’une détermination sans failles pour atteindre ses objectifs.\n\nConsciencieux, disponible et réactif, Steven a apporté satisfaction pleine et entière à la CNSA.",
    rating: 5,
  },
  {
    initials: "SD",
    avatar: sylvain_dieudonne,
    name: "Sylvain Dieudonné",
    role: "CEO & Co-Founder - Serjee & Sydelium Consulting",
    text: "Steven a intégré notre jeune start-up et il a rapidement été à l’aise et a su s’adapter très rapidement à son nouvel environnement de travail. Travaillant parfaitement en autonomie en accomplissant ses missions avec précisions.\n\nImaginatif et curieux, il s’approprie ses tâches et essaie toujours de trouver des solutions. Je le recommande vivement !",
    rating: 5,
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