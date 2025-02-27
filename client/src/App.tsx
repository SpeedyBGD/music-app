import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayout from "@/layout/MainLayout";
import HomePage from "@/pages/HomePage";
import { FiltersProvider } from "@/context/FiltersContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <Router>
      <FiltersProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </MainLayout>
      </FiltersProvider>
      <ToastContainer />
    </Router>
  );
};

export default App;
