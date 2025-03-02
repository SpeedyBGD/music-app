import React, { createContext, useContext, useState } from "react";
import { Song } from "@/types/music";
import {
  likeSong,
  unlikeSong,
  fetchAllSongs,
  fetchLikedSongs,
} from "@/services/musicService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";

interface PlayerContextType {
  currentSong: Song | null;
  isPlaying: boolean;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  playSong: (song: Song) => void;
  playNext: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleLike: (songId: string) => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const { token, isAuthenticated } = useAuth();

  const playSong = (song: Song) => {
    const index = songs.findIndex((s) => s.id === song.id);
    setCurrentSong(song);
    setCurrentIndex(index !== -1 ? index : null);
    setIsPlaying(true);
  };

  const playNext = () => {
    if (currentIndex !== null && currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentSong(null);
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  };

  const toggleLike = async (songId: string) => {
    if (!isAuthenticated || !token) return;

    const song = songs.find((s) => s.id === songId);
    if (!song) return;

    const isLiked = song.lajkovaoKorisnik === 1;

    try {
      if (isLiked) {
        await unlikeSong(songId, token);
        toast.success("Uklonili ste lajk sa pesme");
      } else {
        await likeSong(songId, token);
        toast.success("Lajkovali ste pesmu");
      }

      const [allSongs, likedSongs] = await Promise.all([
        fetchAllSongs("newest"),
        fetchLikedSongs("newest"),
      ]);

      const isLikedSongsPage =
        window.location.pathname === "/moje-lajkovane-pesme";
      setSongs((isLikedSongsPage ? likedSongs : allSongs) as Song[]);

      if (currentSong?.id === songId) {
        const updatedSong = allSongs.find((s: Song) => s.id === songId);
        if (updatedSong) setCurrentSong(updatedSong);
      }
    } catch (error) {
      toast.error("Došlo je do greške prilikom lajkovanja pesme.");
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        currentSong,
        isPlaying,
        songs,
        setSongs,
        playSong,
        playNext,
        setIsPlaying,
        toggleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (!context)
    throw new Error("usePlayer must be used within a PlayerProvider");
  return context;
};
