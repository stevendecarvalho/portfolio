import LegalPageLayout from "./LegalPageLayout";
import accessDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-002.jpg";
import accessLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-002.jpg";

const sections = [
  {
    title: "Engagement d’accessibilité",
    content: (
      <>
        <p>
          Nous nous engageons à rendre ce site accessible au plus grand nombre, conformément aux bonnes pratiques du web
          et aux exigences d’accessibilité numérique.
        </p>
        <p>
          L’objectif est de garantir une expérience de consultation simple, claire et compatible avec les technologies d’assistance.
        </p>
      </>
    ),
  },
  {
    title: "Mesures mises en œuvre",
    content: (
      <>
        <p>Des actions sont progressivement menées pour améliorer l’accessibilité, notamment :</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>Structure sémantique des pages (titres, sections, navigation).</li>
          <li>Contrastes visuels renforcés entre le texte et les arrière-plans.</li>
          <li>Textes alternatifs sur les contenus visuels pertinents.</li>
          <li>Navigation au clavier sur les composants interactifs principaux.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Limites connues",
    content: (
      <>
        <p>
          Certaines sections du site peuvent encore présenter des points d’amélioration (cohérence ARIA, formulations,
          adaptation de certains médias).
        </p>
        <p>Ces éléments font l’objet d’améliorations continues.</p>
      </>
    ),
  },
  {
    title: "Signaler un problème",
    content: (
      <>
        <p>
          Si vous rencontrez une difficulté d’accès à un contenu ou à une fonctionnalité, vous pouvez nous contacter à
          l’adresse suivante : <strong>contact@stevendecarvalho.com</strong>.
        </p>
        <p>Nous nous efforcerons de vous proposer une alternative accessible dans les meilleurs délais.</p>
      </>
    ),
  },
];

export default function Accessibilite() {
  return (
    <LegalPageLayout
      title="Accessibilité"
      intro="Cette page présente nos engagements en matière d’accessibilité numérique et les moyens de signaler toute difficulté rencontrée lors de la navigation."
      updatedAt="15 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: accessDark, light: accessLight }}
    />
  );
}