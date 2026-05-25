import { useEffect } from "react";
import {
  absoluteUrl,
  formatTitle,
  getSiteUrl,
  SITE_NAME,
  type SeoMeta,
} from "@/lib/seo";

function upsertMeta(
  selector: string,
  attrs: Record<string, string>,
  content: string,
) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    Object.entries(attrs).forEach(([key, value]) => el!.setAttribute(key, value));
    document.head.appendChild(el);
  }
  el.content = content;
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function applySeo(meta: SeoMeta) {
  const path = meta.path ?? window.location.pathname;
  const canonical = absoluteUrl(path);
  const image = absoluteUrl(meta.image ?? "/studio-interior.png");
  const title = meta.title.includes(SITE_NAME)
    ? meta.title
    : formatTitle(meta.title);
  const robots = meta.noindex ? "noindex, nofollow" : "index, follow";

  document.title = title;
  document.documentElement.lang = "vi";

  upsertMeta('meta[name="description"]', { name: "description" }, meta.description);
  if (meta.keywords?.trim()) {
    upsertMeta('meta[name="keywords"]', { name: "keywords" }, meta.keywords.trim());
  }
  upsertMeta('meta[name="robots"]', { name: "robots" }, robots);
  upsertMeta('meta[property="og:title"]', { property: "og:title" }, title);
  upsertMeta(
    'meta[property="og:description"]',
    { property: "og:description" },
    meta.description,
  );
  upsertMeta('meta[property="og:type"]', { property: "og:type" }, meta.type ?? "website");
  upsertMeta('meta[property="og:url"]', { property: "og:url" }, canonical);
  upsertMeta('meta[property="og:image"]', { property: "og:image" }, image);
  upsertMeta('meta[property="og:locale"]', { property: "og:locale" }, "vi_VN");
  upsertMeta('meta[property="og:site_name"]', { property: "og:site_name" }, SITE_NAME);
  upsertMeta('meta[name="twitter:card"]', { name: "twitter:card" }, "summary_large_image");
  upsertMeta('meta[name="twitter:title"]', { name: "twitter:title" }, title);
  upsertMeta(
    'meta[name="twitter:description"]',
    { name: "twitter:description" },
    meta.description,
  );
  upsertMeta('meta[name="twitter:image"]', { name: "twitter:image" }, image);

  upsertLink("canonical", canonical);
}

export function useSeo(meta: SeoMeta | null | undefined) {
  useEffect(() => {
    if (!meta) return;
    applySeo(meta);
  }, [
    meta?.title,
    meta?.description,
    meta?.keywords,
    meta?.path,
    meta?.image,
    meta?.type,
    meta?.noindex,
  ]);
}

export { getSiteUrl, applySeo };
