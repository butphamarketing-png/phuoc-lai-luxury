import { useEffect } from "react";

function withBase(path: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  if (path.startsWith("http")) return path;
  return `${base}${path.replace(/^\//, "")}`;
}

export function useFavicon() {
  useEffect(() => {
    const pngHref = `${withBase("favicon.png")}?v=3`;
    const appleHref = `${withBase("apple-touch-icon.png")}?v=3`;

    const ensureLink = (
      rel: string,
      href: string,
      type?: string,
    ) => {
      const selector = type
        ? `link[rel="${rel}"][type="${type}"]`
        : `link[rel="${rel}"]:not([type])`;
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (type) el.type = type;
        document.head.appendChild(el);
      }
      el.href = href;
    };

    document.querySelectorAll('link[rel="icon"][type="image/svg+xml"]').forEach((el) => {
      el.remove();
    });

    ensureLink("icon", pngHref, "image/png");
    ensureLink("shortcut icon", pngHref);
    ensureLink("apple-touch-icon", appleHref);
  }, []);
}
