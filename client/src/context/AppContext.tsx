import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { fetchCategories } from "@/services/categoryService";
import { likeSong, unlikeSong, fetchAllSongs } from "@/services/musicService";
import {
  checkAuth,
  login as authLogin,
  register as authRegister,
  logout as authLogout,
} from "@/services/authService";
import { Song, Category } from "@/types/music";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import { AppContextType } from "@/types/context";

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
  const [showLoginModal, setShowLoginModal] = useState(false);

  const resetFilters = useCallback(() => {
    setSelectedGenre("Sve");
    setSortBy("newest");
    setCurrentSong(null);
    setCurrentIndex(null);
    setIsPlaying(false);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
    setEmail(null);
    resetFilters();
  }, [resetFilters]);

  const refreshSongs = useCallback(async () => {
    try {
      const songs = await fetchAllSongs(
        sortBy,
        selectedGenre === "Sve" ? undefined : selectedGenre,
      );
      setSongs(songs);
    } catch (error) {
      console.error("Failed to refresh songs:", error);
      toast.error("Došlo je do greške pri učitavanju pesama.");
    }
  }, [selectedGenre, sortBy, setSongs]);

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
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await authLogin(email, password);
      setIsAuthenticated(true);
      setEmail(email);
      resetFilters();
      await refreshSongs();
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
      await refreshSongs();
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
    try {
      await authLogout();
      handleLogout();
      await refreshSongs();
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const playSong = useCallback(
    (song: Song) => {
      const index = songs.findIndex((s: Song) => s.id === song.id);
      setCurrentSong(song);
      setCurrentIndex(index !== -1 ? index : null);
      setIsPlaying(true);
    },
    [songs],
  );

  const playNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < songs.length - 1) {
      setCurrentSong(songs[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentSong(null);
      setCurrentIndex(null);
      setIsPlaying(false);
    }
  }, [currentIndex, songs]);

  const toggleLike = async (songId: string) => {
    if (!isAuthenticated) {
      toast.info("Morate biti prijavljeni da biste lajkovali pesmu");
      setShowLoginModal(true);
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
      if ((error as AxiosError).response?.status !== 401) {
        const axiosError = error as AxiosError<{ message: string }>;
        const message =
          axiosError.response?.data?.message ||
          "Došlo je do greške prilikom lajkovanja pesme.";
        toast.error(message);
      }
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
        handleLogout,
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
        refreshSongs,
        showLoginModal,
        setShowLoginModal,
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
