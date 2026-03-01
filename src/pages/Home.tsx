import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Rocket, Sparkles, X } from "lucide-react";
import {
  aboutSlidesByTheme,
  bannerVideosByTheme,
  clientLogos,
  heroImagesByTheme,
  projects,
  services,
  testimonials,
} from "../data/mockData";

import "../styles/home.css";
import vaisseauSpatial from "../assets/images/home/vaisseau-spatial-creation-steven.png";
import potCrayons from "../assets/images/home/pot-crayon.png";

const TESTIMONIALS_PER_VIEW = 3;
const TESTIMONIAL_PREVIEW_LENGTH = 180;

function getPreview(text: string) {
  if (text.length <= TESTIMONIAL_PREVIEW_LENGTH) return text;
  return `${text.slice(0, TESTIMONIAL_PREVIEW_LENGTH).trim()}…`;
}

function normalizeTestimonialText(text: string) {
  return text.replace(/<br\s*\/?\s*>/gi, "\n");
}

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
  );

  const images = useMemo(() => heroImagesByTheme[theme], [theme]);
  const bannerVideos = useMemo(() => bannerVideosByTheme[theme], [theme]);
  const aboutSlides = useMemo(() => aboutSlidesByTheme[theme], [theme]);
  const [index, setIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [activeTestimonialTab, setActiveTestimonialTab] = useState<number | null>(null);

  const displayedTestimonials = useMemo(
    () =>
      Array.from({ length: Math.min(TESTIMONIALS_PER_VIEW, testimonials.length) }, (_, i) => {
        const currentIndex = (testimonialIndex + i) % testimonials.length;
        return { ...testimonials[currentIndex], index: currentIndex };
      }),
    [testimonialIndex],
  );

  useEffect(() => {
    const onThemeUpdate = () => {
      setTheme(document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark");
    };

    onThemeUpdate();

    const observer = new MutationObserver(onThemeUpdate);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, 4500);
    return () => window.clearInterval(id);
  }, [images.length]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setAboutIndex((i) => (i + 1) % aboutSlides.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [aboutSlides.length]);

  useEffect(() => {
    setAboutIndex((current) => (current >= aboutSlides.length ? 0 : current));
  }, [aboutSlides.length]);

  useEffect(() => {
    aboutSlides.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [aboutSlides]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" },
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (activeTestimonialTab === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveTestimonialTab(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeTestimonialTab]);

  const isLight = theme === "light";

  return (
    <div className="home-page min-h-screen relative">
      <div className="shooting-stars" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={`star-${i}`} />
        ))}
      </div>

      <div className="relative z-10">
      {/* HERO */}
        <section className="home-hero relative min-h-screen flex items-center justify-center overflow-hidden cosmic-bg">
          <div className="absolute inset-0">
            {images.map((url, i) => (
              <div
                key={url}
                className={[
                  "absolute inset-0 transition-opacity duration-1000",
                  i === index ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{
                  backgroundImage: `url("${url}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                
                <div
                  className={[
                    "absolute inset-0",
                    isLight
                      ? "bg-gradient-to-b from-[#202d56]/25 to-[#140604]/78"
                      : "bg-gradient-to-b from-cosmic-deep-blue/80 via-cosmic-deep-blue/60 to-cosmic-deep-blue",
                  ].join(" ")}
                />
              </div>
            ))}
          </div>

          {/* little stars */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className={`absolute top-1/4 left-1/4 w-2 h-2 ${isLight ? "hidden bg-[#112f5b]" : "bg-cyan-400"} rounded-full animate-pulse`} />
            <div className={`absolute top-1/3 right-1/3 w-1 h-1 ${isLight ? "hidden bg-[#112f5b]" : "bg-cyan-400"} rounded-full animate-pulse`} style={{ animationDelay: "1s" }} />
            <div className={`absolute bottom-1/4 left-1/3 w-1.5 h-1.5 ${isLight ? "hidden bg-[#112f5b]" : "bg-cyan-400"} rounded-full animate-pulse`} style={{ animationDelay: "2s" }} />
            <div className={`absolute top-2/3 right-1/4 w-1 h-1 ${isLight ? "hidden bg-[#112f5b]" : "bg-cyan-400"} rounded-full animate-pulse`} style={{ animationDelay: "1.5s" }} />
          </div>

          <div className={`${isLight ? "text-justify w-full" : "text-center"} relative z-10 max-w-7xl mx-auto pl-[30px] pr-[30px] pt-20`}>
            <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
              <div
                className={[
                  "inline-flex items-center space-x-2 px-5 py-2 rounded-full mb-6",
                  isLight
                    ? "bg-blue-300/10 border border-[#112f5b]"
                    : "bg-cyan-400/10 border border-cyan-400/30",
                ].join(" ")}
              >
                <Sparkles className={`w-4 h-4 ${isLight ? "text-[#112f5b]" : "text-cyan-400"}`} />
                <span className={`${isLight ? "text-[#112f5b]" : "text-cyan-400"} text-sm font-medium font-orbitron`}>
                  Créateur Digital & Innovateur
                </span>
              </div>

              <h1 className="title-hero-home">
                Explorez l&apos;Univers
                <br />
                <span className={`${isLight ? "text-cyan-400 glow-text" : "text-cyan-400 glow-text"}`}>Digital</span>
              </h1>

              <p className="desc-hero-home">
                Développement web, cybersécurité, SEO, graphisme, marketing, photographie et vidéo. Transformez vos idées en réalité avec des solutions innovantes.
              </p>

              <div className={`${isLight ? "justify-start" : "justify-center"} flex flex-col sm:flex-row items-center gap-4`}>
                <Link to="/portfolio" className="btn-cosmic">
                  Découvrir mes projets <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/contact" className="btn-cosmic btn-cosmic-outline">
                  Me contacter <Rocket className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="homeScroll absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className={`w-6 h-10 border-2 ${isLight ? "border-[#112f5b]" : "border-cyan-400/50"} rounded-full p-1`}>
              <div className={`w-1.5 h-3 ${isLight ? "bg-[#112f5b]" : "bg-cyan-400"} rounded-full mx-auto animate-pulse`} />
            </div>
          </div>
        </section>

        {/* ABOUT UNIVERSE */}
        <section className="sectionIntroUniverse py-20 bg-cosmic-dark-blue relative overflow-hidden">
          <div className="shooting-stars" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`services-star-${i}`} />
            ))}
          </div>

          <div className="section-shell relative z-10">
            <div className="laser-reveal flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4" data-reveal>
              <h2 className="laser-title title-section">
                {[isLight ? "🌌 À LA FRONTIÈRE DU RÉEL ET DE L'IMAGINAIRE" : "🌀 À LA FRONTIÈRE DU RÉEL ET DE L'IMAGINAIRE"]}
              </h2>
              <Link to="/univers" className="btn-cosmic btn-cosmic-outline whitespace-nowrap btnTitleUniverseHome">
                Mon univers <Rocket className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="sectionIntroUniverse-text space-y-8 reveal-on-scroll" data-reveal>
                <p className="text-white text-[16px] leading-relaxed text-justify">
                  <strong>Steven DE CARVALHO</strong> est un créateur digital spécialisé dans la conception d’univers visuels stratégiques.
                </p>
                <p className="text-white/90 text-[16px] leading-relaxed text-justify">
                  Depuis plus de 10 ans, il développe des <strong>identités, des plateformes et des expériences digitales</strong> à la frontière du design, du code et de la narration.
                </p>
                <p className="text-white/90 text-[16px] leading-relaxed text-justify">
                  Son travail repose sur une conviction simple : une <strong>image forte</strong> ne se limite pas à l’esthétique — elle doit <strong>structurer un message, incarner une vision et créer un impact durable.</strong>
                </p>
                <p className="text-white/90 text-[16px] leading-relaxed text-justify">
                  Au fil des années, Steven DE CARVALHO a su collaboré avec des <strong>entreprises, artistes, festivals et institutions</strong> dans la construction d’écosystèmes visuels cohérents, innovants et performants.
                </p>
                <div className="divLinkUniverse flex flex-col sm:flex-row items-center gap-4">
                  <Link to="/about" className="btn-cosmic inline-flex">
                    Qui suis-je ? <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link to="/univers" className="btn-cosmic btn-cosmic-outline whitespace-nowrap btnTitleUniverseHome">
                    Mon univers <Rocket className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="sectionIntroUniverse-slide relative reveal-on-scroll" data-reveal>
                <div className="relative w-full max-w-[400px] mx-auto overflow-hidden bg-cosmic-deep-blue/40">
                  <div className="relative w-full h-[420px] md:h-[620px]">
                    {aboutSlides.map((slide, i) => (
                      <img
                        key={slide}
                        src={slide}
                        alt="Steven De Carvalho"
                        className={`about-slide-image absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                          i === aboutIndex ? "opacity-100" : "opacity-0"
                        }`}
                        aria-hidden={i !== aboutIndex}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-cosmic-black/70 text-white flex items-center justify-center transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-cosmic-black"
                    onClick={() => setAboutIndex((aboutIndex - 1 + aboutSlides.length) % aboutSlides.length)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-cosmic-black/70 text-white flex items-center justify-center transition-colors duration-300 hover:border-cyan-400 hover:bg-cyan-400 hover:text-cosmic-black"
                    onClick={() => setAboutIndex((aboutIndex + 1) % aboutSlides.length)}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  {aboutSlides.map((slide, i) => (
                    <button
                      key={slide}
                      type="button"
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === aboutIndex ? "bg-cyan-400" : "bg-white/60"
                      }`}
                      onClick={() => setAboutIndex(i)}
                      aria-label={`Voir le slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UNIVERSE VIDEO BANNER */}
        <section className="universe-video-banner relative z-10 w-full overflow-hidden">
          <video
            className="universe-video-banner__media absolute inset-0 w-full h-full object-cover"
            src={bannerVideos.universe}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="universe-video-banner__overlay absolute inset-0" />

          <blockquote className="universe-video-banner__content relative z-10 flex flex-col items-center justify-center text-center text-white">
            <p className="homeVideoBannerText font-semibold italic">
              « Un projet bien construit traverse le temps et les esprits.<br className="mobile-break" />
                <span>Une vision. Une structure. Un impact. »</span>
            </p>
            <cite className="homeVideoBannerCite font-bold not-italic">
              — Steven DE CARVALHO
            </cite>
          </blockquote>
        </section>

        {/* SERVICES */}
        <section className="homeServicesSection py-20 bg-cosmic-dark-blue relative z-20 overflow-visible">
          <div className="shooting-stars" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`services-star-${i}`} />
            ))}
          </div>

          <span className="vaisseau-spatial vaisseau-spatial--banner z-20 pointer-events-none" aria-hidden="true">
            <img key="Vaisseau spatial" src={vaisseauSpatial} alt="Vaisseau spatial" className="object-contain" />
          </span>

          <div className="section-shell relative z-10">
            <div className="text-center mb-16 reveal-on-scroll" data-reveal>
              <div className="absolute-title-outline">
                <h2 className="section-title-outline">
                  Expertises
                </h2>
              </div>
              <h2 className="section-title-inline">
                Mes domaines de prédilection
              </h2>
              <div className="title-separator">
                <div className="line" />
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {services.map((s) => (
                <Link
                  key={s.title}
                  to={s.href}
                  className="homeExpertisesCard reveal-on-scroll"
                  data-reveal
                  style={{ animation: "fadeInUp 0.8s ease 0s 1 normal forwards" }}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <img src={s.srcByTheme[theme]} alt={s.title} className="object-contain" />
                    <h3 className="text-xl font-semibold text-white font-orbitron">{s.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </Link>
              ))}
            </div>

            <div className="text-center mt-12 reveal-on-scroll" data-reveal>
              <Link to="/services" className="btn-cosmic inline-flex items-center">
                Voir tous mes domaines <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="homeProjetsSection py-20 cosmic-bg relative overflow-visible">
          <div className="shooting-stars" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`projects-star-${i}`} />
            ))}
          </div>

          <span className="pot-crayons pot-crayons--banner z-30 pointer-events-none" aria-hidden="true">
            <img key="Création artistique" src={potCrayons} alt="Création artistique" className="object-contain" />
          </span>

          <div className="section-shell relative z-10">
            <div className="text-center mb-16 reveal-on-scroll" data-reveal>
              <div className="absolute-title-outline">
                <h2 className="section-title-outline">
                  Portfolio
                </h2>
              </div>
              <h2 className="section-title-inline">
                Mes dernières réalisations
              </h2>
              <div className="title-separator">
                <div className="line" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((p) => (
                <div
                  key={p.title}
                  className="cosmic-card p-0 overflow-hidden group cursor-pointer reveal-on-scroll"
                  data-reveal
                >
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-cosmic-deep-blue to-transparent opacity-60" />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-cyan-400/90 text-cosmic-black text-xs font-semibold font-orbitron">
                        {p.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 font-orbitron">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-sm mb-4">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-1 bg-white/5 text-cyan-400 text-xs border border-cyan-400/30"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 reveal-on-scroll" data-reveal>
              <Link to="/portfolio" className="btn-cosmic inline-flex items-center">
                Voir tout le portfolio <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>

        {/* EARTH VIDEO BANNER */}
        <section className="earth-video-banner relative z-10 w-full overflow-hidden">
          <video
            className="universe-video-banner__media absolute inset-0 w-full h-full object-cover"
            src={bannerVideos.earth}
            autoPlay
            loop
            muted
            playsInline
            aria-hidden="true"
          />
          <div className="universe-video-banner__overlay absolute inset-0" />
        </section>

        {/* CLIENT LOGOS */}
        <section className="client-logos-section relative overflow-hidden">
          <div className="shooting-stars" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`testimonials-star-${i}`} />
            ))}
          </div>

          <div className="section-shell relative z-10">
            <div className="text-center mb-16 reveal-on-scroll" data-reveal>
              <div className="absolute-title-outline">
                <h2 className="section-title-outline">
                  Références
                </h2>
              </div>
              <h2 className="section-title-inline">
                Ils m'ont fait confiance
              </h2>
              <div className="title-separator">
                <div className="line" />
              </div>
            </div>

            <div className="logos-marquee" aria-label="Logo de mes clients">
              <div className="logos-marquee-track">
                {[...clientLogos, ...clientLogos].map((logo, i) => (
                  <a
                    key={`${logo.name}-${i}`}
                    href={logo.href}
                    target="_blank"
                    rel="noreferrer"
                    className="logo-item"
                    aria-label={`Voir la référence ${logo.name}`}
                  >
                    <img src={logo.src} alt={logo.name} loading="lazy" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-cosmic-dark-blue relative overflow-hidden">
          <div className="shooting-stars" aria-hidden="true">
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={`testimonials-star-${i}`} />
            ))}
          </div>

          <div className="section-shell relative z-10">
            <div className="text-center mb-16 reveal-on-scroll" data-reveal>
              <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
                Témoignages
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Ce que mes clients disent de mon travail
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 mb-6">
              <button
                type="button"
                className="testimonial-nav-button"
                onClick={() => setTestimonialIndex((testimonialIndex - 1 + testimonials.length) % testimonials.length)}
                aria-label="Voir les témoignages précédents"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                className="testimonial-nav-button"
                onClick={() => setTestimonialIndex((testimonialIndex + 1) % testimonials.length)}
                aria-label="Voir les témoignages suivants"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {displayedTestimonials.map((t) => {
                const normalizedText = normalizeTestimonialText(t.text);
                const preview = getPreview(normalizedText);
                const isLong = preview !== normalizedText;
                return (
                  <article key={`${t.name}-${t.index}`} className="cosmic-card reveal-on-scroll testimonial-card" data-reveal>
                    <div className="testimonial-avatar-wrap">
                      <img src={t.avatar} alt={`Portrait de ${t.name}`} className="testimonial-avatar" loading="lazy" />
                    </div>

                    <h4 className="testimonial-name text-white font-semibold text-lg mt-4">{t.name}</h4>
                    <p className="testimonial-role text-white/60 text-sm">{t.role}</p>
                    <p className="testimonial-cite text-white/75 leading-relaxed">{preview}</p>

                    {isLong && (
                      <button
                        type="button"
                        className="testimonial-read-more"
                        onClick={() => setActiveTestimonialTab(t.index)}
                      >
                        Lire la suite
                      </button>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
          {activeTestimonialTab !== null && (
            <div className="testimonial-modal-overlay" role="dialog" aria-modal="true" aria-labelledby="testimonial-modal-title">
              <div className="testimonial-modal">
                <button
                  type="button"
                  className="testimonial-modal-close"
                  onClick={() => setActiveTestimonialTab(null)}
                  aria-label="Fermer la fenêtre des témoignages"
                >
                  <X className="w-5 h-5" />
                </button>

                <h3 id="testimonial-modal-title" className="testimonial-modal-title text-white text-2xl font-bold font-orbitron mb-4">
                  Tous les témoignages
                </h3>

                <div className="testimonial-modal-tabs" role="tablist" aria-label="Choisir un témoignage">
                  {testimonials.map((t, i) => (
                    <button
                      key={`${t.name}-tab`}
                      type="button"
                      role="tab"
                      aria-selected={activeTestimonialTab === i}
                      aria-controls={`testimonial-panel-${i}`}
                      id={`testimonial-tab-${i}`}
                      className={`testimonial-modal-tab ${activeTestimonialTab === i ? "is-active" : ""}`}
                      onClick={() => setActiveTestimonialTab(i)}
                    >
                      {t.name}
                    </button>
                  ))}
                </div>

                {testimonials.map((t, i) => (
                  <section
                    key={`${t.name}-panel`}
                    id={`testimonial-panel-${i}`}
                    role="tabpanel"
                    aria-labelledby={`testimonial-tab-${i}`}
                    className={activeTestimonialTab === i ? "block" : "hidden"}
                  >
                    <div className="flex items-center gap-4 mt-6 mb-5">
                      <img src={t.avatar} alt={`Portrait de ${t.name}`} className="testimonial-avatar" loading="lazy" />
                      <div>
                        <h4 className="testimonial-modal-name text-white text-lg font-semibold">{t.name}</h4>
                        <p className="testimonial-modal-role text-white/70 text-sm">{t.role}</p>
                      </div>
                    </div>
                    <p className="testimonial-modal-text text-white/85 leading-relaxed">{normalizeTestimonialText(t.text)}</p>
                  </section>
                ))}
              </div>
              <button
                type="button"
                className="testimonial-modal-backdrop-hitbox"
                onClick={() => setActiveTestimonialTab(null)}
                aria-label="Fermer les témoignages"
              />
            </div>
          )}
        </section>

        {/* CTA */}
        <section className="py-20 cosmic-bg relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
          </div>

        <div className="section-shell">
          <div className="relative max-w-4xl mx-auto text-center reveal-on-scroll" data-reveal>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Discutons de vos besoins et créons ensemble quelque chose d&apos;extraordinaire.
            </p>
            <Link to="/contact" className="btn-cosmic inline-flex items-center text-lg">
              Commencer maintenant <Rocket className="w-6 h-6" />
            </Link>
          </div>
        </div>
        </section>
      </div>
    </div>
  );
}
