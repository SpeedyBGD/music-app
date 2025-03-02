import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => (
  <div className="bg-dark min-vh-100 text-white d-flex flex-column">
    <Navbar />
    <main className="flex-grow-1">
      <Container className="py-4">{children}</Container>
    </main>
    <Footer />
  </div>
);

export default MainLayout;
