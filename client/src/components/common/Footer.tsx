import React from "react";
import { Container } from "react-bootstrap";

const Footer: React.FC = () => (
  <footer className="bg-dark text-white text-center py-3 border-top border-secondary">
    <Container>
      <small>
        © {new Date().getFullYear()} Pesme za Dušu. Sva prava zadržana.
      </small>
    </Container>
  </footer>
);

export default Footer;
