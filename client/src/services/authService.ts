import axiosInstance from "./axiosInterceptor";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const register = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  try {
    const response = await axiosInstance.post("/auth/register", {
      email,
      password,
      confirmPassword,
    });
    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axiosInstance.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Logout failed:", error);
    throw error;
  }
};
