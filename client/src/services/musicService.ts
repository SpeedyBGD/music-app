import axiosInstance from "./axiosInterceptor";
import { API_BASE_URL } from "@/utils/constants";

export const fetchAllSongs = (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
) =>
  axiosInstance
    .get(`${API_BASE_URL}/music`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
      withCredentials: true,
    })
    .then((res) => res.data);

export const fetchLikedSongs = (
  sortBy: "newest" | "popularity" = "newest",
  categoryId?: number,
) =>
  axiosInstance
    .get(`${API_BASE_URL}/music/liked`, {
      params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
      },
      withCredentials: true,
    })
    .then((res) => res.data);

export const likeSong = (songId: string) =>
  axiosInstance.post(
    `${API_BASE_URL}/music/like`,
    { songId },
    { withCredentials: true },
  );

export const unlikeSong = (songId: string) =>
  axiosInstance.post(
    `${API_BASE_URL}/music/unlike`,
    { songId },
    { withCredentials: true },
  );

export const searchSongs = (query: string) =>
  axiosInstance
    .get(`${API_BASE_URL}/music/search`, {
      params: { query },
      withCredentials: true,
    })
    .then((res) => res.data);

export const addSong = (song: {
  naziv: string;
  umetnik: string;
  youtubeId: string;
  kategorijaId: number;
}) =>
  axiosInstance.post(`${API_BASE_URL}/music/add`, song, {
    withCredentials: true,
  });
