import Image from "next/image";

interface LogoProps {
  /** "light" renders the wordmark in white for dark/colored backgrounds (e.g. footer). */
  variant?: "dark" | "light";
}

/**
 * AIM Foundation brand wordmark (AI Med Tech Alliance) — public/images/logo/AIM.webp.
 * The file is the full lockup, so no accompanying text is rendered.
 * On light surfaces it shows its native two-tone colours; on dark/colored
 * surfaces ("light" variant) it is inverted to solid white for contrast.
 */
export function Logo({ variant = "dark" }: LogoProps) {
  return (
    <Image
      src="/images/logo/AIM.webp"
      alt="AI Med Tech Alliance"
      width={1600}
      height={653}
      priority
      className={`h-10 w-auto ${variant === "light" ? "brightness-0 invert" : ""}`}
    />
  );
}
