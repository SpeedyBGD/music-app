import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LikedSongsPage from "@/pages/LikedSongsPage";
import NotFoundPage from "@/pages/NotFoundPage";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
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
};

export default AppRoutes;
