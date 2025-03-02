import React from "react";
import YouTube from "react-youtube";
import { toast } from "react-toastify";
import HeartIcon from "@/components/icons/HeartIcon";
import NextSongIcon from "@/components/icons/NextSongIcon";
import { Song } from "@/types/music";
import Modal from "@/components/common/Modal";
import { useAuth } from "@/context/AuthContext";
import { likeSong, unlikeSong } from "@/services/musicService";

interface PlayerOverlayProps {
  song: Song | null;
  isOpen: boolean;
  onClose: () => void;
  onNextSong: () => void;
  onLikeUpdate: (
    songId: string,
    newLikeCount: number,
    isLiked: boolean,
  ) => void;
}

const PlayerOverlay: React.FC<PlayerOverlayProps> = ({
  song,
  isOpen,
  onClose,
  onNextSong,
  onLikeUpdate,
}) => {
  const { isAuthenticated, token } = useAuth();

  if (!song) return null;

  // Determine if the song is liked by the current user
  const isLiked = song.lajkovaoKorisnik === 1;

  const handleLikeClick = async () => {
    if (!isAuthenticated || !token) return;

    try {
      if (isLiked) {
        // Unlike the song
        await unlikeSong(song.id, token);
        onLikeUpdate(song.id, song.brojLajkova - 1, false); // Update parent state
        toast.success("Uklonili ste lajk sa pesme");
      } else {
        // Like the song
        await likeSong(song.id, token);
        onLikeUpdate(song.id, song.brojLajkova + 1, true); // Update parent state
        toast.success("Lajkovali ste pesmu");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("Došlo je do greške prilikom lajkovanja pesme.");
    }
  };

  const handleStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) {
      onNextSong();
    }
  };

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
          <YouTube
            videoId={song.youtubeId}
            opts={opts}
            onStateChange={handleStateChange}
          />
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <h3 className="h5 mb-1">{song.naziv}</h3>
            <p className="text-muted mb-0">{song.umetnik}</p>
          </div>

          {isAuthenticated && (
            <div className="d-flex align-items-center gap-3">
              <button
                className="bg-transparent border-0 p-0"
                onClick={onNextSong}
                aria-label="Sledeća pesma"
              >
                <NextSongIcon size={24} color="white" />
              </button>

              <button
                className="bg-transparent border-0 p-0"
                onClick={handleLikeClick}
                aria-label="Like"
              >
                <HeartIcon size={24} color={isLiked ? "red" : "white"} />
              </button>

              <span className="text-white">{song.brojLajkova}</span>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default PlayerOverlay;
