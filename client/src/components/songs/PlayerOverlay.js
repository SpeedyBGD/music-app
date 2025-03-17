import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import YouTube from "react-youtube";
import HeartIcon from "@/components/icons/HeartIcon";
import NextSongIcon from "@/components/icons/NextSongIcon";
import Modal from "@/components/common/Modal";
import { useAppContext } from "@/context/AppContext";
const PlayerOverlay = () => {
    const { currentSong, isPlaying, setIsPlaying, playNext, toggleLike, isAuthenticated, } = useAppContext();
    if (!currentSong)
        return null;
    const isLiked = currentSong.lajkovaoKorisnik === 1;
    const handleStateChange = (event) => {
        if (event.data === YouTube.PlayerState.ENDED)
            playNext();
    };
    const opts = {
        height: "100%",
        width: "100%",
        playerVars: { autoplay: 1 },
    };
    return (_jsx(Modal, { isOpen: isPlaying, onClose: () => setIsPlaying(false), children: _jsxs("div", { className: "position-relative bg-secondary rounded-3 p-3 p-sm-4", children: [_jsx("button", { className: "position-absolute top-0 end-0 btn btn-dark rounded-circle d-flex justify-content-center align-items-center m-2 m-sm-3 fw-bold z-3", onClick: () => setIsPlaying(false), style: { width: "32px", height: "32px", padding: "0" }, "aria-label": "Close player", children: "\u00D7" }), _jsx("div", { className: "ratio ratio-16x9", children: _jsx(YouTube, { videoId: currentSong.youtubeId, opts: opts, onStateChange: handleStateChange }) }), _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-3", children: [_jsxs("div", { children: [_jsx("h3", { className: "h5 mb-1", children: currentSong.naziv }), _jsx("p", { className: "text-muted mb-0", children: currentSong.umetnik })] }), _jsxs("div", { className: "d-flex align-items-center gap-3", children: [_jsx("button", { className: "bg-transparent border-0 p-0", onClick: playNext, children: _jsx(NextSongIcon, { size: 24, color: "white" }) }), isAuthenticated && (_jsxs(_Fragment, { children: [_jsx("button", { className: "bg-transparent border-0 p-0", onClick: () => toggleLike(currentSong.id), children: _jsx(HeartIcon, { size: 24, color: isLiked ? "#1db954" : "white", fill: isLiked ? "#1db954" : "none" }) }), _jsx("span", { className: "text-white d-inline-block", style: { width: "12px", textAlign: "center" }, children: currentSong.brojLajkova })] }))] })] })] }) }));
};
export default PlayerOverlay;
