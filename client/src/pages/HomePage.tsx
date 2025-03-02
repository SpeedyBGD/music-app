import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";
import SongCollection from "@/components/songs/SongCollection";
import { fetchAllSongs } from "@/services/musicService";
import AuthButtons from "@/components/auth/AuthButtons";

const HomePage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const { setSongs } = usePlayer();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [showLoginFromRedirect, setShowLoginFromRedirect] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get("showLogin") === "true" && !isAuthenticated) {
      setShowLoginFromRedirect(true);
      navigate("/", { replace: true });
    }
  }, [location.search, isAuthenticated, navigate]);

  useEffect(() => {
    fetchAllSongs(
      sortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    ).then((songs) => {
      setSongs(songs);
    });
  }, [selectedGenre, sortBy, setSongs, isAuthenticated]);

  return (
    <>
      <SongCollection />
      {showLoginFromRedirect && (
        <AuthButtonsWithAutoLogin
          onClose={() => setShowLoginFromRedirect(false)}
        />
      )}
    </>
  );
};

const AuthButtonsWithAutoLogin: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <AuthButtons
      {...{
        showLogin,
        setShowLogin: (value) => {
          setShowLogin(value);
          if (!value) onClose();
        },
        showRegister: false,
        setShowRegister: () => {},
      }}
    />
  );
};

export default HomePage;
