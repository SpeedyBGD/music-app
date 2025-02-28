import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthButtons from "./AuthButtons";

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
                to="/favorites"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Omiljene pesme
              </Link>
              <Link
                to="/add-song"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Dodaj pesmu
              </Link>
              <hr className="border-secondary" />
              <Link
                to="/logout"
                className="text-danger text-decoration-none"
                onClick={onHide}
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
