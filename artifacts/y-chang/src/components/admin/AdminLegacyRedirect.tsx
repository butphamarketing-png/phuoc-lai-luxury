import { useEffect } from "react";
import { useLocation } from "wouter";
import { migrateLegacyAdminPath } from "@/lib/admin-paths";

/** Chuyển hướng bookmark cũ /admin → /adminbp */
export default function AdminLegacyRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation(migrateLegacyAdminPath(window.location.pathname));
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center">
      <p className="text-[11px] uppercase tracking-[0.3em] text-black/40">
        Đang chuyển hướng...
      </p>
    </div>
  );
}
