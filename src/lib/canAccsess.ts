import { sidebarAccessMap } from "@/generated/sidebarAccessMap";
import { match } from "path-to-regexp";

/**
 * Check whether the user has access to the given path.
 *
 * Priority:
 * 1. If permissions defined → must match ALL
 * 2. Else if roles defined → must match ONE
 * 3. If neither → allow
 */
export function canAccess(
  path: string,
  userRoles: string[],
  userPermissions: string[]
): boolean {
  for (const [pattern, access] of Object.entries(sidebarAccessMap)) {
    const matcher = match(pattern, { decode: decodeURIComponent });
    const matched = matcher(path);

    if (matched) {
      if (access.permissions && access.permissions.length > 0) {
        return access.permissions.every((perm) =>
          userPermissions.includes(perm)
        );
      }

      if (access.roles && access.roles.length > 0) {
        return access.roles.some((role) => userRoles.includes(role));
      }

      return true; // pattern matched, no access rules = allow
    }
  }

  return true; // not matched by any rule = allow
}
