import { Pause, Play, SkipBack, SkipForward, X } from "lucide-react";

type Track = { title: string; artist: string };

export default function MusicPlaylistModal({
  open,
  onClose,
  tracks,
  activeTrack,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
  onNext,
  onPrev,
}: {
  open: boolean;
  onClose: () => void;
  tracks: Track[];
  activeTrack: number;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (index: number) => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  if (!open) return null;

  return (
    <div className="music-modal-overlay" role="dialog" aria-label="Playlist musicale" onClick={onClose}>
      <div className="music-modal" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="music-modal-close" onClick={onClose} aria-label="Fermer la playlist">
          <X className="w-5 h-5" />
        </button>

        <h3>Playlist</h3>
        <p className="music-modal-subtitle">Choisissez un morceau et lancez la lecture.</p>

        <ul className="music-playlist">
          {tracks.map((track, index) => (
            <li key={track.title}>
              <button
                type="button"
                className={index === activeTrack ? "is-active" : ""}
                onClick={() => onSelectTrack(index)}
              >
                <span>{track.title}</span>
                <small>{track.artist}</small>
              </button>
            </li>
          ))}
        </ul>

        <div className="music-controls">
          <button type="button" onClick={onPrev} aria-label="Piste précédente">
            <SkipBack className="w-5 h-5" />
          </button>
          <button type="button" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Lecture"}>
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button type="button" onClick={onNext} aria-label="Piste suivante">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}