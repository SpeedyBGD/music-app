import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Genre } from "@/types/music";
import { mockSongs } from "@/data/mockData";
import GenreFilter from "@/components/filters/GenreFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import SongGrid from "@/components/songs/SongGrid";

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Sve");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");

  const filteredSongs = mockSongs.filter((song) => {
    return selectedGenre === "Sve" || song.genre === selectedGenre;
  });

  const sortedSongs = [...filteredSongs].sort((a, b) => {
    if (sortBy === "newest") {
      return b.id.localeCompare(a.id);
    } else if (sortBy === "popularity") {
      return b.likes - a.likes;
    }
    return 0;
  });

  return (
    <div className="container mt-4">
      <Row className="g-3 mb-4">
        <Col xs={12} md={8}>
          <GenreFilter
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </Col>
        <Col xs={12} md={4} className="mt-3 mt-md-0">
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </Col>
      </Row>

      <SongGrid songs={sortedSongs} />

      {sortedSongs.length === 0 && (
        <div className="text-center text-muted py-5">
          <h4>Nema pronađenih pesama</h4>
          <p>Pokušajte da promenite filtere</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
