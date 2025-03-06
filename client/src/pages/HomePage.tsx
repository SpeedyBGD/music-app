import React, { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import AuthButtons from "@/components/auth/AuthButtons";
import { fetchAllSongs } from "@/services/musicService";

const HomePage: React.FC = () => {
  const {
    selectedGenre,
    sortBy,
    setSongs,
    refreshSongs,
    showLoginModal,
    setShowLoginModal,
  } = useAppContext();

  const location = useLocation();
  const [showRegister, setShowRegister] = useState(false);

  const fetchSongs = useCallback(async () => {
    const songs = await fetchAllSongs(
      sortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    );
    setSongs(songs);
  }, [selectedGenre, sortBy, setSongs]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showLogin") === "true") {
      setShowLoginModal(true);
      setShowRegister(false);
    }
  }, [location.search, refreshSongs, setShowLoginModal]);

  const handleCloseAuth = () => {
    setShowLoginModal(false);
    setShowRegister(false);
  };

  return (
    <>
      <SongCollection fetchSongs={fetchSongs} />

      {(showLoginModal || showRegister) && (
        <AuthButtons
          showLogin={showLoginModal}
          setShowLogin={(show) => {
            setShowLoginModal(show);
            if (!show && !showRegister) handleCloseAuth();
          }}
          showRegister={showRegister}
          setShowRegister={(show) => {
            setShowRegister(show);
            if (!show && !showLoginModal) handleCloseAuth();
          }}
        />
      )}
    </>
  );
};

export default HomePage;
