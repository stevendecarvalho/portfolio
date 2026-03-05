import LegalPageLayout from "./LegalPageLayout";
import mentionsDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import mentionsLight from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-light-001.jpg";

const sections = [
  {
    title: "Éditeur du site",
    content: (
      <>
        <p><strong>Nom :</strong> Steven DE CARVALHO</p>
        <p><strong>Statut :</strong> Directeur artistique freelance</p>
        <p><strong>Email :</strong> contact@stevendecarvalho.com</p>
        <p><strong>Téléphone :</strong> +33 6 61 33 25 01</p>
        <p><strong>Adresse :</strong> Paris, France</p>
      </>
    ),
  },
  {
    title: "Hébergement",
    content: (
      <>
        <p>Le site est hébergé par un prestataire tiers.</p>
        <p>Pour toute demande relative à l’hébergement, contactez l’éditeur du site via les coordonnées ci-dessus.</p>
      </>
    ),
  },
  {
    title: "Propriété intellectuelle",
    content: (
      <>
        <p>
          L’ensemble des contenus présents sur ce site (textes, images, vidéos, logos, éléments graphiques, code) est protégé par
          les lois en vigueur sur la propriété intellectuelle.
        </p>
        <p>
          Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site,
          quel que soit le moyen ou le procédé utilisé, est interdite sans autorisation écrite préalable.
        </p>
      </>
    ),
  },
  {
    title: "Responsabilité",
    content: (
      <>
        <p>
          Les informations diffusées sur ce site sont fournies à titre indicatif. L’éditeur s’efforce d’assurer leur exactitude,
          mais ne peut garantir l’absence d’erreurs ou d’omissions.
        </p>
        <p>
          L’utilisateur demeure seul responsable de l’utilisation des informations accessibles via ce site.
        </p>
      </>
    ),
  },
];

export default function MentionsLegales() {
  return (
    <LegalPageLayout
      title="Mentions légales"
      intro="Conformément à la réglementation en vigueur, vous trouverez ci-dessous les informations légales concernant l’édition et l’exploitation de ce site."
      updatedAt="15 mars 2026"
      sections={sections}
      titlebarBackground={{ dark: mentionsDark, light: mentionsLight }}
    />
  );
}