/**
 * Generates 100 VI + 100 EN SEO-optimized articles for Phuoc Lai Luxury.
 * Each article is built around ONE focus keyword with secondary/LSI terms.
 * Run: node scripts/generate-news.mjs
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "../src/data");

const BRAND = "Phuoc Lai Luxury";
const ADDR_VI = "42a Bà Triệu, Phường 1, Vũng Tàu";
const ADDR_EN = "42a Ba Trieu, Ward 1, Vung Tau";
const PHONE = "0909 203 108";

const IMAGES = {
  brows: ["/portfolio-brows.png", "/service-1.png", "/hero-1.png", "/ref1.png", "/images/portfolio-brows.png"],
  lips: ["/portfolio-lips.png", "/service-2.png", "/hero-2.png", "/images/portfolio-lips.png"],
  eyes: ["/portfolio-eyeliner.png", "/service-3.png", "/hero-3.png", "/images/portfolio-eyeliner.png"],
  training: ["/training-1.png", "/training-2.png", "/training-3.png", "/training-4.png", "/instructor.png", "/training.png"],
  spa: ["/service-4.png", "/intro-interior.png", "/hero-4.png", "/hero-bg.png"],
  studio: ["/intro-interior.png", "/artist-phuoclai.png", "/artist-quynhtam.png", "/hero-bg-light.png", "/ref2.png"],
  review: ["/avatar-1.png", "/avatar-2.png", "/avatar-3.png", "/artist-phuoclai.png"],
};

function pickImage(keyword, i) {
  const k = keyword.toLowerCase();
  let pool = IMAGES.studio;
  if (/mày|brows|microblad|eyebrow|ombre|sandbrows|amazing|điêu khắc|hairstroke|powder|nano|sợi/.test(k)) pool = IMAGES.brows;
  else if (/môi|lip|sexy/.test(k)) pool = IMAGES.lips;
  else if (/mí|eyeliner|lash|eyelid/.test(k)) pool = IMAGES.eyes;
  else if (/học|đào tạo|course|training|academy|school|masterclass|certificate/.test(k)) pool = IMAGES.training;
  else if (/spa|chăm sóc|aftercare|dưỡng|kiêng/.test(k)) pool = IMAGES.spa;
  else if (/review|feedback|khách hàng/.test(k)) pool = IMAGES.review;
  return pool[i % pool.length];
}

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function dateFor(i) {
  const d = new Date(Date.UTC(2026, 0, 5));
  d.setUTCDate(d.getUTCDate() + i);
  return d.toISOString().slice(0, 10);
}

function cap(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function trimMeta(s, max = 155) {
  const t = s.replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  return t.slice(0, max - 1).replace(/\s+\S*$/, "") + "…";
}

function categoryVi(kw) {
  const k = kw.toLowerCase();
  if (/học|đào tạo/.test(k)) return "Đào tạo";
  if (/môi/.test(k)) return "Phun môi";
  if (/mí/.test(k)) return "Phun mí";
  if (/mày|điêu khắc|sandbrows|amazing/.test(k)) return "Phun mày";
  if (/spa|chăm sóc|dưỡng|kiêng/.test(k)) return "Chăm sóc";
  if (/review|feedback/.test(k)) return "Review";
  return "Phun xăm";
}

function categoryEn(kw) {
  const k = kw.toLowerCase();
  if (/course|training|academy|school|learn|masterclass|certificate/.test(k)) return "Training";
  if (/lip/.test(k)) return "Lip blush";
  if (/eyeliner|lash|eyelid/.test(k)) return "Eyeliner";
  if (/brow|microblad|eyebrow|ombre|sandbrows|amazing|powder|nano|hairstroke/.test(k)) return "Eyebrows";
  if (/spa|aftercare/.test(k)) return "Aftercare";
  if (/review/.test(k)) return "Reviews";
  return "Permanent makeup";
}

/** Secondary / LSI keywords by category (VI) */
function secondaryVi(keyword, cat) {
  const base = [keyword, BRAND, "phun xăm Vũng Tàu", "Bà Rịa Vũng Tàu", "Phước Hải", ADDR_VI, PHONE];
  const byCat = {
    "Phun mày": ["phun mày Vũng Tàu", "AMAZINGBROWS", "SANDBROWS", "điêu khắc chân mày", "powder brows", "ombre brows"],
    "Phun môi": ["phun môi Vũng Tàu", "SEXYLIPS", "phun môi tự nhiên", "làm hồng môi", "lip blush"],
    "Phun mí": ["phun mí Vũng Tàu", "phun mí mở tròng", "phun mí mắt"],
    "Đào tạo": ["học phun xăm Vũng Tàu", "đào tạo phun xăm", "khóa học AMAZINGBROWS", "học nghề thẩm mỹ"],
    "Chăm sóc": ["chăm sóc sau phun xăm", "spa mặt Vũng Tàu", "dưỡng sau phun"],
    Review: ["review phun xăm Vũng Tàu", "feedback khách hàng", "đánh giá Phuoc Lai"],
    "Phun xăm": ["studio phun xăm Vũng Tàu", "phun xăm thẩm mỹ", "đặt lịch phun xăm"],
  };
  const extra = byCat[cat] || byCat["Phun xăm"];
  return [...new Set([...base, ...extra])].slice(0, 12);
}

