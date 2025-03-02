// src/services/musicService.ts
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
