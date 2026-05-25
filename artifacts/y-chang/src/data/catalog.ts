import type {
  ServiceDetailContent,
  TrainingDetailContent,
} from "@/data/content-details";

export type ServiceCategory = "phun-xam" | "spa";
export type ServiceStatus = "published" | "hidden";
export type TrainingStatus = "open" | "coming_soon" | "hidden";
export type TrainingCategory = "phun-xam" | "spa";

export interface SiteService {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  image: string;
  price: string;
  author: string;
  status: ServiceStatus;
  bullets: string[];
  sortOrder: number;
  detail?: ServiceDetailContent;
}

export interface SiteTrainingCourse {
  id: string;
  slug: string;
  title: string;
  category: TrainingCategory;
  level: string;
  duration: string;
  image: string;
  description: string;
  status: TrainingStatus;
  students: number;
  bullets: string[];
  sortOrder: number;
  detail?: TrainingDetailContent;
}

/** Không dùng dữ liệu mẫu — chỉ bài tạo trong /adminbp (Supabase). */
export const CATALOG_SERVICES: SiteService[] = [];

export const CATALOG_TRAINING: SiteTrainingCourse[] = [];

export function getPublicServicePath(slug: string) {
  return `/dich-vu/${slug}`;
}

export function getPublicTrainingPath(slug: string) {
  return `/dao-tao/${slug}`;
}
