import { useState } from "react";
import { Song } from "@/types/music";

const usePlaylist = (songs: Song[]) => {
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(null);

  const playSong = (songId: string) => {
    const index = songs.findIndex((song) => song.id === songId);
    if (index !== -1) {
      setCurrentSongIndex(index);
    }
  };

  const playNextSong = () => {
    if (currentSongIndex !== null && currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(null);
    }
  };

  const currentSong =
    currentSongIndex !== null ? songs[currentSongIndex] : null;

  return {
    currentSong,
    playSong,
    playNextSong,
  };
};

export default usePlaylist;
