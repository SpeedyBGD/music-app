import React from "react";
import { Song } from "@/types/music";
import HeartIcon from "@/components/icons/HeartIcon";
import PlayIcon from "@/components/icons/PlayIcon";

interface SongCardProps {
  song: Song;
  onPlay: (song: Song) => void;
}

const SongCard: React.FC<SongCardProps> = ({ song, onPlay }) => {
  const thumbnailUrl = `${import.meta.env.VITE_YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;

  return (
    <div
      className="song-card bg-secondary rounded-3 p-3 d-flex flex-column h-100 position-relative"
      onClick={() => onPlay(song)}
    >
      <div className="position-relative mb-3">
        <img
          src={thumbnailUrl}
          alt={song.title}
          className="w-100 rounded-3"
          style={{ objectFit: "cover", height: "180px" }}
        />
        <div className="play-button-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-3">
          <div className="play-button d-flex justify-content-center align-items-center bg-success rounded-circle">
            <PlayIcon color="#fff" size={24} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between">
        <h3 className="h6 mb-1 fw-semibold text-truncate">{song.title}</h3>
        <p className="text-muted mb-2 small text-truncate">{song.artist}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge text-muted">{song.genre}</span>
          <div className="d-flex align-items-center gap-2 text-muted">
            <HeartIcon size={16} color="gray" />
            <span className="small">{song.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
