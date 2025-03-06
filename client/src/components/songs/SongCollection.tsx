import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import GenreFilter from "@/components/filters/GenreFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import SongGrid from "@/components/songs/SongGrid";
import PlayerOverlay from "@/components/songs/PlayerOverlay";
import { useAppContext } from "@/context/AppContext";

interface SongCollectionProps {
  title?: string;
  titleClassName?: string;
  fetchSongs: () => Promise<void>;
}

const SongCollection: React.FC<SongCollectionProps> = ({
  title,
  titleClassName = "",
  fetchSongs,
}) => {
  const { songs, selectedGenre, sortBy } = useAppContext();
  const [isSongsLoaded, setIsSongsLoaded] = useState(false);

  useEffect(() => {
    setIsSongsLoaded(false);
    fetchSongs().then(() => {
      setIsSongsLoaded(true);
    });
  }, [fetchSongs, selectedGenre, sortBy]);

  if (!isSongsLoaded) return null;

  return (
    <div className="container mt-4">
      {title && (
        <h2 className={`mb-5 ${titleClassName} text-center`}>{title}</h2>
      )}
      <Row className="g-3 mb-4">
        <Col xs={12} md={8}>
          <GenreFilter />
        </Col>
        <Col xs={12} md={4} className="mt-3 mt-md-0">
          <SortDropdown />
        </Col>
      </Row>
      <SongGrid songs={songs} />
      {songs.length === 0 && (
        <div className="text-center text-muted py-5">
          <h4>Nema pronađenih pesama</h4>
          <p>Pokušajte da promenite filtere</p>
        </div>
      )}
      <PlayerOverlay />
    </div>
  );
};

export default SongCollection;
