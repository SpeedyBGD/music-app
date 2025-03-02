import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import LogoIcon from "@/components/icons/LogoIcon";
import MenuIcon from "@/components/icons/MenuIcon";
import SearchBar from "./SearchBar";
import AuthButtons from "./AuthButtons";
import UserMenu from "./UserMenu";
import MobileMenu from "./MobileMenu";

const Navbar: React.FC = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="fixed-top bg-dark border-bottom border-secondary">
      <Container className="px-3">
        <div className="d-flex justify-content-between align-items-center py-3">
          <Link
            to="/"
            className="d-flex align-items-center gap-3 text-decoration-none"
          >
            <LogoIcon />
            <h1 className="m-0 text-white fs-4 d-none d-sm-block">
              Pesme za Dušu
            </h1>
          </Link>
          <SearchBar />
          <div className="d-none d-md-flex gap-2">
            {isAuthenticated ? <UserMenu /> : <AuthButtons />}
          </div>
          <button
            className="d-md-none text-white p-0 bg-transparent border-0"
            onClick={() => setShowMobileMenu(true)}
          >
            <MenuIcon size={24} />
          </button>
        </div>
      </Container>
      <MobileMenu
        show={showMobileMenu}
        onHide={() => setShowMobileMenu(false)}
        isLoggedIn={isAuthenticated}
      />
    </header>
  );
};

export default Navbar;
