import LegalPageLayout from "./LegalPageLayout";
import privacyDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-003.jpg";
import privacyLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-003.jpg";

const sections = [
  {
    title: "Données collectées",
    content: (
      <>
        <p>
          Nous collectons uniquement les données strictement nécessaires au fonctionnement du site et à la gestion des demandes
          de contact (par exemple : email, message, informations techniques de navigation).
        </p>
      </>
    ),
  },
  {
    title: "Finalités du traitement",
    content: (
      <>
        <ul className="list-disc space-y-2 pl-6">
          <li>Répondre aux messages envoyés via les canaux de contact.</li>
          <li>Assurer le bon fonctionnement et la sécurité du site.</li>
          <li>Mesurer l’audience de manière agrégée, lorsque cela est autorisé.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Durée de conservation",
    content: (
      <>
        <p>
          Les données sont conservées pendant une durée proportionnée à la finalité poursuivie et conformément aux obligations
          légales applicables.
        </p>
      </>
    ),
  },
  {
    title: "Partage des données",
    content: (
      <>
        <p>
          Les données personnelles ne sont ni vendues ni cédées à des tiers à des fins commerciales. Elles peuvent être transmises
          à des sous-traitants techniques uniquement lorsque cela est nécessaire au fonctionnement du site.
        </p>
      </>
    ),
  },
  {
    title: "Vos droits",
    content: (
      <>
        <p>
          Conformément à la réglementation, vous disposez de droits d’accès, de rectification, d’effacement, de limitation,
          d’opposition et de portabilité de vos données, selon les conditions prévues par la loi.
        </p>
        <p>Pour exercer vos droits : <strong>contact@stevendecarvalho.com</strong>.</p>
      </>
    ),
  },
];

export default function PolitiqueConfidentialite() {
  return (
    <LegalPageLayout
      title="Politique de confidentialité"
      intro="Cette politique explique quelles données peuvent être traitées lors de votre navigation et comment elles sont protégées."
      updatedAt="15 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: privacyDark, light: privacyLight }}
    />
  );
}