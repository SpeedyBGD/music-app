import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/common/Navbar/Navbar";
import Footer from "@/components/common/Footer";
import { useAppContext } from "@/context/AppContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { handleLogout, setShowLoginModal } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthenticated = () => {
      handleLogout();

      if (location.pathname === "/") {
        setShowLoginModal(true);
      } else {
        navigate("/", { replace: true });
        setShowLoginModal(true);
      }
    };

    window.addEventListener("auth:unauthenticated", handleUnauthenticated);

    return () => {
      window.removeEventListener("auth:unauthenticated", handleUnauthenticated);
    };
  }, [location.pathname, navigate, handleLogout, setShowLoginModal]);

  return (
    <div className="bg-dark min-vh-100 text-white d-flex flex-column">
      <Navbar />
      <main className="flex-grow-1">
        <Container className="py-4">{children}</Container>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
