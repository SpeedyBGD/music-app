import React from "react";
import { mockLikedSongs } from "@/data/mockLikedSongs";
import { useFilters } from "@/context/FiltersContext";
import SongCollection from "@/components/songs/SongCollection";
import { useSongManager } from "@/hooks/useSongManager";

const LikedSongsPage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const {
    currentSongs,
    isPlayerOpen,
    currentSong,
    handlePlaySong,
    handleClosePlayer,
    playNextSong,
  } = useSongManager({
    initialSongs: mockLikedSongs,
    selectedGenre,
    sortBy,
  });

  return (
    <SongCollection
      title="Moje Omiljene Pesme"
      songs={currentSongs}
      isPlayerOpen={isPlayerOpen}
      currentSong={currentSong}
      onPlaySong={handlePlaySong}
      onClosePlayer={handleClosePlayer}
      onNextSong={playNextSong}
      titleClassName="text-secondary"
    />
  );
};

export default LikedSongsPage;
