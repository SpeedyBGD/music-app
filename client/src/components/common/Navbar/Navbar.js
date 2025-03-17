import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "@/context/AppContext";
import LogoIcon from "@/components/icons/LogoIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";
import AddSongModal from "@/components/songs/AddSongModal";
const Navbar = () => {
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const [showAddSongModal, setShowAddSongModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { isAuthenticated, setSelectedGenre, setSortBy, refreshSongs } = useAppContext();
    const navigate = useNavigate();
    const handleLogoClick = async () => {
        setSelectedGenre("Sve");
        setSortBy("newest");
        await refreshSongs();
        navigate("/");
    };
    return (_jsxs("header", { className: "fixed-top bg-dark border-bottom border-secondary", children: [_jsx(Container, { className: "px-3", children: _jsxs("div", { className: "d-flex justify-content-between align-items-center py-3", children: [_jsxs(Link, { to: "/", className: "d-flex align-items-center gap-3 text-decoration-none", onClick: handleLogoClick, children: [_jsx(LogoIcon, {}), _jsx("h1", { className: "m-0 text-white fs-4 d-none d-sm-block", children: "Pesme za Du\u0161u" })] }), _jsx(SearchBar, { query: searchQuery, setQuery: setSearchQuery }), _jsx("div", { className: "d-none d-md-flex gap-2", children: isAuthenticated ? (_jsxs(_Fragment, { children: [_jsx(UserMenu, { onAddSongClick: () => setShowAddSongModal(true) }), _jsx(AddSongModal, { show: showAddSongModal, onHide: () => setShowAddSongModal(false) })] })) : (_jsx(AuthButtons, {})) }), _jsx("button", { className: "d-md-none text-white p-0 bg-transparent border-0", onClick: () => setShowMobileMenu(true), children: _jsx(MenuIcon, { size: 24 }) })] }) }), _jsx(MobileMenu, { show: showMobileMenu, onHide: () => setShowMobileMenu(false), isLoggedIn: isAuthenticated, query: searchQuery, setQuery: setSearchQuery, onAddSongClick: () => setShowAddSongModal(true) }), isAuthenticated && (_jsx(AddSongModal, { show: showAddSongModal, onHide: () => setShowAddSongModal(false) }))] }));
};
export default Navbar;
