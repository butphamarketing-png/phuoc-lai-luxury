import { useEffect } from "react";
import { resolveMediaUrl } from "@/lib/media";

const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://phunxamvungtau.com";

export interface PageMeta {
  title: string;
  description?: string;
  keywords?: string;
  path?: string;
  image?: string;
  noindex?: boolean;
}

function setMetaTag(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export function usePageMeta(meta: PageMeta | null) {
  useEffect(() => {
    if (!meta) return;

    document.title = meta.title;

    if (meta.description) {
      setMetaTag("name", "description", meta.description);
      setMetaTag("property", "og:description", meta.description);
      setMetaTag("name", "twitter:description", meta.description);
    }

    if (meta.keywords) {
      setMetaTag("name", "keywords", meta.keywords);
    }

    setMetaTag("property", "og:title", meta.title);
    setMetaTag("name", "twitter:title", meta.title);
    setMetaTag("property", "og:type", "website");

    if (meta.path) {
      const url = `${SITE_URL}${meta.path}`;
      setMetaTag("property", "og:url", url);
      setLinkTag("canonical", url);
    }

    if (meta.image) {
      const imageUrl = resolveMediaUrl(meta.image);
      setMetaTag("property", "og:image", imageUrl);
      setMetaTag("name", "twitter:image", imageUrl);
    }

    setMetaTag("name", "robots", meta.noindex ? "noindex, nofollow" : "index, follow");
  }, [meta]);
}
