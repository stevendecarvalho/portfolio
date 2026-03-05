import LegalPageLayout from "./LegalPageLayout";
import cookiesDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import cookiesLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-004.jpg";

const sections = [
  {
    title: "Qu’est-ce qu’un cookie ?",
    content: (
      <>
        <p>
          Un cookie est un petit fichier texte enregistré sur votre appareil lors de la consultation d’un site internet. Il permet de stocker des informations liées à votre navigation.
        </p>
      </>
    ),
  },
  {
    title: "Types de cookies utilisés",
    content: (
      <>
        <p>
          Le site peut utiliser plusieurs catégories de cookies :
        </p>
        <p>
          <strong>Cookies strictement nécessaires</strong><br/>
          Ils sont indispensables au fonctionnement du site (sécurité, navigation).
        </p>
        <p>
          <strong>Cookies fonctionnels</strong><br/>
          Ils permettent de mémoriser certaines préférences utilisateur (ex : thème, paramètres d’affichage, playlist musicale). Ces cookies sont activés uniquement avec votre consentement.
        </p>
        <p>
          <strong>Cookies de mesure d’audience</strong><br/>
          Ils permettent d’analyser la fréquentation du site afin d’améliorer son contenu et ses performances. Ces cookies sont activés uniquement avec votre consentement.
        </p>
      </>
    ),
  },
  {
    title: "Gestion du consentement",
    content: (
      <>
        <p>
          Lors de votre première visite, un bandeau de gestion des cookies vous permet :
        </p>
        <ul className="list-disc pl-6">
          <li>D’accepter tous les cookies.</li>
          <li>De refuser les cookies non essentiels.</li>
          <li>De personnaliser vos préférences.</li>
        </ul>
        <p>
          Vous pouvez modifier votre choix à tout moment via les paramètres de cookies du site.
        </p>
      </>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <>
        <p>
          Conformément aux recommandations de la CNIL, les cookies sont conservés pour une durée maximale de <strong>13 mois</strong>.
        </p>
        <p>
          À l’expiration de cette période, votre consentement pourra être redemandé.
        </p>
      </>
    ),
  },
];

export default function PolitiqueCookies() {
  return (
    <LegalPageLayout
      title="Politique relative aux cookies"
      intro="Cette page explique comment stevendecarvalho.com utilise les cookies et technologies similaires."
      updatedAt="5 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: cookiesDark, light: cookiesLight }}
    />
  );
}