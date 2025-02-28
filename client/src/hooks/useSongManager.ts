import { useState, useEffect } from "react";
import { Song, Genre } from "@/types/music";
import usePlaylist from "@/hooks/usePlaylist";

interface UseSongManagerProps {
  initialSongs: Song[];
  selectedGenre: Genre;
  sortBy: "newest" | "popularity";
}

export const useSongManager = ({
  initialSongs,
  selectedGenre,
  sortBy,
}: UseSongManagerProps) => {
  const [currentSongs, setCurrentSongs] = useState(initialSongs);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { currentSong, playSong, playNextSong } = usePlaylist(currentSongs);

  useEffect(() => {
    const filteredSongs = initialSongs.filter((song) => {
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
  }, [selectedGenre, sortBy, initialSongs]);

  const handlePlaySong = (song: Song) => {
    playSong(song.id);
    setIsPlayerOpen(true);
  };

  const handleClosePlayer = () => {
    setIsPlayerOpen(false);
  };

  return {
    currentSongs,
    isPlayerOpen,
    currentSong,
    handlePlaySong,
    handleClosePlayer,
    playNextSong,
  };
};
