"use client";

import { useMemo, useState } from "react";
import { projectLabel } from "@/lib/projects";

export type Pledge = {
  id: number;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  amount: number | null;
  project: string | null;
  status: string | null;
};

// Map raw status values to display label + badge styling.
const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  pending: { label: "New", cls: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Closed", cls: "bg-slate-100 text-slate-500 border-slate-200" },
};

function statusBadge(status: string | null) {
  const key = (status || "pending").toLowerCase();
  const s = STATUS_STYLES[key] ?? { label: status || "—", cls: "bg-slate-100 text-slate-600 border-slate-200" };
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold ${s.cls}`}>
      {s.label}
    </span>
  );
}

function formatINR(amount: number | null): string {
  if (amount == null || !Number.isFinite(amount)) return "—";
  return "₹" + amount.toLocaleString("en-IN");
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

export function LeadsTable({ rows }: { rows: Pledge[] }) {
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && (r.status || "pending").toLowerCase() !== statusFilter) {
        return false;
      }
      if (!q) return true;
      return [r.name, r.email, r.phone, projectLabel(r.project)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, query, statusFilter]);

  function exportCsv() {
    const header = ["ID", "Name", "Email", "Phone", "Project", "Amount", "Status", "Submitted"];
    const lines = [header.map(csvCell).join(",")];
    for (const r of filtered) {
      lines.push(
        [
          r.id,
          r.name,
          r.email,
          r.phone,
          projectLabel(r.project),
          r.amount,
          STATUS_STYLES[(r.status || "pending").toLowerCase()]?.label ?? r.status,
          r.created_at,
        ]
          .map(csvCell)
          .join(",")
      );
    }
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `aim-support-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-2xl border border-line bg-white shadow-[0_2px_12px_rgba(16,34,63,0.05)]">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-[18px] font-bold text-ink">Support Requests</h2>
          <p className="mt-0.5 text-[12.5px] text-slatey-500">
            {filtered.length} of {rows.length} records
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <svg
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slatey-400"
              width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, email, phone…"
              className="w-full rounded-xl border border-line bg-mist py-2 pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-slatey-400 focus:border-brand-400 focus:bg-white sm:w-64"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-line bg-mist px-3 py-2 text-[13px] font-medium text-ink outline-none transition-colors focus:border-brand-400 focus:bg-white"
          >
            <option value="all">All statuses</option>
            <option value="pending">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Closed</option>
          </select>
          <button
            onClick={exportCsv}
            disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-mist/60 text-[11px] font-semibold uppercase tracking-wider text-slatey-500">
              <th className="px-5 py-3">Donor</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Submitted</th>
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-16 text-center text-slatey-400">
                  {rows.length === 0
                    ? "No support requests yet. Submissions will appear here."
                    : "No records match your filters."}
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id} className="border-b border-line/70 transition-colors hover:bg-mist/40">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-ink">{r.name || "—"}</p>
                  </td>
                  <td className="px-5 py-4">
                    {r.email && (
                      <a href={`mailto:${r.email}`} className="block text-brand-600 hover:text-brand-700">
                        {r.email}
                      </a>
                    )}
                    {r.phone && <span className="block text-slatey-500">{r.phone}</span>}
                    {!r.email && !r.phone && <span className="text-slatey-400">—</span>}
                  </td>
                  <td className="px-5 py-4 text-slatey-600">{projectLabel(r.project) || "—"}</td>
                  <td className="px-5 py-4 text-right font-semibold text-ink">{formatINR(r.amount)}</td>
                  <td className="px-5 py-4">{statusBadge(r.status)}</td>
                  <td className="px-5 py-4 text-slatey-500">{formatDate(r.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
