import { useState } from "react";
import { login, type LoginData } from "../services/authService";
import axios from "axios";

interface UseAuthResult {
  handleLogin: (loginData: LoginData) => Promise<any>;
  loading: boolean;
  error: string | null;
}

export default function useAuth(): UseAuthResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (loginData: LoginData): Promise<any> => {
    if (!loginData.username || !loginData.password) {
      setError("Please fill in both username and password.");
      throw new Error(error!)
    }

    setLoading(true);
    try {
      const data = await login(loginData);
      window.location.href = "/dashboard"
      return data;
    } catch (err: unknown) {
      

      if (axios.isAxiosError(err)) {
        if (err.code === "ERR_NETWORK") {
          setError("Cannot connect to server.");
        } else {
          setError(err.response?.data?.message || "Check your username and password and try again.");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred.");
      }
      throw new Error(error!)
    } finally {
      setLoading(false);
    }
  };

  return { handleLogin, loading, error };
}
