import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import AuthButtons from "@/components/auth/AuthButtons";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppContext();
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
