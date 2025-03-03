import axiosInstance from "./axiosInterceptor";
import { API_BASE_URL } from "@/utils/constants";

export const fetchAllSongs = (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
) => {
  const token = localStorage.getItem("token");
  return axiosInstance
    .get(`${API_BASE_URL}/music`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((res) => res.data);
};

export const fetchLikedSongs = (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
) => {
  const token = localStorage.getItem("token");
  return axiosInstance
    .get(`${API_BASE_URL}/music/liked`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => res.data);
};

export const likeSong = (songId: string, token: string) =>
  axiosInstance.post(
    `${API_BASE_URL}/music/like`,
    { songId },
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const unlikeSong = (songId: string, token: string) =>
  axiosInstance.post(
    `${API_BASE_URL}/music/unlike`,
    { songId },
    { headers: { Authorization: `Bearer ${token}` } },
  );

export const searchSongs = (query: string) => {
  const token = localStorage.getItem("token");
  return axiosInstance
    .get(`${API_BASE_URL}/music/search`, {
      params: { query },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    .then((res) => res.data);
};

export const addSong = (
  song: {
    naziv: string;
    umetnik: string;
    youtubeId: string;
    kategorijaId: number;
  },
  token: string,
) =>
  axiosInstance.post(`${API_BASE_URL}/music/add`, song, {
    headers: { Authorization: `Bearer ${token}` },
  });
