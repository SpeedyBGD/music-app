import axios from "axios";
import { Song } from "@/types/music";
import { API_BASE_URL } from "@/utils/constants";

export const fetchAllSongs = async (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
): Promise<Song[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching all songs:", error);
    throw error;
  }
};

export const fetchLikedSongs = async (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
): Promise<Song[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${API_BASE_URL}/music/liked`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching liked songs:", error);
    throw error;
  }
};

export const likeSong = async (
  songId: string,
  token: string,
): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/music/like`,
      { songId: songId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Error liking song:", error);
    throw error;
  }
};

export const unlikeSong = async (
  songId: string,
  token: string,
): Promise<void> => {
  try {
    await axios.post(
      `${API_BASE_URL}/music/unlike`,
      { song_id: songId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch (error) {
    console.error("Error unliking song:", error);
    throw error;
  }
};

export const fetchSongById = async (songId: string): Promise<Song> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/${songId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching song by ID:", error);
    throw error;
  }
};

export const fetchSongsByCategory = async (
  categoryId: number,
): Promise<Song[]> => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/music/category/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching songs by category:", error);
    throw error;
  }
};

export const fetchPopularSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/popular`);
    return response.data;
  } catch (error) {
    console.error("Error fetching popular songs:", error);
    throw error;
  }
};

export const fetchNewestSongs = async (): Promise<Song[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/music/newest`);
    return response.data;
  } catch (error) {
    console.error("Error fetching newest songs:", error);
    throw error;
  }
};
