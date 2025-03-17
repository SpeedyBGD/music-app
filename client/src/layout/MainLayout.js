import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer";
import { useAppContext } from "@/context/AppContext";
const MainLayout = ({ children }) => {
    const { handleLogout, setShowLoginModal } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(() => {
        const handleUnauthenticated = () => {
            handleLogout();
            if (location.pathname === "/") {
                setShowLoginModal(true);
            }
            else {
                navigate("/", { replace: true });
                setShowLoginModal(true);
            }
        };
        window.addEventListener("auth:unauthenticated", handleUnauthenticated);
        return () => {
            window.removeEventListener("auth:unauthenticated", handleUnauthenticated);
        };
    }, [location.pathname, navigate, handleLogout, setShowLoginModal]);
    return (_jsxs("div", { className: "bg-dark min-vh-100 text-white d-flex flex-column", children: [_jsx(Navbar, {}), _jsx("main", { className: "flex-grow-1", children: _jsx(Container, { className: "py-4", children: children }) }), _jsx(Footer, {})] }));
};
export default MainLayout;
