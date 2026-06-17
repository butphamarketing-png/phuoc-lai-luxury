import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = join(root, ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1);
    if (!process.env[key]) process.env[key] = value;
  }
}
const publicDir = join(root, "public");
const distDir = join(root, "dist", "public");

const SITE_URL = process.env.VITE_SITE_URL?.replace(/\/$/, "") || "https://phunxamvungtau.com";
const OG_IMAGE = `${SITE_URL}/og-share.png`;
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;

const STATIC_PAGES = [
  {
    path: "/",
    title: "Phun xăm Vũng Tàu — Phuoc Lai Luxury",
    description:
      "Phun xăm thẩm mỹ Vũng Tàu: mày AMAZINGBROWS, SANDBROWS, môi SEXYLIPS, spa & đào tạo nghề tại Phuoc Lai Luxury. Hotline 0909 203 108.",
    keywords:
      "phun xăm vũng tàu, phun mày vũng tàu, phun môi vũng tàu, spa vũng tàu, phuoc lai luxury, amazingbrows, sandbrows, sexylips",
    jsonLd: [localBusiness(), webPage("Phun xăm Vũng Tàu — Phuoc Lai Luxury", "Studio phun xăm và spa đẳng cấp tại Vũng Tàu.", "/")],
  },
  {
    path: "/ve-chung-toi",
    title: "Về chúng tôi | Phuoc Lai Luxury",
    description: "Câu chuyện Phuoc Lai Luxury — studio phun xăm và spa đẳng cấp tại Vũng Tàu với đội ngũ Master giàu kinh nghiệm.",
    jsonLd: [
      breadcrumb([{ name: "Trang chủ", path: "/" }, { name: "Về chúng tôi", path: "/ve-chung-toi" }]),
      webPage("Về chúng tôi", "Câu chuyện Phuoc Lai Luxury tại Vũng Tàu.", "/ve-chung-toi"),
    ],
  },
  {
    path: "/dich-vu",
    title: "Dịch vụ | Phuoc Lai Luxury",
    description: "Dịch vụ phun xăm thẩm mỹ và spa cao cấp tại Vũng Tàu — AmazingBrows, SandBrows, SexyLips và nhiều hơn.",
    jsonLd: [
      breadcrumb([{ name: "Trang chủ", path: "/" }, { name: "Dịch vụ", path: "/dich-vu" }]),
      webPage("Dịch vụ", "Dịch vụ phun xăm và spa tại Phuoc Lai Luxury.", "/dich-vu"),
    ],
  },
  {
    path: "/dao-tao",
    title: "Đào tạo | Phuoc Lai Luxury",
    description: "Chương trình đào tạo phun xăm thẩm mỹ chuyên sâu tại Vũng Tàu — học thật, làm thật, thành công thật.",
    jsonLd: [
      breadcrumb([{ name: "Trang chủ", path: "/" }, { name: "Đào tạo", path: "/dao-tao" }]),
      webPage("Đào tạo", "Khóa học phun xăm chuyên nghiệp tại Vũng Tàu.", "/dao-tao"),
    ],
  },
  {
    path: "/feedback",
    title: "Feedback | Phuoc Lai Luxury",
    description: "Những lời yêu thương từ khách hàng và học viên Phuoc Lai Luxury Vũng Tàu.",
    jsonLd: [
      breadcrumb([{ name: "Trang chủ", path: "/" }, { name: "Feedback", path: "/feedback" }]),
      webPage("Feedback", "Đánh giá từ khách hàng Phuoc Lai Luxury.", "/feedback"),
    ],
  },
  {
    path: "/lien-he",
    title: "Liên hệ | Phuoc Lai Luxury",
    description: "Liên hệ Phuoc Lai Luxury Vũng Tàu — 42a Bà Triệu. Hotline 0909 203 108.",
    jsonLd: [
      localBusiness(),
      breadcrumb([{ name: "Trang chủ", path: "/" }, { name: "Liên hệ", path: "/lien-he" }]),
      webPage("Liên hệ", "Đặt lịch và tư vấn tại Phuoc Lai Luxury.", "/lien-he"),
    ],
  },
];

function escapeAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function localBusiness() {
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${SITE_URL}/#business`,
    name: "Phuoc Lai Luxury",
    url: SITE_URL,
    telephone: "+84909203108",
    image: OG_IMAGE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "42a Bà Triệu, Phường 1",
      addressLocality: "Vũng Tàu",
      addressRegion: "Bà Rịa - Vũng Tàu",
      addressCountry: "VN",
    },
    geo: { "@type": "GeoCoordinates", latitude: 10.346, longitude: 107.084 },
    sameAs: ["https://facebook.com/phuoclai.pmu", "https://instagram.com/phuoclai.pmu"],
  };
}

function breadcrumb(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function webPage(name, description, path) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description: description.slice(0, 160),
    url: `${SITE_URL}${path}`,
    isPartOf: { "@id": `${SITE_URL}/#business` },
  };
}

function article({ headline, description, path, image, author }) {
  const imageUrl = image?.startsWith("http")
    ? image
    : image
      ? `https://www.phunxamvungtau.com${image}`
      : OG_IMAGE;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description: description.slice(0, 160),
    url: `${SITE_URL}${path}`,
    image: imageUrl,
    datePublished: "2026-01-01",
    author: { "@type": "Person", name: author || "Phuoc Lai" },
    publisher: {
      "@type": "Organization",
      name: "Phuoc Lai Luxury",
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
  };
}

async function fetchSupabase(table, query) {
  if (!SUPABASE_URL || !SUPABASE_KEY) return [];
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
    },
  });
  if (!res.ok) return [];
  return res.json();
}

