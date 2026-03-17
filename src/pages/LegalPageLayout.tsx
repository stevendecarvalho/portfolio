import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import heroDark from "../assets/images/home/steven-de-carvalho-visual-creator-paris-home-slide-001.jpg";
import heroLight from "../assets/images/home/fond-light-theme-001.jpg";

type Section = {
  title: string;
  content: ReactNode;
};

type LegalPageLayoutProps = {
  title: string;
  intro: string;
  sections: Section[];
  updatedAt: string;
  seoDescription?: string;
  titlebarBackground?: {
    dark: string;
    light: string;
  };
};

const legalPages = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Accessibilité", href: "/accessibilite" },
  { label: "Confidentialité", href: "/politique-confidentialite" },
  { label: "Cookies", href: "/politique-cookies" },
  { label: "CGU", href: "/cgu" },
];

export default function LegalPageLayout({ title, intro, sections, updatedAt, seoDescription, titlebarBackground }: LegalPageLayoutProps) {
  const [theme, setTheme] = useState<"dark" | "light">(() =>
    document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark",
  );

  useEffect(() => {
    const html = document.documentElement;
    const observer = new MutationObserver(() => {
      setTheme(html.getAttribute("data-theme") === "light" ? "light" : "dark");
    });

    observer.observe(html, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const previousTitle = document.title;
    const nextTitle = `${title} | Steven DE CARVALHO`;
    document.title = nextTitle;

    const descriptionValue = seoDescription ?? intro;
    const updateMeta = (name: string, content: string) => {
      let element = document.head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute("name", name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    updateMeta("description", descriptionValue);
    updateMeta("robots", "index,follow");

    return () => {
      document.title = previousTitle;
    };
  }, [intro, seoDescription, title]);

  return (
    <main className="legal-page relative min-h-screen overflow-hidden bg-cosmic-black text-white">
      <div className="legal-titlebar relative border-b border-white/10">
        <img
          src={theme === "light" ? (titlebarBackground?.light ?? heroLight) : (titlebarBackground?.dark ?? heroDark)}
          alt=""
          aria-hidden="true"
          className="legal-titlebar-bg"
        />
        <div className="legal-titlebar-overlay" />
        <div className="legal-titlebar-content relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="font-orbitron text-3xl font-bold tracking-wide text-cyan-300 sm:text-4xl">{title}</h1>
        </div>
      </div>

      <div className="legal-shooting-stars" aria-hidden="true">
        {Array.from({ length: 10 }).map((_, i) => (
          <span key={`legal-star-${i}`} />
        ))}
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <section className="legal-card mb-8 rounded-none border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <div className="mb-5 text-sm text-white/75">
            <Link to="/" className="hover:text-cyan-300 transition-colors">Accueil</Link>
            <span className="px-2 text-white/45">/</span>
            <span className="text-cyan-300">{title}</span>
          </div>

          <h2 className="mb-4 text-lg font-semibold text-cyan-300 sm:text-xl">Pages légales</h2>
          <nav aria-label="Navigation pages légales" className="flex flex-wrap gap-3">
            {legalPages.map((page) => (
              <Link
                key={page.href}
                to={page.href}
                className="rounded-none border border-cyan-400/35 bg-cosmic-black/40 px-3 py-2 text-sm text-white/85 transition-all duration-300 hover:border-cyan-300 hover:bg-cyan-300/15 hover:text-cyan-200"
              >
                {page.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="max-w-3xl text-sm leading-relaxed text-white/80 sm:text-base">{intro}</p>
            <p className="mt-4 text-xs text-white/60">Dernière mise à jour : {updatedAt}</p>
          </div>
        </section>

        <div className="space-y-8">
          {sections.map((section) => (
            <section key={section.title} className="legal-card rounded-none border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <h2 className="mb-3 text-lg font-bold text-cyan-300 sm:text-xl">{section.title}</h2>
              <div className="space-y-3 text-sm leading-relaxed text-white/85 sm:text-base">{section.content}</div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}