import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchCategories } from "@/services/categoryService";
import { fetchAllSongs, likeSong, unlikeSong } from "@/services/musicService";
import {
  checkAuth,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "@/services/authService";
import { Song, Category } from "@/types/music";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

interface AppContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  categories: Category[];
  selectedGenre: number | "Sve";
  setSelectedGenre: (genre: number | "Sve") => void;
  sortBy: "newest" | "popularity";
  setSortBy: (sortBy: "newest" | "popularity") => void;
  songs: Song[];
  setSongs: (songs: Song[]) => void;
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  playNext: () => void;
  setIsPlaying: (isPlaying: boolean) => void;
  toggleLike: (songId: string) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<number | "Sve">("Sve");
  const [sortBy, setSortBy] = useState<"newest" | "popularity">("newest");
  const [songs, setSongs] = useState<Song[]>([]);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [authChanged, setAuthChanged] = useState(0);

  const resetFilters = () => {
    setSelectedGenre("Sve");
    setSortBy("newest");
    setCurrentSong(null);
    setCurrentIndex(null);
    setIsPlaying(false);
  };

  useEffect(() => {
    checkAuth()
      .then((response) => {
        setIsAuthenticated(true);
        setEmail(response.email);
      })
      .catch(() => {
        setIsAuthenticated(false);
        setEmail(null);
      });

    fetchCategories()
      .then((categoriesData) => setCategories(categoriesData))
      .catch(() => {});
  }, [authChanged]);

  useEffect(() => {
    fetchAllSongs(sortBy, selectedGenre === "Sve" ? undefined : selectedGenre)
      .then((songsData) => {
        setSongs(songsData);

        if (
          currentSong &&
          !songsData.some((s: Song) => s.id === currentSong.id)
        ) {
          setCurrentSong(null);
          setCurrentIndex(null);
          setIsPlaying(false);
        } else if (currentSong) {
          const updatedCurrentSong = songsData.find(
            (s: Song) => s.id === currentSong.id,
          );
          if (updatedCurrentSong) {
            setCurrentSong(updatedCurrentSong);
          }
        }
      })
      .catch(() => {});
  }, [selectedGenre, sortBy, authChanged, currentSong]);

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);
      setIsAuthenticated(true);
      setEmail(email);
      resetFilters();
      setAuthChanged((prev) => prev + 1);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Došlo je do greške pri prijavi.";
      return { success: false, message };
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      await authRegister(email, password, confirmPassword);
      setIsAuthenticated(true);
      setEmail(email);
      resetFilters();
      setAuthChanged((prev) => prev + 1);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Došlo je do greške pri registraciji.";
      return { success: false, message };
    }
  };

  const logout = async () => {
    await authLogout().then(() => {
      setIsAuthenticated(false);
      setEmail(null);
      resetFilters();
      setAuthChanged((prev) => prev + 1);
    });
  };

  const playSong = (song: Song) => {
    const index = songs.findIndex((s: Song) => s.id === song.id);
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
    if (!isAuthenticated) {
      toast.error("Morate biti prijavljeni da biste lajkovali pesmu");
      return;
    }

    const songIndex = songs.findIndex((s: Song) => s.id === songId);
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
    <AppContext.Provider
      value={{
        isAuthenticated,
        email,
        login,
        register,
        logout,
        categories,
        selectedGenre,
        setSelectedGenre,
        sortBy,
        setSortBy,
        songs,
        setSongs,
        currentSong,
        isPlaying,
        playSong,
        playNext,
        setIsPlaying,
        toggleLike,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext must be used within an AppProvider");
  return context;
};
