import { Clock3, Pause, Play, SkipBack, SkipForward, X } from "lucide-react";

type Track = { title: string; artist: string, duree: string };

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
      <div className="music-modal music-modal--playlist" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="music-modal-close" onClick={onClose} aria-label="Fermer la playlist">
          <X className="w-5 h-5" />
        </button>

        <h3>Playlist</h3>
        <div className="music-playlist-head">
          <span>#</span>
          <span>Titre</span>
          <span>Artiste</span>
          <span aria-label="Durée">
            <Clock3 className="w-4 h-4" />
          </span>
        </div>

        <ul className="music-playlist music-playlist--table">
          {tracks.map((track, index) => (
            <li key={`${track.title}-${index}`}>
              <button
                type="button"
                className={index === activeTrack ? "is-active" : ""}
                onClick={() => onSelectTrack(index)}
              >
                <span className="music-index">{index + 1}</span>
                <span className="music-title-wrap"><strong>{track.title}</strong></span>
                <span className="music-artist">{track.artist}</span>
                <span className="music-duration">{track.duree}</span>
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