import { collaborators } from "@/lib/content";

export function Partners() {
  return (
    <section className="border-y border-line bg-white">
      <div className="container-x py-12">
        <p className="reveal text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-slatey-400">
          Institutional Partners
        </p>
        <div className="reveal mt-7 flex flex-wrap items-center justify-center gap-x-12 gap-y-5">
          {collaborators.map((c) => (
            <span
              key={c}
              className="max-w-[180px] text-center text-[14px] font-semibold leading-snug text-brand-600"
            >
              {c}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
