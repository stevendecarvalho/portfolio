import React from "react";
import type { Social } from "../../data/navLinks";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";

const ICONS = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  youtube: FaYoutube,
  x: FaXTwitter,
  tiktok: FaTiktok,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
} as const satisfies Record<Social["icon"], React.ComponentType<{ className?: string }>>;

export function SocialRow({ socials }: { socials: Social[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {socials.map((s) => {
        const Icon = ICONS[s.icon];

        return (
          <a
            key={`${s.icon}-${s.href}`}
            href={s.href}
            target={s.target ?? "_blank"}
            rel={s.rel ?? (s.target === "_blank" ? "noopener noreferrer" : undefined)}
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/90 hover:bg-white/10 transition"
            aria-label={s.label}
            title={s.label}
          >
            <Icon className="text-base" />
            <span className="font-orbitron">{s.label}</span>
          </a>
        );
      })}
    </div>
  );
}
