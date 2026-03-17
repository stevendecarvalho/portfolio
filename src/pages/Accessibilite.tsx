import LegalPageLayout from "./LegalPageLayout";
import accessDark from "../assets/images/legals/steven-de-carvalho-visual-creator-paris-accessibilite-slide-dark-001.jpg";
import accessLight from "../assets/images/legals/steven-de-carvalho-visual-creator-paris-accessibilite-slide-light-001.jpg";

const sections = [
  {
    title: "Engagement",
    content: (
      <>
        <p>
          Steven DE CARVALHO s’engage à rendre son site internet accessible au plus grand nombre, quels que soient les équipements, les technologies utilisées ou les éventuelles limitations physiques, sensorielles ou cognitives.
        </p>
        <p>
          Bien que ce site ne soit pas soumis aux obligations légales applicables aux services publics, une démarche volontaire d’accessibilité est appliquée en s’inspirant des recommandations du <strong>RGAA (Référentiel Général d’Amélioration de l’Accessibilité)</strong> et des bonnes pratiques du web.
        </p>
      </>
    ),
  },
  {
    title: "Mesures mises en œuvre",
    content: (
      <>
        <p>Plusieurs actions ont été mises en place pour améliorer l’accessibilité du site :</p>
        <ul className="list-disc pl-6">
          <li>Structure sémantique claire des pages (titres, sections, navigation).</li>
          <li>Contrastes visuels renforcés entre textes et arrière-plans.</li>
          <li>Textes alternatifs sur les images et contenus visuels.</li>
          <li>Navigation possible au clavier sur les principaux éléments interactifs.</li>
          <li>Compatibilité avec les technologies d’assistance.</li>
          <li>Conception responsive adaptée aux différents supports (ordinateur, tablette, mobile).</li>
        </ul>
      </>
    ),
  },
  {
    title: "Limites éventuelles",
    content: (
      <>
        <p>
          Malgré l’attention portée à l’accessibilité, certains contenus ou fonctionnalités peuvent encore présenter des points d’amélioration.
        </p>
        <p>Certaines intégrations de services tiers (vidéos, réseaux sociaux ou contenus externes) peuvent également comporter des limitations d’accessibilité indépendantes de notre contrôle.</p>
        <p>Une démarche d’amélioration continue est menée afin d’identifier et corriger ces éléments.</p>
      </>
    ),
  },
  {
    title: "Signaler un problème",
    content: (
      <>
        <p>
          Si vous rencontrez une difficulté d’accès à un contenu ou à une fonctionnalité du site, vous pouvez nous contacter : <strong><a href="mailto:contact@stevendecarvalho.com">contact@stevendecarvalho.com</a></strong>.
        </p>
        <p>Nous nous efforcerons de vous proposer une solution ou une alternative accessible dans les meilleurs délais.</p>
      </>
    ),
  },
];

export default function Accessibilite() {
  return (
    <LegalPageLayout
      title="Accessibilité"
      intro="Cette page présente les engagements du site stevendecarvalho.com en matière d’accessibilité numérique et les moyens de signaler toute difficulté rencontrée lors de la navigation."
      updatedAt="5 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: accessDark, light: accessLight }}
    />
  );
}