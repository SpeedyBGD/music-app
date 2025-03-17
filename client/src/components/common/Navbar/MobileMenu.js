import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import UserIcon from "@/components/icons/UserIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { searchSongs } from "@/services/musicService";
const MobileMenu = ({ show, onHide, isLoggedIn, query, setQuery, onAddSongClick, }) => {
    const { logout, email, setSelectedGenre, setSortBy, setSongs } = useAppContext();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Uspešno ste se odjavili!");
            onHide();
        }
        catch (error) {
            const axiosError = error;
            const message = axiosError.response?.data?.message || "Došlo je do greške pri odjavi.";
            toast.error(message);
        }
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim())
            return;
        setSelectedGenre("Sve");
        setSortBy("newest");
        const songs = await searchSongs(query);
        setSongs(songs);
        navigate("/");
        onHide();
    };
    return (_jsxs(Offcanvas, { show: show, onHide: onHide, placement: "end", className: "bg-dark text-white", children: [_jsx(Offcanvas.Header, { closeButton: true, closeVariant: "white", children: _jsx(Offcanvas.Title, { children: _jsx(Link, { to: "/", className: "text-white text-decoration-none", children: "Pesme za Du\u0161u" }) }) }), _jsx(Offcanvas.Body, { children: _jsxs("div", { className: "d-flex flex-column gap-3", children: [_jsxs(Form, { onSubmit: handleSearch, className: "d-flex align-items-center gap-2", children: [_jsx(Form.Control, { type: "text", placeholder: "Pretra\u017Eite muziku...", className: "rounded-pill", value: query, onChange: (e) => setQuery(e.target.value) }), _jsx(Button, { variant: "link", className: "text-white", type: "submit", children: _jsx(SearchIcon, { size: 20 }) })] }), isLoggedIn && email && (_jsx("div", { className: "text-center mb-3", children: _jsxs("div", { className: "d-flex justify-content-center align-items-center gap-2", children: [_jsx(UserIcon, { size: 20 }), _jsx("span", { className: "small", children: email })] }) })), isLoggedIn ? (_jsxs(_Fragment, { children: [_jsx(Link, { to: "/moje-lajkovane-pesme", className: "text-white text-decoration-none", onClick: onHide, children: "Omiljene pesme" }), _jsx("button", { className: "text-white text-decoration-none bg-transparent border-0 text-start p-0", onClick: () => {
                                        onAddSongClick();
                                        onHide();
                                    }, children: "Dodaj pesmu" }), _jsx("hr", { className: "border-secondary" }), _jsx(Link, { to: "#", className: "text-danger text-decoration-none", onClick: handleLogout, children: "Odjavi se" })] })) : (_jsx(AuthButtons, {}))] }) })] }));
};
export default MobileMenu;
