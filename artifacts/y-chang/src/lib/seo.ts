import { getPublicServicePath, getPublicTrainingPath } from "@/data/catalog";
import { CONTACT_EMAIL } from "@/lib/contact";
import { POPUP_IMAGES } from "@/lib/popup-images";

export const SITE_NAME = "Phuoc Lai Luxury";
export const SITE_TAGLINE = "Phun xăm thẩm mỹ & đào tạo nghề Vũng Tàu";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Phuoc Lai Luxury",
  phone: "+84909203108",
  phoneDisplay: "0909 203 108",
  email: CONTACT_EMAIL,
  streetAddress: "42a Bà Triệu, Phường 1",
  addressLocality: "Vũng Tàu",
  addressRegion: "Bà Rịa - Vũng Tàu",
  postalCode: "790000",
  addressCountry: "VN",
  openingHours: "Mo-Su 09:00-19:00",
  facebook: "https://facebook.com/phuoclai.pmu",
  instagram: "https://instagram.com/phuoclai.pmu",
  zalo: "https://zalo.me/0909203108",
} as const;

const DEFAULT_SITE_URL = "https://phunxamvungtau.com";

export function getSiteUrl(): string {
  const raw = import.meta.env.VITE_SITE_URL?.trim();
  if (!raw) return DEFAULT_SITE_URL;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(path: string): string {
  const base = getSiteUrl();
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Ảnh chia sẻ Zalo/Facebook — logo trên nền tối (og-share.png) */
export const DEFAULT_OG_IMAGE = "/og-share.png";

export type SeoMeta = {
  title: string;
  description: string;
  keywords?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function formatTitle(pageTitle: string): string {
  if (pageTitle.includes(SITE_NAME)) return pageTitle;
  return `${pageTitle} | ${SITE_NAME}`;
}

const STATIC_ROUTES: Record<string, SeoMeta> = {
  "/": {
    title: formatTitle("Phun xăm Vũng Tàu — Phuoc Lai Luxury"),
    description:
      "Phun xăm thẩm mỹ Vũng Tàu: mày, môi, mí AMAZINGBROWS, SANDBROWS, SEXYLIPS, spa & đào tạo nghề tại Phuoc Lai Luxury. Hotline 0909 203 108.",
    keywords:
      "phun xăm vũng tàu, phun mày vũng tàu, phun môi vũng tàu, spa vũng tàu, phuoc lai luxury, amazingbrows, sandbrows, sexylips",
    path: "/",
    image: DEFAULT_OG_IMAGE,
  },
  "/ve-chung-toi": {
    title: formatTitle("Về chúng tôi"),
    description:
      "Câu chuyện Phuoc Lai Luxury — studio phun xăm và spa đẳng cấp tại Vũng Tàu với đội ngũ Master giàu kinh nghiệm.",
    path: "/ve-chung-toi",
    image: "/slideshow-1.png",
  },
  "/dich-vu": {
    title: formatTitle("Dịch vụ phun xăm & spa"),
    description:
      "Chọn dịch vụ phun xăm thẩm mỹ hoặc spa & chăm sóc da tại Phuoc Lai Luxury Vũng Tàu — tư vấn và đặt lịch miễn phí.",
    keywords:
      "dịch vụ phun xăm vũng tàu, spa vũng tàu, chăm sóc da vũng tàu, phuoc lai luxury",
    path: "/dich-vu",
    image: POPUP_IMAGES.one,
  },
  "/dao-tao": {
    title: formatTitle("Đào tạo phun xăm & spa"),
    description:
      "Khóa học phun xăm và spa tại Phuoc Lai Academy — học thật, thực hành thật, hỗ trợ sau khóa cho học viên.",
    keywords:
      "đào tạo phun xăm vũng tàu, học phun mày vũng tàu, khóa spa vũng tàu, phuoc lai academy",
    path: "/dao-tao",
    image: "/training-1.png",
  },
  "/lien-he": {
    title: formatTitle("Liên hệ & đặt lịch"),
    description:
      "Đặt lịch phun xăm hoặc tư vấn khóa học tại 42a Bà Triệu, Vũng Tàu. Hotline 0909 203 108.",
    keywords:
      "đặt lịch phun xăm vũng tàu, liên hệ phuoc lai luxury, booking spa vũng tàu",
    path: "/lien-he",
    image: DEFAULT_OG_IMAGE,
  },
  "/feedback": {
    title: formatTitle("Video cảm nhận khách hàng"),
    description:
      "Xem video cảm nhận thực tế từ khách hàng Phuoc Lai Luxury — phun xăm, spa và đào tạo tại Vũng Tàu.",
    path: "/feedback",
    image: DEFAULT_OG_IMAGE,
  },
  "/booking": {
    title: formatTitle("Đặt lịch hẹn"),
    description:
      "Đặt lịch phun xăm, spa hoặc tư vấn khóa học nhanh chóng tại Phuoc Lai Luxury Vũng Tàu.",
    path: "/lien-he",
    image: DEFAULT_OG_IMAGE,
  },
};

const SERVICE_CATEGORY_SLUGS = new Set(["phun-xam", "spa"]);
const TRAINING_CATEGORY_SLUGS = new Set(["phun-xam", "spa"]);

export function isServiceDetailPath(pathname: string): string | null {
  const match = pathname.match(/^\/dich-vu\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];
  if (SERVICE_CATEGORY_SLUGS.has(slug)) return null;
  return slug;
}

export function isTrainingDetailPath(pathname: string): string | null {
  const match = pathname.match(/^\/dao-tao\/([^/]+)$/);
  if (!match) return null;
  const slug = match[1];
  if (TRAINING_CATEGORY_SLUGS.has(slug)) return null;
  return slug;
}

export function getStaticSeo(pathname: string): SeoMeta | null {
  if (STATIC_ROUTES[pathname]) return STATIC_ROUTES[pathname];

  return {
    title: formatTitle("Trang không tìm thấy"),
    description: "Trang bạn truy cập không tồn tại. Quay lại trang chủ Phuoc Lai Luxury.",
    path: pathname,
    noindex: true,
  };
}

export function getAdminSeo(): SeoMeta {
  return {
    title: "Admin | Phuoc Lai Luxury",
    description: "Hệ thống quản trị nội dung website Phuoc Lai Luxury.",
    path: "/adminbp",
    noindex: true,
  };
}

/** Trang tĩnh (bài CMS thêm qua scripts/generate-sitemap.mjs hoặc /api/sitemap.xml) */
export function getSitemapPaths(): string[] {
  return Object.keys(STATIC_ROUTES);
}

export function getPublicContentPaths(
  services: { slug: string; status: string }[],
  training: { slug: string; status: string }[],
): string[] {
  const staticPaths = Object.keys(STATIC_ROUTES);
  const servicePaths = services
    .filter((s) => s.status === "published")
    .map((s) => getPublicServicePath(s.slug));
  const trainingPaths = training
    .filter((c) => c.status !== "hidden")
    .map((c) => getPublicTrainingPath(c.slug));
  return [...new Set([...staticPaths, ...servicePaths, ...trainingPaths])];
}

export function buildLocalBusinessJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${siteUrl}/#organization`,
    name: BUSINESS.name,
    url: siteUrl,
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      addressLocality: BUSINESS.addressLocality,
      addressRegion: BUSINESS.addressRegion,
      postalCode: BUSINESS.postalCode,
      addressCountry: BUSINESS.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 10.346,
      longitude: 107.084,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    sameAs: [BUSINESS.facebook, BUSINESS.instagram, BUSINESS.zalo],
    priceRange: "$$",
  };
}

export function buildWebSiteJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    url: siteUrl,
    name: SITE_NAME,
    description: SITE_TAGLINE,
    inLanguage: "vi-VN",
    publisher: { "@id": `${siteUrl}/#organization` },
  };
}

