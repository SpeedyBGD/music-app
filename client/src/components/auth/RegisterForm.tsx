import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useRegister from "@/hooks/useRegister";

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = useRegister();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleRegister(email, password, confirmPassword);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email adresa</Form.Label>
        <Form.Control
          type="email"
          placeholder="Unesite email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lozinka</Form.Label>
        <Form.Control
          type="password"
          placeholder="Unesite lozinku"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
        <Form.Label>Potvrdite lozinku</Form.Label>
        <Form.Control
          type="password"
          placeholder="Potvrdite lozinku"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 rounded-pill mt-3"
      >
        Registruj se
      </Button>
    </Form>
  );
};

export default RegisterForm;
