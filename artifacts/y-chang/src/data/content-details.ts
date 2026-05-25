export interface ContentSection {
  heading: string;
  content?: string;
  image?: string;
  list?: string[];
}

/** SEO metadata (giống tab SEO trong CMS tham chiếu) */
export interface DetailSeo {
  title?: string;
  keywords?: string;
  description?: string;
}

export interface ServiceDetailContent {
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  intro: string;
  /** Mô tả ngắn (meta / excerpt) */
  metaDescription?: string;
  /** Nội dung HTML từ trình soạn thảo */
  bodyHtml?: string;
  seo?: DetailSeo;
  sections: ContentSection[];
}

export interface TrainingDetailContent {
  title: string;
  level: string;
  image: string;
  date: string;
  instructor: string;
  duration: string;
  intro: string;
  metaDescription?: string;
  bodyHtml?: string;
  seo?: DetailSeo;
  curriculum: string[];
  sections: ContentSection[];
}

/** Không còn nội dung mẫu — chi tiết chỉ lưu trong Supabase (detail_json). */
export const SERVICE_DETAIL_DATA: Record<string, ServiceDetailContent> = {};

export const TRAINING_DETAIL_DATA: Record<string, TrainingDetailContent> = {};
