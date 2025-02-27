import React, { useState } from "react";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import HeartIcon from "@/components/icons/HeartIcon";
import { Song } from "@/types/music";
import Modal from "@/components/common/Modal";

interface PlayerModalProps {
  song: Song | null;
  isOpen: boolean;
  onClose: () => void;
}

const PlayerModal: React.FC<PlayerModalProps> = ({ song, isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    toast.success(
      isLiked ? "Uklonili ste lajk sa pesme" : "Lajkovali ste pesmu",
    );
  };

  if (!song) return null;

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
    </Modal>
  );
};

export default PlayerModal;
