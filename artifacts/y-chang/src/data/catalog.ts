import type {
  ServiceDetailContent,
  TrainingDetailContent,
} from "@/data/content-details";

export type ServiceCategory = "phun-xam" | "spa";
export type ServiceStatus = "published" | "hidden";
export type TrainingStatus = "open" | "coming_soon" | "hidden";
export type TrainingCategory = "phun-xam" | "spa";

export interface SiteService {
  id: string;
  slug: string;
  title: string;
  category: ServiceCategory;
  categoryLabel: string;
  image: string;
  price: string;
  author: string;
  status: ServiceStatus;
  bullets: string[];
  sortOrder: number;
  detail?: ServiceDetailContent;
}

export interface SiteTrainingCourse {
  id: string;
  slug: string;
  title: string;
  category: TrainingCategory;
  level: string;
  duration: string;
  image: string;
  description: string;
  status: TrainingStatus;
  students: number;
  bullets: string[];
  sortOrder: number;
  detail?: TrainingDetailContent;
}

/** Nguồn dữ liệu mặc định — đồng bộ với trang công khai */
export const CATALOG_SERVICES: SiteService[] = [
  {
    id: "svc-amazing-brows",
    slug: "amazing-brows-fiber",
    title: "Điêu Khắc Sợi AMAZINGBROWS",
    category: "phun-xam",
    categoryLabel: "Phun Xăm",
    image: "/service-brows.png",
    price: "8,500,000đ",
    author: "Phuoc Lai",
    status: "published",
    bullets: ["Tạo sợi siêu thực", "Dáng mày phong thủy", "Mực organic Châu Âu", "Không sưng đau"],
    sortOrder: 1,
  },
  {
    id: "svc-sandbrows",
    slug: "sandbrows",
    title: "Phun Mày SANDBROWS",
    category: "phun-xam",
    categoryLabel: "Phun Xăm",
    image: "/service-ombre.png",
    price: "5,000,000đ",
    author: "Phuoc Lai",
    status: "published",
    bullets: ["Hiệu ứng rải hạt", "Màu sắc trong trẻo", "Bền màu tự nhiên", "Phù hợp mọi loại da"],
    sortOrder: 2,
  },
  {
    id: "svc-sexylips",
    slug: "sexylips",
    title: "Phun Môi SEXYLIPS",
    category: "phun-xam",
    categoryLabel: "Phun Xăm",
    image: "/service-lips.png",
    price: "6,000,000đ",
    author: "Phuoc Lai",
    status: "published",
    bullets: ["Khử thâm chuyên sâu", "Màu môi quyến rũ", "Cấy tế bào gốc", "Phục hồi nhanh"],
    sortOrder: 3,
  },
  {
    id: "svc-phoenix",
    slug: "phoenix-eyeliner",
    title: "Phun Mí Phượng Hoàng",
    category: "phun-xam",
    categoryLabel: "Phun Xăm",
    image: "/hero-portrait.png",
    price: "4,500,000đ",
    author: "Phuoc Lai",
    status: "published",
    bullets: ["Viền mí sắc sảo", "Đôi mắt có hồn", "Không lem không trôi", "An toàn tuyệt đối"],
    sortOrder: 4,
  },
  {
    id: "svc-spa-basic",
    slug: "spa-basic",
    title: "Chăm Sóc Da Chuyên Sâu",
    category: "spa",
    categoryLabel: "Spa",
    image: "/studio-interior.png",
    price: "1,500,000đ",
    author: "Nhung Lai",
    status: "published",
    bullets: ["Làm sạch sâu", "Cấp ẩm tầng sâu", "Massage thư giãn", "Trẻ hóa làn da"],
    sortOrder: 5,
  },
  {
    id: "svc-spa-advanced",
    slug: "spa-advanced",
    title: "Liệu Trình Công Nghệ Cao",
    category: "spa",
    categoryLabel: "Spa",
    image: "/studio.png",
    price: "3,500,000đ",
    author: "Cam Lai",
    status: "published",
    bullets: ["Nâng cơ xóa nhăn", "Điều trị sắc tố", "Se khít lỗ chân lông", "Phục hồi da"],
    sortOrder: 6,
  },
  {
    id: "svc-spa-acne",
    slug: "spa-acne-treatment",
    title: "Trị Mụn Chuyên Sâu",
    category: "spa",
    categoryLabel: "Spa",
    image: "/studio-interior.png",
    price: "2,200,000đ",
    author: "Nhung Lai",
    status: "published",
    bullets: ["Chuẩn y khoa", "Tiêu viêm tức thì", "Không để lại sẹo", "Ngừa thâm mụn"],
    sortOrder: 7,
  },
  {
    id: "svc-spa-rejuvenation",
    slug: "spa-skin-rejuvenation",
    title: "Trẻ Hóa Exosome",
    category: "spa",
    categoryLabel: "Spa",
    image: "/studio.png",
    price: "12,000,000đ",
    author: "Cam Lai",
    status: "hidden",
    bullets: ["Tái tạo tế bào", "Căng bóng tức thì", "Xóa mờ nếp nhăn", "Phục hồi da yếu"],
    sortOrder: 8,
  },
];

