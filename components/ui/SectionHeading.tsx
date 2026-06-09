interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  dark = false,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  return (
    <div className={`reveal ${isCenter ? "mx-auto max-w-2xl text-center" : "text-left"}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2
        className={`mt-3 font-display text-[34px] leading-tight sm:text-[42px] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      <div className={`heading-underline ${isCenter ? "" : "mx-0"}`} />
      {subtitle && (
        <p
          className={`mt-6 text-[16px] leading-relaxed ${
            dark ? "text-white/70" : "text-slatey-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
