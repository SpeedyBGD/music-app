import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface MobileMenuProps {
  show: boolean;
  onHide: () => void;
  isLoggedIn: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  show,
  onHide,
  isLoggedIn,
}) => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Uspešno ste se odjavili!");
      onHide();
    } catch (error: any) {
      toast.error(error.message || "Došlo je do greške pri odjavi.");
    }
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>Pesme za Dušu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-column gap-3">
          {isLoggedIn ? (
            <>
              <Link
                to="/moje-lajkovane-pesme"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Omiljene pesme
              </Link>
              <Link
                to="#"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Dodaj pesmu
              </Link>
              <hr className="border-secondary" />
              <Link
                to="#"
                className="text-danger text-decoration-none"
                onClick={handleLogout}
              >
                Odjavi se
              </Link>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileMenu;
