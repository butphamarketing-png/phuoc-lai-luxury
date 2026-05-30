import JsonLd from "@/components/seo/JsonLd";
import { getPublicServicePath, getPublicTrainingPath } from "@/data/catalog";
import type { SiteService, SiteTrainingCourse } from "@/data/catalog";
import { buildItemListJsonLd } from "@/lib/seo";

type ServicesListingJsonLdProps = {
  services: SiteService[];
};

export function ServicesListingJsonLd({ services }: ServicesListingJsonLdProps) {
  if (services.length === 0) return null;

  return (
    <JsonLd
      id="services-itemlist"
      data={buildItemListJsonLd({
        name: "Dịch vụ Phuoc Lai Luxury Vũng Tàu",
        description: "Danh sách dịch vụ phun xăm thẩm mỹ và spa tại Phuoc Lai Luxury.",
        items: services.map((s) => ({
          name: s.title,
          path: getPublicServicePath(s.slug),
        })),
      })}
    />
  );
}

type TrainingListingJsonLdProps = {
  courses: SiteTrainingCourse[];
};

export function TrainingListingJsonLd({ courses }: TrainingListingJsonLdProps) {
  if (courses.length === 0) return null;

  return (
    <JsonLd
      id="training-itemlist"
      data={buildItemListJsonLd({
        name: "Khóa đào tạo Phuoc Lai Academy",
        description: "Chương trình đào tạo phun xăm và spa tại Vũng Tàu.",
        items: courses.map((c) => ({
          name: c.title,
          path: getPublicTrainingPath(c.slug),
        })),
      })}
    />
  );
}
