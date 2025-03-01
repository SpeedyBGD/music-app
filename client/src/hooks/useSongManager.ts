import { useState, useEffect } from "react";
import { Song } from "@/types/music";
import usePlaylist from "@/hooks/usePlaylist";
import { fetchAllSongs, fetchLikedSongs } from "@/services/musicService";

interface UseSongManagerProps {
  initialSongs: Song[];
  selectedGenre: number | "Sve";
  sortBy: "newest" | "popularity";
  isLikedSongs?: boolean;
}

export const useSongManager = ({
  initialSongs,
  selectedGenre,
  sortBy,
  isLikedSongs = false,
}: UseSongManagerProps) => {
  const [currentSongs, setCurrentSongs] = useState(initialSongs);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const { currentSong, playSong, playNextSong } = usePlaylist(currentSongs);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const songs = isLikedSongs
          ? await fetchLikedSongs(
              sortBy,
              selectedGenre === "Sve" ? undefined : selectedGenre,
            )
          : await fetchAllSongs(
              sortBy,
              selectedGenre === "Sve" ? undefined : selectedGenre,
            );
        setCurrentSongs(songs);
      } catch (error) {
        console.error("Error fetching songs:", error);
      }
    };

    fetchSongs();
  }, [selectedGenre, sortBy, isLikedSongs]);

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
