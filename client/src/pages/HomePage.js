import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import AuthButtons from "@/components/auth/AuthButtons";
const HomePage = () => {
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
    return (_jsxs(_Fragment, { children: [_jsx(SongCollection, { fetchSongs: refreshSongs }), (showLoginModal || showRegister) && (_jsx(AuthButtons, { showLogin: showLoginModal, setShowLogin: (show) => {
                    setShowLoginModal(show);
                    if (!show && !showRegister)
                        handleCloseAuth();
                }, showRegister: showRegister, setShowRegister: (show) => {
                    setShowRegister(show);
                    if (!show && !showLoginModal)
                        handleCloseAuth();
                } }))] }));
};
export default HomePage;
