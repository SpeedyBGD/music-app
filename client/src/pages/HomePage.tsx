import React from "react";
import { useFilters } from "@/context/FiltersContext";
import SongCollection from "@/components/songs/SongCollection";
import { useSongManager } from "@/hooks/useSongManager";

const HomePage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const {
    currentSongs,
    isPlayerOpen,
    currentSong,
    handlePlaySong,
    handleClosePlayer,
    playNextSong,
  } = useSongManager({
    initialSongs: [],
    selectedGenre,
    sortBy,
  });

  return (
    <SongCollection
      songs={currentSongs}
      isPlayerOpen={isPlayerOpen}
      currentSong={currentSong}
      onPlaySong={handlePlaySong}
      onClosePlayer={handleClosePlayer}
      onNextSong={playNextSong}
    />
  );
};

export default HomePage;
