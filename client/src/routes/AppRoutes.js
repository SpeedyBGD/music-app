import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LikedSongsPage from "@/pages/LikedSongsPage";
import NotFoundPage from "@/pages/NotFoundPage";
const AppRoutes = () => (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/moje-lajkovane-pesme", element: _jsx(LikedSongsPage, {}) }), _jsx(Route, { path: "*", element: _jsx(NotFoundPage, {}) })] }));
export default AppRoutes;
