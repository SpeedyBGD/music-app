import React from "react";
import { Dropdown, Stack } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";
import { fetchAllSongs } from "@/services/musicService";

const SortDropdown: React.FC = () => {
  const { sortBy, setSortBy, selectedGenre, setSongs } = useAppContext();

  const handleSortChange = async (newSortBy: "newest" | "popularity") => {
    setSortBy(newSortBy);
    const songs = await fetchAllSongs(
      newSortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    );
    setSongs(songs);
  };

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
            onClick={() => handleSortChange("newest")}
          >
            Najnovije
          </Dropdown.Item>
          <Dropdown.Item
            className="text-white"
            onClick={() => handleSortChange("popularity")}
          >
            Popularnost
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Stack>
  );
};

export default SortDropdown;
