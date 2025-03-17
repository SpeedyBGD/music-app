import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
const RegisterForm = ({ onClose }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { register } = useAppContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(email, password, confirmPassword);
        if (result.success) {
            toast.success("Uspešno ste se registrovali!");
            onClose();
        }
        else {
            toast.error(result.message);
        }
    };
    return (_jsxs(Form, { onSubmit: handleSubmit, children: [_jsxs(Form.Group, { className: "mb-3", controlId: "formBasicEmail", children: [_jsx(Form.Label, { children: "Email adresa" }), _jsx(Form.Control, { type: "email", placeholder: "Unesite email", value: email, onChange: (e) => setEmail(e.target.value), className: "rounded-pill" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "formBasicPassword", children: [_jsx(Form.Label, { children: "Lozinka" }), _jsx(Form.Control, { type: "password", placeholder: "Unesite lozinku", value: password, onChange: (e) => setPassword(e.target.value), className: "rounded-pill" })] }), _jsxs(Form.Group, { className: "mb-3", controlId: "formBasicConfirmPassword", children: [_jsx(Form.Label, { children: "Potvrdite lozinku" }), _jsx(Form.Control, { type: "password", placeholder: "Potvrdite lozinku", value: confirmPassword, onChange: (e) => setConfirmPassword(e.target.value), className: "rounded-pill" })] }), _jsx(Button, { variant: "primary", type: "submit", className: "w-100 rounded-pill mt-3", children: "Registruj se" })] }));
};
export default RegisterForm;
