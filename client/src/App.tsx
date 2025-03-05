import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routes/AppRoutes";

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <ToastContainer />
    </AppProvider>
  </Router>
);

export default App;
