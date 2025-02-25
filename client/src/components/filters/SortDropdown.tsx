import React from "react";
import { Dropdown, Stack } from "react-bootstrap";

interface SortDropdownProps {
  sortBy: "newest" | "popularity";
  onSortChange: (sortBy: "newest" | "popularity") => void;
}

const SortDropdown: React.FC<SortDropdownProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <Stack
      direction="horizontal"
      gap={2}
      className="align-items-center justify-content-md-end"
    >
      <span className="text-white">Sortiraj po:</span>
      <Dropdown>
        <Dropdown.Toggle
          variant="outline-light"
          id="dropdown-basic"
          className="rounded-pill"
        >
          {sortBy === "newest" ? "Najnovije" : "Popularnost"}
        </Dropdown.Toggle>

        <Dropdown.Menu className="bg-dark dropdown-menu-dark">
          <Dropdown.Item
            className="text-white"
            onClick={() => onSortChange("newest")}
          >
            Najnovije
          </Dropdown.Item>
          <Dropdown.Item
            className="text-white"
            onClick={() => onSortChange("popularity")}
          >
            Popularnost
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default SortDropdown;
