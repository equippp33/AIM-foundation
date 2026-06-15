import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ExpressForm } from "@/components/sections/ExpressForm";
import { express, footer } from "@/lib/content";

export const metadata: Metadata = {
  title: express.title,
  description:
    "Pledge your contribution to AIM Foundation and help build scalable healthcare infrastructure across India.",
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

      {/* Centered form — fills remaining viewport so no scroll needed */}
      <main className="flex flex-1 items-center justify-center px-5 py-6">
        <div className="w-full max-w-xl">
          <div className="text-center">
            <h1 className="font-display text-[36px] font-bold leading-[1.05] text-ink sm:text-[44px]">
              {express.title}
            </h1>
          </div>

          <ExpressForm />
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="border-t border-line bg-white">
        <div className="container-x py-4 text-center text-[12.5px] text-slatey-400">
          {footer.copyright}
        </div>
      </footer>
    </div>
  );
}
