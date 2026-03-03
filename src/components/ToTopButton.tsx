import { ChevronUp, KeyRound } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToTopButton({ onOpenCookies }: { onOpenCookies: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 180);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`floating-actions ${visible ? "is-visible" : ""}`}>
      <button
        type="button"
        aria-label="Gérer les cookies"
        className="cookie-manager-button bounce"
        onClick={onOpenCookies}
      >
        <KeyRound className="w-5 h-5" />
      </button>
      <button
        type="button"
        aria-label="Aller en haut"
        className="to-top-button bounce"
        onClick={scrollToTop}
      >
        <ChevronUp className="w-6 h-6" />
      </button>
    </div>
  );
}