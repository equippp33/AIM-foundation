import type { Metadata } from "next";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { LeadsTable, type Pledge } from "@/components/admin/LeadsTable";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { projectLabel } from "@/lib/projects";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Donor Dashboard",
  robots: { index: false, follow: false },
};

type LoadResult = { rows: Pledge[]; error: string | null };

async function loadPledges(): Promise<LoadResult> {
  try {
    const supabase = createServerSupabaseClient();
    const { data, error } = await supabase
      .from("sse_pledges")
      .select("id, created_at, name, email, phone, amount, project, status")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Dashboard load error:", error);
      return { rows: [], error: "Could not load records from the database." };
    }
    return { rows: (data ?? []) as Pledge[], error: null };
  } catch (e) {
    console.error("Dashboard client error:", e);
    return { rows: [], error: "Database connection is not configured." };
  }
}

function formatINR(amount: number): string {
  return "₹" + Math.round(amount).toLocaleString("en-IN");
}

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: string;
  sub?: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-[0_2px_12px_rgba(16,34,63,0.05)]">
      <div className="flex items-start justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-wider text-slatey-500">{label}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          {icon}
        </span>
      </div>
      <p className="mt-3 font-display text-[30px] font-bold leading-none text-ink">{value}</p>
      {sub && <p className="mt-2 text-[12.5px] text-slatey-500">{sub}</p>}
    </div>
  );
}

function BreakdownBar({
  label,
  count,
  total,
}: {
  label: string;
  count: number;
  total: number;
}) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-[13px]">
        <span className="font-medium text-ink">{label}</span>
        <span className="text-slatey-500">
          {count} <span className="text-slatey-400">· {pct}%</span>
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-mist">
        <div
          className="h-full rounded-full bg-gradient-to-r from-brand-400 to-brand-600"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export default async function AdminDashboardPage() {
  const { rows, error } = await loadPledges();

  // ── Stats ──────────────────────────────────────────────────────────────
  const totalRequests = rows.length;
  const totalPledged = rows.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

  let newToday = 0;
  let thisMonth = 0;
  const byProject = new Map<string, number>();

  for (const r of rows) {
    const t = new Date(r.created_at).getTime();
    if (t >= startOfToday) newToday++;
    if (t >= startOfMonth) thisMonth++;
    const key = projectLabel(r.project) || "MAP-AP";
    byProject.set(key, (byProject.get(key) ?? 0) + 1);
  }

  const projectBreakdown = [...byProject.entries()].sort((a, b) => b[1] - a[1]);

  // ── Layout ─────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-mist text-ink">
      {/* Top bar */}
      <header className="sticky top-0 z-20 border-b border-line bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-5 py-3.5 lg:px-8">
          <div className="flex items-center gap-3">
            <Logo />
            <span className="hidden rounded-full border border-line bg-mist px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-slatey-500 sm:inline">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="hidden rounded-xl border border-line bg-white px-4 py-2 text-[13px] font-semibold text-slatey-600 transition-colors hover:border-brand-200 hover:text-ink sm:inline-flex"
            >
              View website
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 py-8 lg:px-8 lg:py-10">
        {/* Heading */}
        <div className="mb-7">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-brand-500">
            Partnership &amp; Donor Records
          </p>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-tight text-ink sm:text-[32px]">
            Donor Dashboard
          </h1>
          <p className="mt-1.5 text-[14px] text-slatey-500">
            Every Express Your Interest submission, in one place.
          </p>
        </div>

        {error && (
          <div className="mb-7 rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-[13.5px] font-medium text-amber-800">
            {error} Verify the Supabase environment variables are set on the server.
          </div>
        )}

        {/* Stat cards */}
        <section id="overview" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="Total Requests"
            value={String(totalRequests)}
            sub="All-time submissions"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            }
          />
          <StatCard
            label="Total Pledged"
            value={formatINR(totalPledged)}
            sub="Indicative interest value"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            }
          />
          <StatCard
            label="New Today"
            value={String(newToday)}
            sub="Since midnight"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            }
          />
          <StatCard
            label="This Month"
            value={String(thisMonth)}
            sub={now.toLocaleString("en-IN", { month: "long", year: "numeric" })}
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            }
          />
        </section>

        {/* Program interest breakdown */}
        {projectBreakdown.length > 0 && (
          <section className="mt-6 rounded-2xl border border-line bg-white p-5 shadow-[0_2px_12px_rgba(16,34,63,0.05)]">
            <h2 className="font-display text-[18px] font-bold text-ink">Interest by Program</h2>
            <p className="mt-0.5 text-[12.5px] text-slatey-500">Where partners want to engage</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {projectBreakdown.map(([label, count]) => (
                <BreakdownBar key={label} label={label} count={count} total={totalRequests} />
              ))}
            </div>
          </section>
        )}

        {/* Leads table */}
        <section id="requests" className="mt-6 scroll-mt-20">
          <LeadsTable rows={rows} />
        </section>
      </main>
    </div>
  );
}
