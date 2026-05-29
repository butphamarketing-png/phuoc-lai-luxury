import type { SiteService } from "@/data/catalog";

export type ServiceVideoItem = {
  id: string;
  serviceSlug: string;
  serviceTitle: string;
  src: string;
  type: "file" | "youtube";
  embedUrl?: string;
};

function extractYoutubeId(url: string): string | null {
  try {
    const u = new URL(url.trim(), "https://example.com");
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1).split("/")[0] || null;
    }
    if (u.hostname.includes("youtube.com") || u.hostname.includes("youtube-nocookie.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;
      const m = u.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/);
      if (m) return m[1];
    }
  } catch {
    if (/^[\w-]{11}$/.test(url.trim())) return url.trim();
  }
  return null;
}

function youtubeEmbedUrl(id: string): string {
  return `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`;
}

function pushVideo(
  items: ServiceVideoItem[],
  rawSrc: string,
  serviceSlug: string,
  serviceTitle: string,
  index: number,
) {
  const src = rawSrc.trim();
  if (!src) return;

  const ytId = extractYoutubeId(src);
  if (ytId) {
    items.push({
      id: `${serviceSlug}-yt-${index}`,
      serviceSlug,
      serviceTitle,
      src,
      type: "youtube",
      embedUrl: youtubeEmbedUrl(ytId),
    });
    return;
  }

  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(src) || src.startsWith("/") || src.startsWith("blob:")) {
    items.push({
      id: `${serviceSlug}-file-${index}`,
      serviceSlug,
      serviceTitle,
      src,
      type: "file",
    });
  }
}

export function extractVideosFromBodyHtml(
  bodyHtml: string,
  serviceSlug: string,
  serviceTitle: string,
): ServiceVideoItem[] {
  const items: ServiceVideoItem[] = [];
  let index = 0;

  const videoSrcRe = /<video[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  let m: RegExpExecArray | null;
  while ((m = videoSrcRe.exec(bodyHtml)) !== null) {
    pushVideo(items, m[1], serviceSlug, serviceTitle, index++);
  }

  const sourceRe = /<source[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  while ((m = sourceRe.exec(bodyHtml)) !== null) {
    pushVideo(items, m[1], serviceSlug, serviceTitle, index++);
  }

  const iframeRe = /<iframe[^>]*\ssrc=["']([^"']+)["'][^>]*>/gi;
  while ((m = iframeRe.exec(bodyHtml)) !== null) {
    pushVideo(items, m[1], serviceSlug, serviceTitle, index++);
  }

  return items;
}

export function collectServiceVideos(services: SiteService[]): ServiceVideoItem[] {
  const all: ServiceVideoItem[] = [];
  const seen = new Set<string>();

  for (const service of services) {
    if (service.status !== "published") continue;
    const html = service.detail?.bodyHtml;
    if (!html?.trim()) continue;

    for (const item of extractVideosFromBodyHtml(html, service.slug, service.title)) {
      const key = `${item.serviceSlug}:${item.src}`;
      if (seen.has(key)) continue;
      seen.add(key);
      all.push(item);
    }
  }

  return all;
}
