import React from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import UserIcon from "@/components/icons/UserIcon";
import useLogout from "@/hooks/useLogout";

const UserMenu: React.FC = () => {
  const handleLogout = useLogout();

  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" className="text-white p-0">
        <UserIcon size={24} />
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
