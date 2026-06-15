import { express, contact } from "@/lib/content";
import { ExpressForm } from "@/components/sections/ExpressForm";

export function Express() {
  return (
    <section id="express" className="relative overflow-hidden bg-white">
      {/* subtle sky tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 500px at 95% -5%, rgba(14,165,233,0.07), transparent 60%), radial-gradient(700px 420px at 0% 110%, rgba(6,182,212,0.05), transparent 55%)",
        }}
      />
      <div className="container-x relative py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16">
          {/* Left — pitch + contacts */}
          <div className="reveal">
            <span className="inline-flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-500">
              <span className="h-px w-7 bg-brand-500" />
              {express.eyebrow}
            </span>
            <h2 className="mt-5 font-display text-[40px] font-bold leading-[1.05] text-ink sm:text-[52px]">
              {express.title}
            </h2>
            <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-slatey-500">
              This is not a payment. It is an expression of intent.{" "}
              <span className="font-medium text-brand-600">Our team will reach out to discuss your partnership.</span>
            </p>
            <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slatey-500">
              {express.audienceNote}
            </p>

            {/* Contacts */}
            <div className="mt-10 max-w-md border-t border-line pt-8">
              <ul className="space-y-6">
                {contact.contacts.map((c) => (
                  <li key={c.name}>
                    <p className="text-[13.5px] font-semibold text-ink">
                      {c.name} <span className="text-slatey-400">·</span>{" "}
                      <span className="font-normal text-slatey-500">{c.role}</span>
                    </p>
                    {c.email && (
                      <a
                        href={`mailto:${c.email}`}
                        className="mt-1 block text-[13.5px] text-brand-600 transition-colors hover:text-brand-700"
                      >
                        {c.email}
                      </a>
                    )}
                    {c.phone && (
                      <a
                        href={`tel:${c.phone.replace(/\s/g, "")}`}
                        className="mt-1 block text-[13.5px] text-slatey-500 transition-colors hover:text-ink"
                      >
                        {c.phone}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right — form */}
          <div className="reveal" style={{ transitionDelay: "120ms" }}>
            <ExpressForm tone="light" />
          </div>
        </div>
      </div>
    </section>
  );
}
