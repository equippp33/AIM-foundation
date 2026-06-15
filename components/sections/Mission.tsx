import { mission } from "@/lib/content";

export function Mission() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* subtle brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.25]"
        style={{
          background:
            "radial-gradient(700px 360px at 15% 0%, rgba(14,165,233,0.35), transparent 60%), radial-gradient(620px 340px at 90% 110%, rgba(6,182,212,0.28), transparent 55%)",
        }}
      />
      <div className="container-x relative py-12 lg:py-16">
        <div className="reveal mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-300">
            <span className="h-px w-7 bg-brand-400" />
            Our Mission
            <span className="h-px w-7 bg-brand-400" />
          </span>
          <p className="mt-5 font-display text-[26px] font-medium leading-[1.4] text-white sm:text-[32px] lg:text-[36px] lg:leading-[1.38]">
            {mission.quote}
          </p>
        </div>
      </div>
    </section>
  );
}
