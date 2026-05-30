import { useLocation } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildBreadcrumbJsonLd,
  buildFAQPageJsonLd,
  buildLocalBusinessJsonLd,
  buildWebSiteJsonLd,
  getAdminSeo,
  getStaticBreadcrumbs,
  getStaticSeo,
  HOME_FAQ,
  isServiceDetailPath,
  isTrainingDetailPath,
} from "@/lib/seo";
import { isAdminPath, isLegacyAdminPath } from "@/lib/admin-paths";

export default function SiteSeo() {
  const [pathname] = useLocation();

  const isAdmin = isAdminPath(pathname) || isLegacyAdminPath(pathname);
  const serviceSlug = isServiceDetailPath(pathname);
  const trainingSlug = isTrainingDetailPath(pathname);
  const isDetailPage = Boolean(serviceSlug || trainingSlug);

  const meta = isAdmin
    ? getAdminSeo()
    : isDetailPage
      ? null
      : getStaticSeo(pathname);

  useSeo(meta);

  if (isAdmin) return null;

  const schemaBlocks: object[] = [
    buildLocalBusinessJsonLd(),
    buildWebSiteJsonLd(),
  ];

  const breadcrumbs = getStaticBreadcrumbs(pathname);
  if (breadcrumbs) {
    schemaBlocks.push(buildBreadcrumbJsonLd(breadcrumbs));
  }
  if (pathname === "/") {
    schemaBlocks.push(buildFAQPageJsonLd(HOME_FAQ));
  }

  return <JsonLd id="site-schema" data={schemaBlocks} />;
}
