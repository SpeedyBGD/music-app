import React, { useState, useEffect, useCallback } from "react";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeartIcon from "@/components/icons/HeartIcon";
import { Song } from "@/types/music";

interface PlayerOverlayProps {
  song: Song | null;
  onClose: () => void;
}

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({ song, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toast.success(
      isLiked ? "Uklonili ste lajk sa pesme" : "Lajkovali ste pesmu",
    );
  };

  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  if (!song) return null;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <div
      className="fixed-top vw-100 vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
      onClick={handleBackdropClick}
    >
      <div className="container px-3">
        <div className="position-relative bg-secondary rounded-3 p-3 p-sm-4">
          <button
            className="position-absolute top-0 end-0 btn btn-dark rounded-circle d-flex justify-content-center align-items-center m-2 m-sm-3 fw-bold z-3"
            onClick={onClose}
            style={{ width: "32px", height: "32px", padding: "0" }}
            aria-label="Close player"
          >
            ×
          </button>

          <div className="ratio ratio-16x9">
            <YouTube videoId={song.youtubeId} opts={opts} />
          </div>

          <div className="d-flex justify-content-end mt-3">
            <button
              className="bg-transparent border-0 p-0"
              onClick={handleLikeClick}
            >
              <HeartIcon size={24} color={isLiked ? "red" : "white"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
