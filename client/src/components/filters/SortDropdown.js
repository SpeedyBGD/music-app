import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dropdown, Stack } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
const SortDropdown = () => {
    const { sortBy, setSortBy } = useAppContext();
    const handleSortChange = (newSortBy) => {
        setSortBy(newSortBy);
    };
    return (_jsxs(Stack, { direction: "horizontal", gap: 3, className: "align-items-center justify-content-md-end", children: [_jsx("span", { className: "text-white", children: "Sortiraj po:" }), _jsxs(Dropdown, { children: [_jsx(Dropdown.Toggle, { variant: "outline-light", className: "rounded-pill", children: sortBy === "newest" ? "Najnovije" : "Popularnost" }), _jsxs(Dropdown.Menu, { className: "bg-dark dropdown-menu-dark", children: [_jsx(Dropdown.Item, { className: "text-white", onClick: () => handleSortChange("newest"), children: "Najnovije" }), _jsx(Dropdown.Item, { className: "text-white", onClick: () => handleSortChange("popularity"), children: "Popularnost" })] })] })] }));
};
export default SortDropdown;
