////////////////
// COMPOSANTS //
////////////////

import { Link, useLocation } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronDown, Menu, Moon, Sun, Search, Volume2, VolumeX, X } from "lucide-react";

import type { Theme } from "../app/App";
import { navLinks } from "../data/navLinks";
import MegaMenu from "./MegaMenu";
import { searchIndex } from "../data/searchIndex";

import logo from "../assets/logo.svg";

type DropdownPos = { left: number; top: number; width: number };
type SearchEntry = (typeof searchIndex)[number];



///////////////
// FONCTIONS //
///////////////

function safeLower(s: unknown) {
  return (s ?? "").toString().trim().toLowerCase();
}

function kindLabel(kind: string) {
  switch (kind) {
    case "page":
      return "Page";
    case "article":
      return "Article";
    case "projet":
      return "Projet";
    default:
      return "Autre";
  }
}

export default function Header({
  theme,
  onToggleTheme,
  musicEnabled,
  onToggleMusic,
}: {
  theme: Theme;
  onToggleTheme: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
}) {

  const { pathname } = useLocation();
  const headerHeight = 80;

  // Scroll
  const [scrolled, setScrolled] = useState(false);

  // Méga menu
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const closeTimer = useRef<number | null>(null);
  const navAreaRef = useRef<HTMLDivElement | null>(null);
  const megaRef = useRef<HTMLDivElement | null>(null);

  // Recherche
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const [searchDropPos, setSearchDropPos] = useState<DropdownPos | null>(null);

  // Overlay menu mobile
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [mobileOpenIndex, setMobileOpenIndex] = useState<number | null>(null);
  const openedItem = openIndex !== null ? (navLinks as any[])[openIndex] : null;
  const openedHasMega =
    !!openedItem &&
    (!!(openedItem as any).mega || Array.isArray((openedItem as any).children));

  const searchResults = useMemo(() => {
    const s = safeLower(q);
    if (!s) return [];

    const tokens = s.split(/\s+/).filter(Boolean);

    return (searchIndex as SearchEntry[])
      .filter((it) => {
        const hay = [
          it.title,
          (it as any).subtitle ?? "",
          ...(((it as any).keywords ?? []) as string[]),
          (it as any).kind ?? "",
        ]
          .join(" ")
          .toLowerCase();

        return tokens.every((t) => hay.includes(t));
      })
      .slice(0, 30);
  }, [q]);



///////////
// THÈME //
///////////

  const isLight = theme === "light";
  const textMuted = isLight ? "text-white/70 hover:text-cyan-400" : "text-white/70 hover:text-cyan-400";
  const textActive = isLight ? "text-white" : "text-cyan-400";
  const underlineColor = isLight ? "bg-white/80" : "bg-cyan-400";
  const iconColor = isLight ? "text-white/80" : "text-cyan-400";
  const iconBox = isLight
    ? "bg-white/5 hover:bg-white/10"
    : "bg-white/10 hover:bg-cyan-400/20";

  const headerClass = [
    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
    scrolled
      ? isLight
        ? "backdrop-blur-md bg-white/80 shadow-lg border-b border-black/10"
        : "backdrop-blur-md bg-cosmic-black/60 shadow-lg border-b border-cyan-400/20"
      : isLight
        ? "bg-white/0 border-b border-transparent"
        : "bg-transparent border-b border-transparent",
  ].join(" ");

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setOpenIndex(null), 160);
  };

  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  const computeCenteredMegaWidth = () =>
    Math.min(1100, Math.floor(window.innerWidth * 0.92));

  const computeSearchDropdownPos = () => {
    const input = searchInputRef.current;
    if (!input) return;
    const rect = input.getBoundingClientRect();

    const vw = window.innerWidth;
    const padding = 12;

    const width = Math.min(rect.width, Math.floor(vw * 0.92));
    let left = rect.left;
    left = Math.max(padding, Math.min(left, vw - width - padding));

    const top = rect.bottom; // ✅ collé à la barre
    setSearchDropPos({ left, top, width });
  };

  // scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // esc closes
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        setSearchOpen(false);
        setQ("");
        setSearchDropPos(null);

        setMobileOpen(false);
        setMobileSearchOpen(false);
        setMobileOpenIndex(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  // route change closes
  useEffect(() => {
    setOpenIndex(null);
    setSearchOpen(false);
    setQ("");
    setSearchDropPos(null);

    setMobileOpen(false);
    setMobileSearchOpen(false);
    setMobileOpenIndex(null);
  }, [pathname]);

  // lock scroll on mobile overlay
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  // focus desktop search + position dropdown
  useEffect(() => {
    if (!searchOpen) return;
    setOpenIndex(null);
    setTimeout(() => {
      searchInputRef.current?.focus();
      computeSearchDropdownPos();
    }, 0);
  }, [searchOpen]);

  // reposition dropdown on resize when open
  useEffect(() => {
    const onResize = () => {
      if (searchOpen) computeSearchDropdownPos();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [searchOpen]);

  // keep dropdown aligned while typing
  useEffect(() => {
    if (!searchOpen) return;
    computeSearchDropdownPos();
  }, [q, searchOpen]);

  // click outside closes (desktop)
  useEffect(() => {
    if (!searchOpen && openIndex === null) return;

    const onPointerDown = (e: PointerEvent) => {
      const t = e.target as Node;
      const insideNav = navAreaRef.current?.contains(t);
      const insideMega = megaRef.current?.contains(t);
      if (!insideNav && !insideMega) {
        setOpenIndex(null);
        setSearchOpen(false);
        setQ("");
        setSearchDropPos(null);
      }
    };

    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [searchOpen, openIndex]);

  // mobile sections (inchangé)
  const mobileSections = useMemo(() => {
    return (navLinks as any[]).map((item) => {
      const links: Array<{ label: string; href: string }> = [];

      const cols = item?.mega?.columns ?? [];
      for (const col of cols) {
        for (const b of col.blocks ?? []) {
          if (b?.type === "cardGrid" && Array.isArray(b.items)) {
            for (const it of b.items) {
              if (it?.href && it?.title) links.push({ label: it.title, href: it.href });
            }
          }
          if (b?.type === "buttonRow" && Array.isArray(b.buttons)) {
            for (const bt of b.buttons) {
              if (bt?.href && bt?.label) links.push({ label: bt.label, href: bt.href });
            }
          }
        }
      }
      if (Array.isArray(item?.children)) {
        for (const c of item.children) {
          if (c?.href && c?.label) links.push({ label: c.label, href: c.href });
        }
      }

      const seen = new Set<string>();
      const deduped = links.filter((x) =>
        seen.has(x.href) ? false : (seen.add(x.href), true)
      );

      return {
        label: item.label,
        href: item.href as string | undefined,
        links: deduped,
        hasChildren: deduped.length > 0,
      };
    });
  }, []);

  const showDesktopResults = searchOpen && q.trim().length > 0;

  // ✅ Durées (ralenties) : ajuste ici facilement
  const MENU_ANIM = "duration-[650ms]";
  const SEARCH_ANIM = "duration-[750ms]";




  ///////////
  // RENDU //
  ///////////

  return (
    <header className={headerClass} style={{ height: headerHeight }}>
      <div className="pl-[30px] pr-[30px] max-w-7xl mx-auto h-20">
        <div className="flex justify-between items-center h-20 gap-[30px]">
          <Link to="/" className="flex shrink-0 items-center space-x-2 group">
            <div className="relative">
              <div className="absolute inset-0 blur-xl opacity-0 group-hover:opacity-50 transition-opacity bg-cyan-400" />
              <img src={logo} alt="Logo" className="relative h-8 w-auto logo" />
            </div>
          </Link>



          {/*/////////////////////
          // DESKTOP (>= 850px) //
          //////////////////////*/ }

          <div className="hidden min-[850px]:block relative flex-1 min-w-0" ref={navAreaRef}>
            <div className="relative h-20 w-full max-w-[1100px] ml-auto overflow-hidden">
              
              <nav
                className={[
                  "absolute inset-0 flex items-center justify-end space-x-1",
                  "transition-[opacity,transform] ease-out",
                  MENU_ANIM,
                  searchOpen
                    ? "opacity-0 translate-y-3 pointer-events-none"
                    : "opacity-100 translate-y-0 pointer-events-auto",
                ].join(" ")}
                onPointerEnter={cancelClose}
                onPointerLeave={scheduleClose}
              >
                {(navLinks as any[]).map((item, idx) => {
                  const hasMega = !!item.mega || Array.isArray(item.children);
                  const isOpen = openIndex === idx;
                  const isActive = item.href ? pathname === item.href : false;

                  const topBtnClass = [
                    "px-4 py-2 text-sm transition-all duration-300 relative group font-orbitron flex items-center gap-2 element-menu",
                    isActive ? textActive : textMuted,
                  ].join(" ");

                  return (
                    <div key={item.label} className="relative">
                      {hasMega ? (
                        <button
                          className={topBtnClass}
                          aria-haspopup="menu"
                          aria-expanded={isOpen}
                          type="button"
                          onPointerEnter={() => {
                            cancelClose();
                            setOpenIndex(idx);
                          }}
                          onFocus={() => setOpenIndex(idx)}
                          onClick={() => setOpenIndex((v) => (v === idx ? null : idx))}
                        >
                          {item.label}
                          <ChevronDown
                            className={["w-4 h-4 transition-transform duration-300",
                              isOpen ? "rotate-180" : "rotate-0",
                              isLight ? "text-white/70" : "text-white/70",
                            ].join(" ")}
                          />
                          <span
                            className={["absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300",
                              underlineColor,
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                            ].join(" ")}
                          />
                        </button>
                      ) : (
                        <Link
                          to={item.href ?? "/"}
                          className={[
                            "px-4 py-2 text-sm transition-all duration-300 relative group font-orbitron element-menu",
                            isActive ? textActive : textMuted,
                          ].join(" ")}
                          onPointerEnter={() => {
                            cancelClose();
                            setOpenIndex(null);
                          }}
                        >
                          {item.label}
                          <span
                            className={[
                              "absolute bottom-0 left-0 w-full h-0.5 transform origin-left transition-transform duration-300",
                              underlineColor,
                              isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                            ].join(" ")}
                          />
                        </Link>
                      )}
                    </div>
                  );
                })}

                {/* Search button */}
                <button
                  className={[
                    "ml-4 p-2 rounded-none transition-all duration-300 group",
                    iconBox,
                  ].join(" ")}
                  aria-label="Rechercher"
                  title="Rechercher"
                  type="button"
                  onClick={() => {
                    setOpenIndex(null);
                    setSearchOpen(true);
                  }}
                >
                  <Search className={["w-5 h-5", iconColor].join(" ")} />
                </button>

                {/* Music */}
                <button
                  className={[
                    "ml-3 p-2 rounded-none transition-all duration-300 group",
                    iconBox,
                  ].join(" ")}
                  aria-label={musicEnabled ? "Couper la musique" : "Activer la musique"}
                  onClick={onToggleMusic}
                  title={musicEnabled ? "Couper la musique" : "Activer la musique"}
                  type="button"
                >
                  {musicEnabled ? (
                    <Volume2 className={["w-5 h-5", iconColor].join(" ")} />
                  ) : (
                    <VolumeX className={["w-5 h-5", iconColor].join(" ")} />
                  )}
                </button>

                {/* Theme */}
                <button
                  className={[
                    "ml-3 p-2 rounded-none transition-all duration-300 group",
                    iconBox,
                  ].join(" ")}
                  aria-label="Toggle theme"
                  onClick={onToggleTheme}
                  title={theme === "dark" ? "Mode clair" : "Mode sombre"}
                  type="button"
                >
                  {theme === "dark" ? (
                    <Sun className={["w-5 h-5 theme-toggle-icon", isLight ? "text-amber-500" : "text-cyan-300"].join(" ")} />
                  ) : (
                    <Moon className={["w-5 h-5 theme-toggle-icon", iconColor].join(" ")} />
                  )}
                </button>
              </nav>

              {/* SEARCH BAR */}
              <div
                className={[
                  "absolute inset-0 flex items-center justify-end",
                  "transition-[opacity,transform] ease-out",
                  SEARCH_ANIM,
                  searchOpen
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-3 pointer-events-none",
                ].join(" ")}
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-[720px] max-w-[70vw]">
                    <input
                      ref={searchInputRef}
                      value={q}
                      onChange={(e) => setQ(e.target.value)}
                      placeholder="Rechercher…"
                      className={[
                        "w-full px-4 py-3 rounded-none outline-none font-orbitron",
                        isLight
                          ? "bg-white border border-black/15 text-black placeholder:text-black/40"
                          : "bg-cosmic-black/70 border border-cyan-400/25 text-white/90 placeholder:text-white/40",
                      ].join(" ")}
                    />
                  </div>

                  <button
                    className={["p-2 rounded-none transition-all", iconBox].join(" ")}
                    aria-label="Fermer la recherche"
                    title="Fermer"
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      setQ("");
                      setSearchDropPos(null);
                    }}
                  >
                    <X
                      className={[
                        "w-5 h-5",
                        isLight ? "text-black/80" : "text-white/90",
                      ].join(" ")}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* SEARCH RESULTS */}
            {showDesktopResults && searchDropPos && (
              <div
                className="fixed z-[9999]"
                style={{
                  left: searchDropPos.left,
                  top: searchDropPos.top,
                  width: searchDropPos.width,
                }}
              >
                <div
                  className={[
                    "rounded-none overflow-hidden",
                    isLight
                      ? "border border-black/10 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                      : "border border-cyan-400/20 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.65)]",
                  ].join(" ")}
                >
                  <ul className="max-h-[360px] overflow-auto">
                    {searchResults.length === 0 ? (
                      <li
                        className={[
                          "px-4 py-4 font-orbitron text-sm",
                          isLight ? "text-black/60" : "text-white/70",
                        ].join(" ")}
                      >
                        Aucun résultat
                      </li>
                    ) : (
                      searchResults.map((r) => (
                        <li key={(r as any).id ?? (r as any).href}>
                          <Link
                            to={(r as any).href}
                            className={[
                              "flex items-center gap-3 px-3 py-2 transition-colors",
                              isLight ? "hover:bg-black/5" : "hover:bg-white/5",
                            ].join(" ")}
                            onClick={() => {
                              setSearchOpen(false);
                              setQ("");
                              setSearchDropPos(null);
                            }}
                          >
                            <div
                              className={[
                                "h-12 w-20 overflow-hidden shrink-0",
                                isLight
                                  ? "bg-black/5 border border-black/10"
                                  : "bg-white/5 border border-white/10",
                              ].join(" ")}
                            >
                              {(r as any).img ? (
                                <img
                                  src={(r as any).img}
                                  alt={(r as any).title}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <div className="h-full w-full bg-gradient-to-r from-white/5 to-white/0" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <div
                                className={[
                                  "font-orbitron text-sm truncate",
                                  isLight ? "text-black/90" : "text-white/90",
                                ].join(" ")}
                              >
                                {(r as any).title}
                              </div>

                              {(r as any).subtitle && (
                                <div
                                  className={[
                                    "text-xs font-orbitron truncate",
                                    isLight ? "text-black/55" : "text-white/55",
                                  ].join(" ")}
                                >
                                  {(r as any).subtitle}
                                </div>
                              )}
                            </div>

                            <span
                              className={[
                                "text-[11px] font-orbitron px-2 py-1 border",
                                isLight
                                  ? "border-white/10 text-white/70 bg-white/5"
                                  : "border-white/10 text-white/70 bg-white/5",
                              ].join(" ")}
                            >
                              {kindLabel((r as any).kind ?? "other")}
                            </span>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* MEGA MENU */}
            {openIndex !== null && openedHasMega && !searchOpen && (
              <div
                ref={megaRef}
                className="fixed z-[9999]"
                style={{
                  top: headerHeight,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: computeCenteredMegaWidth(),
                }}
                onPointerEnter={cancelClose}
                onPointerLeave={scheduleClose}
              >
                <MegaMenu item={openedItem} />
              </div>
            )}
          </div>

          {/* MOBILE (< 850px) */}
          <div className="min-[850px]:hidden flex items-center space-x-3">
            <button
              className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
              aria-label="Rechercher"
              type="button"
              onClick={() => {
                setMobileOpen(true);
                setMobileSearchOpen(true);
              }}
            >
              <Search className="w-5 h-5 text-cyan-400" />
            </button>

            <button
              className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
              aria-label={musicEnabled ? "Couper la musique" : "Activer la musique"}
              onClick={onToggleMusic}
              type="button"
            >
              {musicEnabled ? (
                <Volume2 className="w-5 h-5 text-cyan-400" />
              ) : (
                <VolumeX className="w-5 h-5 text-cyan-400" />
              )}
            </button>

            <button
              className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
              aria-label="Toggle theme"
              onClick={onToggleTheme}
              type="button"
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 theme-toggle-icon text-cyan-300" />
              ) : (
                <Moon className="w-5 h-5 theme-toggle-icon text-cyan-400" />
              )}
            </button>

            <button
              className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
              aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
              onClick={() => {
                setMobileOpen(true);
                setMobileSearchOpen(false);
              }}
              type="button"
            >
              <Menu className="w-6 h-6 text-cyan-400" />
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FULLSCREEN OVERLAY (fade) */}
      <div
        className={[
          "fixed inset-0 z-[10000] min-[800px]:hidden transition-opacity duration-250",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
        aria-hidden={!mobileOpen}
      >
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={() => {
            setMobileOpen(false);
            setMobileSearchOpen(false);
            setMobileOpenIndex(null);
            setQ("");
          }}
        />

        <div className="relative h-full w-full">
          <div className="h-20 px-5 flex items-center justify-between border-b border-cyan-400/20">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Logo" className="h-10 w-auto" />
            </div>

            <div className="flex items-center gap-3">
              <button
                className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
                aria-label={mobileSearchOpen ? "Afficher le menu" : "Afficher la recherche"}
                onClick={() => setMobileSearchOpen((v) => !v)}
                type="button"
              >
                {mobileSearchOpen ? (
                  <Menu className="w-5 h-5 text-white/90" />
                ) : (
                  <Search className="w-5 h-5 text-white/90" />
                )}
              </button>

              <button
                className="p-2 rounded-none bg-white/10 hover:bg-cyan-400/20 transition-all"
                aria-label="Fermer"
                onClick={() => {
                  setMobileOpen(false);
                  setMobileSearchOpen(false);
                  setMobileOpenIndex(null);
                  setQ("");
                }}
                type="button"
              >
                <X className="w-5 h-5 text-white/90" />
              </button>
            </div>
          </div>

          <div className="px-6 py-8">
            <div className="h-[2px] bg-cyan-400/80 shadow-[0_0_20px_rgba(0,217,255,0.35)] mb-8" />

            {mobileSearchOpen ? (
              <div className="space-y-3">
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Rechercher…"
                  className="w-full px-4 py-3 bg-cosmic-black/70 border border-cyan-400/25 text-white/90 outline-none font-orbitron"
                  autoFocus
                />

                {q.trim().length > 0 && (
                  <div className="border border-cyan-400/20 bg-cosmic-black/90 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
                    <ul className="max-h-[420px] overflow-auto">
                      {searchResults.length === 0 ? (
                        <li className="px-4 py-4 text-white/70 font-orbitron text-sm">
                          Aucun résultat
                        </li>
                      ) : (
                        searchResults.map((r) => (
                          <li key={(r as any).id ?? (r as any).href}>
                            <Link
                              to={(r as any).href}
                              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSearchOpen(false);
                                setMobileOpenIndex(null);
                                setQ("");
                              }}
                            >
                              <div className="h-12 w-20 bg-white/5 border border-white/10 overflow-hidden shrink-0">
                                {(r as any).img ? (
                                  <img
                                    src={(r as any).img}
                                    alt={(r as any).title}
                                    className="h-full w-full object-cover"
                                    loading="lazy"
                                  />
                                ) : (
                                  <div className="h-full w-full bg-gradient-to-r from-white/5 to-white/0" />
                                )}
                              </div>

                              <div className="min-w-0 flex-1">
                                <div className="text-white/90 font-orbitron text-sm truncate">
                                  {(r as any).title}
                                </div>
                                {(r as any).subtitle && (
                                  <div className="text-white/55 text-xs font-orbitron truncate">
                                    {(r as any).subtitle}
                                  </div>
                                )}
                              </div>

                              <span className="text-[11px] font-orbitron px-2 py-1 border border-white/10 text-white/70 bg-white/5">
                                {kindLabel((r as any).kind ?? "other")}
                              </span>
                            </Link>
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-10">
                {mobileSections.map((sec, idx) => {
                  const open = mobileOpenIndex === idx;

                  if (!sec.hasChildren) {
                    return (
                      <div key={sec.label} className="space-y-3">
                        <Link
                          to={sec.href ?? "/"}
                          className="block text-white/90 font-orbitron text-lg"
                          onClick={() => {
                            setMobileOpen(false);
                            setMobileOpenIndex(null);
                          }}
                        >
                          {sec.label}
                        </Link>
                        <div className="h-px bg-white/15" />
                      </div>
                    );
                  }

                  return (
                    <div key={sec.label} className="space-y-3">
                      <button
                        className="w-full flex items-center justify-between text-left"
                        onClick={() => setMobileOpenIndex((v) => (v === idx ? null : idx))}
                        type="button"
                      >
                        <span className="text-white/90 font-orbitron text-lg">{sec.label}</span>
                        <ChevronDown
                          className={[
                            "w-5 h-5 text-white/70 transition-transform",
                            open ? "rotate-180" : "rotate-0",
                          ].join(" ")}
                        />
                      </button>

                      <div className="h-px bg-white/15" />

                      <div className={open ? "block" : "hidden"}>
                        <div className="pt-2 space-y-3">
                          {sec.links.map((l) => (
                            <Link
                              key={l.href}
                              to={l.href}
                              className="block text-white/80 hover:text-cyan-400 transition-colors font-orbitron"
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileOpenIndex(null);
                              }}
                            >
                              <span className="mr-2 text-cyan-400/80">→</span>
                              {l.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
