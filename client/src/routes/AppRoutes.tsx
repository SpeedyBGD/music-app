import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import LikedSongsPage from "@/pages/LikedSongsPage";
import NotFoundPage from "@/pages/NotFoundPage";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/moje-lajkovane-pesme" element={<LikedSongsPage />} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default AppRoutes;
