import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
const GenreFilter = () => {
    const { selectedGenre, setSelectedGenre, categories } = useAppContext();
    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
    };
    return (_jsxs("div", { className: "d-flex flex-wrap gap-2", children: [_jsx(Button, { variant: selectedGenre === "Sve" ? "success" : "dark", className: "rounded-pill px-3 py-2", onClick: () => handleGenreChange("Sve"), children: "Sve" }), categories.map((category) => (_jsx(Button, { variant: selectedGenre === category.id ? "success" : "dark", className: "rounded-pill px-3 py-2", onClick: () => handleGenreChange(category.id), children: category.naziv }, category.id)))] }));
};
export default GenreFilter;
