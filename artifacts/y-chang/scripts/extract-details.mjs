import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const pages = path.join(dir, "../src/pages");
const sd = fs.readFileSync(path.join(pages, "ServiceDetail.tsx"), "utf8");
const td = fs.readFileSync(path.join(pages, "TrainingDetail.tsx"), "utf8");
const m1 = sd.match(/const serviceData[^=]*= ([\s\S]*?);\s*\r?\n\r?\nexport default/);
const m2 = td.match(/const trainingData[^=]*= ([\s\S]*?);\s*\r?\n\r?\nexport default/);
if (!m1 || !m2) throw new Error("extract failed");

const out = `export interface ContentSection {
  heading: string;
  content?: string;
  image?: string;
  list?: string[];
}

export interface ServiceDetailContent {
  title: string;
  category: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  intro: string;
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
  curriculum: string[];
  sections: ContentSection[];
}

export const SERVICE_DETAIL_DATA: Record<string, ServiceDetailContent> = ${m1[1]};

export const TRAINING_DETAIL_DATA: Record<string, TrainingDetailContent> = ${m2[1]};
`;

fs.writeFileSync(path.join(dir, "../src/data/content-details.ts"), out);
console.log("OK", out.length);
