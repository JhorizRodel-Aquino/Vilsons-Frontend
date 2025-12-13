import { get } from "./apiService";

let cachedPermissions: any[] | null = null;
const route = "/api/me/permissions";

export async function fetchPermissionsService() {
  const result = await get({ route });
  cachedPermissions = result.permissions;
  return cachedPermissions;
}

export function getCachedPermissions() {
  return cachedPermissions;
}

export function hasPermissions(required?: string[]) {
  if (!required || required.length === 0) return true; // no permissions required = allow
  const perms = cachedPermissions;
  if (!perms) return false;

  return required.some(perm =>
    perms.some((p: any) => p.permissionName === perm)
  );
}



