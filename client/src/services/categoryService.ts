import axios from "axios";
import { Category } from "@/types/music";

export const fetchCategories = (): Promise<Category[]> =>
  axios
    .get(`${import.meta.env.VITE_API_BASE_URL}/music/categories`)
    .then((res) => res.data);
