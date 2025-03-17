import axiosInstance from "./axiosInterceptor";
import { API_BASE_URL } from "@/utils/constants";
export const fetchAllSongs = (sortBy = "newest", categoryId) => axiosInstance
    .get(`${API_BASE_URL}/music`, {
    params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
    },
    withCredentials: true,
})
    .then((res) => res.data);
export const fetchLikedSongs = (sortBy = "newest", categoryId) => axiosInstance
    .get(`${API_BASE_URL}/music/liked`, {
    params: {
        redosled: sortBy === "popularity" ? "lajkovi" : "datum",
        kategorijaId: categoryId,
    },
    withCredentials: true,
})
    .then((res) => res.data);
export const likeSong = (songId) => axiosInstance.post(`${API_BASE_URL}/music/like`, { songId }, { withCredentials: true });
export const unlikeSong = (songId) => axiosInstance.post(`${API_BASE_URL}/music/unlike`, { songId }, { withCredentials: true });
export const searchSongs = (query) => axiosInstance
    .get(`${API_BASE_URL}/music/search`, {
    params: { query },
    withCredentials: true,
})
    .then((res) => res.data);
export const addSong = (song) => axiosInstance.post(`${API_BASE_URL}/music/add`, song, {
    withCredentials: true,
});
