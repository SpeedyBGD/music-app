import React from "react";
import { Dropdown, Stack } from "react-bootstrap";
import { useFilters } from "@/context/FiltersContext";

const SortDropdown: React.FC = () => {
  const { sortBy, setSortBy } = useFilters();

  return (
    <Stack
      direction="horizontal"
      gap={3}
      className="align-items-center justify-content-md-end"
    >
      <span className="text-white">Sortiraj po:</span>
      <Dropdown>
        <Dropdown.Toggle variant="outline-light" className="rounded-pill">
          {sortBy === "newest" ? "Najnovije" : "Popularnost"}
        </Dropdown.Toggle>
        <Dropdown.Menu className="bg-dark dropdown-menu-dark">
          <Dropdown.Item
            className="text-white"
            onClick={() => setSortBy("newest")}
          >
            Najnovije
          </Dropdown.Item>
          <Dropdown.Item
            className="text-white"
            onClick={() => setSortBy("popularity")}
          >
            Popularnost
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default SortDropdown;