export function buildServiceJsonLd(
  name: string,
  description: string,
  path: string,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    provider: { "@id": `${getSiteUrl()}/#organization` },
    areaServed: {
      "@type": "City",
      name: "Vũng Tàu",
    },
  };
}

export function buildCourseJsonLd(
  name: string,
  description: string,
  path: string,
  image?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    provider: { "@id": `${getSiteUrl()}/#organization` },
    inLanguage: "vi",
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function buildItemListJsonLd(params: {
  name: string;
  description?: string;
  items: { name: string; path: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: params.name,
    description: params.description,
    numberOfItems: params.items.length,
    itemListElement: params.items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function buildArticleJsonLd(params: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  author?: string;
}) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: params.headline,
    description: params.description,
    url: absoluteUrl(params.path),
    image: params.image ? absoluteUrl(params.image) : absoluteUrl(DEFAULT_OG_IMAGE),
    datePublished: params.datePublished,
    author: {
      "@type": "Person",
      name: params.author || BUSINESS.name,
    },
    publisher: { "@id": `${siteUrl}/#organization` },
    inLanguage: "vi-VN",
  };
}

export function getStaticBreadcrumbs(pathname: string): BreadcrumbItem[] | null {
  const crumbs: BreadcrumbItem[] = [{ name: "Trang chủ", path: "/" }];
  if (pathname === "/") return null;

  const map: Record<string, BreadcrumbItem[]> = {
    "/ve-chung-toi": [...crumbs, { name: "Về chúng tôi", path: "/ve-chung-toi" }],
    "/dich-vu": [...crumbs, { name: "Dịch vụ", path: "/dich-vu" }],
    "/dao-tao": [...crumbs, { name: "Đào tạo", path: "/dao-tao" }],
    "/lien-he": [...crumbs, { name: "Liên hệ", path: "/lien-he" }],
    "/feedback": [...crumbs, { name: "Feedback", path: "/feedback" }],
  };

  if (map[pathname]) return map[pathname];
  if (pathname.startsWith("/dich-vu/")) {
    return [
      ...crumbs,
      { name: "Dịch vụ", path: "/dich-vu" },
      { name: "Chi tiết dịch vụ", path: pathname },
    ];
  }
  if (pathname.startsWith("/dao-tao/")) {
    return [
      ...crumbs,
      { name: "Đào tạo", path: "/dao-tao" },
      { name: "Chi tiết khóa học", path: pathname },
    ];
  }
  return null;
}
