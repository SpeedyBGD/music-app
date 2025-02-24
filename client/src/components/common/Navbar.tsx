import React from "react";
import { Button } from "react-bootstrap";
import LogoIcon from "@/components/icons/LogoIcon";
import SearchIcon from "@/components/icons/SearchIcon";

const Navbar: React.FC = () => {
  return (
    <header className="fixed-top bg-dark border-bottom border-secondary">
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="d-flex align-items-center gap-3">
          <LogoIcon />
          <h1 className="m-0 text-white fs-4">Muzički Vajb</h1>
        </div>

        <div
          className="d-flex align-items-center bg-secondary rounded-pill flex-grow-1 mx-4"
          style={{ maxWidth: "500px" }}
        >
          <input
            type="text"
            placeholder="Pretražite muziku..."
            className="form-control bg-transparent border-0 text-white"
          />
          <Button variant="link" className="text-white">
            <SearchIcon size={20} />
          </Button>
        </div>

        <div className="d-flex gap-2">
          <Button variant="outline-light" className="rounded-pill">
            Prijava
          </Button>
          <Button variant="light" className="rounded-pill">
            Registracija
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
