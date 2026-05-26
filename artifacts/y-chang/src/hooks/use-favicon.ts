import { useEffect } from "react";

const FAVICON_VERSION = "4";

function asset(path: string): string {
  const base = (import.meta.env.BASE_URL || "/").replace(/\/?$/, "/");
  return `${base}${path.replace(/^\//, "")}?v=${FAVICON_VERSION}`;
}

export function useFavicon() {
  useEffect(() => {
    const links: { rel: string; href: string; sizes?: string; type?: string }[] = [
      { rel: "icon", href: asset("favicon.ico"), sizes: "any" },
      { rel: "icon", href: asset("favicon-32x32.png"), sizes: "32x32", type: "image/png" },
      { rel: "icon", href: asset("favicon-16x16.png"), sizes: "16x16", type: "image/png" },
      { rel: "apple-touch-icon", href: asset("apple-touch-icon.png"), sizes: "180x180" },
    ];

    for (const { rel, href, sizes, type } of links) {
      const selector = sizes
        ? `link[rel="${rel}"][sizes="${sizes}"]`
        : `link[rel="${rel}"]:not([sizes])`;
      let el = document.querySelector(selector) as HTMLLinkElement | null;
      if (!el) {
        el = document.createElement("link");
        el.rel = rel;
        if (sizes) el.sizes = sizes;
        if (type) el.type = type;
        document.head.appendChild(el);
      }
      el.href = href;
    }
  }, []);
}
