import { Link } from "react-router-dom";
import type { CSSProperties, ComponentType } from "react";
import type { NavItem, Social } from "../data/navLinks";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Music2,
  ExternalLink,
} from "lucide-react";
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

type Btn = { label: string; href: string; variant?: "primary" | "ghost" };
type CardItem = { title: string; href: string; img: string; desc?: string };

type Block =
  | { type: "title"; text: string; badge?: string }
  | { type: "richText"; text: string }
  | { type: "buttonRow"; buttons: Btn[] }
  | { type: "socialRow"; socials: Social[] }
  | { type: "cardGrid"; items: CardItem[]; cols?: 1 | 2 | 3; compact?: boolean }
  | { type: "imageFill"; src: string; alt: string; href?: string; overlay?: boolean };

type MegaColumn = { width?: 1 | 2 | 3 | 4 | 5; blocks: Block[] };

type MegaLayout = {
  widthClass?: string;
  colGapClass?: string;
  paddingClass?: string;
  outerClass?: string;
  frameClass?: string;
};

const ICON_CLASS = "w-5 h-5 text-white/90";

const SOCIAL_ICON_COMPONENTS: Record<Social["icon"], ComponentType<{ className?: string }>> = {
  facebook: Facebook,
  instagram: Instagram,
  x: Twitter,
  youtube: Youtube,
  tiktok: Music2,
  linkedin: FaLinkedinIn,
  whatsapp: FaWhatsapp,
};

export default function MegaMenu({ item }: { item: NavItem }) {
  const mega = item?.mega;
  if (!mega) return null;

  const layout: MegaLayout = mega.layout ?? {};

  // Defaults cohérents avec ta DA
  const widthClass = layout.widthClass ?? "w-[1100px] max-w-[92vw]";
  const colGapClass = layout.colGapClass ?? "gap-6";
  const paddingClass = layout.paddingClass ?? "p-5";
  const outerClass = layout.outerClass ?? "mt-0";
  const frameClass =
    layout.frameClass ??
    "border border-cyan-400/20 bg-cosmic-black/80 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.55)]";

  const cols: MegaColumn[] = mega.columns ?? [];

  // ✅ Si tu définis gridTemplateColumns dans navLinks, on le respecte
  // ✅ Sinon fallback responsive auto
  const gridStyle: CSSProperties = mega.gridTemplateColumns
    ? { gridTemplateColumns: mega.gridTemplateColumns }
    : { gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" };

  return (
    <div className={outerClass}>
      <div className={[widthClass, frameClass].join(" ")}>
        <div
          className={["grid", colGapClass, paddingClass, "items-stretch"].join(" ")}
          style={gridStyle}
        >
          {cols.map((col, colIdx) => (
            <div key={colIdx} className="min-w-0 flex flex-col gap-4">
              {col.blocks.map((b, i) => (
                <BlockRenderer key={i} block={b} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "title":
      return (
  <div className="flex items-center gap-3">
    <h3 className="font-semibold font-orbitron text-white/90 text-base mb-[10px] pb-[10px] border-b-2 border-[#c8a461]">
      {block.text}
    </h3>

    {block.badge && (
      <span className="text-xs font-orbitron px-2 py-1 bg-fuchsia-600/80 text-white">
        {block.badge}
      </span>
    )}
  </div>
);


    case "richText":
      return (
        <p className="text-sm text-white/75 leading-relaxed whitespace-pre-line">
          {block.text}
        </p>
      );

    case "buttonRow":
      return (
        <div className="flex flex-wrap gap-3 pt-1">
          {block.buttons.map((btn) => (
            <Link
              key={btn.href}
              to={btn.href}
              className={[
                "px-4 py-2 font-orbitron text-sm transition-all",
                btn.variant === "primary"
                  ? "bg-[#caa867] text-black hover:brightness-110"
                  : "bg-white/10 text-white/85 hover:bg-white/15",
              ].join(" ")}
            >
              {btn.label}
            </Link>
          ))}
        </div>
      );

    case "socialRow":
      return (
        <div className="flex items-center gap-3 pt-1">
          {block.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target={s.target ?? "_blank"}
              rel={s.rel ?? (s.target === "_blank" ? "noopener noreferrer" : undefined)}
              className="h-10 w-10 grid place-items-center rounded-full bg-white/10 hover:bg-cyan-400/20 transition-all"
              aria-label={s.label}
              title={s.label}
            >
              {socialIcon(s.icon)}
            </a>
          ))}
        </div>
      );

    case "cardGrid": {
      const cols = block.cols ?? 1;
      const gridCols = cols === 1 ? "grid-cols-1" : cols === 2 ? "grid-cols-2" : "grid-cols-3";
      const compact = block.compact ?? false;

      return (
        <div className={["grid gap-3", gridCols].join(" ")}>
          {block.items.map((it) => (
            <Link
              key={it.href}
              to={it.href}
              className={[
                "group block bg-white/5 hover:bg-white/10 transition-all border border-white/10 hover:border-cyan-400/25",
                compact ? "p-2" : "p-3",
              ].join(" ")}
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-black/30">
                <img
                  src={it.img}
                  alt={it.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              <div className="mt-2 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-orbitron text-sm text-white/90 group-hover:text-cyan-400 transition-colors truncate">
                    {it.title}
                  </div>
                  {it.desc && (
                    <div className="text-xs text-white/60 mt-1 line-clamp-2">
                      {it.desc}
                    </div>
                  )}
                </div>
                <ExternalLink className="w-4 h-4 text-cyan-400/50 group-hover:text-cyan-400 transition-colors shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      );
    }

    case "imageFill": {
      const content = (
        <div className="relative w-full h-full min-h-[360px] overflow-hidden">
          <img
            src={block.src}
            alt={block.alt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
          {block.overlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-black/40" />
          )}
        </div>
      );

      if (block.href) {
        return (
          <Link
            to={block.href}
            className="block border border-white/10 hover:border-cyan-400/25 transition-all h-full"
          >
            {content}
          </Link>
        );
      }

      return <div className="border border-white/10 h-full">{content}</div>;
    }

    default:
      return null;
  }
}

function socialIcon(icon: Social["icon"]) {
  const Icon = SOCIAL_ICON_COMPONENTS[icon] ?? ExternalLink;
  return <Icon className={ICON_CLASS} />;
}
