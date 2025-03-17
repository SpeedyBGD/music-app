import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
const UserMenu = ({ onAddSongClick }) => {
    const { logout, email } = useAppContext();
    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Uspešno ste se odjavili!");
        }
        catch (error) {
            const axiosError = error;
            const message = axiosError.response?.data?.message || "Došlo je do greške pri odjavi.";
            toast.error(message);
        }
    };
    return (_jsxs(Dropdown, { children: [_jsxs(Dropdown.Toggle, { variant: "link", className: "text-white p-0 d-flex align-items-center gap-2", children: [_jsx(UserIcon, { size: 24 }), email && _jsx("span", { className: "small", children: email })] }), _jsxs(Dropdown.Menu, { className: "bg-dark dropdown-menu-dark", children: [_jsx(Dropdown.Item, { as: Link, to: "/moje-lajkovane-pesme", className: "text-white", children: "Omiljene pesme" }), _jsx(Dropdown.Item, { as: "button", className: "text-white", onClick: onAddSongClick, children: "Dodaj pesmu" }), _jsx(Dropdown.Divider, {}), _jsx(Dropdown.Item, { as: Link, to: "#", className: "text-danger", onClick: handleLogout, children: "Odjavi se" })] })] }));
};
export default UserMenu;
