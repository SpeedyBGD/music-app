import React from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import AuthButtons from "./AuthButtons";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";
import UserIcon from "@/components/icons/UserIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import { searchSongs } from "@/services/musicService";
import { AxiosError } from "axios";

interface MobileMenuProps {
  show: boolean;
  onHide: () => void;
  isLoggedIn: boolean;
  query: string;
  setQuery: (query: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  show,
  onHide,
  isLoggedIn,
  query,
  setQuery,
}) => {
  const { logout, email, setSelectedGenre, setSortBy, setSongs } =
    useAppContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Uspešno ste se odjavili!");
      onHide();
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Došlo je do greške pri odjavi.";
      toast.error(message);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSelectedGenre("Sve");
    setSortBy("newest");
    const songs = await searchSongs(query);
    setSongs(songs);
    navigate("/");
    onHide();
  };

  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      placement="end"
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>
          <Link to="/" className="text-white text-decoration-none">
            Pesme za Dušu
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex flex-column gap-3">
          <Form
            onSubmit={handleSearch}
            className="d-flex align-items-center gap-2"
          >
            <Form.Control
              type="text"
              placeholder="Pretražite muziku..."
              className="rounded-pill"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="link" className="text-white" type="submit">
              <SearchIcon size={20} />
            </Button>
          </Form>
          {isLoggedIn && email && (
            <div className="text-center mb-3">
              <div className="d-flex justify-content-center align-items-center gap-2">
                <UserIcon size={20} />
                <span className="small">{email}</span>
              </div>
            </div>
          )}
          {isLoggedIn ? (
            <>
              <Link
                to="/moje-lajkovane-pesme"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Omiljene pesme
              </Link>
              <Link
                to="#"
                className="text-white text-decoration-none"
                onClick={onHide}
              >
                Dodaj pesmu
              </Link>
              <hr className="border-secondary" />
              <Link
                to="#"
                className="text-danger text-decoration-none"
                onClick={handleLogout}
              >
                Odjavi se
              </Link>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileMenu;
