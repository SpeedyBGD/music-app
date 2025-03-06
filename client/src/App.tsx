import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { AppProvider, useAppContext } from "@/context/AppContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/layout/MainLayout";
import AppRoutes from "@/routes/AppRoutes";
import LoadingSpinner from "@/components/icons/LoadingSpinner";

const AppContent: React.FC = () => {
  const { isLoading } = useAppContext();

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <LoadingSpinner size={48} color="#1db954" />
      </div>
    );
  }

  return (
    <>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
      <ToastContainer />
    </>
  );
};

const App: React.FC = () => (
  <Router>
    <AppProvider>
      <AppContent />
    </AppProvider>
  </Router>
);

export default App;
