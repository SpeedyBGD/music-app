import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Modal, Form, Button, Dropdown } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
import { addSong } from "@/services/musicService";
import { toast } from "react-toastify";
const AddSongModal = ({ show, onHide }) => {
    const [naziv, setNaziv] = useState("");
    const [umetnik, setUmetnik] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { categories, refreshSongs } = useAppContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory)
            return;
        try {
            await addSong({
                naziv,
                umetnik,
                youtubeId,
                kategorijaId: selectedCategory,
            });
            toast.success("Pesma uspešno dodata!");
            await refreshSongs();
            setNaziv("");
            setUmetnik("");
            setYoutubeId("");
            setSelectedCategory(null);
            onHide();
        }
        catch (error) {
            const axiosError = error;
            const message = axiosError.response?.data?.message ||
                "Došlo je do greške pri dodavanju pesme.";
            toast.error(message);
        }
    };
    return (_jsxs(Modal, { show: show, onHide: onHide, centered: true, children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Dodaj Pesmu" }) }), _jsx(Modal.Body, { children: _jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "formSongTitle", children: [_jsx(Form.Label, { children: "Naziv pesme" }), _jsx(Form.Control, { type: "text", placeholder: "Unesite naziv pesme", value: naziv, onChange: (e) => setNaziv(e.target.value), className: "rounded-pill" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "formArtist", children: [_jsx(Form.Label, { children: "Umetnik" }), _jsx(Form.Control, { type: "text", placeholder: "Unesite umetnika", value: umetnik, onChange: (e) => setUmetnik(e.target.value), className: "rounded-pill" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "formYoutubeId", children: [_jsx(Form.Label, { children: "YouTube ID" }), _jsx(Form.Control, { type: "text", placeholder: "Unesite YouTube ID", value: youtubeId, onChange: (e) => setYoutubeId(e.target.value), className: "rounded-pill" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "formCategory", children: [_jsx(Form.Label, { children: "Kategorija" }), _jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { variant: "outline-light", className: "w-100 rounded-pill text-start", children: selectedCategory
                                                ? categories.find((cat) => cat.id === selectedCategory)?.naziv
                                                : "Izaberite kategoriju" }), _jsx(Dropdown.Menu, { className: "bg-dark dropdown-menu-dark w-100", children: categories.map((category) => (_jsx(Dropdown.Item, { className: "text-white", onClick: () => setSelectedCategory(category.id), children: category.naziv }, category.id))) })] })] }), _jsx(Button, { variant: "primary", type: "submit", className: "w-100 rounded-pill mt-3", children: "Dodaj pesmu" })] }) })] }));
};
export default AddSongModal;
