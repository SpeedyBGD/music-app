import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "@/services/axiosInterceptor";
import { setupAxiosInterceptor } from "@/services/axiosInterceptor";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  email: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token"),
  );
  const [email, setEmail] = useState<string | null>(
    localStorage.getItem("email"),
  );
  const isAuthenticated = !!token;

  const login = (email: string, password: string) =>
    axiosInstance
      .post("/auth/login", { email, password })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        setToken(response.data.token);
        setEmail(email);
      })
      .catch((error) => {
        throw new Error(error.response?.data?.message);
      });

  const register = (email: string, password: string, confirmPassword: string) =>
    axiosInstance
      .post("/auth/register", { email, password, confirmPassword })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        setToken(response.data.token);
        setEmail(email);
      })
      .catch((error) => {
        throw new Error(
          error.response?.data?.message || "Greška pri registraciji",
        );
      });

  const logout = () =>
    axiosInstance
      .post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setEmail(null);
      })
      .catch((error) => {
        console.error("Logout failed:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        setToken(null);
        setEmail(null);
      });

  useEffect(() => {
    setupAxiosInterceptor(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, email, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
