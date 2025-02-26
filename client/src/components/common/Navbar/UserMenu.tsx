import React from "react";
import { Dropdown } from "react-bootstrap";
import UserIcon from "@/components/icons/UserIcon";

const UserMenu: React.FC = () => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="link" className="text-white p-0">
        <UserIcon size={24} />
      </Dropdown.Toggle>

      <Dropdown.Menu className="bg-dark dropdown-menu-dark">
        <Dropdown.Item href="#/favorites" className="text-white">
          Omiljene pesme
        </Dropdown.Item>
        <Dropdown.Item href="#/add-song" className="text-white">
          Dodaj pesmu
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item href="#/logout" className="text-danger">
          Odjavi se
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UserMenu;
