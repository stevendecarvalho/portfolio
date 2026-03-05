import LegalPageLayout from "./LegalPageLayout";
import mentionsDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import mentionsLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-001.jpg";

const sections = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p>
          <strong>Nom :</strong> Steven DE CARVALHO<br/>
          <strong>Statut :</strong> Entrepreneur individuel (micro-entreprise)<br/>
          <strong>Activité :</strong> Direction artistique, design, événementiel et création digitale
        </p>
        <p><strong>Email :</strong> <a href="mailto:contact@stevendecarvalho.com">contact@stevendecarvalho.com</a></p>
        <p><strong>Téléphone :</strong> +33 6 61 33 25 01</p>
        <p><strong>Adresse :</strong> Île-de-France, France</p>
        <p><strong>SIRET :</strong> 94435127900012</p>
        <p><strong>Directeur de publication :</strong> Steven DE CARVALHO</p>
      </>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé par :.</p>
        <p>
          <strong>OVHcloud</strong><br/>
          2 rue Kellermann<br/>
          59100 Roubaix<br/>
          France
        </p>
        <p>Site web : <a href="https://www.ovhcloud.com" target="_blank">https://www.ovhcloud.com</a></p>
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L’ensemble des contenus présents sur le site stevendecarvalho.com (textes, images, photographies, vidéos, éléments graphiques, logos, illustrations, code source, design) est protégé par les lois françaises et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication ou adaptation, totale ou partielle, de ces éléments est interdite sans l’autorisation écrite préalable de l’éditeur du site.
        </p>
        <p>
          Toute utilisation non autorisée du site ou de l’un de ses éléments pourra faire l’objet de poursuites conformément aux dispositions du Code de la propriété intellectuelle.
        </p>
      </>
    ),
  },
  {
    title: "Responsabilité",
    content: (
      <>
        <p>
          Les informations diffusées sur ce site sont fournies à titre informatif. L’éditeur s’efforce d’assurer l’exactitude et la mise à jour des contenus, mais ne peut garantir l’absence d’erreurs, d’omissions ou d’inexactitudes.
        </p>
        <p>
          L’éditeur ne saurait être tenu responsable de l’utilisation faite des informations présentes sur le site.
        </p>
        <p>
          Le site peut contenir des liens vers des sites externes. L’éditeur ne peut être tenu responsable du contenu ou des pratiques de ces sites tiers.
        </p>
      </>
    ),
  },
  {
    title: "Données personnelles",
    content: (
      <>
        <p>
          Le site peut être amené à collecter certaines données personnelles via les formulaires de contact ou les outils d’analyse de fréquentation.
        </p>
        <p>
          Pour en savoir plus sur la collecte et l’utilisation des données personnelles, consultez la <a href="/politique-confidentialite">Politique de confidentialité</a> du site.
        </p>
      </>
    ),
  },
  {
    title: "Cookies",
    content: (
      <>
        <p>
          Le site peut utiliser des cookies ou technologies similaires afin d’améliorer l’expérience utilisateur et d’analyser la fréquentation.
        </p>
        <p>
          Pour plus d’informations, consultez la <a href="/politique-cookies">Politique relative aux cookies</a> du site.
        </p>
      </>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      intro="Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004 pour la Confiance dans l’Économie Numérique (LCEN), les utilisateurs du site stevendecarvalho.com sont informés des présentes mentions légales."
      updatedAt="5 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: mentionsDark, light: mentionsLight }}
    />
  );
}