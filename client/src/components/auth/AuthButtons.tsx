import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

interface AuthButtonsProps {
  showLogin?: boolean;
  setShowLogin?: (value: boolean) => void;
  showRegister?: boolean;
  setShowRegister?: (value: boolean) => void;
}

const AuthButtons: React.FC<AuthButtonsProps> = ({
  showLogin: controlledShowLogin,
  setShowLogin: controlledSetShowLogin,
  showRegister: controlledShowRegister,
  setShowRegister: controlledSetShowRegister,
}) => {
  const [localShowLogin, setLocalShowLogin] = useState(false);
  const [localShowRegister, setLocalShowRegister] = useState(false);

  const showLogin = controlledShowLogin ?? localShowLogin;
  const setShowLogin = controlledSetShowLogin ?? setLocalShowLogin;
  const showRegister = controlledShowRegister ?? localShowRegister;
  const setShowRegister = controlledSetShowRegister ?? setLocalShowRegister;

  return (
    <>
      <Button
        variant="outline-light"
        className="rounded-pill px-4 py-2"
        onClick={() => setShowLogin(true)}
      >
        Prijavi se
      </Button>
      <Button
        variant="light"
        className="rounded-pill px-4 py-2 ms-2"
        onClick={() => setShowRegister(true)}
      >
        Registruj se
      </Button>
      <Modal show={showLogin} onHide={() => setShowLogin(false)} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm onClose={() => setShowLogin(false)} />
        </Modal.Body>
      </Modal>
      <Modal show={showRegister} onHide={() => setShowRegister(false)} centered>
        <Modal.Header closeButton closeVariant="white">
          <Modal.Title>Registracija</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RegisterForm onClose={() => setShowRegister(false)} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthButtons;
