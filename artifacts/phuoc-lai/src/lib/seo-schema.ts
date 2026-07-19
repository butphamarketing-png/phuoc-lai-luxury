const SITE_URL = "https://phunxamvungtau.com";
const OG_IMAGE = `${SITE_URL}/og-share.png`;

export const LOCAL_BUSINESS = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "@id": `${SITE_URL}/#business`,
  name: "Phuoc Lai Luxury",
  alternateName: "Phun xăm Vũng Tàu",
  url: SITE_URL,
  telephone: "+84909203108",
  image: OG_IMAGE,
  logo: OG_IMAGE,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "42a Bà Triệu, Phường 1",
    addressLocality: "Vũng Tàu",
    addressRegion: "Bà Rịa - Vũng Tàu",
    addressCountry: "VN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 10.346,
    longitude: 107.084,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  sameAs: [
    "https://facebook.com/phuoclai.pmu",
    "https://instagram.com/phuoclai.pmu",
    "https://zalo.me/0909203108",
  ],
};

export function breadcrumbSchema(items: { name: string; path: string }[]) {
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

export function articleSchema(opts: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  datePublished?: string;
  author?: string;
  keywords?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.headline,
    description: opts.description.slice(0, 160),
    url: `${SITE_URL}${opts.path}`,
    image: opts.image?.startsWith("http") ? opts.image : opts.image ? `https://www.phunxamvungtau.com${opts.image}` : OG_IMAGE,
    datePublished: opts.datePublished && opts.datePublished !== "—" ? opts.datePublished : "2026-01-01",
    keywords: opts.keywords,
    author: {
      "@type": "Person",
      name: opts.author || "Phuoc Lai",
    },
    publisher: {
      "@type": "Organization",
      name: "Phuoc Lai Luxury",
      logo: { "@type": "ImageObject", url: OG_IMAGE },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${opts.path}`,
    },
  };
}

export function webPageSchema(opts: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description.slice(0, 160),
    url: `${SITE_URL}${opts.path}`,
    isPartOf: { "@id": `${SITE_URL}/#business` },
  };
}

export function faqPageSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
