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
}

export function StatCard({ value, label, tint = "brand" }: StatCardProps) {
  return (
    <div className="card card-hover flex flex-col items-center justify-center px-5 py-8 text-center">
      <span className={`num ${tintMap[tint]}`}>
        {value}
      </span>
      <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
        {label}
      </span>
    </div>
  );
}
