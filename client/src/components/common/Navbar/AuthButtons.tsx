import React from "react";
import { Button } from "react-bootstrap";

const AuthButtons: React.FC = () => {
  return (
    <>
      <Button variant="outline-light" className="rounded-pill px-4 py-2">
        Prijavi se
      </Button>
      <Button variant="light" className="rounded-pill px-4 py-2 ms-2">
        Registruj se
      </Button>
    </>
  );
};

export default AuthButtons;
