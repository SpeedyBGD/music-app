import axios from "axios";
import { Category } from "@/types/music";
import { API_BASE_URL } from "@/utils/constants";

export const fetchCategories = (): Promise<Category[]> =>
  axios.get(`${API_BASE_URL}/music/categories`).then((res) => res.data);
