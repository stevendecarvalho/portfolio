import LegalPageLayout from "./LegalPageLayout";
import cguDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-biography.jpg";
import cguLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-biography-light.jpg";

const sections = [
  {
    title: "Objet",
    content: (
      <>
        <p>
          Les présentes CGU ont pour objet de définir les modalités d’accès et d’utilisation du site.
        </p>
        <p>
          Le site a pour objectif de présenter les activités et réalisations de Steven DE CARVALHO dans les domaines du design, de l'événementiel, de la création digitale et de la direction artistique.
        </p>
      </>
    ),
  },
  {
    title: "Accès au site",
    content: (
      <>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet.
        </p>
        <p>
          L’éditeur s’efforce d’assurer un accès continu au site, mais ne peut garantir l’absence d’interruptions ou de dysfonctionnements liés à des opérations de maintenance ou à des problèmes techniques.
        </p>
      </>
    ),
  },
  {
    title: "Obligations de l’utilisateur",
    content: (
      <>
        <p>
          L’utilisateur s’engage à :
        </p>
        <ul className="list-disc pl-6">
          <li>Utiliser le site conformément aux lois et règlements en vigueur.</li>
          <li>Ne pas perturber le bon fonctionnement du site.</li>
          <li>Ne pas porter atteinte aux droits de propriété intellectuelle de l’éditeur ou de tiers.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          Tous les contenus présents sur le site (textes, images, vidéos, créations graphiques, code, design) sont protégés par les lois relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction ou utilisation sans autorisation préalable est interdite.
        </p>
      </>
    ),
  },
  {
    title: "Limitation de responsabilité",
    content: (
      <>
        <p>
          L’éditeur met en œuvre les moyens raisonnables pour assurer l’exactitude des informations publiées, sans garantir l’absence totale d’erreurs ou d’omissions.
        </p>
        <p>
          L’utilisateur reste seul responsable de l’utilisation qu’il fait des informations disponibles sur le site.
        </p>
      </>
    ),
  },
  {
    title: "Modification des CGU",
    content: (
      <>
        <p>
          Les présentes conditions peuvent être modifiées à tout moment.
        </p>
        <p>
          La version applicable est celle publiée sur cette page à la date de consultation.
        </p>
      </>
    ),
  },
];

export default function CGU() {
  return (
    <LegalPageLayout
      title="Conditions Générales d’Utilisation"
      intro="L’accès et l’utilisation du site stevendecarvalho.com impliquent l’acceptation des présentes Conditions Générales d’Utilisation."
      updatedAt="5 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: cguDark, light: cguLight }}
    />
  );
}