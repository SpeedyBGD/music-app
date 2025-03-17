import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import GenreFilter from "@/components/filters/GenreFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import SongGrid from "@/components/songs/SongGrid";
import PlayerOverlay from "@/components/songs/PlayerOverlay";
import { useAppContext } from "@/context/AppContext";
const SongCollection = ({ title, titleClassName = "", fetchSongs, }) => {
    const { songs, selectedGenre, sortBy } = useAppContext();
    const [isSongsLoaded, setIsSongsLoaded] = useState(false);
    useEffect(() => {
        setIsSongsLoaded(false);
        fetchSongs().then(() => {
            setIsSongsLoaded(true);
        });
    }, [fetchSongs, selectedGenre, sortBy]);
    if (!isSongsLoaded)
        return null;
    return (_jsxs("div", { className: "container mt-4", children: [title && (_jsx("h2", { className: `mb-5 ${titleClassName} text-center`, children: title })), _jsxs(Row, { className: "g-3 mb-4", children: [_jsx(Col, { xs: 12, md: 8, children: _jsx(GenreFilter, {}) }), _jsx(Col, { xs: 12, md: 4, className: "mt-3 mt-md-0", children: _jsx(SortDropdown, {}) })] }), _jsx(SongGrid, { songs: songs }), songs.length === 0 && (_jsxs("div", { className: "text-center text-muted py-5", children: [_jsx("h4", { children: "Nema prona\u0111enih pesama" }), _jsx("p", { children: "Poku\u0161ajte da promenite filtere" })] })), _jsx(PlayerOverlay, {})] }));
};
export default SongCollection;
