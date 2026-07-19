export interface NewsFaq {
  q: string;
  a: string;
}

export interface NewsSection {
  heading: string;
  paragraphs: string[];
}

export interface NewsArticle {
  id: string;
  lang: "vi" | "en";
  keyword: string;
  secondaryKeywords: string[];
  keywords: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  date: string;
  author: string;
  sections: NewsSection[];
  faqs: NewsFaq[];
  cta: string;
}
