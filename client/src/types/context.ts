// File: types/context.ts
import { Song, Category } from "@/types/music";

export interface AppContextType {
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
  handleLogout: () => void;
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
  refreshSongs: () => Promise<void>;
  showLoginModal: boolean;
  setShowLoginModal: (show: boolean) => void;
  isLoading: boolean;
}