function secondaryEn(keyword, cat) {
  const base = [keyword, BRAND, "permanent makeup Vung Tau", "Ba Ria Vung Tau", "Phuoc Hai", ADDR_EN, PHONE];
  const byCat = {
    Eyebrows: ["microblading Vung Tau", "AMAZINGBROWS", "SANDBROWS", "powder brows", "ombre brows", "hairstroke"],
    "Lip blush": ["lip blush Vung Tau", "SEXYLIPS", "permanent lip color", "natural lip blush"],
    Eyeliner: ["permanent eyeliner Vung Tau", "lash line enhancement", "eyeliner tattoo"],
    Training: ["PMU training Vung Tau", "microblading course", "permanent makeup academy"],
    Aftercare: ["PMU aftercare", "lip blush aftercare", "facial spa Vung Tau"],
    Reviews: ["PMU reviews Vung Tau", "Phuoc Lai Luxury reviews"],
    "Permanent makeup": ["PMU studio Vung Tau", "cosmetic tattoo", "book permanent makeup"],
  };
  const extra = byCat[cat] || byCat["Permanent makeup"];
  return [...new Set([...base, ...extra])].slice(0, 12);
}

/** SEO title: focus keyword near the front, ≤60 chars preferred */
function seoTitleVi(keyword, i) {
  const patterns = [
    () => `${cap(keyword)} | ${BRAND}`,
    () => `${cap(keyword)} uy tín — giá & quy trình`,
    () => `${cap(keyword)}: địa chỉ ${ADDR_VI.split(",")[0]}`,
    () => `${cap(keyword)} đẹp, tự nhiên 2026`,
    () => `${cap(keyword)} — đặt lịch ${PHONE}`,
  ];
  let t = patterns[i % patterns.length]();
  if (t.length > 62) t = `${cap(keyword)} | ${BRAND}`;
  if (t.length > 62) t = cap(keyword).slice(0, 58);
  return t;
}

function seoTitleEn(keyword, i) {
  const patterns = [
    () => `${cap(keyword)} | ${BRAND}`,
    () => `${cap(keyword)}: price, process & tips`,
    () => `Best ${keyword} near ${ADDR_EN.split(",")[2]?.trim() || "Vung Tau"}`,
    () => `${cap(keyword)} — natural results 2026`,
    () => `${cap(keyword)} | Book ${PHONE}`,
  ];
  let t = patterns[i % patterns.length]();
  if (t.length > 62) t = `${cap(keyword)} | ${BRAND}`;
  if (t.length > 62) t = cap(keyword).slice(0, 58);
  return t;
}

