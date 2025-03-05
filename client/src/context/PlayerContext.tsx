import React, { createContext, useContext, useState, useEffect } from "react";
import { Song } from "@/types/music";
import { likeSong, unlikeSong, fetchAllSongs } from "@/services/musicService";
import { useAuth } from "@/context/AuthContext";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

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
  const { onAuthChange } = useAuth();

  useEffect(() => {
    const refreshSongs = async () => {
      const updatedSongs = await fetchAllSongs("newest");
      setSongs(updatedSongs);
    };

    refreshSongs();

    onAuthChange(() => {
      refreshSongs();
    });
  }, [onAuthChange]);

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
    const songIndex = songs.findIndex((s) => s.id === songId);
    if (songIndex === -1) return;

    const isLiked = songs[songIndex].lajkovaoKorisnik === 1;
    const updatedSongs = [...songs];

    try {
      if (isLiked) {
        await unlikeSong(songId);
        updatedSongs[songIndex] = {
          ...updatedSongs[songIndex],
          lajkovaoKorisnik: 0,
          brojLajkova: updatedSongs[songIndex].brojLajkova - 1,
        };
        toast.success("Uklonili ste lajk sa pesme");
      } else {
        await likeSong(songId);
        updatedSongs[songIndex] = {
          ...updatedSongs[songIndex],
          lajkovaoKorisnik: 1,
          brojLajkova: updatedSongs[songIndex].brojLajkova + 1,
        };
        toast.success("Lajkovali ste pesmu");
      }

      setSongs(updatedSongs);
      if (currentSong?.id === songId) setCurrentSong(updatedSongs[songIndex]);
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Došlo je do greške prilikom lajkovanja pesme.";
      toast.error(message);
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
