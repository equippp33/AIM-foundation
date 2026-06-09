import { contact } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

export function Contact() {
  return (
    <section id="contact" className="section bg-white">
      <div className="container-x">
        <div
          className="reveal overflow-hidden rounded-2xl border border-line px-8 py-12 text-slatey-600 shadow-soft sm:px-12 lg:px-16"
          style={{
            background:
              "radial-gradient(900px 400px at 90% -20%, rgba(232,51,111,0.08), transparent 60%), linear-gradient(135deg,#ffffff 0%,#f7f8fb 60%,#fdf2f6 100%)",
          }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
            {/* Left — copy */}
            <div>
              <span className="eyebrow">{contact.eyebrow}</span>
              <h2 className="mt-3 font-display text-[32px] leading-tight text-ink sm:text-[40px]">
                {contact.title}
              </h2>
              <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-slatey-500">
                {contact.body}
              </p>
            </div>

            {/* Right — contact cards */}
            <div className="space-y-4">
              {contact.contacts.map((c) => (
                <div
                  key={c.email}
                  className="rounded-xl border border-line bg-white p-5 shadow-card transition-shadow hover:shadow-card-hover"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-500">
                    {c.role}
                  </span>
                  <p className="mt-1.5 text-[17px] font-semibold text-ink">{c.name}</p>
                  <a
                    href={`mailto:${c.email}`}
                    className="mt-2 flex items-center gap-2 text-[13.5px] text-slatey-500 transition-colors hover:text-ink"
                  >
                    <Icon name="mail" size={15} />
                    {c.email}
                  </a>
                  {c.phone && (
                    <a
                      href={`tel:${c.phone.replace(/\s/g, "")}`}
                      className="mt-1.5 flex items-center gap-2 text-[13.5px] text-slatey-500 transition-colors hover:text-ink"
                    >
                      <Icon name="phone" size={15} />
                      <span className="num" style={{ fontSize: "13.5px", lineHeight: "20px" }}>{c.phone}</span>
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