function seoDescVi(keyword, secondary) {
  const s2 = secondary.find((x) => x !== keyword && !x.includes("42a") && x !== PHONE) || "phun xăm thẩm mỹ";
  return trimMeta(
    `${cap(keyword)} tại ${BRAND}. Tư vấn miễn phí, mực chuẩn, bảo hành rõ. Gợi ý thêm: ${s2}. Địa chỉ ${ADDR_VI}. Hotline ${PHONE}.`,
  );
}

function seoDescEn(keyword, secondary) {
  const s2 = secondary.find((x) => x !== keyword && !x.includes("42a") && x !== PHONE) || "cosmetic tattoo";
  return trimMeta(
    `${cap(keyword)} at ${BRAND}. Free consult, sterile process, clear warranty. Related: ${s2}. ${ADDR_EN}. Call ${PHONE}.`,
  );
}

const KEYWORDS_VI = [
  "phun xăm Vũng Tàu",
  "phun xăm Bà Rịa Vũng Tàu",
  "phun xăm Phước Hải",
  "phun xăm thẩm mỹ Vũng Tàu",
  "địa chỉ phun xăm Vũng Tàu",
  "phun xăm gần Phước Hải",
  "phun xăm Bà Rịa",
  "salon phun xăm Vũng Tàu",
  "studio phun xăm Vũng Tàu",
  "spa phun xăm Vũng Tàu",
  "phun xăm uy tín Vũng Tàu",
  "phun xăm đẹp Vũng Tàu",
  "phun xăm giá rẻ Vũng Tàu",
  "bảng giá phun xăm Vũng Tàu",
  "đặt lịch phun xăm Vũng Tàu",
  "hotline phun xăm Vũng Tàu",
  "phun xăm 42a Bà Triệu Vũng Tàu",
  "Phuoc Lai Luxury Vũng Tàu",
  "phun xăm Master Phước Vũng Tàu",
  "phun xăm Master Nhung Vũng Tàu",
  "trung tâm phun xăm BRVT",
  "phun xăm TP Vũng Tàu",
  "phun xăm Phường 1 Vũng Tàu",
  "phun xăm gần tôi Vũng Tàu",
  "review phun xăm Vũng Tàu",
  "phun mày Vũng Tàu",
  "phun lông mày Vũng Tàu",
  "điêu khắc chân mày Vũng Tàu",
  "phun mày powder brows Vũng Tàu",
  "phun mày ombre Vũng Tàu",
  "phun mày AMAZINGBROWS Vũng Tàu",
  "phun mày SANDBROWS Vũng Tàu",
  "phun mày hairstroke Vũng Tàu",
  "phun mày tự nhiên Vũng Tàu",
  "sửa mày hỏng Vũng Tàu",
  "xóa mày laser Vũng Tàu",
  "phun mày bao nhiêu tiền Vũng Tàu",
  "phun mày đẹp Vũng Tàu",
  "phun mày Phước Hải",
  "điêu khắc mày Bà Rịa Vũng Tàu",
  "phun mày cho da dầu Vũng Tàu",
  "phun mày giữ màu lâu Vũng Tàu",
  "chân mày thêu sợi Vũng Tàu",
  "phun mày trước sau Vũng Tàu",
  "học phun mày Vũng Tàu",
  "phun môi Vũng Tàu",
  "phun môi thẩm mỹ Vũng Tàu",
  "phun môi SEXYLIPS Vũng Tàu",
  "phun môi màu hồng Vũng Tàu",
  "phun môi tự nhiên Vũng Tàu",
  "phun môi Collagen Vũng Tàu",
  "sửa môi thâm Vũng Tàu",
  "phun môi giá bao nhiêu Vũng Tàu",
  "phun môi Phước Hải",
  "phun môi Bà Rịa",
  "làm hồng môi Vũng Tàu",
  "phun môi không sưng Vũng Tàu",
  "phun môi giữ màu lâu Vũng Tàu",
  "phun môi trước sau Vũng Tàu",
  "học phun môi Vũng Tàu",
  "phun mí Vũng Tàu",
  "phun mí mở tròng Vũng Tàu",
  "phun mí mắt Vũng Tàu",
  "phun mí trên dưới Vũng Tàu",
  "phun mí Phước Hải",
  "phun xăm mí Bà Rịa Vũng Tàu",
  "spa mặt Vũng Tàu",
  "chăm sóc da sau phun xăm Vũng Tàu",
  "dưỡng môi sau phun Vũng Tàu",
  "liệu trình spa phun xăm Vũng Tàu",
  "học phun xăm Vũng Tàu",
  "đào tạo phun xăm Vũng Tàu",
  "khóa học phun xăm Bà Rịa Vũng Tàu",
  "học nghề phun mày Vũng Tàu",
  "học phun môi Vũng Tàu",
  "trung tâm dạy phun xăm Vũng Tàu",
  "học phun xăm uy tín Vũng Tàu",
  "học phun xăm cấp chứng chỉ Vũng Tàu",
  "học phun xăm Phước Hải",
  "đào tạo Master phun xăm Vũng Tàu",
  "khóa học AMAZINGBROWS Vũng Tàu",
  "học điêu khắc chân mày Vũng Tàu",
  "học phun xăm từ cơ bản Vũng Tàu",
  "học nghề thẩm mỹ Vũng Tàu",
  "thực hành phun xăm Vũng Tàu",
  "phun xăm Vũng Tàu tốt nhất",
  "phun xăm Vũng Tàu nên chọn ở đâu",
  "phun xăm an toàn Vũng Tàu",
  "phun xăm không đau Vũng Tàu",
  "phun xăm có bảo hành Vũng Tàu",
  "so sánh phun xăm Vũng Tàu",
  "feedback phun xăm Vũng Tàu",
  "khách hàng review Phuoc Lai Luxury",
  "phun xăm dành cho người mới Vũng Tàu",
  "lịch hẹn phun xăm cuối tuần Vũng Tàu",
  "phun xăm nữ Vũng Tàu",
  "phun xăm đi biển Phước Hải",
  "phun xăm gần Long Hải Phước Hải",
  "phun xăm Đất Đỏ Phước Hải",
  "phun xăm Xuyên Mộc Bà Rịa Vũng Tàu",
];

