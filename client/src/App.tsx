import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { FiltersProvider } from "@/context/FiltersContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routes/AppRoutes";

const App: React.FC = () => (
  <Router>
    <AuthProvider>
      <FiltersProvider>
        <PlayerProvider>
          <MainLayout>
            <AppRoutes />
          </MainLayout>
          <ToastContainer />
        </PlayerProvider>
      </FiltersProvider>
    </AuthProvider>
  </Router>
);

export default App;
