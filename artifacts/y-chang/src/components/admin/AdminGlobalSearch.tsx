import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { useAdminServices, useAdminTraining } from "@/hooks/use-site-content";
import { useAdminCustomers } from "@/hooks/use-site-customers";
import {
  ADMIN_CUSTOMERS,
  ADMIN_SERVICES,
  ADMIN_TRAINING,
} from "@/lib/admin-paths";

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Vừa xong";
  if (mins < 60) return `${mins} phút trước`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} giờ trước`;
  const days = Math.floor(hours / 24);
  return `${days} ngày trước`;
}

export default function AdminGlobalSearch() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const { data: services = [] } = useAdminServices();
  const { data: courses = [] } = useAdminTraining();
  const { data: customers = [] } = useAdminCustomers();

  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (q.length < 2) return { customers: [], services: [], courses: [] };

    const matchCustomers = customers
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          c.serviceInterest.toLowerCase().includes(q),
      )
      .slice(0, 4);

    const matchServices = services
      .filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          s.slug.toLowerCase().includes(q),
      )
      .slice(0, 3);

    const matchCourses = courses
      .filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.slug.toLowerCase().includes(q),
      )
      .slice(0, 3);

    return {
      customers: matchCustomers,
      services: matchServices,
      courses: matchCourses,
    };
  }, [q, customers, services, courses]);

  const hasResults =
    results.customers.length +
      results.services.length +
      results.courses.length >
    0;

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={wrapRef} className="hidden md:block relative">
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20 z-10"
        size={16}
      />
      <input
        type="search"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Tìm khách, dịch vụ, khóa học..."
        className="bg-[#FAFAFA] border-none rounded-full pl-10 pr-6 py-2 text-xs focus:ring-1 focus:ring-black/10 w-64 transition-all"
      />

      {open && q.length >= 2 && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl border border-black/[0.06] shadow-xl z-50 overflow-hidden max-h-[70vh] overflow-y-auto">
          {!hasResults ? (
            <p className="p-4 text-xs text-black/40">Không tìm thấy kết quả.</p>
          ) : (
            <>
              {results.customers.length > 0 && (
                <div className="p-2 border-b border-black/[0.04]">
                  <p className="px-2 py-1 text-[9px] uppercase tracking-widest text-black/35 font-bold">
                    Khách hàng
                  </p>
                  {results.customers.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAFAFA] transition-colors"
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                        setLocation(ADMIN_CUSTOMERS);
                      }}
                    >
                      <p className="text-sm font-bold">{c.name}</p>
                      <p className="text-[10px] text-black/40">
                        {c.phone}
                        {c.serviceInterest ? ` · ${c.serviceInterest}` : ""}
                      </p>
                      <p className="text-[9px] text-black/30 mt-0.5">
                        {formatRelative(c.createdAt)}
                      </p>
                    </button>
                  ))}
                </div>
              )}
              {results.services.length > 0 && (
                <div className="p-2 border-b border-black/[0.04]">
                  <p className="px-2 py-1 text-[9px] uppercase tracking-widest text-black/35 font-bold">
                    Dịch vụ
                  </p>
                  {results.services.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAFAFA] transition-colors"
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                        setLocation(ADMIN_SERVICES);
                      }}
                    >
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="text-[10px] text-black/40">/dich-vu/{s.slug}</p>
                    </button>
                  ))}
                </div>
              )}
              {results.courses.length > 0 && (
                <div className="p-2">
                  <p className="px-2 py-1 text-[9px] uppercase tracking-widest text-black/35 font-bold">
                    Đào tạo
                  </p>
                  {results.courses.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-[#FAFAFA] transition-colors"
                      onClick={() => {
                        setOpen(false);
                        setQuery("");
                        setLocation(ADMIN_TRAINING);
                      }}
                    >
                      <p className="text-sm font-bold">{c.title}</p>
                      <p className="text-[10px] text-black/40">/dao-tao/{c.slug}</p>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
