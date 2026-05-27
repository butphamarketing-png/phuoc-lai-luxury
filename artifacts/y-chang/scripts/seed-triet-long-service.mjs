/**
 * Đăng / cập nhật dịch vụ Triệt Lông lên Supabase.
 * Cần: VITE_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY (hoặc đăng nhập admin).
 *
 *   node scripts/seed-triet-long-service.mjs
 */
import { createClient } from "@supabase/supabase-js";
import path from "path";
import { fileURLToPath } from "url";
import { loadEnvFiles } from "./sitemap-build.mjs";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
loadEnvFiles(root);

const COVER =
  "/triet-long/1779891467202_239505211476377159_239505211476377159_a6a9d54ede5632828448ca83659578f1.jpg";

const IMAGES = [
  "/triet-long/1779891467196_239505211476377159_239505211476377159_d5e9e8e11a00efece9f94f0b9663836a.jpg",
  "/triet-long/1779891467220_239505211476377159_239505211476377159_abe37a39ff5bdec7d442a2f500eb0fdf.jpg",
  "/triet-long/1779891467173_239505211476377159_239505211476377159_3fc5360199f301cad2bfc8e35c59ab9d.jpg",
  "/triet-long/1779891467202_239505211476377159_239505211476377159_a6a9d54ede5632828448ca83659578f1.jpg",
  "/triet-long/1779891467206_239505211476377159_239505211476377159_3c81606e73a484d548b29e0925a6b8a8.jpg",
  "/triet-long/1779891467210_239505211476377159_239505211476377159_4a13f236e4ccae94c15eec8f5128f613.jpg",
  "/triet-long/1779891467214_239505211476377159_239505211476377159_5d8a1d190145fe765e965a9bae789718.jpg",
  "/triet-long/1779891467217_239505211476377159_239505211476377159_1a288b373e8d33e7549fcf43d084418c.jpg",
];

const META =
  "Triệt lông tại Phuoc Lai Luxury Vũng Tàu — da mịn, sạch lông lâu dài, quy trình an toàn, phù hợp nách, chân, tay và vùng bikini. Tư vấn miễn phí.";

const INTRO =
  "Triệt lông không chỉ là “cạo hay nhổ” — đó là giải pháp giúp da sạch lông bền hơn, mịn màng và tự tin hơn mỗi ngày. Tại Phuoc Lai Luxury, mỗi liệu trình được tư vấn theo vùng da, độ nhạy cảm và mong muốn của bạn (nách, chân, tay, bikini…), kết hợp kỹ thuật chuyên sâu và chăm sóc hậu liệu trình để hạn chế kích ứng, bảo vệ làn da Vũng Tàu dưới nắng nóng.";

function buildBodyHtml() {
  const img = (src, alt) =>
    `<p><img src="${src}" alt="${alt}" /></p>`;
  return `<h2>Triệt lông tại Phuoc Lai Luxury</h2>
<p>Triệt lông chuyên sâu giúp giảm lông rõ rệt theo từng buổi, da mịn và sạch hơn so với cạo/nhổ tại nhà. Phù hợp khách bận rộn, muốn nách – chân – tay luôn gọn gàng, tự tin mặc váy, áo ba lỗ hoặc đồ bơi.</p>
<h2>Kết quả thực tế — vùng nách</h2>
${img(IMAGES[0], "Triệt lông nách trước và sau tại Phuoc Lai Luxury")}
${img(IMAGES[1], "Triệt lông nách kết quả mịn da")}
<h2>Kết quả thực tế — chân &amp; bắp chân</h2>
${img(IMAGES[2], "Triệt lông chân trước và sau")}
${img(IMAGES[3], "Triệt lông bắp chân da mịn")}
${img(IMAGES[4], "Triệt lông chân kết quả")}
<h2>Thêm hình ảnh khách hàng thực tế</h2>
${img(IMAGES[5], "Triệt lông Phuoc Lai Luxury Vũng Tàu")}
${img(IMAGES[6], "Triệt lông da sạch lông")}
${img(IMAGES[7], "Triệt lông kết quả before after")}
<h2>Quy trình &amp; lưu ý</h2>
<ul>
<li>Tư vấn vùng cần triệt và lịch trình phù hợp</li>
<li>Làm sạch – bảo vệ da trước khi thực hiện</li>
<li>Thực hiện theo liệu trình, theo dõi phản ứng da</li>
<li>Hướng dẫn chăm sóc sau buổi: tránh nắng gắt, không chà xát mạnh</li>
</ul>
<h2>Đặt lịch tư vấn</h2>
<p>Hotline / Zalo: <strong>0909 203 108</strong> — Phuoc Lai Luxury, Vũng Tàu. Nhắn vùng cần triệt (nách / chân / tay / bikini) để được báo giá và lịch phù hợp.</p>`;
}

const detail = {
  title: "Triệt Lông",
  category: "Spa",
  image: COVER,
  date: "26/05/2026",
  author: "Phuoc Lai",
  readTime: "5 phút đọc",
  intro: INTRO,
  metaDescription: META,
  bodyHtml: buildBodyHtml(),
  seo: {
    title: "Triệt Lông Vũng Tàu | Phuoc Lai Luxury",
    description: META.slice(0, 160),
    keywords:
      "triệt lông vũng tàu, triệt lông nách, triệt lông chân, spa vũng tàu, phuoc lai luxury",
  },
  sections: [],
};

const row = {
  id: "svc-triet-long",
  slug: "triet-long",
  title: "Triệt Lông",
  category: "spa",
  category_label: "Spa",
  image_url: COVER,
  price_display: "Liên hệ tư vấn",
  author_name: "Phuoc Lai",
  status: "published",
  bullets: [
    "Triệt nách — da mịn, giảm mùi",
    "Triệt chân & bắp chân",
    "Triệt tay, bikini (tư vấn)",
    "Liệu trình an toàn, theo dõi sát",
  ],
  detail_json: detail,
  sort_order: 10,
  updated_at: new Date().toISOString(),
};

const url = process.env.VITE_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.VITE_SUPABASE_ANON_KEY;
const adminEmail = process.env.SUPABASE_ADMIN_EMAIL;
const adminPassword = process.env.SUPABASE_ADMIN_PASSWORD;

if (!url) {
  console.error("Thiếu VITE_SUPABASE_URL — chạy supabase/seed-triet-long.sql trong SQL Editor.");
  process.exit(1);
}

const key = serviceKey || anonKey;
if (!key) {
  console.error("Thiếu SUPABASE_SERVICE_ROLE_KEY hoặc VITE_SUPABASE_ANON_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, {
  auth: { persistSession: false, autoRefreshToken: false },
});

if (!serviceKey && adminEmail && adminPassword) {
  const { error: authErr } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });
  if (authErr) {
    console.error("Đăng nhập admin thất bại:", authErr.message);
    process.exit(1);
  }
}

const { data, error } = await supabase
  .from("site_services")
  .upsert(row, { onConflict: "slug" });

if (error) {
  console.error("Lỗi upsert:", error.message);
  console.error("→ Chạy file supabase/seed-triet-long.sql trong Supabase SQL Editor.");
  process.exit(1);
}

console.log("✓ Đã đăng dịch vụ Triệt Lông (published)");
console.log("  URL: /dich-vu/triet-long");
console.log(data);
