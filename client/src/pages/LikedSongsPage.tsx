import React, { useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import SongCollection from "@/components/songs/SongCollection";
import { fetchLikedSongs } from "@/services/musicService";

const LikedSongsPage: React.FC = () => {
  const { selectedGenre, sortBy, setSongs } = useAppContext();

  useEffect(() => {
    fetchLikedSongs(
      sortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    ).then((songs) => {
      setSongs(songs);
    });
  }, [selectedGenre, sortBy, setSongs]);

  return (
    <SongCollection
      title="Moje Omiljene Pesme"
      titleClassName="text-secondary"
    />
  );
};

export default LikedSongsPage;
