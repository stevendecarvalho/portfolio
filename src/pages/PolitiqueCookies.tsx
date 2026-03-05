import LegalPageLayout from "./LegalPageLayout";
import cookiesDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import cookiesLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-004.jpg";

const sections = [
  {
    title: "Qu’est-ce qu’un cookie ?",
    content: (
      <>
        <p>
          Un cookie est un petit fichier texte déposé sur votre terminal lors de la consultation d’un site web.
          Il permet de stocker des informations liées à votre navigation.
        </p>
      </>
    ),
  },
  {
    title: "Types de cookies utilisés",
    content: (
      <>
        <ul className="list-disc space-y-2 pl-6">
          <li><strong>Cookies strictement nécessaires</strong> : indispensables au fonctionnement du site.</li>
          <li><strong>Cookies fonctionnels</strong> : mémorisation de préférences (ex. thème, lecture audio).</li>
          <li><strong>Cookies de mesure d’audience</strong> : utilisés uniquement avec votre consentement lorsqu’ils sont activés.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Gestion du consentement",
    content: (
      <>
        <p>
          Lors de votre première visite, un bandeau vous permet d’accepter, de refuser ou de personnaliser les cookies non essentiels.
        </p>
        <p>Vous pouvez modifier votre choix à tout moment depuis les paramètres de cookies du site.</p>
      </>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <>
        <p>
          Les cookies sont conservés pour une durée limitée, conforme à la réglementation applicable.
          À l’expiration de cette durée, votre consentement pourra être redemandé.
        </p>
      </>
    ),
  },
];

export default function PolitiqueCookies() {
  return (
    <LegalPageLayout
      title="Politique relative aux cookies"
      intro="Cette page vous informe sur l’utilisation des cookies et autres traceurs, ainsi que sur vos choix en matière de consentement."
      updatedAt="15 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: cookiesDark, light: cookiesLight }}
    />
  );
}