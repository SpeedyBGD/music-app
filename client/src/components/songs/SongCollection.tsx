import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Song } from "@/types/music";
import GenreFilter from "@/components/filters/GenreFilter";
import SortDropdown from "@/components/filters/SortDropdown";
import SongGrid from "@/components/songs/SongGrid";
import PlayerOverlay from "@/components/songs/PlayerOverlay";

interface SongCollectionProps {
  title?: string;
  songs: Song[];
  isPlayerOpen: boolean;
  currentSong: Song | null;
  onPlaySong: (song: Song) => void;
  onClosePlayer: () => void;
  onNextSong: () => void;
  titleClassName?: string;
}

const SongCollection: React.FC<SongCollectionProps> = ({
  title,
  songs,
  isPlayerOpen,
  currentSong,
  onPlaySong,
  onClosePlayer,
  onNextSong,
  titleClassName = "",
}) => {
  const [currentSongs, setCurrentSongs] = useState<Song[]>(songs);

  // Sync currentSongs with the songs prop
  useEffect(() => {
    setCurrentSongs(songs);
  }, [songs]);

  const handleLikeUpdate = (
    songId: string,
    newLikeCount: number,
    isLiked: boolean,
  ) => {
    setCurrentSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId
          ? {
              ...song,
              brojLajkova: newLikeCount,
              lajkovaoKorisnik: isLiked ? 1 : 0,
            }
          : song,
      ),
    );
  };

  // Find the updated currentSong from currentSongs
  const updatedCurrentSong =
    currentSong && currentSongs.find((song) => song.id === currentSong.id);

  return (
    <div className="container mt-4">
      <h2 className={`mb-5 ${titleClassName} text-center`}>{title}</h2>
      <Row className="g-3 mb-4">
        <Col xs={12} md={8}>
          <GenreFilter />
        </Col>
        <Col xs={12} md={4} className="mt-3 mt-md-0">
          <SortDropdown />
        </Col>
      </Row>

      <SongGrid songs={currentSongs} onPlay={onPlaySong} />

      {currentSongs.length === 0 && (
        <div className="text-center text-muted py-5">
          <h4>Nema pronađenih pesama</h4>
          <p>Pokušajte da promenite filtere</p>
        </div>
      )}

      <PlayerOverlay
        song={updatedCurrentSong || currentSong}
        isOpen={isPlayerOpen}
        onClose={onClosePlayer}
        onNextSong={onNextSong}
        onLikeUpdate={handleLikeUpdate}
      />
    </div>
  );
};

export default SongCollection;
