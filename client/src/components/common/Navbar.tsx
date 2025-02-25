import React, { useState } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap";
import LogoIcon from "@/components/icons/LogoIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import MenuIcon from "@/components/icons/MenuIcon";

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClose = () => setShowMobileMenu(false);
  const handleShow = () => setShowMobileMenu(true);

  return (
    <header className="fixed-top bg-dark border-bottom border-secondary">
      <Container fluid className="px-3">
        <div className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center gap-3">
            <LogoIcon />
            <h1 className="m-0 text-white fs-4 d-none d-sm-block">
              Muzički Vajb
            </h1>
          </div>

          <div
            className="d-none d-md-flex align-items-center bg-secondary rounded-pill flex-grow-1 mx-4"
            style={{ maxWidth: "500px" }}
          >
            <input
              type="text"
              placeholder="Pretražite muziku..."
              className="form-control bg-transparent border-0 text-white"
            />
            <Button variant="link" className="text-white">
              <SearchIcon size={20} />
            </Button>
          </div>

          <div className="d-none d-md-flex gap-2">
            <Button variant="outline-light" className="rounded-pill">
              Prijava
            </Button>
            <Button variant="light" className="rounded-pill">
              Registracija
            </Button>
          </div>

          <Button
            variant="link"
            className="d-md-none text-white p-0"
            onClick={handleShow}
          >
            <MenuIcon size={24} />
          </Button>
        </div>
      </Container>

      <Offcanvas
        show={showMobileMenu}
        onHide={handleClose}
        placement="end"
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Muzički Vajb</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="mb-4">
            <div className="d-flex align-items-center bg-secondary rounded-pill">
              <input
                type="text"
                placeholder="Pretražite muziku..."
                className="form-control bg-transparent border-0 text-white"
              />
              <Button variant="link" className="text-white">
                <SearchIcon size={20} />
              </Button>
            </div>
          </div>

          <div className="d-flex flex-column gap-3">
            <Button variant="outline-light" className="rounded-pill w-100">
              Prijava
            </Button>
            <Button variant="light" className="rounded-pill w-100">
              Registracija
            </Button>

            <hr className="border-secondary" />
            <Button variant="link" className="text-white text-start px-0">
              Početna
            </Button>
            <Button variant="link" className="text-white text-start px-0">
              Žanrovi
            </Button>
            <Button variant="link" className="text-white text-start px-0">
              Top Liste
            </Button>
            <Button variant="link" className="text-white text-start px-0">
              O Nama
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </header>
  );
};

export default Navbar;
