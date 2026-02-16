import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Rocket, Sparkles, Star } from "lucide-react";
import { heroImages, projects, services, testimonials } from "../data/mockData";
import aboutFutureImage from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-about-future.jpg";
import biographyImage from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-biography.jpg";

export default function Home() {
  const images = useMemo(() => heroImages, []);
  const aboutSlides = useMemo(() => [aboutFutureImage, biographyImage], []);
  const [index, setIndex] = useState(0);
  const [aboutIndex, setAboutIndex] = useState(0);

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

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden cosmic-bg">
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
              <div className="absolute inset-0 bg-gradient-to-b from-cosmic-deep-blue/80 via-cosmic-deep-blue/60 to-cosmic-deep-blue" />
            </div>
          ))}
        </div>

        {/* little stars */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "2s" }} />
          <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
          <div className="transform transition-all duration-1000 translate-y-0 opacity-100">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-cyan-400/10 border border-cyan-400/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span className="text-cyan-400 text-sm font-medium font-orbitron">
                Créateur Digital & Innovateur
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight font-orbitron">
              Explorez l&apos;Univers
              <br />
              <span className="text-cyan-400 glow-text">Digital</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed">
              Développement web, cybersécurité, SEO, graphisme, marketing, photographie et vidéo.
              <br />
              Transformez vos idées en réalité avec des solutions innovantes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/portfolio" className="btn-cosmic">
                Découvrir mes projets <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/contact" className="btn-cosmic btn-cosmic-outline">
                Me contacter <Rocket className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full p-1">
            <div className="w-1.5 h-3 bg-cyan-400 rounded-full mx-auto animate-pulse" />
          </div>
        </div>
      </section>

      {/* ABOUT UNIVERSE */}
      <section className="py-20 bg-cosmic-dark-blue relative overflow-hidden">
        <div className="section-shell">
          <div className="laser-reveal flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4" data-reveal>
            <h2 className="laser-title text-[1em] font-bold text-cyan-400 uppercase font-orbitron">
              À LA FRONTIÈRE DU RÉEL ET DE L&apos;IMAGINAIRE
            </h2>
            <Link to="/univers" className="btn-cosmic btn-cosmic-outline whitespace-nowrap">
              Mon univers <Rocket className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 reveal-on-scroll" data-reveal>
              <p className="text-white text-[16px] leading-relaxed text-justify">
                <strong>Steven DE CARVALHO</strong> est un jeune créateur visuel à l’univers hybride.
              </p>
              <p className="text-white/90 text-[16px] leading-relaxed text-justify">
                Depuis plus de 10 ans, je navigue entre les arts, la technologie et la performance.
                Mon univers ? Un croisement entre cinéma, design graphique, interfaces numériques,
                corps en mouvement et narration visuelle.
              </p>
              <p className="text-white/90 text-[16px] leading-relaxed text-justify">
                Mon approche est <strong>pluridisciplinaire</strong> : je puise dans la danse pour la
                fluidité du mouvement, le cinéma pour la narration, le code pour la structure,
                le sport pour l’endurance, et l’art pour la liberté.
              </p>
              <Link to="/about" className="btn-cosmic inline-flex">
                Qui suis-je ? <Rocket className="w-4 h-4" />
              </Link>
            </div>

            <div className="relative reveal-on-scroll" data-reveal>
              <div className="relative overflow-hidden bg-cosmic-deep-blue/40 p-2">
                <img
                  src={aboutSlides[aboutIndex]}
                  alt="Steven De Carvalho"
                  key={aboutSlides[aboutIndex]}
                  className="about-slide-image w-full h-[420px] md:h-[620px] object-cover"
                />
                <button
                  type="button"
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-cosmic-black/70 text-white flex items-center justify-center hover:border-cyan-400"
                  onClick={() => setAboutIndex((aboutIndex - 1 + aboutSlides.length) % aboutSlides.length)}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full border border-white/20 bg-cosmic-black/70 text-white flex items-center justify-center hover:border-cyan-400"
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

      {/* SERVICES */}
      <section className="py-20 bg-cosmic-dark-blue relative">
        <div className="section-shell">
          <div className="text-center mb-16 reveal-on-scroll" data-reveal>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
              Services
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Des solutions complètes pour tous vos besoins digitaux
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((s) => (
              <Link
                key={s.title}
                to={s.href}
                className="cosmic-card group cursor-pointer reveal-on-scroll"
                data-reveal
                style={{ animation: "fadeInUp 0.8s ease 0s 1 normal forwards" }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-cyan-400/10 rounded-none border border-cyan-400/30 group-hover:bg-cyan-400/20 transition-all duration-300">
                    <s.Icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white font-orbitron">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12 reveal-on-scroll" data-reveal>
            <Link to="/services" className="btn-cosmic inline-flex items-center">
              Voir tous les services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="py-20 cosmic-bg">
        <div className="section-shell">
          <div className="text-center mb-16 reveal-on-scroll" data-reveal>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
              Projets Récents
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Découvrez mes créations et réalisations les plus récentes
            </p>
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

      {/* TESTIMONIALS */}
      <section className="py-20 bg-cosmic-dark-blue">
        <div className="section-shell">
          <div className="text-center mb-16 reveal-on-scroll" data-reveal>
            <h2 className="section-title text-4xl md:text-5xl font-bold text-white mb-4 font-orbitron">
              Témoignages
            </h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ce que mes clients disent de mon travail
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="cosmic-card reveal-on-scroll" data-reveal>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center border-2 border-cyan-400">
                    <span className="text-cyan-400 font-bold font-orbitron">{t.initials}</span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-white font-semibold">{t.name}</h4>
                    <p className="text-white/60 text-sm">{t.role}</p>
                  </div>
                </div>

                <div className="flex mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-cyan-400 fill-current" />
                  ))}
                </div>

                <p className="text-white/70 leading-relaxed">{t.text}</p>
              </div>
            ))}
          </div>
        </div>
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
  );
}
