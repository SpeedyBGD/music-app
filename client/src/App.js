import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider, useAppContext } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routes/AppRoutes";
import LoadingSpinner from "@/components/icons/LoadingSpinner";
const AppContent = () => {
    const { isLoading } = useAppContext();
    if (isLoading) {
        return (_jsx("div", { className: "d-flex justify-content-center align-items-center min-vh-100 bg-dark", children: _jsx(LoadingSpinner, { size: 48, color: "#1db954" }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(MainLayout, { children: _jsx(AppRoutes, {}) }), _jsx(ToastContainer, {})] }));
};
const App = () => (_jsx(Router, { children: _jsx(AppProvider, { children: _jsx(AppContent, {}) }) }));
export default App;
