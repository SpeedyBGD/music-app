import React, { useCallback, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import { fetchLikedSongs } from "@/services/musicService";

const LikedSongsPage: React.FC = () => {
  const { selectedGenre, sortBy, setSongs } = useAppContext();

  const fetchSongs = useCallback(async () => {
    const songs = await fetchLikedSongs(
      sortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    );
    setSongs(songs);
  }, [selectedGenre, sortBy, setSongs]);

  return (
    <SongCollection
      title="Moje Omiljene Pesme"
      titleClassName="text-secondary"
      fetchSongs={fetchSongs}
    />
  );
};

export default LikedSongsPage;
