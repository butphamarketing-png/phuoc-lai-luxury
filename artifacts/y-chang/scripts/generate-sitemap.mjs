import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { buildFullSitemap, loadEnvFiles } from "./sitemap-build.mjs";

const dir = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(dir, "..");

loadEnvFiles(root);

const { xml, count, siteUrl } = await buildFullSitemap();
const out = path.join(root, "public/sitemap.xml");
fs.writeFileSync(out, xml);
console.log(`sitemap.xml: ${count} URLs → ${siteUrl}`);
