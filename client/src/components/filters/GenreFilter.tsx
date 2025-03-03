import React from "react";
import { Button } from "react-bootstrap";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { fetchAllSongs } from "@/services/musicService";

const GenreFilter: React.FC = () => {
  const { selectedGenre, setSelectedGenre, categories, loading, sortBy } =
    useFilters();
  const { setSongs } = usePlayer();

  if (loading) return null;

  const handleGenreChange = async (genre: number | "Sve") => {
    setSelectedGenre(genre);
    const songs = await fetchAllSongs(
      sortBy,
      genre === "Sve" ? undefined : genre,
    );
    setSongs(songs);
  };

  return (
    <div className="d-flex flex-wrap gap-2">
      <Button
        variant={selectedGenre === "Sve" ? "success" : "dark"}
        className="rounded-pill px-3 py-2"
        onClick={() => handleGenreChange("Sve")}
      >
        Sve
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedGenre === category.id ? "success" : "dark"}
          className="rounded-pill px-3 py-2"
          onClick={() => handleGenreChange(category.id)}
        >
          {category.naziv}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;
