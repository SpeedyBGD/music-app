import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Uspešno ste se prijavili!");
      onClose();
    } catch (error: any) {
      toast.error(error.message || "Došlo je do greške pri prijavi.");
    }
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
