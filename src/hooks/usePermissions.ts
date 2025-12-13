import { useEffect, useState } from "react";
import { fetchPermissionsService, getCachedPermissions } from "../services/permissionService";

export default function usePermissions() {
  const [permissions, setPermissions] = useState<any[] | null>(getCachedPermissions());
  const [loading, setLoading] = useState(!getCachedPermissions());
  const [error, setError] = useState<string | null>(null);

  const closeError = () => setError(null);

  const load = async () => {
    try {
      const perms = await fetchPermissionsService();
      setPermissions(perms);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getCachedPermissions()) load();
  }, []);

  return { permissions, loading, error, closeError, reload: load };
}
