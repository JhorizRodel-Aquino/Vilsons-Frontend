import { useState } from "react";
import { login, type LoginData } from "../services/authService";
import axios from "axios";

interface UseAuthResult {
  handleLogin: (loginData: LoginData) => Promise<any>;
  loading: boolean;
}

export default function useAuth(): UseAuthResult {
  const [loading, setLoading] = useState(false);

  const handleLogin = async (loginData: LoginData): Promise<any> => {
    setLoading(true);

    try {
      const data = await login(loginData);
      window.location.href = "/dashboard"

      return data;
    } catch (err: unknown) {
      console.error("Login failed:", err);

      if (axios.isAxiosError(err)) {
      
        throw new Error(err.response?.data?.message || "An unexpected error occurred.");
      } else {
        throw new Error("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading };
}
