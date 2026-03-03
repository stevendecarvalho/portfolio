import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useMemo, useState, useEffect } from "react";

type CookiePrefs = {
  essential: true;
  functional: boolean;
  statistics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "cookieConsentV1";
const OPEN_COOKIE_EVENT = "open-cookie-banner";

const defaultPrefs: CookiePrefs = {
  essential: true,
  functional: false,
  statistics: false,
  marketing: false,
};

const categories = [
  {
    key: "essential",
    title: "Cookies essentiels",
    description:
      "Ces cookies sont nécessaires au bon fonctionnement du site. Cette finalité est requise par notre site pour fonctionner correctement en terme d'usage et de sécurité.",
  },
  {
    key: "functional",
    title: "Cookies fonctionnels",
    description:
      "Nous souhaitons vous proposer la meilleure expérience possible de navigation sur ce portfolio. Cependant, l'accès ou le stockage est nécessaire dans la finalité de stocker des préférences utilisateurs (langue du site, personnalisation de la navigation, vidéos ...) qui ne sont pas demandées par le visiteur ou l'utilisateur.",
  },
  {
    key: "statistics",
    title: "Statistiques",
    description:
      "Ces informations nous permettent d'obtenir des statistiques sur la fréquentation et la navigation de manière anonymes. Mon objectif est d'améliorer constamment l'interface et votre expérience sur le site stevendecarvalho.com",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Les informations sur vos interactions avec mon contenu peuvent être utiles pour améliorer les produits et services que je propose, et pouvoir en créer de nouveaux en fonction des interactions des utilisateurs, du type d'audience, etc.",
  },
] as const;

function getInitialConsent() {
  const saved = localStorage.getItem(COOKIE_KEY);
  if (!saved) return { visible: true, prefs: defaultPrefs };

  try {
    const parsed = JSON.parse(saved) as Partial<CookiePrefs>;
    return {
      visible: false,
      prefs: { ...defaultPrefs, ...parsed, essential: true } as CookiePrefs,
    };
  } catch {
    return { visible: true, prefs: defaultPrefs };
  }
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(() => getInitialConsent().visible);
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(() => getInitialConsent().prefs);
  const [openedSections, setOpenedSections] = useState<Record<string, boolean>>({
    essential: true,
    functional: false,
    statistics: false,
    marketing: false,
  });

  useEffect(() => {
    const openBanner = () => {
      setVisible(true);
    };

    window.addEventListener(OPEN_COOKIE_EVENT, openBanner);
    return () => window.removeEventListener(OPEN_COOKIE_EVENT, openBanner);
  }, []);

  const savePrefs = (next: CookiePrefs) => {
    setPrefs(next);
    localStorage.setItem(COOKIE_KEY, JSON.stringify(next));
    setVisible(false);
  };

  const summary = useMemo(() => {
    const enabled = [prefs.functional, prefs.statistics, prefs.marketing].filter(Boolean).length;
    if (enabled === 0) return "Préférences minimales";
    if (enabled === 3) return "Tout accepté";
    return `${enabled}/3 catégories activées`;
  }, [prefs]);

  if (!visible) return null;

  return (
    <aside className="cookie-banner" role="dialog" aria-live="polite" aria-label="Gestion du consentement">
      <div className="cookie-banner-header">
        <h3>Gestion du consentement</h3>
        <button type="button" className="cookie-close" aria-label="Fermer" onClick={() => setVisible(false)}>
          <X className="w-5 h-5" />
        </button>
      </div>
      <p>
        Chez stevendecarvalho.com, nous utilisons des informations non sensibles de votre appareil pour améliorer la
        sécurité du site, utiliser vos préférences de navigation et vous permettre une meilleure expérience de ce
        portfolio. Vous pouvez accepter ou refuser ces différentes opérations.
      </p>

      <button type="button" className="cookie-link" onClick={() => setShowPrefs((v) => !v)}>
        {showPrefs ? "Masquer les préférences" : "Gérer les préférences"}
      </button>

      {showPrefs && (
        <div className="cookie-preferences">
          {categories.map((category) => {
            const isEssential = category.key === "essential";
            const opened = openedSections[category.key];

            return (
              <div key={category.key} className="cookie-category">
                <button
                  type="button"
                  className="cookie-category-head"
                  onClick={() => setOpenedSections((prev) => ({ ...prev, [category.key]: !prev[category.key] }))}
                >
                  <span>{category.title}</span>
                  <div className="cookie-category-controls">
                    {isEssential ? (
                      <span className="cookie-always-on">Toujours activé</span>
                    ) : (
                      <input
                        type="checkbox"
                        checked={prefs[category.key]}
                        onChange={(e) => setPrefs((p) => ({ ...p, [category.key]: e.target.checked }))}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                    {opened ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </button>
                {opened && <p className="cookie-category-desc">{category.description}</p>}
              </div>
            );
          })}
        </div>
      )}

      <p className="cookie-summary">{summary}</p>

      <div className="cookie-actions">
        <button
          type="button"
          className="cookie-btn cookie-btn-accept"
          onClick={() => savePrefs({ ...defaultPrefs, functional: true, statistics: true, marketing: true })}
        >
          Tout accepter
        </button>
        <button type="button" className="cookie-btn cookie-btn-refuse" onClick={() => savePrefs(defaultPrefs)}>
          Tout refuser
        </button>
        <button type="button" className="cookie-btn cookie-btn-save" onClick={() => savePrefs(prefs)}>
          Enregistrer vos préférences
        </button>
      </div>
    </aside>
  );
}

export { OPEN_COOKIE_EVENT };