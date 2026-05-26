import type { DetailSeo } from "@/data/content-details";
import { SITE_NAME } from "@/lib/seo";

export type GenerateDetailSeoInput = {
  title: string;
  categoryLabel?: string;
  metaDescription?: string;
  intro?: string;
};

function buildKeywords(title: string, categoryLabel?: string): string {
  const t = title.toLowerCase().trim();
  const tokens = new Set<string>();
  const add = (s: string) => {
    const v = s.trim();
    if (v) tokens.add(v);
  };

  add(t);
  add(`${t} vũng tàu`);

  const brands = title.match(/[A-Z][A-Z0-9]+/g);
  brands?.forEach((b) => {
    add(b.toLowerCase());
    add(`${b.toLowerCase()} vũng tàu`);
  });

  if (categoryLabel) {
    const c = categoryLabel.toLowerCase();
    add(c);
    add(`${c} vũng tàu`);
  }

  if (t.includes("mày") || t.includes("brow")) {
    add("phun mày vũng tàu");
    add("phun xăm mày");
  }
  if (t.includes("môi") || t.includes("lip")) {
    add("phun môi vũng tàu");
    add("phun xăm môi");
  }
  if (t.includes("mí") || t.includes("mi ")) {
    add("phun mí vũng tàu");
    add("phun viền mí");
  }
  if (t.includes("sợi") || t.includes("khắc")) {
    add("điêu khắc sợi vũng tàu");
    add("microblading vũng tàu");
  }
  if (t.includes("spa") || t.includes("da")) {
    add("spa vũng tàu");
    add("chăm sóc da vũng tàu");
  }

  add("phun xăm vũng tàu");
  add("phuoc lai luxury");
  add("phunxamvungtau");

  return Array.from(tokens).join(", ");
}

/** Tự tạo SEO title, description, keywords từ thông tin bài viết. */
export function generateDetailSeo(input: GenerateDetailSeoInput): DetailSeo {
  const title = input.title.trim();
  const meta = input.metaDescription?.trim();
  const intro = input.intro?.trim().replace(/^["“]|["”]$/g, "");

  const seoTitle = `${title} Vũng Tàu | ${SITE_NAME}`.slice(0, 70);

  const description = (
    meta ||
    intro ||
    `${title} tại ${SITE_NAME} Vũng Tàu — phun xăm & spa chuyên nghiệp. Tư vấn và đặt lịch miễn phí.`
  )
    .replace(/\s+/g, " ")
    .slice(0, 160);

  const keywords = buildKeywords(title, input.categoryLabel).slice(0, 200);

  return { title: seoTitle, description, keywords };
}
