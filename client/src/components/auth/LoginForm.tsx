import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import useLogin from "@/hooks/useLogin";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleLogin(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email adresa</Form.Label>
        <Form.Control
          type="email"
          placeholder="Email adresa"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Lozinka</Form.Label>
        <Form.Control
          type="password"
          placeholder="Lozinka"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-pill"
        />
      </Form.Group>

      <Button
        variant="primary"
        type="submit"
        className="w-100 rounded-pill mt-3"
      >
        Prijavi se
      </Button>
    </Form>
  );
};

export default LoginForm;
