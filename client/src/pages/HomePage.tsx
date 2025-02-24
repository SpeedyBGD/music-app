import React, { useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { Genre } from "@/types/music";
import { mockSongs } from "@/data/mockData";
import HeartIcon from "@/components/icons/HeartIcon";

const HomePage: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<Genre>("Sve");

  const filteredSongs = mockSongs.filter((song) => {
    return selectedGenre === "Sve" || song.genre === selectedGenre;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-center mb-4">
        <ButtonGroup className="flex-wrap gap-2">
          {["Sve", "Elektronika", "Hip Hop", "Pop", "World", "Rok", "Džez"].map(
            (genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "success" : "dark"}
                className="rounded-pill px-4 py-2"
                onClick={() => setSelectedGenre(genre as Genre)}
              >
                {genre}
              </Button>
            ),
          )}
        </ButtonGroup>
      </div>

      <div className="song-grid">
        {filteredSongs.map((song) => (
          <div key={song.id} className="song-card">
            <img src={song.imageUrl} alt={song.title} className="song-image" />
            <div className="song-info">
              <h3 className="mb-1 fw-semibold">{song.title}</h3>
              <p className="text-muted mb-2 fs-6">{song.artist}</p>
              <div className="d-flex justify-content-between align-items-center">
                <span className="badge bg-success fs-7">{song.genre}</span>
                <div className="d-flex align-items-center gap-1 text-muted">
                  <HeartIcon size={18} color="currentColor" />
                  <span className="fs-6">{song.likes}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredSongs.length === 0 && (
        <div className="text-center text-muted py-5">
          <h4>Nema pronađenih pesama</h4>
          <p>Pokušajte da promenite filtere</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
