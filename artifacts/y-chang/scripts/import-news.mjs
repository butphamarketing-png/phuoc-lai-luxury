import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.resolve(
  __dirname,
  "../../../../Beauty-Master-Academy/artifacts/phuoc-lai/src/data",
);
const outDir = path.join(__dirname, "../src/data");

const map = {
  "/portfolio-brows.png": "/service-brows.png",
  "/images/portfolio-brows.png": "/service-brows.png",
  "/service-1.png": "/service-brows.png",
  "/hero-1.png": "/hero-portrait.png",
  "/ref1.png": "/service-combo.png",
  "/portfolio-lips.png": "/service-lips.png",
  "/images/portfolio-lips.png": "/service-lips.png",
  "/service-2.png": "/service-lips.png",
  "/hero-2.png": "/slideshow-2.png",
  "/portfolio-eyeliner.png": "/phun-mi-phuong-hoang.jpg",
  "/images/portfolio-eyeliner.png": "/phun-mi-phuong-hoang.jpg",
  "/service-3.png": "/service-ombre.png",
  "/hero-3.png": "/hero-3.png",
  "/training-1.png": "/training-1.png",
  "/training-2.png": "/training-2.png",
  "/training-3.png": "/training-3.png",
  "/training-4.png": "/training-4.png",
  "/instructor.png": "/training-session.png",
  "/training.png": "/training-session.png",
  "/service-4.png": "/spa123.png",
  "/intro-interior.png": "/studio-interior.png",
  "/hero-4.png": "/hero-banner.png",
  "/hero-bg.png": "/khong-gian.jpg",
  "/hero-bg-light.png": "/studio.png",
  "/artist-phuoclai.png": "/Gioi-thieu-1.png",
  "/artist-quynhtam.png": "/slideshow-1.png",
  "/ref2.png": "/slideshow-3.png",
  "/avatar-1.png": "/pop-up-1.jpg",
  "/avatar-2.png": "/pop-up-2.jpg",
  "/avatar-3.png": "/pop-up-3.jpg",
};

fs.mkdirSync(outDir, { recursive: true });

function remap(articles) {
  return articles.map((a) => ({
    ...a,
    image: map[a.image] || a.image || "/og-share.png",
    imageAlt: a.imageAlt || a.keyword,
  }));
}

for (const file of ["news-vi.json", "news-en.json"]) {
  const data = JSON.parse(fs.readFileSync(path.join(srcDir, file), "utf8"));
  fs.writeFileSync(path.join(outDir, file), JSON.stringify(remap(data)));
  console.log(file, data.length);
}

fs.writeFileSync(
  path.join(outDir, "news-types.ts"),
  `export interface NewsFaq {
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
`,
);

fs.writeFileSync(
  path.join(outDir, "news.ts"),
  `import type { NewsArticle } from "./news-types";
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
`,
);

console.log("done →", outDir);
