import React from "react";
import { Button } from "react-bootstrap";
import { Genre } from "@/types/music";

interface GenreFilterProps {
  selectedGenre: Genre;
  onGenreChange: (genre: Genre) => void;
}

const GenreFilter: React.FC<GenreFilterProps> = ({
  selectedGenre,
  onGenreChange,
}) => {
  const genres: Genre[] = [
    "Sve",
    "Elektronika",
    "Hip Hop",
    "Pop",
    "World",
    "Rok",
    "Džez",
  ];

  return (
    <div className="d-flex flex-wrap gap-2">
      {genres.map((genre) => (
        <Button
          key={genre}
          variant={selectedGenre === genre ? "success" : "dark"}
          className="rounded-pill px-3 py-2"
          onClick={() => onGenreChange(genre)}
        >
          {genre}
        </Button>
      ))}
    </div>
  );
};

export default GenreFilter;
