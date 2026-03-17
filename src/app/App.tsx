import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AppRoutes from "./routes";
import FullScreenLoader from "../components/FullScreenLoader";
import ToTopButton from "../components/ToTopButton.tsx";
import CookieBanner, { COOKIE_KEY, OPEN_COOKIE_EVENT } from "../components/CookieBanner.tsx";
import MusicPlaylistModal from "../components/MusicPlaylistModal.tsx";

import music_RidingThruYourCity_img from "../assets/audio/music_RidingThruYourCity_img.jpg";
import music_RidingThruYourCity from "../assets/audio/music_RidingThruYourCity.mp3";
import music_Comedown_img from "../assets/audio/music_Comedown_img.jpg";
import music_Comedown from "../assets/audio/music_Comedown.mp3";
import music_WhatItSoundsLike_Sagelune_img from "../assets/audio/music_WhatItSoundsLike_Sagelune_img.jpg";
import music_WhatItSoundsLike_Sagelune from "../assets/audio/music_WhatItSoundsLike_Sagelune.mp3";
import heroSlide001 from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import sunTransition from "../assets/images/home/sun-transition.png";

export type Theme = "dark" | "light";

type Track = { img: string; title: string; artist: string; duree: string; src: string };

type UserPreferences = {
  theme: Theme;
  musicEnabled: boolean;
  activeTrack: number;
  volume: number;
  repeatOne: boolean;
  shuffleEnabled: boolean;
  favoritesOnly: boolean;
  favoriteTracks: number[];
};

const PREFERENCES_COOKIE = "portfolio_preferences";

