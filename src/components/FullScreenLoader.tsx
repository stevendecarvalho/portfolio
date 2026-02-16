import logo from "../assets/logo.svg";
import loaderMp4 from "../assets/videos/loader.mp4";

export default function FullScreenLoader({ progress }: { progress: number }) {
  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-cosmic-black">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        webkit-playsinline="true"
      >
        <source src={loaderMp4} type="video/mp4" />
      </video>

      {/* Overlay (assombrit + cohérence DA) */}
      <div className="absolute inset-0 bg-cosmic-black/90" />
      <div className="absolute inset-0 bg-cyan-400/5" />

      {/* Contenu loader */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="w-full max-w-xl px-6 text-center">
          {/* Logo + glow */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-cyan-400/40 blur-2xl opacity-70" />
            <img src={logo} alt="Logo" className="relative mx-auto h-16 w-auto" />
          </div>

          <p className="mt-6 text-white/70 font-orbitron tracking-wide">
            Chargement ...
          </p>

          {/* Barre + % */}
          <div className="mt-6 flex items-center gap-4">
            <div className="relative h-3 w-full overflow-hidden border border-cyan-400/30 bg-white/5" style={{height: 6}}>
              <div
                className="absolute inset-y-0 left-0 bg-cyan-400/30 blur-md"
                style={{ width: `${pct}%` }}
              />
              <div
                className="h-full bg-cyan-400 transition-[width] duration-300 ease-out"
                style={{
                  width: `${pct}%`,
                  boxShadow: "0 0 18px rgba(34, 211, 238, 0.55)",
                }}
              />
            </div>

            <div className="w-14 text-right font-orbitron text-cyan-400">
              {pct}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
