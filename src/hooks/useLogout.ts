import { useState, useCallback } from "react";
import { logout } from "../services/authService";

interface UseLogoutResult {
  handleLogout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function useLogout(): UseLogoutResult {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      await logout(); // call logout service
      // optionally redirect to login page
      window.location.href = "/login";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred during logout.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { handleLogout, loading, error };
}
