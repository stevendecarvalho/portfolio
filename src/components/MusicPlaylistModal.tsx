import { useMemo, useState } from "react";
import { Clock3, Pause, Play, Repeat1, Shuffle, SkipBack, SkipForward, Volume2, VolumeX, X } from "lucide-react";

type Track = { img: string; title: string; artist: string, duree: string };

function formatTime(timeInSeconds: number) {
  if (!Number.isFinite(timeInSeconds) || timeInSeconds < 0) return "0:00";
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = Math.floor(timeInSeconds % 60);
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

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
  repeatOne,
  shuffleEnabled,
  onToggleRepeatOne,
  onToggleShuffle,
  currentTime,
  duration,
  volume,
  onSeek,
  onVolumeChange,
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
  repeatOne: boolean;
  shuffleEnabled: boolean;
  onToggleRepeatOne: () => void;
  onToggleShuffle: () => void;
  currentTime: number;
  duration: number;
  volume: number;
  onSeek: (nextTime: number) => void;
  onVolumeChange: (nextVolume: number) => void;
}) {
  const [hoveredTrack, setHoveredTrack] = useState<number | null>(null);

  const progressValue = useMemo(() => {
    if (!duration || !Number.isFinite(duration)) return 0;
    return Math.min(currentTime, duration);
  }, [currentTime, duration]);

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
          {tracks.map((track, index) => {
            const isActiveTrack = index === activeTrack;
            const isTrackHovered = hoveredTrack === index;
            const showOverlay = isTrackHovered || isActiveTrack;
            const showPause = isActiveTrack && isPlaying && isTrackHovered;

            return (
              <li key={`${track.title}-${index}`}>
                <button
                  type="button"
                  className={isActiveTrack ? "is-active" : ""}
                  onClick={() => onSelectTrack(index)}
                  onMouseEnter={() => setHoveredTrack(index)}
                  onMouseLeave={() => setHoveredTrack(null)}
                >
                  <span className="music-index">{index + 1}</span>
                  <span className="music-title-wrap">
                    <span className="music-cover-wrap">
                      <img className="music-cover" src={track.img} alt={track.title} />
                      {showOverlay && (
                        <span className="music-cover-overlay" aria-hidden="true">
                          {showPause ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </span>
                      )}
                    </span>
                    <strong>{track.title}</strong>
                  </span>
                  <span className="music-artist">{track.artist}</span>
                  <span className="music-duration">{track.duree}</span>
                </button>
              </li>
            );
          })}
        </ul>

        <div className="music-controls">
          <button
            type="button"
            onClick={onToggleShuffle}
            aria-label="Lecture aléatoire"
            className={shuffleEnabled ? "is-active" : ""}
          >
            <Shuffle className="w-4 h-4" />
          </button>
          <button type="button" onClick={onPrev} aria-label="Piste précédente">
            <SkipBack className="w-5 h-5" />
          </button>
          <button type="button" onClick={onTogglePlay} aria-label={isPlaying ? "Pause" : "Lecture"} className="is-main">
            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button type="button" onClick={onNext} aria-label="Piste suivante">
            <SkipForward className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={onToggleRepeatOne}
            aria-label="Répéter la musique"
            className={repeatOne ? "is-active" : ""}
          >
            <Repeat1 className="w-4 h-4" />
          </button>
        </div>

        <div className="music-progress-wrap">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={progressValue}
            onChange={(event) => onSeek(Number(event.target.value))}
            aria-label="Progression de la musique"
          />
          <span>{formatTime(duration)}</span>
        </div>

        <div className="music-volume-wrap">
          {volume <= 0.01 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={volume}
            onChange={(event) => onVolumeChange(Number(event.target.value))}
            aria-label="Volume"
          />
        </div>
      </div>
    </div>
  );
}