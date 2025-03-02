import axios from "axios";

import { API_BASE_URL } from "@/utils/constants";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export const setupAxiosInterceptor = (logout: () => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        logout();
        window.location.href = "/";
      }
      return Promise.reject(error);
    },
  );
};

export default axiosInstance;
