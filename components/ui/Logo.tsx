import Image from "next/image";

interface LogoProps {
  variant?: "dark" | "light";
}

/**
 * AIM Foundation logo using the official AIG_logo.png mark.
 * Transparent background works naturally on both light (navbar)
 * and dark (footer) surfaces — no filter needed.
 */
export function Logo({ variant = "dark" }: LogoProps) {
  const text = variant === "light" ? "text-white" : "text-ink";
  const sub  = variant === "light" ? "text-white/55" : "text-slatey-400";

  return (
    <span className="flex items-center gap-3">
      <Image
        src="/images/logo/AIG_logo.png"
        alt="AIM Foundation logo"
        width={44}
        height={44}
        className="h-11 w-11 object-contain"
        priority
      />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[19px] font-bold tracking-tight ${text}`}>
          AIM<span className="text-brand-500"> Foundation</span>
        </span>
        <span className={`mt-0.5 text-[9px] font-semibold uppercase tracking-[0.18em] ${sub}`}>
          AI &amp; MedTech Alliance
        </span>
      </span>
    </span>
  );
}
