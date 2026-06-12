import { contact, footer } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";

const infoCards: { icon: IconName; label: string; value: string; href?: string }[] = [
  {
    icon: "mail",
    label: "Email",
    value: footer.contactCol.email,
    href: `mailto:${footer.contactCol.email}`,
  },
  {
    icon: "phone",
    label: "Phone",
    value: footer.contactCol.phone,
    href: `tel:${footer.contactCol.phone.replace(/\s/g, "")}`,
  },
  {
    icon: "map-pin",
    label: "Address",
    value: footer.contactCol.address,
  },
];

export function Contact() {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-x">
        {/* CTA card */}
        <div
          className="reveal relative overflow-hidden rounded-2xl border border-line px-8 py-12 text-slatey-600 shadow-soft sm:px-12 lg:px-16"
          style={{
            background:
              "radial-gradient(900px 500px at 92% -10%, rgba(14,165,233,0.12), transparent 60%), radial-gradient(700px 420px at 5% 120%, rgba(6,182,212,0.08), transparent 55%), linear-gradient(135deg,#ffffff 0%,#f5fbff 55%,#eef9ff 100%)",
          }}
        >
          <div className="max-w-2xl">
            <span className="eyebrow">{contact.eyebrow}</span>
            <h2 className="mt-3 font-display text-[34px] leading-tight text-ink sm:text-[44px]">
              {contact.title}
            </h2>
            <p className="mt-5 text-[13px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
              Who we partner with
            </p>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {contact.audience.map((a) => (
                <span
                  key={a}
                  className="rounded-full border border-line bg-white px-3.5 py-1.5 text-[12.5px] font-medium text-slatey-600 shadow-card"
                >
                  {a}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={contact.primaryCta.href} className="btn-primary">
                {contact.primaryCta.label}
                <Icon name="arrow-right" size={18} />
              </a>
              <a
                href={contact.secondaryCta.href}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-colors hover:border-brand-300 hover:text-brand-600"
              >
                {contact.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {infoCards.map((c, i) => {
            const inner = (
              <>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-500">
                  <Icon name={c.icon} size={20} />
                </span>
                <p className="mt-4 text-[15px] font-semibold text-ink">{c.label}</p>
                <p className="mt-1 text-[13.5px] leading-snug text-slatey-500">{c.value}</p>
              </>
            );
            return c.href ? (
              <a
                key={c.label}
                href={c.href}
                className="reveal card card-hover block p-6"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {inner}
              </a>
            ) : (
              <div
                key={c.label}
                className="reveal card p-6"
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
