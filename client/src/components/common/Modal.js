import { jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from "react";
const Modal = ({ isOpen, onClose, children, className = "", }) => {
    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.key === "Escape")
                onClose();
        };
        if (isOpen) {
            document.body.style.overflow = "hidden";
            document.addEventListener("keydown", handleKeyPress);
        }
        return () => {
            document.body.style.overflow = "unset";
            document.removeEventListener("keydown", handleKeyPress);
        };
    }, [isOpen, onClose]);
    if (!isOpen)
        return null;
    return (_jsx("div", { className: "fixed-top vw-100 vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75 z-10", onClick: (e) => e.target === e.currentTarget && onClose(), children: _jsx("div", { className: `container px-3 ${className}`, children: children }) }));
};
export default Modal;
