import React, { createContext, useContext, useState } from "react";
import axiosInstance from "@/services/axiosInterceptor";
import { AxiosError } from "axios";

interface AuthContextType {
  isAuthenticated: boolean;
  email: string | null;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  register: (
    email: string,
    password: string,
    confirmPassword: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  onAuthChange: (callback: (isAuthenticated: boolean) => void) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState<string | null>(null);
  const authChangeListeners: ((isAuthenticated: boolean) => void)[] = [];

  const onAuthChange = (callback: (isAuthenticated: boolean) => void) => {
    authChangeListeners.push(callback);
  };

  const notifyAuthChange = (isAuthenticated: boolean) => {
    authChangeListeners.forEach((callback) => callback(isAuthenticated));
  };

  const checkAuth = async () => {
    try {
      const response = await axiosInstance.get("/auth/check", {
        withCredentials: true,
      });
      setIsAuthenticated(true);
      setEmail(response.data.email);
      notifyAuthChange(true);
    } catch {
      setIsAuthenticated(false);
      setEmail(null);
      notifyAuthChange(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await axiosInstance.post(
        "/auth/login",
        { email, password },
        { withCredentials: true },
      );
      setIsAuthenticated(true);
      setEmail(email);
      notifyAuthChange(true);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message || "Došlo je do greške pri prijavi.";
      return { success: false, message };
    }
  };

  const register = async (
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    try {
      await axiosInstance.post(
        "/auth/register",
        { email, password, confirmPassword },
        { withCredentials: true },
      );
      setIsAuthenticated(true);
      setEmail(email);
      notifyAuthChange(true);
      return { success: true };
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      const message =
        axiosError.response?.data?.message ||
        "Došlo je do greške pri registraciji.";
      return { success: false, message };
    }
  };

  const logout = async () => {
    await axiosInstance.post("/auth/logout", {}, { withCredentials: true });
    setIsAuthenticated(false);
    setEmail(null);
    notifyAuthChange(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        email,
        login,
        register,
        logout,
        checkAuth,
        onAuthChange,
      }}
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
