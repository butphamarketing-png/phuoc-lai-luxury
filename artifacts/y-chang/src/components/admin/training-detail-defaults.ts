import {
  TRAINING_DETAIL_DATA,
  type TrainingDetailContent,
} from "@/data/content-details";
import type { SiteTrainingCourse } from "@/data/catalog";

export function buildTrainingDetailDraft(
  course: SiteTrainingCourse,
): TrainingDetailContent {
  const fallback = TRAINING_DETAIL_DATA[course.slug];
  const existing = course.detail ?? fallback;
  return {
    title: existing?.title ?? course.title,
    level: existing?.level ?? course.level,
    image: existing?.image ?? course.image,
    date: existing?.date ?? "—",
    instructor: existing?.instructor ?? "Phuoc Lai Master",
    duration: existing?.duration ?? course.duration,
    intro: existing?.intro ?? course.description,
    metaDescription: existing?.metaDescription,
    bodyHtml: existing?.bodyHtml,
    seo: existing?.seo ?? {},
    curriculum: existing?.curriculum ?? course.bullets,
    sections: existing?.sections ?? [],
  };
}
