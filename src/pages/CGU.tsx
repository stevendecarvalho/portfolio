import LegalPageLayout from "./LegalPageLayout";

const sections = [
  {
    title: "Objet",
    content: (
      <>
        <p>
          Les présentes Conditions Générales d’Utilisation (CGU) ont pour objet de définir les modalités d’accès et d’utilisation
          du site.
        </p>
      </>
    ),
  },
  {
    title: "Accès au site",
    content: (
      <>
        <p>
          Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet. Tous les coûts afférents
          à l’accès au site (matériel, logiciels, connexion) sont à la charge de l’utilisateur.
        </p>
      </>
    ),
  },
  {
    title: "Obligations de l’utilisateur",
    content: (
      <>
        <ul className="list-disc space-y-2 pl-6">
          <li>Utiliser le site conformément aux lois et règlements en vigueur.</li>
          <li>Ne pas perturber le bon fonctionnement du site.</li>
          <li>Ne pas porter atteinte aux droits de propriété intellectuelle de l’éditeur ou des tiers.</li>
        </ul>
      </>
    ),
  },
  {
    title: "Limitation de responsabilité",
    content: (
      <>
        <p>
          L’éditeur met en œuvre les moyens raisonnables pour assurer l’exactitude des informations publiées, sans garantir
          l’absence totale d’erreurs, d’interruptions ou d’indisponibilités.
        </p>
      </>
    ),
  },
  {
    title: "Évolution des CGU",
    content: (
      <>
        <p>
          Les présentes CGU peuvent être modifiées à tout moment. La version en vigueur est celle publiée sur cette page,
          avec indication de la date de mise à jour.
        </p>
      </>
    ),
  },
];

export default function CGU() {
  return (
    <LegalPageLayout
      title="Conditions Générales d’Utilisation"
      intro="En accédant à ce site, vous acceptez les présentes conditions d’utilisation. Merci de les lire attentivement."
      updatedAt="15 mars 2026"
      sections={sections}
    />
  );
}