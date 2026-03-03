import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ToTopButton() {
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
    <button
      type="button"
      aria-label="Aller en haut"
      className={`to-top-button ${visible ? "is-visible" : ""}`}
      onClick={scrollToTop}
    >
      <ChevronUp className="w-6 h-6" />
    </button>
  );
}