import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      !error.config.url.includes("/auth/check")
    ) {
      const event = new CustomEvent("auth:unauthenticated");
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
