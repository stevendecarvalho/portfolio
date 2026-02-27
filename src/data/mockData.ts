import heroSlide001 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import heroSlide002 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import heroSlide003 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-003.jpg";
import serviceDevWeb from "../assets/images/home/realisations-sites-internet-webdesign.jpg";
import serviceSEO from "../assets/images/home/realisations-referencement-seo.jpg";
import serviceSocialMedia from "../assets/images/home/realisations-social-media.jpg";
import serviceGraphisme from "../assets/images/home/realisations-design-graphique.jpg";
import serviceBranding from "../assets/images/home/realisations-communication-branding.jpg";
import serviceMarketing from "../assets/images/home/realisations-marketing.jpg";
import serviceIntelligenceArtificielle from "../assets/images/home/realisations-intelligence-artificielle.jpg";
import servicePhotographie from "../assets/images/home/realisations-photographies.jpg";
import serviceCinema from "../assets/images/home/realisations-creation-contenus-videos.jpg";

export const heroImages = [
  heroSlide001,
  heroSlide002,
  heroSlide003,
];

export const services = [
  {
    src: serviceDevWeb,
    title: "Développement Web",
    desc: "Webdesign et création de sites web modernes et performants",
    href: "/services/developpement-web"
  },
  {
    src: serviceSEO,
    title: "Référencement SEO",
    desc: "Optimisation pour les moteurs de recherche et visibilité en ligne",
    href: "/services/referencement-seo"
  },
  {
    src: serviceSocialMedia,
    title: "Social Media",
    desc: "Gestion et animation de vos réseaux sociaux",
    href: "/services/social-media"
  },
  {
    src: serviceGraphisme,
    title: "Graphisme",
    desc: "Création de visuels structurés et esthétiques pour tout vos supports",
    href: "/services/graphisme"
  },
  {
    src: serviceBranding,
    title: "Logos & Branding",
    desc: "Création d’identités de marque fortes et impactantes",
    href: "/services/branding",
  },
  {
    src: serviceMarketing,
    title: "Stratégies Marketing",
    desc: "Stratégies digitales pour booster votre croissance",
    href: "/services/strategies-marketing"
  },
  {
    src: serviceIntelligenceArtificielle,
    title: "Intelligence artificielle",
    desc: "Optimisation des flux de travail, génération de contenus et systèmes intelligents sur mesure.",
    href: "/services/intelligence-artificielle"
  },
  {
    src: servicePhotographie,
    title: "Photographie",
    desc: "Captures professionnelles pour tous vos besoins visuels",
    href: "/services/photographie"
  },
  {
    src: serviceCinema,
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

export const testimonials = [
  {
    initials: "SM",
    name: "Sophie Martin",
    role: "CEO, TechStart",
    text: "Un travail exceptionnel ! Le site web créé dépasse toutes nos attentes. Professionnalisme et créativité au rendez-vous.",
    rating: 5,
  },
  {
    initials: "MD",
    name: "Marc Dubois",
    role: "Directeur Marketing, InnovCorp",
    text: "Excellent travail sur notre stratégie SEO. Notre trafic a augmenté de 200% en 3 mois !",
    rating: 5,
  },
  {
    initials: "JL",
    name: "Julie Lefebvre",
    role: "Fondatrice, DesignLab",
    text: "Créativité impressionnante ! Nos visuels sont magnifiques et parfaitement alignés avec notre identité.",
    rating: 5,
  },
];
