/** Đường dẫn CMS — đăng nhập: https://phunxamvungtau.com/adminbp */
export const ADMIN_BASE = "/adminbp";

export function adminPath(segment?: string): string {
  if (!segment) return ADMIN_BASE;
  const normalized = segment.replace(/^\//, "");
  return `${ADMIN_BASE}/${normalized}`;
}

export const ADMIN_LOGIN = ADMIN_BASE;
export const ADMIN_DASHBOARD = adminPath("dashboard");
export const ADMIN_SERVICES = adminPath("services");
export const ADMIN_TRAINING = adminPath("training");

export function isAdminPath(pathname: string): boolean {
  return pathname === ADMIN_BASE || pathname.startsWith(`${ADMIN_BASE}/`);
}

export function isLegacyAdminPath(pathname: string): boolean {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

/** Chuyển /admin/... sang /adminbp/... */
export function migrateLegacyAdminPath(pathname: string): string {
  if (pathname === "/admin" || pathname === "/admin/login") {
    return ADMIN_LOGIN;
  }
  if (pathname.startsWith("/admin/")) {
    return pathname.replace(/^\/admin/, ADMIN_BASE);
  }
  return ADMIN_LOGIN;
}