const KEYWORDS_EN = [
  "permanent makeup Vung Tau",
  "permanent makeup Ba Ria Vung Tau",
  "PMU Vung Tau",
  "eyebrow tattoo Vung Tau",
  "lip blush Vung Tau",
  "microblading Vung Tau",
  "powder brows Vung Tau",
  "ombre brows Vung Tau",
  "cosmetic tattoo Vung Tau",
  "permanent makeup Phuoc Hai",
  "best PMU studio Vung Tau",
  "permanent makeup near Phuoc Hai",
  "beauty salon permanent makeup Vung Tau",
  "PMU artist Vung Tau",
  "permanent makeup clinic BRVT",
  "Phuoc Lai Luxury Vung Tau",
  "book permanent makeup Vung Tau",
  "permanent makeup price Vung Tau",
  "permanent makeup reviews Vung Tau",
  "safe permanent makeup Vung Tau",
  "natural looking PMU Vung Tau",
  "permanent makeup address Vung Tau",
  "cosmetic tattoo studio Ba Ria",
  "PMU near me Vung Tau",
  "beauty tattoo Vung Tau",
  "eyebrow microblading Vung Tau",
  "eyebrow powder brows Vung Tau",
  "ombre powder brows Vung Tau",
  "nano brows Vung Tau",
  "hairstroke brows Vung Tau",
  "AMAZINGBROWS Vung Tau",
  "SANDBROWS Vung Tau",
  "natural eyebrow tattoo Vung Tau",
  "eyebrow correction Vung Tau",
  "bad brow tattoo fix Vung Tau",
  "laser brow removal Vung Tau",
  "eyebrow tattoo cost Vung Tau",
  "best brows Vung Tau",
  "microblading Phuoc Hai",
  "powder brows Ba Ria Vung Tau",
  "oily skin powder brows Vung Tau",
  "long lasting eyebrow tattoo Vung Tau",
  "soft shaded brows Vung Tau",
  "before after brows Vung Tau",
  "learn microblading Vung Tau",
  "lip blush tattoo Vung Tau",
  "permanent lip color Vung Tau",
  "SEXYLIPS Vung Tau",
  "natural lip blush Vung Tau",
  "pink lip blush Vung Tau",
  "lip neutralization Vung Tau",
  "dark lip correction Vung Tau",
  "lip blush price Vung Tau",
  "lip blush Phuoc Hai",
  "lip tattoo Ba Ria",
  "soft lip tint tattoo Vung Tau",
  "low swelling lip blush Vung Tau",
  "long lasting lip blush Vung Tau",
  "lip blush before after Vung Tau",
  "lip blush training Vung Tau",
  "permanent eyeliner Vung Tau",
  "lash line enhancement Vung Tau",
  "eyeliner tattoo Vung Tau",
  "upper lower eyeliner PMU Vung Tau",
  "eyeliner tattoo Phuoc Hai",
  "eyelid tattoo Ba Ria Vung Tau",
  "facial spa Vung Tau",
  "aftercare permanent makeup Vung Tau",
  "lip blush aftercare Vung Tau",
  "PMU spa treatment Vung Tau",
  "permanent makeup course Vung Tau",
  "PMU training Vung Tau",
  "microblading course Ba Ria Vung Tau",
  "eyebrow tattoo training Vung Tau",
  "lip blush course Vung Tau",
  "PMU academy Vung Tau",
  "certified PMU training Vung Tau",
  "permanent makeup certificate Vung Tau",
  "PMU class Phuoc Hai",
  "master PMU training Vung Tau",
  "AMAZINGBROWS course Vung Tau",
  "microblading masterclass Vung Tau",
  "beginner PMU course Vung Tau",
  "beauty tattoo school Vung Tau",
  "hands-on PMU training Vung Tau",
  "best permanent makeup Vung Tau",
  "where to get PMU in Vung Tau",
  "hygienic permanent makeup Vung Tau",
  "painless microblading Vung Tau",
  "warranty permanent makeup Vung Tau",
  "top rated PMU Vung Tau",
  "Phuoc Lai Luxury reviews",
  "first time permanent makeup Vung Tau",
  "weekend PMU appointment Vung Tau",
  "women’s permanent makeup Vung Tau",
  "PMU near Long Hai beach",
  "permanent makeup near Phuoc Hai beach",
  "PMU Dat Do Phuoc Hai",
  "permanent makeup Xuyen Moc",
  "English speaking PMU Vung Tau",
];

