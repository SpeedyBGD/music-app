import React from "react";
import { Button } from "react-bootstrap";
import { useFilters } from "@/context/FiltersContext";

const GenreFilter: React.FC = () => {
  const { selectedGenre, setSelectedGenre, categories, loading } = useFilters();

  if (loading) return null;

  return (
    <div className="d-flex flex-wrap gap-2">
      <Button
        variant={selectedGenre === "Sve" ? "success" : "dark"}
        className="rounded-pill px-3 py-2"
        onClick={() => setSelectedGenre("Sve")}
      >
        Sve
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedGenre === category.id ? "success" : "dark"}
          className="rounded-pill px-3 py-2"
          onClick={() => setSelectedGenre(category.id)}
        >
          {category.naziv}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;
