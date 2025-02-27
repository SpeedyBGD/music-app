import React, { useEffect, useCallback } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
}) => {
  const handleKeyPress = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, handleKeyPress]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed-top vw-100 vh-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-75"
      onClick={handleBackdropClick}
      style={{ zIndex: 1050 }}
    >
      <div className={`container px-3 ${className}`}>{children}</div>
    </div>
  );
};

export default Modal;
