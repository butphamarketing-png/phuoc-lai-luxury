const MEDIA_BASE =
  import.meta.env.VITE_MEDIA_BASE_URL?.replace(/\/$/, "") ||
  "https://www.phunxamvungtau.com";

export function resolveMediaUrl(path?: string | null): string {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${MEDIA_BASE}${path.startsWith("/") ? path : `/${path}`}`;
}
