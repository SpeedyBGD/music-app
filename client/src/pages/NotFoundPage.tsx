import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  return (
    <Container>
      <Row className="justify-content-center text-center py-5">
        <Col md={6}>
          <h1 className="display-1 fw-bold">404</h1>
          <h2 className="mb-4">Stranica nije pronađena</h2>
          <p className="text-muted mb-4">
            Stranica koju tražite ne postoji ili je premeštena.
          </p>
          <Link to="/" className="btn btn-primary rounded-pill px-4">
            Nazad na početnu
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default NotFoundPage;
