import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppRoutes from "./routes";
import FullScreenLoader from "../components/FullScreenLoader";

import musicUrl from "../assets/audio/ambient.mp3"; // <-- adapte

export type Theme = "dark" | "light";

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function preloadImages(urls: string[]) {
  if (!urls.length) return;
  await Promise.allSettled(
    urls.map(
      (url) =>
        new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject();
          img.src = url;
        })
    )
  );
}

export default function App() {
  const [theme, setTheme] = useState<Theme>("dark");

  // Loader
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);

  // --- MUSIQUE ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("musicEnabled");
    return saved ? saved === "1" : true; // par défaut ON
  });

  const assetsToPreload = useMemo(
    () => [
      "https://customer-assets.emergentagent.com/job_pixel-galaxy-1/artifacts/xd8gu54w_504099052_18000820796790514_849239878460782463_n.jpg",
    ],
    []
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Initialise l'audio (une seule fois)
  useEffect(() => {
    const a = new Audio(musicUrl);
    a.loop = true;
    a.preload = "auto";
    a.volume = 0.55; // ajuste
    audioRef.current = a;

    return () => {
      a.pause();
      audioRef.current = null;
    };
  }, []);

  // Applique le mute/unmute quand musicEnabled change
  useEffect(() => {
    localStorage.setItem("musicEnabled", musicEnabled ? "1" : "0");
    const a = audioRef.current;
    if (!a) return;

    if (!musicEnabled) {
      a.pause();
    } else {
      // On essaie de jouer (peut être bloqué si pas d'interaction)
      a.play().catch(() => {
        // Pas grave: on démarrera au 1er geste utilisateur
      });
    }
  }, [musicEnabled]);

  // Démarrer au premier geste utilisateur (autoplay policy friendly)
  useEffect(() => {
    const tryStart = () => {
      if (!ready) return; // attends que ton site soit prêt si tu veux
      if (!musicEnabled) return;

      const a = audioRef.current;
      if (!a) return;

      a.play().catch(() => {});
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("pointerdown", tryStart);
      window.removeEventListener("keydown", tryStart);
      window.removeEventListener("scroll", tryStart);
      window.removeEventListener("touchstart", tryStart);
    };

    window.addEventListener("pointerdown", tryStart, { passive: true });
    window.addEventListener("keydown", tryStart);
    window.addEventListener("scroll", tryStart, { passive: true });
    window.addEventListener("touchstart", tryStart, { passive: true });

    return cleanup;
  }, [ready, musicEnabled]);

  const onToggleMusic = () => {
    setMusicEnabled((v) => !v);
    // Si l'utilisateur clique, c'est une interaction -> play() sera autorisé
    const a = audioRef.current;
    if (!a) return;
    if (!musicEnabled) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  // Boot loader
  useEffect(() => {
    let cancelled = false;

    const MIN_MS = 2000;
    const FINISH_MS = 220;
    const FADE_MS = 500;

    async function boot() {
      const start = Date.now();

      setProgress(5);
      await wait(120);
      if (cancelled) return;

      let p = 5;
      const tick = window.setInterval(() => {
        p = Math.min(95, p + Math.random() * 4);
        setProgress(p);
      }, 120);

      await preloadImages(assetsToPreload);

      window.clearInterval(tick);
      if (cancelled) return;

      const elapsed = Date.now() - start;
      if (elapsed < MIN_MS) await wait(MIN_MS - elapsed);
      if (cancelled) return;

      setProgress(100);
      await wait(FINISH_MS);
      if (cancelled) return;

      setReady(true);

      await wait(FADE_MS);
      if (cancelled) return;

      setLoaderVisible(false);
    }

    boot();
    return () => {
      cancelled = true;
    };
  }, [assetsToPreload]);

  return (
    <div className="App" data-theme={theme}>
      {loaderVisible && (
        <div
          className={[
            "fixed inset-0 z-[9999] transition-opacity duration-500",
            ready ? "opacity-0 pointer-events-none" : "opacity-100",
          ].join(" ")}
        >
          <FullScreenLoader progress={progress} />
        </div>
      )}

      <div
        className={[
          "transition-opacity duration-500",
          ready ? "opacity-100" : "opacity-0",
        ].join(" ")}
      >
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          musicEnabled={musicEnabled}
          onToggleMusic={onToggleMusic}
        />

        <main className="min-h-screen">
          <AppRoutes />
        </main>

        <Footer />
      </div>
    </div>
  );
}
