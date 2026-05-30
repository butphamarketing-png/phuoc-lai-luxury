import fs from "fs";
import path from "path";

export const STATIC_PATHS = [
  "/",
  "/ve-chung-toi",
  "/dich-vu",
  "/dao-tao",
  "/lien-he",
  "/feedback",
];

export function loadEnvFiles(rootDir) {
  const candidates = [
    path.join(rootDir, ".env"),
    path.join(rootDir, ".env.local"),
    path.join(rootDir, "..", "..", ".env"),
  ];
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    for (const line of fs.readFileSync(file, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      let val = trimmed.slice(eq + 1).trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  }
}

export function getSiteUrl() {
  return (process.env.VITE_SITE_URL || "https://phunxamvungtau.com").replace(
    /\/$/,
    "",
  );
}

/** @returns {Promise<Map<string, string>>} path -> lastmod (YYYY-MM-DD) */
export async function fetchDynamicPaths() {
  const map = new Map();
  const url = process.env.VITE_SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn(
      "[sitemap] Thiếu VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY — chỉ dùng trang tĩnh.",
    );
    return map;
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key);

  const { data: services, error: svcErr } = await supabase
    .from("site_services")
    .select("slug, status, updated_at")
    .eq("status", "published");

  if (svcErr) {
    console.warn("[sitemap] site_services:", svcErr.message);
  } else {
    for (const row of services ?? []) {
      if (!row.slug) continue;
      const lastmod = row.updated_at
        ? String(row.updated_at).slice(0, 10)
        : new Date().toISOString().slice(0, 10);
      map.set(`/dich-vu/${row.slug}`, lastmod);
    }
  }

  const { data: training, error: trErr } = await supabase
    .from("site_training_courses")
    .select("slug, status, updated_at")
    .neq("status", "hidden");

  if (trErr) {
    console.warn("[sitemap] site_training_courses:", trErr.message);
  } else {
    for (const row of training ?? []) {
      if (!row.slug) continue;
      const lastmod = row.updated_at
        ? String(row.updated_at).slice(0, 10)
        : new Date().toISOString().slice(0, 10);
      map.set(`/dao-tao/${row.slug}`, lastmod);
    }
  }

  return map;
}

export function buildSitemapXml(siteUrl, pathLastmods) {
  const today = new Date().toISOString().slice(0, 10);
  const allPaths = new Set([...STATIC_PATHS, ...pathLastmods.keys()]);

  const urls = [...allPaths]
    .sort()
    .map((p) => {
      const lastmod = pathLastmods.get(p) ?? today;
      const priority =
        p === "/" ? "1.0" : /^\/(dich-vu|dao-tao)\/[^/]+$/.test(p) ? "0.8" : "0.7";
      const changefreq = p === "/" ? "weekly" : "monthly";
      return `  <url>
    <loc>${siteUrl}${p}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

export async function buildFullSitemap() {
  const siteUrl = getSiteUrl();
  const dynamic = await fetchDynamicPaths();
  const xml = buildSitemapXml(siteUrl, dynamic);
  const count = new Set([...STATIC_PATHS, ...dynamic.keys()]).size;
  return { xml, count, siteUrl };
}
