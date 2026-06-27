"use client";

import { useMemo, useState } from "react";
import { projectLabel } from "@/lib/projects";

export type Pledge = {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  amount: number | null;
  project: string | null;
  status: string | null;
};

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  pending:   { label: "New",       cls: "bg-amber-50 text-amber-700 border-amber-200" },
  confirmed: { label: "Confirmed", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Closed",    cls: "bg-slate-100 text-slate-500 border-slate-200" },
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
  return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
}

function csvCell(value: unknown): string {
  const s = value == null ? "" : String(value);
  return `"${s.replace(/"/g, '""')}"`;
}

async function apiFetch(id: string, method: string, body?: object) {
  const res = await fetch(`/api/admin/pledges/${id}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const data = await res.json().catch(() => null) as { error?: string } | null;
    throw new Error(data?.error ?? "Request failed");
  }
  return res.json();
}

type EditDraft = {
  name: string;
  email: string;
  phone: string;
  amount: string;
  project: string;
  status: string;
};

export function LeadsTable({ rows: initial }: { rows: Pledge[] }) {
  const [rows, setRows] = useState<Pledge[]>(initial);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<EditDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (statusFilter !== "all" && (r.status || "pending").toLowerCase() !== statusFilter) return false;
      if (!q) return true;
      return [r.name, r.email, r.phone, projectLabel(r.project)]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [rows, query, statusFilter]);

  function startEdit(r: Pledge) {
    setEditingId(r.id);
    setDraft({
      name: r.name ?? "",
      email: r.email ?? "",
      phone: r.phone ?? "",
      amount: r.amount != null ? String(r.amount) : "",
      project: r.project ?? "",
      status: r.status ?? "pending",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(null);
  }

  async function saveEdit(id: string) {
    if (!draft) return;
    setSaving(true);
    try {
      await apiFetch(id, "PATCH", {
        name: draft.name,
        email: draft.email,
        phone: draft.phone,
        amount: Number(draft.amount) || null,
        project: draft.project || null,
        status: draft.status,
      });
      setRows((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, name: draft.name, email: draft.email, phone: draft.phone, amount: Number(draft.amount) || null, project: draft.project || null, status: draft.status }
            : r
        )
      );
      setEditingId(null);
      setDraft(null);
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  async function updateStatus(id: string, status: string) {
    try {
      await apiFetch(id, "PATCH", { status });
      setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    } catch (err) {
      alert((err as Error).message);
    }
  }

  async function deleteRow(id: string) {
    setDeletingId(id);
    try {
      await apiFetch(id, "DELETE");
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setDeletingId(null);
    }
  }

  function exportCsv() {
    const header = ["ID", "Name", "Email", "Phone", "Project", "Amount", "Status", "Submitted"];
    const lines = [header.map(csvCell).join(",")];
    for (const r of filtered) {
      lines.push([r.id, r.name, r.email, r.phone, projectLabel(r.project), r.amount,
        STATUS_STYLES[(r.status || "pending").toLowerCase()]?.label ?? r.status, r.created_at].map(csvCell).join(","));
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

  const inputCls = "w-full rounded-lg border border-line bg-mist px-2.5 py-1.5 text-[13px] text-ink outline-none focus:border-brand-400 focus:bg-white";

  return (
    <div className="rounded-2xl border border-line bg-white shadow-[0_2px_12px_rgba(16,34,63,0.05)]">
      {/* Toolbar */}
      <div className="flex flex-col gap-3 border-b border-line p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-[18px] font-bold text-ink">Support Requests</h2>
          <p className="mt-0.5 text-[12.5px] text-slatey-500">{filtered.length} of {rows.length} records</p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="relative">
            <svg className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slatey-400" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name, email, phone…"
              className="w-full rounded-xl border border-line bg-mist py-2 pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-slatey-400 focus:border-brand-400 focus:bg-white sm:w-64" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-line bg-mist px-3 py-2 text-[13px] font-medium text-ink outline-none transition-colors focus:border-brand-400 focus:bg-white">
            <option value="all">All statuses</option>
            <option value="pending">New</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Closed</option>
          </select>
          <button onClick={exportCsv} disabled={filtered.length === 0}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2 text-[13px] font-semibold text-white transition-colors hover:bg-brand-600 disabled:cursor-not-allowed disabled:opacity-50">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Export CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-line bg-mist/60 text-[11px] font-semibold uppercase tracking-wider text-slatey-500">
              <th className="px-5 py-3">Donor</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Project</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Submitted</th>
              <th className="px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-[13.5px]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-5 py-16 text-center text-slatey-400">
                  {rows.length === 0 ? "No support requests yet. Submissions will appear here." : "No records match your filters."}
                </td>
              </tr>
            ) : (
              filtered.map((r) => {
                const isEditing = editingId === r.id;
                const isDeleting = deletingId === r.id;

                if (isEditing && draft) {
                  return (
                    <tr key={r.id} className="border-b border-brand-100 bg-brand-50/30">
                      <td className="px-4 py-3">
                        <input value={draft.name} onChange={(e) => setDraft({ ...draft, name: e.target.value })} placeholder="Name" className={inputCls} />
                      </td>
                      <td className="px-4 py-3 space-y-1.5">
                        <input value={draft.email} onChange={(e) => setDraft({ ...draft, email: e.target.value })} placeholder="Email" className={inputCls} />
                        <input value={draft.phone} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} placeholder="Phone" className={inputCls} />
                      </td>
                      <td className="px-4 py-3">
                        <select value={draft.project} onChange={(e) => setDraft({ ...draft, project: e.target.value })} className={inputCls}>
                          <option value="">— None —</option>
                          <option value="JANANI_MITRA">Janani Mitra</option>
                          <option value="MAP_AP">MAP-AP</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" value={draft.amount} onChange={(e) => setDraft({ ...draft, amount: e.target.value })} placeholder="Amount" className={inputCls} />
                      </td>
                      <td className="px-4 py-3">
                        <select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })} className={inputCls}>
                          <option value="pending">New</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Closed</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-slatey-400 text-[12px]">{formatDate(r.created_at)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button onClick={() => saveEdit(r.id)} disabled={saving}
                            className="rounded-lg bg-brand-500 px-3 py-1.5 text-[12px] font-semibold text-white hover:bg-brand-600 disabled:opacity-50">
                            {saving ? "Saving…" : "Save"}
                          </button>
                          <button onClick={cancelEdit} className="rounded-lg border border-line px-3 py-1.5 text-[12px] font-semibold text-slatey-600 hover:bg-mist">
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }

                return (
                  <tr key={r.id} className={`border-b border-line/70 transition-colors hover:bg-mist/40 ${isDeleting ? "opacity-40" : ""}`}>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{r.name || "—"}</p>
                    </td>
                    <td className="px-5 py-4">
                      {r.email && <a href={`mailto:${r.email}`} className="block text-brand-600 hover:text-brand-700">{r.email}</a>}
                      {r.phone && <span className="block text-slatey-500">{r.phone}</span>}
                      {!r.email && !r.phone && <span className="text-slatey-400">—</span>}
                    </td>
                    <td className="px-5 py-4 text-slatey-600">{projectLabel(r.project) || "—"}</td>
                    <td className="px-5 py-4 text-right font-semibold text-ink">{formatINR(r.amount)}</td>
                    <td className="px-5 py-4">
                      <select
                        value={r.status ?? "pending"}
                        onChange={(e) => updateStatus(r.id, e.target.value)}
                        className={`rounded-full border px-2.5 py-0.5 text-[11.5px] font-semibold outline-none cursor-pointer ${
                          STATUS_STYLES[(r.status || "pending").toLowerCase()]?.cls ?? "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        <option value="pending">New</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Closed</option>
                      </select>
                    </td>
                    <td className="px-5 py-4 text-slatey-500">{formatDate(r.created_at)}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {/* Edit */}
                        <button onClick={() => startEdit(r)} title="Edit"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slatey-400 transition-colors hover:border-brand-200 hover:text-brand-600">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                          </svg>
                        </button>
                        {/* Delete */}
                        <button
                          onClick={() => { if (window.confirm(`Delete record for "${r.name}"? This cannot be undone.`)) deleteRow(r.id); }}
                          disabled={isDeleting}
                          title="Delete"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-line text-slatey-400 transition-colors hover:border-rose-200 hover:text-rose-500 disabled:opacity-40"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                            <path d="M10 11v6" /><path d="M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
