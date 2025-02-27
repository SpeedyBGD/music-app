import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { mockAllSongs } from "@/data/mockAllSongs";
import GenreFilter from "@/components/filters/GenreFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import SongGrid from "@/components/songs/SongGrid";
import { useFilters } from "@/context/FiltersContext";
import PlayerOverlay from "@/components/songs/PlayerOverlay";
import { Song } from "@/types/music";
import usePlaylist from "@/hooks/usePlaylist";

const HomePage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const [currentSongs, setCurrentSongs] = useState(mockAllSongs);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const { currentSong, playSong, playNextSong } = usePlaylist(currentSongs);

  useEffect(() => {
    const filteredSongs = mockAllSongs.filter((song) => {
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

    setCurrentSongs(sortedSongs);
  }, [selectedGenre, sortBy]);

  const handlePlaySong = (song: Song) => {
    playSong(song.id);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
  };

  return (
    <div className="container mt-4">
      <Row className="g-3 mb-4">
        <Col xs={12} md={8}>
          <GenreFilter />
        </Col>
        <Col xs={12} md={4} className="mt-3 mt-md-0">
          <SortDropdown />
        </Col>
      </Row>

      <SongGrid songs={currentSongs} onPlay={handlePlaySong} />

      {currentSongs.length === 0 && (
        <div className="text-center text-muted py-5">
          <h4>Nema pronađenih pesama</h4>
          <p>Pokušajte da promenite filtere</p>
        </div>
      )}

      <PlayerOverlay
        song={currentSong}
        isOpen={isPlayerOpen}
        onClose={handleClosePlayer}
        onNextSong={playNextSong}
      />
    </div>
  );
};

export default HomePage;
