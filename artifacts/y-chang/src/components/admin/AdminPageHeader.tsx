import { ReactNode } from "react";

interface AdminPageHeaderProps {
  title: string;
  description: string;
  actions?: ReactNode;
}

export default function AdminPageHeader({ title, description, actions }: AdminPageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div>
        <p className="text-[10px] uppercase tracking-[0.35em] text-black/35 font-bold mb-2">
          Quản trị nội dung
        </p>
        <h2 className="text-2xl font-serif text-black tracking-tight">{title}</h2>
        <p className="text-sm text-black/45 mt-2 max-w-xl">{description}</p>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </div>
  );
}