export const CATALOG_TRAINING: SiteTrainingCourse[] = [
  {
    id: "tr-amazing-brows",
    slug: "amazing-brows",
    title: "Khóa Học Sợi AMAZINGBROWS Nâng Cao",
    category: "phun-xam",
    level: "Master",
    duration: "5 Ngày",
    image: "/training-1.png",
    description: "Kỹ thuật tạo sợi siêu thực AMAZINGBROWS đỉnh cao dành cho thợ lành nghề.",
    status: "open",
    students: 12,
    bullets: ["Kỹ thuật sợi siêu thực", "Dáng mày phong thủy", "Xử lý nền cũ", "Chụp ảnh sản phẩm"],
    sortOrder: 1,
  },
  {
    id: "tr-lip-master",
    slug: "lip-master",
    title: "Khóa Học Môi Chuyên Sâu",
    category: "phun-xam",
    level: "Expert",
    duration: "4 Ngày",
    image: "/training-2.png",
    description: "Bí quyết phun môi SEXYLIPS không sưng, bám màu nhanh.",
    status: "open",
    students: 8,
    bullets: ["Kỹ thuật môi không sưng", "Công thức pha màu", "Khử thâm chuyên sâu", "Chăm sóc sau làm"],
    sortOrder: 2,
  },
  {
    id: "tr-master-advanced",
    slug: "master-advanced",
    title: "Khóa Học PMU Tổng Hợp",
    category: "phun-xam",
    level: "Grand Master",
    duration: "15 Ngày",
    image: "/training-3.png",
    description: "Trọn bộ kiến thức từ sợi, mày, môi và mí phượng hoàng.",
    status: "coming_soon",
    students: 15,
    bullets: ["Tổng hợp kỹ thuật PMU", "Quy trình Master", "Quản lý Studio", "Đào tạo học viên"],
    sortOrder: 3,
  },
  {
    id: "tr-spa-basic",
    slug: "spa-basic",
    title: "Khóa Học SPA Basic",
    category: "spa",
    level: "Professional",
    duration: "7 Ngày",
    image: "/training-1.png",
    description: "Kiến thức nền tảng về chăm sóc da cơ bản.",
    status: "open",
    students: 20,
    bullets: ["Cấu trúc da", "Quy trình chăm sóc", "Sử dụng máy cơ bản", "Vệ sinh vô trùng"],
    sortOrder: 4,
  },
  {
    id: "tr-spa-advanced",
    slug: "spa-advanced",
    title: "Khóa Học SPA Advanced",
    category: "spa",
    level: "Expert",
    duration: "10 Ngày",
    image: "/training-2.png",
    description: "Kỹ thuật chăm sóc da chuyên sâu và công nghệ cao.",
    status: "open",
    students: 14,
    bullets: ["Trị liệu da liễu", "Công nghệ Laser/Hifu", "Peel da chuyên sâu", "Kỹ thuật massage"],
    sortOrder: 5,
  },
  {
    id: "tr-spa-expert",
    slug: "spa-expert",
    title: "Khóa Học SPA Expert",
    category: "spa",
    level: "Master",
    duration: "15 Ngày",
    image: "/training-3.png",
    description: "Đào tạo quản lý và vận hành hệ thống spa chuyên nghiệp.",
    status: "open",
    students: 10,
    bullets: ["Quản trị nhân sự", "Marketing Spa", "Xây dựng menu", "Tư vấn khách hàng"],
    sortOrder: 6,
  },
  {
    id: "tr-spa-therapy",
    slug: "spa-therapy",
    title: "Khóa Trị Liệu Da Chuyên Sâu",
    category: "spa",
    level: "Advanced",
    duration: "12 Ngày",
    image: "/training-4.png",
    description: "Chuyên sâu trị liệu và phục hồi da yếu, da mụn, da nám.",
    status: "open",
    students: 9,
    bullets: ["Chẩn đoán da", "Phác đồ trị liệu", "Kết hợp công nghệ", "Theo dõi khách hàng"],
    sortOrder: 7,
  },
];

export function getPublicServicePath(slug: string) {
  return `/dich-vu/${slug}`;
}

export function getPublicTrainingPath(slug: string) {
  return `/dao-tao/${slug}`;
}
