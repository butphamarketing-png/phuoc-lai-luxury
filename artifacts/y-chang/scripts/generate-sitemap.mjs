import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");
const siteUrl = (process.env.VITE_SITE_URL || "https://phunxamvungtau.com").replace(
  /\/$/,
  "",
);

function slugsBetween(src, startMarker, endMarker) {
  const chunk = src.split(startMarker)[1]?.split(endMarker)[0] ?? "";
  return [...chunk.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function detailSlugsBetween(src, startMarker, endMarker) {
  const chunk = src.split(startMarker)[1]?.split(endMarker)[0] ?? "";
  return [...chunk.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map((m) => m[1]);
}

const catalogSrc = fs.readFileSync(path.join(root, "src/data/catalog.ts"), "utf8");
const detailsSrc = fs.readFileSync(path.join(root, "src/data/content-details.ts"), "utf8");

const serviceSlugs = slugsBetween(catalogSrc, "CATALOG_SERVICES", "CATALOG_TRAINING");
const trainingSlugs = slugsBetween(catalogSrc, "CATALOG_TRAINING", "export function");
const serviceDetailSlugs = detailSlugsBetween(
  detailsSrc,
  "SERVICE_DETAIL_DATA",
  "TRAINING_DETAIL_DATA",
);
const trainingDetailSlugs = detailSlugsBetween(
  detailsSrc,
  "TRAINING_DETAIL_DATA",
  "",
);

const staticPaths = [
  "/",
  "/ve-chung-toi",
  "/dich-vu",
  "/dich-vu/phun-xam",
  "/dich-vu/spa",
  "/dao-tao",
  "/dao-tao/phun-xam",
  "/dao-tao/spa",
  "/lien-he",
  "/feedback",
];

const paths = new Set([
  ...staticPaths,
  ...serviceSlugs.map((s) => `/dich-vu/${s}`),
  ...serviceDetailSlugs.map((s) => `/dich-vu/${s}`),
  ...trainingSlugs.map((s) => `/dao-tao/${s}`),
  ...trainingDetailSlugs.map((s) => `/dao-tao/${s}`),
]);

const today = new Date().toISOString().slice(0, 10);
const urls = [...paths]
  .sort()
  .map((p) => {
    const priority =
      p === "/" ? "1.0" : p.match(/^\/(dich-vu|dao-tao)\/[^/]+$/) ? "0.8" : "0.7";
    const changefreq = p === "/" ? "weekly" : "monthly";
    return `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(root, "public/sitemap.xml"), xml);
console.log(`sitemap.xml: ${paths.size} URLs → ${siteUrl}`);
