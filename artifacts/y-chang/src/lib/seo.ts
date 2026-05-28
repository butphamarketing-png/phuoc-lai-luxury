import { getPublicServicePath, getPublicTrainingPath } from "@/data/catalog";

export const SITE_NAME = "Phuoc Lai Luxury";
export const SITE_TAGLINE = "Phun xăm thẩm mỹ & đào tạo nghề Vũng Tàu";

export const BUSINESS = {
  name: SITE_NAME,
  legalName: "Phuoc Lai Luxury",
  phone: "+84909203108",
  phoneDisplay: "0909 203 108",
  email: "hello@phuoclai.com",
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

const POPUP_VERSION = "20260528";

const STATIC_ROUTES: Record<string, SeoMeta> = {
  "/": {
    title: formatTitle("Phun xăm Vũng Tàu — Phuoc Lai Luxury"),
    description:
      "Phun xăm thẩm mỹ Vũng Tàu: mày, môi, mí AMAZINGBROWS, SANDBROWS, SEXYLIPS, spa & đào tạo nghề tại Phuoc Lai Luxury. Hotline 0909 203 108.",
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
    path: "/dich-vu",
    image: `/pop-up-1.jpg?v=${POPUP_VERSION}`,
  },
  "/dich-vu/phun-xam": {
    title: formatTitle("Dịch vụ phun xăm thẩm mỹ"),
    description:
      "Dịch vụ phun xăm thẩm mỹ chuyên nghiệp tại Phuoc Lai Luxury Vũng Tàu — tư vấn và đặt lịch miễn phí.",
    path: "/dich-vu/phun-xam",
    image: `/pop-up-1.jpg?v=${POPUP_VERSION}`,
  },
  "/dich-vu/spa": {
    title: formatTitle("Dịch vụ spa & chăm sóc da"),
    description:
      "Liệu trình spa, chăm sóc da chuyên sâu, trị mụn và trẻ hóa da tại Phuoc Lai Luxury Vũng Tàu.",
    path: "/dich-vu/spa",
    image: "/studio-interior.png",
  },
  "/dao-tao": {
    title: formatTitle("Đào tạo phun xăm & spa"),
    description:
      "Khóa học phun xăm và spa tại Phuoc Lai Academy — học thật, thực hành thật, hỗ trợ sau khóa cho học viên.",
    path: "/dao-tao",
    image: "/training-1.png",
  },
  "/dao-tao/phun-xam": {
    title: formatTitle("Khóa học phun xăm"),
    description:
      "Đào tạo phun xăm chuyên sâu: sợi AMAZINGBROWS, môi SEXYLIPS, khóa tổng hợp Master tại Vũng Tàu.",
    path: "/dao-tao/phun-xam",
    image: "/training-1.png",
  },
  "/dao-tao/spa": {
    title: formatTitle("Khóa học spa"),
    description:
      "Khóa spa basic, advanced, expert và trị liệu da — chương trình bài bản tại Phuoc Lai Luxury Academy.",
    path: "/dao-tao/spa",
    image: "/training-2.png",
  },
  "/lien-he": {
    title: formatTitle("Liên hệ & đặt lịch"),
    description:
      "Đặt lịch phun xăm hoặc tư vấn khóa học tại 42a Bà Triệu, Vũng Tàu. Hotline 0909 203 108.",
    path: "/lien-he",
    image: DEFAULT_OG_IMAGE,
  },
  "/feedback": {
    title: formatTitle("Phản hồi khách hàng"),
    description:
      "Chia sẻ trải nghiệm dịch vụ và khóa học tại Phuoc Lai Luxury — chúng tôi luôn lắng nghe để hoàn thiện.",
    path: "/feedback",
    image: DEFAULT_OG_IMAGE,
  },
  "/booking": {
    title: formatTitle("Đặt lịch hẹn"),
    description:
      "Đặt lịch phun xăm, spa hoặc tư vấn khóa học nhanh chóng tại Phuoc Lai Luxury Vũng Tàu.",
    path: "/booking",
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
