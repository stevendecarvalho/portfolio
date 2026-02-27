import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import logo from "../assets/logo.svg";

const quickLinks = [
  { label: "À propos", href: "/about" },
  { label: "Mon univers", href: "/univers" }
];

const socialLinks = [
  { label: "Facebook", Icon: Facebook, href: "https://www.facebook.com/people/Steven-Insights/61585398478536/?locale=fr_FR" },
  { label: "LinkedIn", Icon: Linkedin, href: "https://www.linkedin.com/in/steven-de-carvalho" },
  { label: "Instagram", Icon: Instagram, href: "https://www.instagram.com/steven.insights/" },
  { label: "YouTube", Icon: Youtube, href: "https://www.youtube.com/@stevendecarvalho2021" },
  { label: "WhatsApp", Icon: Mail, href: "mailto:contact@stevendecarvalho.com" },
];

export default function Footer() {
  return (
    <footer className="bg-cosmic-black border-t border-cyan-400/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <img src={logo} alt="Logo" className="relative h-auto w-[150px]" />
              </div>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              Directeur artistique freelance senior.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/5 hover:bg-cyan-400/20 border border-transparent hover:border-cyan-400 rounded-none transition-all duration-300 group"
                  aria-label={s.label}
                >
                  <s.Icon className="w-5 h-5 text-white/70 group-hover:text-cyan-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-orbitron">Liens Rapides</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-sm inline-block hover:translate-x-1 transform"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-orbitron">Mes services</h4>
            <ul className="space-y-2">
              <li><Link className="text-white/70 hover:text-cyan-400 transition-colors text-sm" to="/services">Expertises</Link></li>
              <li><Link className="text-white/70 hover:text-cyan-400 transition-colors text-sm" to="/projets">Mes projets</Link></li>
              <li><Link className="text-white/70 hover:text-cyan-400 transition-colors text-sm" to="/photos">Mes photos</Link></li>
              <li><Link className="text-white/70 hover:text-cyan-400 transition-colors text-sm" to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white font-orbitron">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:contact@stevendecarvalho.com" className="text-white/70 hover:text-cyan-400 transition-colors">contact@stevendecarvalho.com</a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">+33 6 61 33 25 01</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                <span className="text-white/70">Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">© 2017 - {new Date().getFullYear()} Steven DE CARVALHO. Tous droits réservés.</p>
            <div className="flex space-x-6 text-sm">
              <Link className="text-white/60 hover:text-cyan-400 transition-colors" to="/mentions-legales">Mentions légales</Link>
              <Link className="text-white/60 hover:text-cyan-400 transition-colors" to="/confidentialite">Confidentialité</Link>
              <Link className="text-white/60 hover:text-cyan-400 transition-colors" to="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
