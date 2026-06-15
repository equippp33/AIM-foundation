type Tint = "brand" | "green" | "amber" | "blue";

const tintMap: Record<Tint, string> = {
  brand: "text-brand-500",
  green: "text-emerald-500",
  amber: "text-amber-500",
  blue: "text-sky-600",
};

interface StatCardProps {
  value: string;
  label: string;
  tint?: Tint;
  /** Solid-blue focal treatment for the single most important stat in a row. */
  featured?: boolean;
}

export function StatCard({ value, label, tint = "brand", featured = false }: StatCardProps) {
  if (featured) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-600 px-5 py-8 text-center shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
        <span className="num text-white" style={{ fontSize: "42px", lineHeight: "46px" }}>
          {value}
        </span>
        <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/75">
          {label}
        </span>
      </div>
    );
  }

  return (
    <div className="card card-hover flex flex-col items-center justify-center px-5 py-8 text-center">
      <span className={`num ${tintMap[tint]}`}>{value}</span>
      <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
        {label}
      </span>
    </div>
  );
}