const musicTracks: Track[] = [
  { img: music_RidingThruYourCity_img, title: "Riding Thru Your City", artist: "Ovi Wood", duree: "3:42", src: music_RidingThruYourCity },
  { img: music_Comedown_img, title: "Comedown (a face like)", artist: "Naits", duree: "3:19", src: music_Comedown },
  { img: music_WhatItSoundsLike_Sagelune_img, title: "What It Sounds Like - Sped Up", artist: "Sagelune, Glowtide", duree: "3:13", src: music_WhatItSoundsLike_Sagelune },
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

function clampTrackIndex(index: number) {
  if (!Number.isFinite(index)) return 0;
  return Math.min(Math.max(0, Math.floor(index)), musicTracks.length - 1);
}

function sanitizeFavoriteTracks(indices: number[]) {
  return Array.from(new Set(indices.map(clampTrackIndex)));
}

function hasFunctionalConsent() {
  if (typeof window === "undefined") return false;

  try {
    const savedConsent = window.localStorage.getItem(COOKIE_KEY);
    if (!savedConsent) return false;
    const parsed = JSON.parse(savedConsent) as { functional?: boolean };
    return Boolean(parsed?.functional);
  } catch {
    return false;
  }
}

function readPreferencesCookie(): Partial<UserPreferences> {
  if (typeof document === "undefined" || !hasFunctionalConsent()) return {};
  const match = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${PREFERENCES_COOKIE}=`));

  if (!match) return {};

  try {
    const rawValue = decodeURIComponent(match.split("=").slice(1).join("="));
    const parsed = JSON.parse(rawValue) as Partial<UserPreferences>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function writePreferencesCookie(preferences: UserPreferences) {
  if (typeof document === "undefined" || !hasFunctionalConsent()) {
    if (typeof document !== "undefined") {
      document.cookie = `${PREFERENCES_COOKIE}=; Max-Age=0; Path=/; SameSite=Lax`;
    }
    return;
  }
  document.cookie = `${PREFERENCES_COOKIE}=${encodeURIComponent(JSON.stringify(preferences))}; Max-Age=${60 * 60 * 24 * 365}; Path=/; SameSite=Lax`;
}

export default function App() {
  const location = useLocation();
  const previousPathRef = useRef(location.pathname);
  const [displayedLocation, setDisplayedLocation] = useState(location);
  const initialPreferences = readPreferencesCookie();

  const [theme, setTheme] = useState<Theme>(() =>
    initialPreferences.theme === "light" ? "light" : "dark",
  );
  
  const [ready, setReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loaderVisible, setLoaderVisible] = useState(true);
  const [routeTransitionActive, setRouteTransitionActive] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(
    typeof initialPreferences.musicEnabled === "boolean" ? initialPreferences.musicEnabled : true,
  );
  const [activeTrack, setActiveTrack] = useState<number>(
    clampTrackIndex(Number(initialPreferences.activeTrack ?? 0)),
  );
  const [playlistOpen, setPlaylistOpen] = useState(false);
  const [repeatOne, setRepeatOne] = useState<boolean>(Boolean(initialPreferences.repeatOne));
  const [shuffleEnabled, setShuffleEnabled] = useState<boolean>(Boolean(initialPreferences.shuffleEnabled));
  const [favoritesOnly, setFavoritesOnly] = useState<boolean>(Boolean(initialPreferences.favoritesOnly));
  const [favoriteTracks, setFavoriteTracks] = useState<number[]>(
    sanitizeFavoriteTracks(Array.isArray(initialPreferences.favoriteTracks) ? initialPreferences.favoriteTracks : []),
  );
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState<number>(
    Math.min(1, Math.max(0, Number(initialPreferences.volume ?? 0.55))),
  );
  
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 });
  
  const assetsToPreload = useMemo(() => [heroSlide001], []);

  const playableTrackIndexes = useMemo(() => {
    if (!favoritesOnly) return musicTracks.map((_, index) => index);
    return favoriteTracks;
  }, [favoritesOnly, favoriteTracks]);

  const visiblePlaylistTracks = useMemo(
    () => (favoritesOnly ? favoriteTracks : musicTracks.map((_, index) => index)).map((index) => ({ track: musicTracks[index], index })),
    [favoritesOnly, favoriteTracks],
  );

  useEffect(() => {
    writePreferencesCookie({
      theme,
      musicEnabled,
      activeTrack,
      volume,
      repeatOne,
      shuffleEnabled,
      favoritesOnly,
      favoriteTracks,
    });
  }, [theme, musicEnabled, activeTrack, volume, repeatOne, shuffleEnabled, favoritesOnly, favoriteTracks]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const pathToBodyId: Record<string, string> = {
      "/": "home",
      "/mentions-legales": "mentions-legales",
      "/accessibilite": "accessibilite",
      "/politique-confidentialite": "politique-confidentialite",
      "/politique-cookies": "politique-cookies",
      "/cgu": "cgu",
    };

    const nextId = pathToBodyId[location.pathname] ?? "page";
    document.body.id = nextId;

    return () => {
      if (document.body.id === nextId) {
        document.body.removeAttribute("id");
      }
    };
  }, [location.pathname]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (previousPathRef.current !== location.pathname) {
      setRouteTransitionActive(true);
      const switchTimeout = window.setTimeout(() => setDisplayedLocation(location), 500);
      const finishTimeout = window.setTimeout(() => setRouteTransitionActive(false), 950);
      previousPathRef.current = location.pathname;

      return () => {
        window.clearTimeout(switchTimeout);
        window.clearTimeout(finishTimeout);
      };
    }
  }, [location]);
  
  useEffect(() => {
    const audio = new Audio(musicTracks[activeTrack]?.src ?? musicTracks[0].src);
    audio.loop = repeatOne;
    audio.preload = "auto";
    audio.volume = volume;
    audioRef.current = audio;

    if (musicEnabled) {
      audio.play().catch(() => {});
    }

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => setCurrentTime(audio.currentTime || 0);
    const updateDuration = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("durationchange", updateDuration);

    updateProgress();
    updateDuration();

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = musicTracks[activeTrack]?.src ?? musicTracks[0].src;
    audio.currentTime = 0;

    if (musicEnabled) {
      audio.play().catch(() => {});
    }
  }, [activeTrack]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.loop = repeatOne;
  }, [repeatOne]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
  }, [volume]);
  
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    if (!musicEnabled) {
      a.pause();
    } else {
      a.play().catch(() => {});
    }
  }, [musicEnabled]);

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

  const selectRandomPlayableTrack = (currentTrack: number) => {
    if (playableTrackIndexes.length <= 1) return currentTrack;
    let randomTrack = currentTrack;
    while (randomTrack === currentTrack) {
      randomTrack = playableTrackIndexes[Math.floor(Math.random() * playableTrackIndexes.length)];
    }
    return randomTrack;
  };

  const getAdjacentTrack = (currentTrack: number, direction: "next" | "prev") => {
    if (playableTrackIndexes.length === 0) return currentTrack;
    const currentIndex = playableTrackIndexes.indexOf(currentTrack);
    const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
    const delta = direction === "next" ? 1 : -1;
    const nextIndex = (safeCurrentIndex + delta + playableTrackIndexes.length) % playableTrackIndexes.length;
    return playableTrackIndexes[nextIndex];
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      if (repeatOne) return;

      setActiveTrack((currentTrack) => {
        if (shuffleEnabled) {
          return selectRandomPlayableTrack(currentTrack);
        }
        return getAdjacentTrack(currentTrack, "next");
      });
    };

    audio.addEventListener("ended", handleEnded);
    return () => audio.removeEventListener("ended", handleEnded);
  }, [repeatOne, shuffleEnabled, playableTrackIndexes]);
  
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
  
  const onToggleMusic = () => {
    if (favoritesOnly && playableTrackIndexes.length === 0) return;
    setMusicEnabled((v) => !v);
  };

  const selectTrack = (index: number) => {
    setActiveTrack(index);
    setMusicEnabled(true);
  };


  const toggleTrackPlay = (index: number) => {
    if (index === activeTrack) {
      onToggleMusic();
      return;
    }
    selectTrack(index);
  };

  const nextTrack = () => {
    setActiveTrack((currentTrack) => getAdjacentTrack(currentTrack, "next"));
  };

  const prevTrack = () => {
    const audio = audioRef.current;
    if (audio && audio.currentTime > 3) {
      audio.currentTime = 0;
      return;
    }

    setActiveTrack((currentTrack) => getAdjacentTrack(currentTrack, "prev"));
  };

  const seekTrack = (nextTime: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = nextTime;
    setCurrentTime(nextTime);
  };

  const changeVolume = (nextVolume: number) => {
    setVolume(nextVolume);
  };

  const toggleShuffle = () => setShuffleEnabled((currentValue) => !currentValue);
  const toggleRepeatOne = () => setRepeatOne((currentValue) => !currentValue);

  const toggleFavoriteTrack = (index: number) => {
    setFavoriteTracks((currentFavorites) => {
      const removing = currentFavorites.includes(index);
      const nextFavorites = removing
        ? currentFavorites.filter((favoriteIndex) => favoriteIndex !== index)
        : sanitizeFavoriteTracks([...currentFavorites, index]);

      if (favoritesOnly && removing && index == activeTrack) {
        if (nextFavorites.length === 0) {
          setMusicEnabled(false);
        } else {
          setActiveTrack(nextFavorites[0]);
        }
      }

      return nextFavorites;
    });
  };

  const toggleFavoritesOnly = () => {
    setFavoritesOnly((value) => {
      const nextValue = !value;
      if (nextValue) {
        if (favoriteTracks.length === 0) {
          setMusicEnabled(false);
        } else if (!favoriteTracks.includes(activeTrack)) {
          setActiveTrack(favoriteTracks[0]);
        }
      }
      return nextValue;
    });
  };

  const nextFromControl = () => {
    if (shuffleEnabled) {
      setActiveTrack((currentTrack) => selectRandomPlayableTrack(currentTrack));
      return;
    }

    nextTrack();
  };

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

      <div className={`route-cosmic-loader ${routeTransitionActive ? "is-active" : ""}`} aria-hidden="true">
        <img
          src={sunTransition}
          alt=""
          className="route-cosmic-loader-sun"
          onError={(event) => {
            event.currentTarget.style.display = "none";
          }}
        />
        <svg className="route-cosmic-loader-rings" viewBox="0 0 100 100" overflow="visible">
          <g className="spinner"><circle className="path" cx="50" cy="50" r="28" fill="none" /></g>
          <g className="ring ring-1"><circle className="path" cx="50" cy="50" r="74" fill="none" /></g>
          <g className="ring ring-2"><circle className="path" cx="50" cy="50" r="120" fill="none" /></g>
          <g className="ring ring-3"><circle className="path" cx="50" cy="50" r="170" fill="none" /></g>
        </svg>
      </div>

      <div className={["transition-opacity duration-500", ready ? "opacity-100" : "opacity-0"].join(" ")}>
        <Header
          theme={theme}
          onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
          musicEnabled={musicEnabled}
          onOpenPlaylist={() => setPlaylistOpen(true)}
        />

        <main className="min-h-screen relative">
          <div key={`warp-${displayedLocation.pathname}`} className="route-warp-overlay is-active" aria-hidden="true" />
          <div key={displayedLocation.pathname} className="route-space-enter">
            <AppRoutes location={displayedLocation} />
          </div>
        </main>

        <Footer />
      </div>

      <ToTopButton onOpenCookies={() => window.dispatchEvent(new Event(OPEN_COOKIE_EVENT))} />
      <CookieBanner />
      <MusicPlaylistModal
        open={playlistOpen}
        onClose={() => setPlaylistOpen(false)}
        tracks={visiblePlaylistTracks}
        activeTrack={activeTrack}
        isPlaying={musicEnabled}
        onTogglePlay={onToggleMusic}
        onSelectTrack={selectTrack}
        onToggleTrackPlay={toggleTrackPlay}
        onNext={nextFromControl}
        onPrev={prevTrack}
        repeatOne={repeatOne}
        shuffleEnabled={shuffleEnabled}
        favoritesOnly={favoritesOnly}
        onToggleFavoritesOnly={toggleFavoritesOnly}
        favorites={favoriteTracks}
        onToggleFavorite={toggleFavoriteTrack}
        onToggleRepeatOne={toggleRepeatOne}
        onToggleShuffle={toggleShuffle}
        currentTime={currentTime}
        duration={duration}
        volume={volume}
        onSeek={seekTrack}
        onVolumeChange={changeVolume}
      />
    </div>
  );
}
