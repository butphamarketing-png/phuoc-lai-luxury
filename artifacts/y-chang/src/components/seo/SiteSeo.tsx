import { useLocation } from "wouter";
import { useSeo } from "@/hooks/use-seo";
import JsonLd from "@/components/seo/JsonLd";
import {
  buildLocalBusinessJsonLd,
  buildWebSiteJsonLd,
  getAdminSeo,
  getStaticSeo,
  isServiceDetailPath,
  isTrainingDetailPath,
} from "@/lib/seo";

export default function SiteSeo() {
  const [pathname] = useLocation();

  const isAdmin = pathname.startsWith("/admin");
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

  return (
    <>
      <JsonLd
        id="local-business"
        data={[buildLocalBusinessJsonLd(), buildWebSiteJsonLd()]}
      />
    </>
  );
}
