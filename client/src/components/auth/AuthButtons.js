import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
const AuthButtons = ({ showLogin: controlledShowLogin, setShowLogin: controlledSetShowLogin, showRegister: controlledShowRegister, setShowRegister: controlledSetShowRegister, }) => {
    const [localShowLogin, setLocalShowLogin] = useState(false);
    const [localShowRegister, setLocalShowRegister] = useState(false);
    const showLogin = controlledShowLogin ?? localShowLogin;
    const setShowLogin = controlledSetShowLogin ?? setLocalShowLogin;
    const showRegister = controlledShowRegister ?? localShowRegister;
    const setShowRegister = controlledSetShowRegister ?? setLocalShowRegister;
    return (_jsxs(_Fragment, { children: [_jsx(Button, { variant: "outline-light", className: "rounded-pill px-4 py-2", onClick: () => setShowLogin(true), children: "Prijavi se" }), _jsx(Button, { variant: "light", className: "rounded-pill px-4 py-2 ms-2", onClick: () => setShowRegister(true), children: "Registruj se" }), _jsxs(Modal, { show: showLogin, onHide: () => setShowLogin(false), centered: true, children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Login" }) }), _jsx(Modal.Body, { children: _jsx(LoginForm, { onClose: () => setShowLogin(false) }) })] }), _jsxs(Modal, { show: showRegister, onHide: () => setShowRegister(false), centered: true, children: [_jsx(Modal.Header, { closeButton: true, closeVariant: "white", children: _jsx(Modal.Title, { children: "Registracija" }) }), _jsx(Modal.Body, { children: _jsx(RegisterForm, { onClose: () => setShowRegister(false) }) })] })] }));
};
export default AuthButtons;
