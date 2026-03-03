import { useMemo, useState } from "react";

type CookiePrefs = {
  essential: true;
  functional: boolean;
  statistics: boolean;
  marketing: boolean;
};

const COOKIE_KEY = "cookieConsentV1";

const defaultPrefs: CookiePrefs = {
  essential: true,
  functional: false,
  statistics: false,
  marketing: false,
};

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
      <h3>Gestion du consentement</h3>
      <p>
        Nous utilisons des cookies essentiels pour le fonctionnement du site, et des cookies optionnels pour
        améliorer votre expérience (fonctionnels, statistiques, marketing).
      </p>

      <button type="button" className="cookie-link" onClick={() => setShowPrefs((v) => !v)}>
        {showPrefs ? "Masquer les préférences" : "Gérer préférences"}
      </button>

      {showPrefs && (
        <div className="cookie-preferences">
          <label>
            <input type="checkbox" checked disabled />
            Cookies essentiels (toujours activés)
          </label>
          <label>
            <input
              type="checkbox"
              checked={prefs.functional}
              onChange={(e) => setPrefs((p) => ({ ...p, functional: e.target.checked }))}
            />
            Cookies fonctionnels
          </label>
          <label>
            <input
              type="checkbox"
              checked={prefs.statistics}
              onChange={(e) => setPrefs((p) => ({ ...p, statistics: e.target.checked }))}
            />
            Cookies statistiques
          </label>
          <label>
            <input
              type="checkbox"
              checked={prefs.marketing}
              onChange={(e) => setPrefs((p) => ({ ...p, marketing: e.target.checked }))}
            />
            Cookies marketing
          </label>
        </div>
      )}

      <p className="cookie-summary">{summary}</p>

      <div className="cookie-actions">
        <button type="button" onClick={() => savePrefs({ ...defaultPrefs, functional: true, statistics: true, marketing: true })}>
          Tout accepter
        </button>
        <button type="button" onClick={() => savePrefs(defaultPrefs)}>
          Tout refuser
        </button>
        <button type="button" onClick={() => savePrefs(prefs)}>
          Enregistrer
        </button>
      </div>
    </aside>
  );
}