import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import AuthButtons from "@/components/auth/AuthButtons";

const HomePage: React.FC = () => {
  const { refreshSongs, showLoginModal, setShowLoginModal } = useAppContext();

  const location = useLocation();
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showLogin") === "true") {
      setShowLoginModal(true);
      setShowRegister(false);
    }
  }, [location.search, setShowLoginModal]);

  const handleCloseAuth = () => {
    setShowLoginModal(false);
    setShowRegister(false);
  };

  return (
    <>
      <SongCollection fetchSongs={refreshSongs} />

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
