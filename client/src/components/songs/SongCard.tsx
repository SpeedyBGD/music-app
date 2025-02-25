import React from "react";
import { Song } from "@/types/music";
import HeartIcon from "@/components/icons/HeartIcon";

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const thumbnailUrl = `${import.meta.env.VITE_YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;

  return (
    <div className="song-card bg-secondary rounded-3 p-3">
      <img
        src={thumbnailUrl}
        alt={song.title}
        className="w-100 rounded-3 mb-3"
        style={{ aspectRatio: "1", objectFit: "cover" }}
      />
      <div>
        <h3 className="h5 mb-1 fw-semibold">{song.title}</h3>
        <p className="text-muted mb-2 small">{song.artist}</p>
        <div className="d-flex justify-content-between align-items-center">
          <span className="badge bg-success">{song.genre}</span>
          <div className="d-flex align-items-center gap-1 text-muted">
            <HeartIcon size={18} color="currentColor" />
            <span className="small">{song.likes}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
