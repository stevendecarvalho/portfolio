import LegalPageLayout from "./LegalPageLayout";
import privacyDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-003.jpg";
import privacyLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-003.jpg";

const sections = [
  {
    title: "Responsable du traitement",
    content: (
      <>
        <p>
          Les données personnelles collectées sur ce site sont traitées par :
        </p>
        <p>
          <strong>Steven DE CARVALHO</strong><br/>
          Entrepreneur individuel – Direction artistique et création digitale<br/>
          Email : <a href="mailto:contact@stevendecarvalho.com">contact@stevendecarvalho.com</a>
        </p>
      </>
    ),
  },
  {
    title: "Données collectées",
    content: (
      <>
        <p>
          Selon votre utilisation du site, les données suivantes peuvent être collectées :
        </p>
        <ul className="list-disc pl-6">
          <li>Informations transmises via les formulaires de contact (nom, email, message).</li>
          <li>Données techniques de navigation (adresse IP, navigateur, appareil).</li>
          <li>Données statistiques anonymisées liées à la fréquentation du site.</li>
        </ul>
        <p>
          Ces données sont collectées uniquement lorsque cela est nécessaire au fonctionnement du site ou avec votre consentement lorsque la réglementation l’exige.
        </p>
      </>
    ),
  },
  {
    title: "Finalités du traitement",
    content: (
      <>
        <p>
          Les données collectées peuvent être utilisées pour :
        </p>
        <ul className="list-disc pl-6">
          <li>Répondre aux demandes envoyées via les formulaires de contact.</li>
          <li>Assurer le bon fonctionnement et la sécurité du site.</li>
          <li>Analyser la fréquentation du site afin d’améliorer l’expérience utilisateur.</li>
        </ul>
        <p>
          Les données ne sont jamais vendues ni utilisées à des fins commerciales sans consentement.
        </p>
      </>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <>
        <p>
          Les données sont conservées pour une durée proportionnée à la finalité du traitement :
        </p>
        <ul className="list-disc pl-6">
          <li>Données de contact : 3 ans maximum.</li>
          <li>Statistiques de navigation : 13 mois maximum.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Partage des données",
    content: (
      <>
        <p>
          Les données personnelles ne sont pas vendues ni cédées à des tiers.
        </p>
        <p>
          Elles peuvent être transmises uniquement à des prestataires techniques nécessaires au fonctionnement du site (hébergement, outils d’analyse), dans le respect de la réglementation applicable.
        </p>
      </>
    ),
  },
  {
    title: "Sécurité des données",
    content: (
      <>
        <p>
          Des mesures techniques et organisationnelles sont mises en œuvre pour protéger les données personnelles :
        </p>
        <ul className="list-disc pl-6">
          <li>Connexion sécurisée HTTPS.</li>
          <li>Accès limité aux données.</li>
          <li>Hébergement sur des infrastructures sécurisées situées dans l’Union européenne.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <>
        <p>
          Conformément à la réglementation, vous disposez des droits suivants :
        </p>
        <ul className="list-disc pl-6">
          <li>Droit d’accès à vos données.</li>
          <li>Droit de rectification.</li>
          <li>Droit d’effacement.</li>
          <li>Droit d’opposition.</li>
          <li>Droit de limitation du traitement.</li>
          <li>Droit à la portabilité des données.</li>
        </ul>
        <p>
          Pour exercer vos droits :<br/>
          <a href="mailto:contact@stevendecarvalho.com">contact@stevendecarvalho.com</a>
        </p>
        <p>
          Une réponse vous sera apportée dans un délai maximum de <strong>30 jours</strong>.
        </p>
      </>
    ),
  },
];

export default function PolitiqueConfidentialite() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      intro="Cette politique de confidentialité explique comment stevendecarvalho.com collecte, utilise et protège les données personnelles des utilisateurs conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi Informatique et Libertés."
      updatedAt="5 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: privacyDark, light: privacyLight }}
    />
  );
}