import path from "path";
import { fileURLToPath } from "url";
import { buildFullSitemap, loadEnvFiles } from "../scripts/sitemap-build.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvFiles(root);

export default async function handler(req, res) {
  try {
    const { xml, count } = await buildFullSitemap();
    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=3600, stale-while-revalidate=86400",
    );
    res.status(200).send(xml);
    console.log(`[api/sitemap.xml] ${count} URLs`);
  } catch (err) {
    console.error("[api/sitemap.xml]", err);
    res.status(500).send("Sitemap generation failed");
  }
}
