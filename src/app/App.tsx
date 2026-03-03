import { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppRoutes from "./routes";
import FullScreenLoader from "../components/FullScreenLoader";
import ToTopButton from "../components/ToTopButton.tsx";
import CookieBanner from "../components/CookieBanner.tsx";
import MusicPlaylistModal from "../components/MusicPlaylistModal.tsx";

import musicUrl from "../assets/audio/ambient.mp3";

export type Theme = "dark" | "light";

type Track = { title: string; artist: string; src: string };

const musicTracks: Track[] = [
  { title: "Ambient Cosmos", artist: "Steven DE CARVALHO", src: musicUrl },
];

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



  // --- LOADER ---
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);



  // --- MUSIQUE ---
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem("musicEnabled");
    return saved ? saved === "1" : true;
  });
  const [activeTrack, setActiveTrack] = useState(() => {
    const saved = Number(localStorage.getItem("activeTrack") ?? 0);
    return Number.isNaN(saved) ? 0 : Math.min(Math.max(0, saved), musicTracks.length - 1);
  });
  const [playlistOpen, setPlaylistOpen] = useState(false);



  // --- CURSEUR ---
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });



  // --- PRELOAD ---
  const assetsToPreload = useMemo(
    () => ["../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg"],
    []
  );



  // --- THÈME ---
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);



  // --- INITIALISE L'AUDIO (UNE SEULE FOIS) ---
  useEffect(() => {
    const audio = new Audio(musicTracks[activeTrack]?.src ?? musicTracks[0].src);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = 0.55;
    audioRef.current = audio;

    if (musicEnabled) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [activeTrack, musicEnabled]);



  // --- APPLIQUE LE MUTE / UNMUTE DE LA MUSIQUE ---
  useEffect(() => {
    localStorage.setItem("musicEnabled", musicEnabled ? "1" : "0");
    const a = audioRef.current;
    if (!a) return;

    if (!musicEnabled) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
  }, [musicEnabled]);



  // --- DÉMARRER LA MUSIQUE AU PREMIER GESTE UTILISATEUR ---
  useEffect(() => {
    localStorage.setItem("activeTrack", String(activeTrack));
  }, [activeTrack]);

  useEffect(() => {
    const tryStart = () => {
      if (!ready || !musicEnabled) return;
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



  // --- CURSEUR ---
  useEffect(() => {
    let currentX = -100;
    let currentY = -100;
    let targetX = -100;
    let targetY = -100;
    let frameId = 0;

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      setCursorPosition({ x: currentX, y: currentY });
      frameId = window.requestAnimationFrame(animate);
    };

    frameId = window.requestAnimationFrame(animate);
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);



  // --- TOGGLE MUSIQUE ---
  const onToggleMusic = () => {
    setMusicEnabled((v) => !v);
  };

  const selectTrack = (index: number) => {
    setActiveTrack(index);
    setMusicEnabled(true);
  };

  const nextTrack = () => setActiveTrack((i) => (i + 1) % musicTracks.length);
  const prevTrack = () => setActiveTrack((i) => (i - 1 + musicTracks.length) % musicTracks.length);

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
      <span
        className="mouse-follower"
        aria-hidden="true"
        style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}
      />
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

      <div className={["transition-opacity duration-500", ready ? "opacity-100" : "opacity-0"].join(" ")}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          musicEnabled={musicEnabled}
          onOpenPlaylist={() => setPlaylistOpen(true)}
        />

        <main className="min-h-screen">
          <AppRoutes />
        </main>

        <Footer />
      </div>

      <ToTopButton />
      <CookieBanner />
      <MusicPlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        tracks={musicTracks}
        activeTrack={activeTrack}
        isPlaying={musicEnabled}
        onTogglePlay={onToggleMusic}
        onSelectTrack={selectTrack}
        onNext={nextTrack}
        onPrev={prevTrack}
      />
    </div>
  );
}
