import { Link } from "react-router-dom";
import { useEffect } from "react";

const NOINDEX_CONTENT = "noindex, nofollow";

export default function NotFound() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = "404 | Steven DE CARVALHO";

    const robotsMeta = document.querySelector('meta[name="robots"]');
    const previousRobots = robotsMeta?.getAttribute("content");

    if (robotsMeta) {
      robotsMeta.setAttribute("content", NOINDEX_CONTENT);
    }

    return () => {
      document.title = previousTitle;
      if (robotsMeta && previousRobots) {
        robotsMeta.setAttribute("content", previousRobots);
      }
    };
  }, []);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 py-24 text-center">
      <div className="max-w-xl space-y-6">
        <p className="text-cyan-400 font-semibold tracking-widest uppercase">Erreur 404</p>
        <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-white">Page introuvable</h1>
        <p className="text-white/75">
          Cette URL n&apos;existe pas ou n&apos;est plus disponible. Retournez à l&apos;accueil pour continuer la navigation.
        </p>
        <Link to="/" className="btn-cosmic inline-flex items-center justify-center">
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}