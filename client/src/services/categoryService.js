import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";
export const fetchCategories = () => axios.get(`${API_BASE_URL}/music/categories`).then((res) => res.data);
