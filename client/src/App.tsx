import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HomePage from "@/pages/HomePage";
import "bootstrap/dist/css/bootstrap.min.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-dark min-vh-100 text-white d-flex flex-column">
        <Navbar />
        <Container className="flex-grow-1 py-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
