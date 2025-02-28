import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import LikedSongsPage from "@/pages/LikedSongsPage";
import { FiltersProvider } from "@/context/FiltersContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <FiltersProvider>
          <MainLayout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/favorites" element={<LikedSongsPage />} />
            </Routes>
          </MainLayout>
        </FiltersProvider>
        <ToastContainer />
      </AuthProvider>
    </Router>
  );
};

export default App;
