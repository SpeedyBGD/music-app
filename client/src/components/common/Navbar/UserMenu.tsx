import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

const UserMenu: React.FC = () => {
  const { logout, email } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Uspešno ste se odjavili!");
    } catch (error: any) {
      toast.error(error.message || "Došlo je do greške pri odjavi.");
    }
  };

  return (
    <Dropdown>
      <Dropdown.Toggle
        variant="link"
        className="text-white p-0 d-flex align-items-center gap-2"
      >
        <UserIcon size={24} />
        {email && <span className="small">{email}</span>}
      </Dropdown.Toggle>
      <Dropdown.Menu className="bg-dark dropdown-menu-dark">
        <Dropdown.Item
          as={Link}
          to="/moje-lajkovane-pesme"
          className="text-white"
        >
          Omiljene pesme
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="#" className="text-white">
          Dodaj pesmu
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item
          as={Link}
          to="#"
          className="text-danger"
          onClick={handleLogout}
        >
          Odjavi se
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
