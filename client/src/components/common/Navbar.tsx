import React from "react";
import {
  Container,
  Navbar as BootstrapNavbar,
  Nav,
  Button,
} from "react-bootstrap";

const Navbar: React.FC = () => {
  return (
    <BootstrapNavbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="border-bottom border-secondary"
    >
      <Container>
        <BootstrapNavbar.Brand href="#home" className="text-success">
          Muzički Vajb
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Button variant="link" className="text-white">
              Prijava
            </Button>
            <Button variant="success" className="rounded-pill">
              Registracija
            </Button>
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
};

export default Navbar;
