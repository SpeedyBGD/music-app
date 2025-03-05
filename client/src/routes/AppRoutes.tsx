import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LikedSongsPage from "@/pages/LikedSongsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useAppContext } from "@/context/AppContext";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated } = useAppContext();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
};

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route
      path="/moje-lajkovane-pesme"
      element={
        <ProtectedRoute>
          <LikedSongsPage />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
