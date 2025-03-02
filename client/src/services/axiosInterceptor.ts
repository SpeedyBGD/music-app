import axios from "axios";
import { API_BASE_URL } from "@/utils/constants";

const axiosInstance = axios.create({ baseURL: API_BASE_URL });

export const setupAxiosInterceptor = (logout: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const isAuthRequest = error.config?.url?.includes("/auth/");
      const hasToken = !!localStorage.getItem("token");

      if (error.response?.status === 401 && !isAuthRequest && hasToken) {
        logout();
        window.location.href = "/?showLogin=true";
        return;
      }

      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
