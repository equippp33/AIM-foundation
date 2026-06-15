import { Suspense } from "react";
import type { Metadata } from "next";
import { Logo } from "@/components/ui/Logo";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-mist px-5 py-12">
      {/* soft sky gradient backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(900px 520px at 85% -10%, rgba(14,165,233,0.10), transparent 60%), radial-gradient(700px 460px at 0% 110%, rgba(6,182,212,0.07), transparent 55%)",
        }}
      />

      <div className="relative w-full max-w-[420px]">
        <div className="mb-7 flex flex-col items-center text-center">
          <Logo />
          <p className="mt-5 text-[12px] font-semibold uppercase tracking-[0.22em] text-brand-500">
            Foundation Console
          </p>
          <h1 className="mt-2 font-display text-[26px] font-bold leading-tight text-ink">
            Admin Sign In
          </h1>
          <p className="mt-2 text-[13.5px] leading-relaxed text-slatey-500">
            Secure access to partnership &amp; donor records.
          </p>
        </div>

        <div className="rounded-3xl border border-line bg-white p-7 shadow-[0_8px_40px_rgba(16,34,63,0.08)] sm:p-8">
          <Suspense fallback={<div className="h-72" />}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="mt-6 text-center text-[12px] text-slatey-400">
          Authorized personnel only. All access is logged.
        </p>
      </div>
    </main>
  );
}
