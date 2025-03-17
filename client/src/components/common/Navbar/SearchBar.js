import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import SearchIcon from "@/components/icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import { searchSongs } from "@/services/musicService";
const SearchBar = ({ query, setQuery }) => {
    const navigate = useNavigate();
    const { setSelectedGenre, setSortBy, setSongs } = useAppContext();
    const handleSearch = async () => {
        if (!query.trim())
            return;
        setSelectedGenre("Sve");
        setSortBy("newest");
        const songs = await searchSongs(query);
        setSongs(songs);
        navigate("/");
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter")
            handleSearch();
    };
    return (_jsxs("div", { className: "d-none d-md-flex align-items-center bg-secondary rounded-pill flex-grow-1 mx-4", style: { maxWidth: "500px" }, children: [_jsx("input", { type: "text", placeholder: "Pretra\u017Eite muziku...", className: "form-control bg-transparent border-0 text-white", value: query, onChange: (e) => setQuery(e.target.value), onKeyPress: handleKeyPress }), _jsx(Button, { variant: "link", className: "text-white", onClick: handleSearch, children: _jsx(SearchIcon, { size: 20 }) })] }));
};
export default SearchBar;
