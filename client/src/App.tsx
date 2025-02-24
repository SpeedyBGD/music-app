import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import HomePage from "@/pages/HomePage";
import YouTubePlayer from "./components/player/YouTubePlayer";

const App: React.FC = () => {
  return (
    <Router>
      <div className="bg-dark min-vh-100 text-white d-flex flex-column">
        <Navbar />
        <main className="flex-grow-1">
          <Container className="py-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <YouTubePlayer />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
