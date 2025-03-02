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

  const login = async (email: string, password: string) => {
    try {
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      setToken(response.data.token);
      setEmail(email);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Pogrešan email ili lozinka",
      );
    }
  };

  const register = async (
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
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("email", email);
      setToken(response.data.token);
      setEmail(email);
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Greška pri registraciji",
      );
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.post(
        "/auth/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.error("Logout failed:", error);
    }
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setEmail(null);
  };

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
