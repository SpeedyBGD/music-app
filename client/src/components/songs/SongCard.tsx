import React from "react";
import { Song } from "@/types/music";
import HeartIcon from "@/components/icons/HeartIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { useAppContext } from "@/context/AppContext";
import { YOUTUBE_THUMBNAIL_URL } from "@/utils/constants";

interface SongCardProps {
  song: Song;
}

const SongCard: React.FC<SongCardProps> = ({ song }) => {
  const { categories, playSong } = useAppContext();
  const thumbnailUrl = `${YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;
  const categoryName =
    categories.find((cat) => cat.id === song.kategorijaId)?.naziv || "Sve";

  return (
    <div
      className="song-card bg-secondary rounded-3 p-2 d-flex flex-column h-100 position-relative"
      onClick={() => playSong(song)}
    >
      <div className="position-relative mb-2 overflow-hidden rounded-3">
        <div className="ratio ratio-1x1">
          <img
            src={thumbnailUrl}
            alt={song.naziv}
            className="w-100 h-100"
            style={{
              objectFit: "cover",
              transform: "scale(1.35)",
              objectPosition: "center",
              borderRadius: "inherit",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                `${YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;
            }}
          />
        </div>
        <div className="play-button-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-3">
          <div className="play-button d-flex justify-content-center align-items-center bg-success rounded-circle">
            <PlayIcon color="#fff" size={24} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-column justify-content-between flex-grow-1 p-2">
        <h3 className="h6 mb-1 fw-semibold text-truncate">{song.naziv}</h3>
        <p className="text-muted mb-3 small text-truncate">{song.umetnik}</p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <span className="badge bg-dark text-muted">{categoryName}</span>
          <div className="d-flex align-items-center gap-2">
            <HeartIcon
              size={14}
              color={song.lajkovaoKorisnik === 1 ? "#1db954" : "white"}
              fill={song.lajkovaoKorisnik === 1 ? "#1db954" : "none"}
            />
            <span className="small">{song.brojLajkova}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongCard;
