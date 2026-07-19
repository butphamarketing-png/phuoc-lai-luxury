import type { NewsArticle } from "./news-types";
import vi from "./news-vi.json";
import en from "./news-en.json";

export const newsVi = vi as NewsArticle[];
export const newsEn = en as NewsArticle[];

export function getNewsByLang(lang: "vi" | "en" | "vn"): NewsArticle[] {
  return lang === "en" ? newsEn : newsVi;
}

export function getNewsArticle(
  lang: "vi" | "en" | "vn",
  slug: string,
): NewsArticle | undefined {
  return getNewsByLang(lang).find((a) => a.slug === slug);
}

export function getAllNewsArticles(): NewsArticle[] {
  return [...newsVi, ...newsEn];
}
