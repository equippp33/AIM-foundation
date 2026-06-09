import { footer } from "@/lib/content";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Logo } from "@/components/ui/Logo";

const socials: { name: IconName; href: string; label: string }[] = [
  { name: "linkedin", href: "#", label: "LinkedIn" },
  { name: "twitter", href: "#", label: "X / Twitter" },
  { name: "youtube", href: "#", label: "YouTube" },
  { name: "instagram", href: "#", label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-mist text-slatey-500">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo variant="dark" />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-slatey-500">
              {footer.tagline}
            </p>
            <p className="mt-4 text-[11.5px] leading-relaxed text-slatey-400">{footer.legal}</p>
          </div>

          {/* Link columns */}
          {footer.columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-[13.5px] text-slatey-500 transition-colors hover:text-ink"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact column */}
          <div>
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slatey-400">
              {footer.contactCol.title}
            </h3>
            <ul className="mt-4 space-y-3 text-[13.5px] text-slatey-500">
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" size={16} className="mt-0.5 shrink-0 text-brand-400" />
                {footer.contactCol.address}
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" size={16} className="shrink-0 text-brand-400" />
                <a href={`tel:${footer.contactCol.phone.replace(/\s/g, "")}`} className="hover:text-ink">
                  <span className="num" style={{ fontSize: "13.5px", lineHeight: "20px" }}>{footer.contactCol.phone}</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={16} className="shrink-0 text-brand-400" />
                <a href={`mailto:${footer.contactCol.email}`} className="hover:text-ink">
                  {footer.contactCol.email}
                </a>
              </li>
            </ul>

            <div className="mt-5 flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.label}
                  className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-white text-slatey-500 transition-colors hover:bg-brand-500 hover:text-white"
                >
                  <Icon name={s.name} size={17} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x py-5 text-center text-[12.5px] text-slatey-400">
          {footer.copyright}
        </div>
      </div>
    </footer>
  );
}
