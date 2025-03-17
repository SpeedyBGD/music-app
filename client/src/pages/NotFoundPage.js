import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
const NotFoundPage = () => (_jsx(Container, { children: _jsx(Row, { className: "justify-content-center text-center py-5", children: _jsxs(Col, { md: 6, children: [_jsx("h1", { className: "display-1 fw-bold", children: "404" }), _jsx("h2", { className: "mb-4", children: "Stranica nije prona\u0111ena" }), _jsx("p", { className: "text-muted mb-4", children: "Stranica koju tra\u017Eite ne postoji ili je preme\u0161tena." }), _jsx(Link, { to: "/", className: "btn btn-primary rounded-pill px-4", children: "Nazad na po\u010Detnu" })] }) }) }));
export default NotFoundPage;