function buildViArticle(keyword, i) {
  const cat = categoryVi(keyword);
  const secondary = secondaryVi(keyword, cat);
  const title = seoTitleVi(keyword, i);
  const h1 = `${cap(keyword)} — hướng dẫn chi tiết tại ${BRAND}`;
  const description = seoDescVi(keyword, secondary);
  const keywordsMeta = secondary.join(", ");
  const image = pickImage(keyword, i);
  const imageAlt = `${cap(keyword)} tại ${BRAND} — hình minh họa dịch vụ ${cat.toLowerCase()}`;
  const slug = `${slugify(keyword)}-${i + 1}`;
  const s2 = secondary[1] || "phun xăm thẩm mỹ";
  const s3 = secondary[2] || "AMAZINGBROWS";

  const tips = [
    `Khách tìm ${keyword} từ Phước Hải / Long Hải nên đặt lịch sáng cuối tuần.`,
    `Với ${keyword}, da dầu hoặc hay ra biển thường hợp powder/ombre hơn sợi mỏng.`,
    `Case sửa màu cũ khi làm ${keyword} cần gửi ảnh trước để Master ước lượng thời gian.`,
    `Lịch ${keyword} cuối tuần kín nhanh — book trước 3–5 ngày.`,
    `48 giờ đầu sau ${keyword}: giữ khô, không trang điểm vùng vừa làm.`,
  ];

  const sections = [
    {
      heading: `${cap(keyword)} là gì và ai nên làm?`,
      paragraphs: [
        `${cap(keyword)} là nhu cầu tìm kiếm cao tại Bà Rịa Vũng Tàu khi khách muốn kết quả tự nhiên, bền màu và quy trình an toàn. Bài viết này tập trung đúng từ khóa “${keyword}”, đồng thời giải thích liên quan tới ${s2} và ${s3}.`,
        `Tại ${BRAND} (${ADDR_VI}), tư vấn form mặt – màu da diễn ra trước khi lên mực. ${tips[i % tips.length]} Mục tiêu của ${keyword} không phải “đậm nổi” ngày đầu, mà là dáng đẹp sau khi lành da.`,
      ],
    },
    {
      heading: `Kỹ thuật ${keyword} phù hợp từng loại da`,
      paragraphs: [
        `Tùy tình trạng da và mong muốn, Master có thể đề xuất AMAZINGBROWS, SANDBROWS, SEXYLIPS hoặc phun mí. Khi nghiên cứu ${keyword}, hãy nêu rõ: đã từng phun chưa, da dầu/khô, và ngân sách — giúp chọn đúng kỹ thuật thay vì làm theo xu hướng chung.`,
        `Khách quan tâm ${s2} thường kết hợp tư vấn cùng ${keyword} trong một buổi. Studio phục vụ khách từ TP Vũng Tàu, Phước Hải, Đất Đỏ, Xuyên Mộc với lịch linh hoạt.`,
      ],
    },
    {
      heading: `Quy trình ${keyword} chuẩn 5 bước tại studio`,
      paragraphs: [
        `1) Tư vấn & khai báo dị ứng. 2) Phân tích form – màu cho liệu trình ${keyword}. 3) Vẽ phác thảo và chốt. 4) Vô trùng – ủ tê – thực hiện. 5) Hướng dẫn chăm sóc + lịch dặm.`,
        `Checklist chọn địa chỉ ${keyword}: dụng cụ một lần, mực nguồn rõ, ảnh trước/sau khách thật, bảo hành minh bạch. Tránh nơi hứa “màu đẹp ngay ngày đầu” vì giai bong luôn nhạt tạm thời.`,
      ],
    },
    {
      heading: `Chăm sóc sau ${keyword} & lưu ý khí hậu biển`,
      paragraphs: [
        `Nắng, muối và độ ẩm ảnh hưởng lành da sau ${keyword}. 5–7 ngày đầu hạn chế nước trực tiếp, không tẩy da chết, tạm tránh biển. Dùng kem theo hướng dẫn để màu lên đều.`,
        `Nếu ${keyword} gắn kế hoạch đi biển Phước Hải, book sớm 2–3 tuần. Gửi ảnh lành da để studio chỉnh lịch dặm — đặc biệt hữu ích với khách ở xa trung tâm.`,
      ],
    },
    {
      heading: `Giá ${keyword} và cách đặt lịch nhanh`,
      paragraphs: [
        `Chi phí ${keyword} phụ thuộc kỹ thuật, độ khó sửa màu cũ và gói bảo hành. Báo giá chính xác sau khi xem da tại ${ADDR_VI} — không tin mức giá ảo trên mạng.`,
        `Đặt lịch ${keyword}: gọi ${PHONE}, nhắn @phuoclai.pmu hoặc form website. Ghi rõ “${keyword}” + số điện thoại để xếp đúng Master. Có thể hỏi thêm về ${s2} trong cùng cuộc tư vấn.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `${cap(keyword)} mất bao lâu?`,
      a: `Thông thường 60–120 phút tùy kỹ thuật của gói ${keyword}; sửa màu cũ có thể lâu hơn.`,
    },
    {
      q: `${cap(keyword)} có đau không?`,
      a: `Có ủ tê trước khi làm ${keyword}. Hầu hết khách cảm thấy ê nhẹ, dễ chịu hơn kỳ vọng.`,
    },
    {
      q: `Giá ${keyword} khoảng bao nhiêu?`,
      a: `Giá ${keyword} thay đổi theo kỹ thuật và tình trạng da. Nhận báo giá chính xác tại ${BRAND} — hotline ${PHONE}.`,
    },
    {
      q: `Sau ${keyword} bao lâu lên màu đẹp?`,
      a: `Sau ${keyword}, da bong 7–14 ngày và ổn định ~4 tuần. Lịch dặm giúp màu và dáng chuẩn hơn.`,
    },
  ];

  return {
    id: `vi-${i + 1}`,
    lang: "vi",
    keyword,
    secondaryKeywords: secondary,
    keywords: keywordsMeta,
    slug,
    title,
    h1,
    description,
    category: cat,
    image,
    imageAlt,
    date: dateFor(i),
    author: BRAND,
    sections,
    faqs,
    cta: `Đặt lịch ${keyword} tại ${BRAND} — ${PHONE}`,
  };
}

function buildEnArticle(keyword, i) {
  const cat = categoryEn(keyword);
  const secondary = secondaryEn(keyword, cat);
  const title = seoTitleEn(keyword, i);
  const h1 = `${cap(keyword)} — complete guide at ${BRAND}`;
  const description = seoDescEn(keyword, secondary);
  const keywordsMeta = secondary.join(", ");
  const image = pickImage(keyword, i);
  const imageAlt = `${cap(keyword)} at ${BRAND} — ${cat.toLowerCase()} service photo`;
  const slug = `${slugify(keyword)}-${i + 1}`;
  const s2 = secondary[1] || "permanent makeup";
  const s3 = secondary[2] || "AMAZINGBROWS";

  const tips = [
    `Guests searching ${keyword} from Phuoc Hai / Long Hai often prefer morning weekend slots.`,
    `For ${keyword}, oily or beach-frequent skin usually suits powder/ombre better than ultra-fine strokes.`,
    `Correction cases for ${keyword} need photos sent ahead so the Master can estimate time.`,
    `${cap(keyword)} weekends fill fast — book 3–5 days ahead.`,
    `First 48 hours after ${keyword}: keep dry, no makeup on treated skin.`,
  ];

  const sections = [
    {
      heading: `What is ${keyword} and who is it for?`,
      paragraphs: [
        `${cap(keyword)} is a high-intent search around Ba Ria Vung Tau for natural, lasting beauty with a safe process. This page targets “${keyword}” and also covers related terms like ${s2} and ${s3}.`,
        `At ${BRAND} (${ADDR_EN}), face mapping comes before pigment. ${tips[i % tips.length]} The goal of ${keyword} is a flattering healed result — not an overly dark day-one look.`,
      ],
    },
    {
      heading: `Best techniques for ${keyword} by skin type`,
      paragraphs: [
        `Depending on skin and goals, Masters may suggest AMAZINGBROWS, SANDBROWS, SEXYLIPS, or eyeliner work. When researching ${keyword}, share prior tattoos, oily/dry skin, and budget so the technique matches you — not a trend.`,
        `Clients interested in ${s2} often combine that consult with ${keyword} in one visit. The studio serves Vung Tau city, Phuoc Hai, Dat Do, and Xuyen Moc with flexible slots.`,
      ],
    },
    {
      heading: `${cap(keyword)} process: 5 studio steps`,
      paragraphs: [
        `1) Consult & allergy notes. 2) Mapping for your ${keyword} plan. 3) Draft approval. 4) Sterile setup, numbing, procedure. 5) Aftercare + optional touch-up timing.`,
        `Checklist for ${keyword}: single-use tools, traceable pigments, real before/after photos, clear warranty. Avoid studios that promise “final color on day one.”`,
      ],
    },
    {
      heading: `Aftercare for ${keyword} in coastal weather`,
      paragraphs: [
        `Sun, salt, and humidity affect healing after ${keyword}. Keep the area dry for several days, skip harsh exfoliation, and delay swimming. Follow ointment guidance for even peeling.`,
        `If ${keyword} is before a Phuoc Hai beach trip, book 2–3 weeks ahead. Send healing photos so the studio can plan touch-ups — helpful for guests outside the city center.`,
      ],
    },
    {
      heading: `${cap(keyword)} price & how to book`,
      paragraphs: [
        `Cost for ${keyword} depends on technique, correction complexity, and warranty package. Get an accurate quote at ${ADDR_EN} — don’t trust unrealistically low online prices.`,
        `Book ${keyword}: call ${PHONE}, message @phuoclai.pmu, or use the website form. Mention “${keyword}” so the right Master is assigned. You can also ask about ${s2} in the same consult.`,
      ],
    },
  ];

  const faqs = [
    {
      q: `How long does ${keyword} take?`,
      a: `Most ${keyword} sessions last 60–120 minutes; corrections may take longer.`,
    },
    {
      q: `Does ${keyword} hurt?`,
      a: `Topical numbing is used for ${keyword}. Most clients feel mild pressure, not sharp pain.`,
    },
    {
      q: `What does ${keyword} cost?`,
      a: `${cap(keyword)} pricing varies by technique and skin condition. Get a quote at ${BRAND} — ${PHONE}.`,
    },
    {
      q: `When does ${keyword} look final?`,
      a: `After ${keyword}, peeling lasts ~7–14 days and color settles over ~4 weeks. Touch-ups refine the result.`,
    },
  ];

  return {
    id: `en-${i + 1}`,
    lang: "en",
    keyword,
    secondaryKeywords: secondary,
    keywords: keywordsMeta,
    slug,
    title,
    h1,
    description,
    category: cat,
    image,
    imageAlt,
    date: dateFor(i),
    author: BRAND,
    sections,
    faqs,
    cta: `Book ${keyword} at ${BRAND} — ${PHONE}`,
  };
}

const vi = KEYWORDS_VI.map(buildViArticle);
const en = KEYWORDS_EN.map(buildEnArticle);

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "news-vi.json"), JSON.stringify(vi), "utf8");
writeFileSync(join(outDir, "news-en.json"), JSON.stringify(en), "utf8");

writeFileSync(
  join(outDir, "news-types.ts"),
  `export interface NewsFaq {
  q: string;
  a: string;
}

