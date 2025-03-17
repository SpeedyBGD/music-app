import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import HeartIcon from "@/components/icons/HeartIcon";
import PlayIcon from "@/components/icons/PlayIcon";
import { useAppContext } from "@/context/AppContext";
import { YOUTUBE_THUMBNAIL_URL } from "@/utils/constants";
const SongCard = ({ song }) => {
    const { categories, playSong } = useAppContext();
    const thumbnailUrl = `${YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;
    const categoryName = categories.find((cat) => cat.id === song.kategorijaId)?.naziv || "Sve";
    return (_jsxs("div", { className: "song-card bg-secondary rounded-3 p-2 d-flex flex-column h-100 position-relative", onClick: () => playSong(song), children: [_jsxs("div", { className: "position-relative mb-2 overflow-hidden rounded-3", children: [_jsx("div", { className: "ratio ratio-1x1", children: _jsx("img", { src: thumbnailUrl, alt: song.naziv, className: "w-100 h-100", style: {
                                objectFit: "cover",
                                transform: "scale(1.35)",
                                objectPosition: "center",
                                borderRadius: "inherit",
                            }, onError: (e) => {
                                e.target.src =
                                    `${YOUTUBE_THUMBNAIL_URL}${song.youtubeId}/hqdefault.jpg`;
                            } }) }), _jsx("div", { className: "play-button-overlay position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center rounded-3", children: _jsx("div", { className: "play-button d-flex justify-content-center align-items-center bg-success rounded-circle", children: _jsx(PlayIcon, { color: "#fff", size: 24 }) }) })] }), _jsxs("div", { className: "d-flex flex-column justify-content-between flex-grow-1 p-2", children: [_jsx("h3", { className: "h6 mb-1 fw-semibold text-truncate", children: song.naziv }), _jsx("p", { className: "text-muted mb-3 small text-truncate", children: song.umetnik }), _jsxs("div", { className: "d-flex justify-content-between align-items-center mt-auto", children: [_jsx("span", { className: "badge bg-dark text-muted", children: categoryName }), _jsxs("div", { className: "d-flex align-items-center gap-2", children: [_jsx(HeartIcon, { size: 14, color: song.lajkovaoKorisnik === 1 ? "#1db954" : "white", fill: song.lajkovaoKorisnik === 1 ? "#1db954" : "none" }), _jsx("span", { className: "small", children: song.brojLajkova })] })] })] })] }));
};
export default SongCard;
