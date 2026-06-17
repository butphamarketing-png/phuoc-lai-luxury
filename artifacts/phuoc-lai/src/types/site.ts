export interface SiteSettings {
  siteName: string;
  phone: string;
  phoneDisplay: string;
  email: string;
  address: string;
  hours: string;
  facebook: string;
  instagram: string;
  zalo: string;
  messenger: string;
  bookingNote?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  categoryLabel: string;
  image: string;
  price: string;
  author: string;
  status: string;
  bullets: string[];
  sortOrder: number;
}

export interface TrainingItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  level: string;
  duration: string;
  image: string;
  description: string;
  status: string;
  bullets: string[];
  sortOrder: number;
}

export interface DetailSeo {
  title?: string;
  description?: string;
  keywords?: string;
}

export interface DetailSection {
  heading: string;
  content?: string;
  list?: string[];
  image?: string;
}

export interface ServiceDetail {
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  intro: string;
  metaDescription?: string;
  bodyHtml?: string;
  seo: DetailSeo;
  sections: DetailSection[];
}

export interface TrainingDetail {
  title: string;
  level: string;
  image: string;
  date: string;
  instructor: string;
  duration: string;
  intro: string;
  metaDescription?: string;
  bodyHtml?: string;
  seo: DetailSeo;
  sections: DetailSection[];
  curriculum: string[];
}

export interface LeadInput {
  name: string;
  phone: string;
  email?: string;
  serviceInterest: string;
  note?: string;
  source?: "booking" | "contact";
}