export interface NewsSection {
  heading: string;
  paragraphs: string[];
}

export interface NewsArticle {
  id: string;
  lang: "vi" | "en";
  keyword: string;
  secondaryKeywords: string[];
  keywords: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  category: string;
  image: string;
  imageAlt: string;
  date: string;
  author: string;
  sections: NewsSection[];
  faqs: NewsFaq[];
  cta: string;
}
`,
  "utf8",
);

writeFileSync(
  join(outDir, "news.ts"),
  `import type { NewsArticle } from "./news-types";
import vi from "./news-vi.json";
import en from "./news-en.json";

export const newsVi = vi as NewsArticle[];
export const newsEn = en as NewsArticle[];

export function getNewsByLang(lang: "vi" | "en"): NewsArticle[] {
  return lang === "en" ? newsEn : newsVi;
}

export function getNewsArticle(lang: "vi" | "en", slug: string): NewsArticle | undefined {
  return getNewsByLang(lang).find((a) => a.slug === slug);
}

export function getAllNewsArticles(): NewsArticle[] {
  return [...newsVi, ...newsEn];
}
`,
  "utf8",
);

console.log(`SEO-optimized: ${vi.length} VI + ${en.length} EN`);
console.log("Sample VI title:", vi[0].title);
console.log("Sample VI keywords:", vi[0].keywords.slice(0, 80) + "…");
console.log("Sample EN title:", en[0].title);
