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

      <div className="song-grid row g-4 mt-5">
        {filteredSongs.map((song) => (
          <div key={song.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="song-card bg-secondary rounded-3 p-3">
              <img
                src={song.imageUrl}
                alt={song.title}
                className="w-100 rounded-3 mb-3"
                style={{ aspectRatio: "1" }}
              />
              <div>
                <h3 className="h5 mb-1 fw-semibold">{song.title}</h3>
                <p className="text-muted mb-2 small">{song.artist}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-success">{song.genre}</span>
                  <div className="d-flex align-items-center gap-1 text-muted">
                    <HeartIcon size={18} color="currentColor" />
                    <span className="small">{song.likes}</span>
                  </div>
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
