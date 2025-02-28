import { Category } from "@/types/music";
import axios from "axios";

export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/music/categories`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
