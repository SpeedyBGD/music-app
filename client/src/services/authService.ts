import axiosInstance from "./axiosInterceptor";

export const login = (email: string, password: string) =>
  axiosInstance
    .post("/auth/login", { email, password })
    .then((res) => res.data);

export const register = (
  email: string,
  password: string,
  confirmPassword: string,
) =>
  axiosInstance
    .post("/auth/register", { email, password, confirmPassword })
    .then((res) => res.data);

export const logout = (token: string) =>
  axiosInstance.post(
    "/auth/logout",
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );
