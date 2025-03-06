import React from "react";
import { Button } from "react-bootstrap";
import { useAppContext } from "@/context/AppContext";

const GenreFilter: React.FC = () => {
  const { selectedGenre, setSelectedGenre, categories } = useAppContext();

  const handleGenreChange = (genre: number | "Sve") => {
    setSelectedGenre(genre);
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
