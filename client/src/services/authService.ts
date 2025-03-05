import axiosInstance from "@/services/axiosInterceptor";

interface AuthResponse {
  email: string;
}

export const checkAuth = (): Promise<AuthResponse> => {
  return axiosInstance
    .get("/auth/check", { withCredentials: true })
    .then((response) => response.data);
};

export const login = (email: string, password: string): Promise<void> => {
  return axiosInstance.post(
    "/auth/login",
    { email, password },
    { withCredentials: true },
  );
};

export const register = (
  email: string,
  password: string,
  confirmPassword: string,
): Promise<void> => {
  return axiosInstance.post(
    "/auth/register",
    { email, password, confirmPassword },
    { withCredentials: true },
  );
};

export const logout = (): Promise<void> => {
  return axiosInstance.post("/auth/logout", {}, { withCredentials: true });
};
