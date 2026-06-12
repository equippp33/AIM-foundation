import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Icon } from "@/components/ui/Icon";
import { ExpressForm } from "@/components/sections/ExpressForm";
import { express, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: express.title,
  description:
    "Pledge your contribution to AIM Foundation through SEBI's Social Stock Exchange (SSE) and help build scalable healthcare infrastructure across India.",
};

export default function ExpressPage() {
  return (
    <div className="flex min-h-screen flex-col bg-mist">
      {/* Slim header */}
      <header className="border-b border-line bg-white/80 backdrop-blur">
        <div className="container-x flex h-[68px] items-center justify-between">
          <Link href="/" aria-label="AIM Foundation home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="text-[14.5px] font-medium text-ink-soft/80 transition-colors hover:text-brand-500"
          >
            ← Back to home
          </Link>
        </div>
      </header>

      {/* Centered form */}
      <main className="flex flex-1 items-center justify-center px-5 py-16">
        <div className="w-full max-w-xl">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-[13px] font-semibold text-amber-700">
              <Icon name="trending-up" size={15} />
              {express.badge}
            </span>
            <h1 className="mt-5 font-display text-[40px] font-bold leading-[1.05] text-ink sm:text-[48px]">
              {express.title}
            </h1>
            <p className="mx-auto mt-3 max-w-md text-[15.5px] leading-relaxed text-slatey-500">
              {express.subtitle}
            </p>
          </div>

          <ExpressForm />
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="border-t border-line bg-white">
        <div className="container-x py-5 text-center text-[12.5px] text-slatey-400">
          {footer.copyright}
        </div>
      </footer>
    </div>
  );
}
