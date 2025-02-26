import React from "react";
import { Offcanvas } from "react-bootstrap";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";

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
              <a href="#/favorites" className="text-white text-decoration-none">
                Omiljene pesme
              </a>
              <a href="#/add-song" className="text-white text-decoration-none">
                Dodaj pesmu
              </a>
              <hr className="border-secondary" />
              <a href="#/logout" className="text-danger text-decoration-none">
                Odjavi se
              </a>
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
