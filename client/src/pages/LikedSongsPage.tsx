// src/pages/LikedSongsPage.tsx
import React, { useEffect } from "react";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";
import SongCollection from "@/components/songs/SongCollection";
import { fetchLikedSongs } from "@/services/musicService";

const LikedSongsPage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const { setSongs } = usePlayer();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchLikedSongs(
      sortBy,
      selectedGenre === "Sve" ? undefined : selectedGenre,
    ).then((songs) => {
      setSongs(songs);
    });
  }, [selectedGenre, sortBy, setSongs, isAuthenticated]);

  return (
    <SongCollection
      title="Moje Omiljene Pesme"
      titleClassName="text-secondary"
    />
  );
};

export default LikedSongsPage;
