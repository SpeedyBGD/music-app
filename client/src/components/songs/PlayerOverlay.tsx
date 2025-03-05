import React from "react";
import YouTube from "react-youtube";
import HeartIcon from "@/components/icons/HeartIcon";
import NextSongIcon from "@/components/icons/NextSongIcon";
import Modal from "@/components/common/Modal";
import { useAppContext } from "@/context/AppContext";

const PlayerOverlay: React.FC = () => {
  const {
    currentSong,
    isPlaying,
    setIsPlaying,
    playNext,
    toggleLike,
    isAuthenticated,
  } = useAppContext();

  if (!currentSong) return null;

  const isLiked = currentSong.lajkovaoKorisnik === 1;

  const handleStateChange = (event: any) => {
    if (event.data === YouTube.PlayerState.ENDED) playNext();
  };

  const opts = {
    height: "100%",
    width: "100%",
    playerVars: { autoplay: 1 },
  };

  return (
    <Modal isOpen={isPlaying} onClose={() => setIsPlaying(false)}>
      <div className="position-relative bg-secondary rounded-3 p-3 p-sm-4">
        <button
          className="position-absolute top-0 end-0 btn btn-dark rounded-circle d-flex justify-content-center align-items-center m-2 m-sm-3 fw-bold z-3"
          onClick={() => setIsPlaying(false)}
          style={{ width: "32px", height: "32px", padding: "0" }}
          aria-label="Close player"
        >
          ×
        </button>
        <div className="ratio ratio-16x9">
          <YouTube
            videoId={currentSong.youtubeId}
            opts={opts}
            onStateChange={handleStateChange}
          />
        </div>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>
            <h3 className="h5 mb-1">{currentSong.naziv}</h3>
            <p className="text-muted mb-0">{currentSong.umetnik}</p>
          </div>
          <div className="d-flex align-items-center gap-3">
            <button className="bg-transparent border-0 p-0" onClick={playNext}>
              <NextSongIcon size={24} color="white" />
            </button>
            {isAuthenticated && (
              <>
                <button
                  className="bg-transparent border-0 p-0"
                  onClick={() => toggleLike(currentSong.id)}
                >
                  <HeartIcon
                    size={24}
                    color={isLiked ? "#1db954" : "white"}
                    fill={isLiked ? "#1db954" : "none"}
                  />
                </button>
                <span
                  className="text-white d-inline-block"
                  style={{ width: "12px", textAlign: "center" }}
                >
                  {currentSong.brojLajkova}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default PlayerOverlay;