async function loadDynamicPages() {
  const pages = [];
  const services = await fetchSupabase(
    "site_services",
    "select=slug,title,image_url,author_name,detail_json&status=eq.published&order=sort_order.asc",
  );
  for (const s of services) {
    const seo = s.detail_json?.seo ?? {};
    const intro = s.detail_json?.intro ?? s.title;
    const path = `/dich-vu/${s.slug}`;
    pages.push({
      path,
      title: seo.title || `${s.title} | Phuoc Lai Luxury`,
      description: (seo.description || s.detail_json?.metaDescription || intro).slice(0, 160),
      keywords: seo.keywords,
      image: s.image_url,
      jsonLd: [
        breadcrumb([
          { name: "Trang chủ", path: "/" },
          { name: "Dịch vụ", path: "/dich-vu" },
          { name: s.title, path },
        ]),
        article({
          headline: s.title,
          description: seo.description || intro,
          path,
          image: s.image_url,
          author: s.author_name,
        }),
      ],
    });
  }

  const courses = await fetchSupabase(
    "site_training_courses",
    "select=slug,title,image_url,detail_json&status=neq.hidden&order=sort_order.asc",
  );
  for (const c of courses) {
    const seo = c.detail_json?.seo ?? {};
    const intro = c.detail_json?.intro ?? c.title;
    const path = `/dao-tao/${c.slug}`;
    pages.push({
      path,
      title: seo.title || `${c.title} | Phuoc Lai Luxury`,
      description: (seo.description || c.detail_json?.metaDescription || intro).slice(0, 160),
      keywords: seo.keywords,
      image: c.image_url || c.detail_json?.image,
      jsonLd: [
        breadcrumb([
          { name: "Trang chủ", path: "/" },
          { name: "Đào tạo", path: "/dao-tao" },
          { name: c.title, path },
        ]),
        article({
          headline: c.title,
          description: seo.description || intro,
          path,
          image: c.image_url || c.detail_json?.image,
          author: c.detail_json?.instructor,
        }),
      ],
    });
  }

  return pages;
}

function buildSitemap(pages) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = pages
    .map((p) => {
      const priority = p.path === "/" ? "1.0" : p.path.includes("/dich-vu/") || p.path.includes("/dao-tao/") ? "0.8" : "0.7";
      return `  <url>
    <loc>${SITE_URL}${p.path === "/" ? "/" : p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.path === "/" ? "weekly" : "monthly"}</changefreq>
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

function injectHead(html, page) {
  const canonical = `${SITE_URL}${page.path === "/" ? "/" : page.path}`;
  const image = page.image?.startsWith("http")
    ? page.image
    : page.image
      ? `https://www.phunxamvungtau.com${page.image}`
      : OG_IMAGE;

  let out = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
  out = out.replace(
    /<meta name="description"[^>]*>/,
    `<meta name="description" content="${escapeAttr(page.description)}" />`,
  );
  if (page.keywords) {
    if (out.includes('name="keywords"')) {
      out = out.replace(/<meta name="keywords"[^>]*>/, `<meta name="keywords" content="${escapeAttr(page.keywords)}" />`);
    } else {
      out = out.replace("</head>", `    <meta name="keywords" content="${escapeAttr(page.keywords)}" />\n  </head>`);
    }
  }
  out = out.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${escapeAttr(canonical)}" />`);
  out = out.replace(/<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${escapeAttr(page.title)}" />`);
  out = out.replace(
    /<meta property="og:description"[^>]*>/,
    `<meta property="og:description" content="${escapeAttr(page.description)}" />`,
  );
  out = out.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${escapeAttr(canonical)}" />`);
  out = out.replace(/<meta property="og:image"[^>]*>/, `<meta property="og:image" content="${escapeAttr(image)}" />`);
  out = out.replace(/<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${escapeAttr(page.title)}" />`);
  out = out.replace(
    /<meta name="twitter:description"[^>]*>/,
    `<meta name="twitter:description" content="${escapeAttr(page.description)}" />`,
  );
  out = out.replace(/<meta name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${escapeAttr(image)}" />`);

  const ldScripts = (page.jsonLd || [])
    .map((item) => `    <script type="application/ld+json">${JSON.stringify(item)}</script>`)
    .join("\n");
  out = out.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>\s*/g, "");
  out = out.replace("</head>", `${ldScripts}\n  </head>`);

  return out;
}

function writePrerenderedHtml(template, page, baseDir) {
  const html = injectHead(template, page);
  if (page.path === "/") {
    writeFileSync(join(baseDir, "index.html"), html, "utf8");
    return;
  }
  const dir = join(baseDir, page.path.replace(/^\//, ""));
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), html, "utf8");
}

async function prepare() {
  const dynamic = await loadDynamicPages();
  const pages = [...STATIC_PAGES, ...dynamic];
  const sitemap = buildSitemap(pages);
  writeFileSync(join(publicDir, "sitemap.xml"), sitemap, "utf8");
  console.log(`[seo] sitemap.xml → ${pages.length} URLs`);
}

async function prerender() {
  if (!existsSync(join(distDir, "index.html"))) {
    console.warn("[seo] skip prerender — dist/public/index.html not found");
    return;
  }
  const template = readFileSync(join(distDir, "index.html"), "utf8");
  const dynamic = await loadDynamicPages();
  const pages = [...STATIC_PAGES, ...dynamic];
  for (const page of pages) {
    writePrerenderedHtml(template, page, distDir);
  }
  writeFileSync(join(distDir, "sitemap.xml"), buildSitemap(pages), "utf8");
  console.log(`[seo] prerendered ${pages.length} routes`);
}

const mode = process.argv[2] || "prepare";
if (mode === "prepare") {
  await prepare();
} else if (mode === "prerender") {
  await prerender();
}
