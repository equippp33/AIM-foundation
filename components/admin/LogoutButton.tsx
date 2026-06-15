"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onLogout() {
    setLoading(true);
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } catch {
      /* ignore — cookie clears either way on navigation */
    }
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={onLogout}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-slatey-600 transition-colors hover:border-brand-200 hover:text-ink disabled:opacity-60"
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      {loading ? "Signing out…" : "Sign out"}
    </button>
  );
}
