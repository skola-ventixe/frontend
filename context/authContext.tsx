"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import AuthService, {
  LoginCredentials,
  RegisterCredentials,
} from "../services/authService";
import { useRouter } from "next/navigation";
import axios from "axios";

interface User {
  id: string;
  email: string;
  fullname: string;
}

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const storedUser = AuthService.getCurrentUser();
      if (storedUser) {
        setUser(storedUser);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          logout();
          router.push("/signin");
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [router]);

  const login = async (credentials: LoginCredentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await AuthService.login(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.userId,
          email: credentials.email,
          fullname: response.fullName,
        })
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;

      setUser({
        id: response.userId,
        email: credentials.email,
        fullname: response.fullName,
      });

      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    try {
      setError(null);
      setLoading(true);
      const response = await AuthService.register(credentials);

      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.userId,
          email: credentials.email,
        })
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.token}`;

      setUser({
        id: response.userId,
        email: credentials.email,
        fullname: response.fullName,
      });

      router.push("/");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "An error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    AuthService.logout();
    axios.defaults.headers.common["Authorization"] = "";
    setUser(null);
    router.push("/signin");
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, loading, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
