import React, { useEffect } from "react";
import { useFilters } from "@/context/FiltersContext";
import { usePlayer } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";
import SongCollection from "@/components/songs/SongCollection";
import { fetchAllSongs } from "@/services/musicService";

const HomePage: React.FC = () => {
  const { selectedGenre, sortBy } = useFilters();
  const { setSongs } = usePlayer();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchAllSongs(sortBy, selectedGenre === "Sve" ? undefined : selectedGenre)
      .then(setSongs)
      .catch((error) => console.error("Error fetching songs:", error));
  }, [selectedGenre, sortBy, setSongs, isAuthenticated]);

  return <SongCollection />;
};

export default HomePage;
