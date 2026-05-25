import { SERVICE_DETAIL_DATA, type ServiceDetailContent } from "@/data/content-details";
import type { SiteService } from "@/data/catalog";

export function buildServiceDetailDraft(
  service: SiteService,
): ServiceDetailContent {
  const fallback = SERVICE_DETAIL_DATA[service.slug];
  const existing = service.detail ?? fallback;
  return {
    title: existing?.title ?? service.title,
    category: existing?.category ?? service.categoryLabel,
    image: existing?.image ?? service.image,
    date: existing?.date ?? "—",
    author: existing?.author ?? service.author,
    readTime: existing?.readTime ?? "5 phút đọc",
    intro: existing?.intro ?? (service.bullets.join(". ") || service.title),
    metaDescription: existing?.metaDescription,
    bodyHtml: existing?.bodyHtml,
    seo: existing?.seo ?? {},
    sections: existing?.sections ?? [],
  };
}
