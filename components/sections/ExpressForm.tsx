"use client";

import { useEffect, useState } from "react";
import { express } from "@/lib/content";
import { isProjectCode, projectLabel } from "@/lib/projects";
import { Icon } from "@/components/ui/Icon";

const COUNTRY_CODES = [
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+1",  flag: "🇺🇸", name: "USA" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+1",  flag: "🇨🇦", name: "Canada" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
];

type Tone = "light" | "dark";

type FormState = {
  name: string;
  email: string;
  phone: string;
  project: string;
  amount: string;
  company: string;
};

const empty: FormState = {
  name: "",
  email: "",
  phone: "",
  project: express.projects[0]?.code ?? "",
  amount: "",
  company: "",
};

export function ExpressForm({ tone = "light" }: { tone?: Tone }) {
  const dark = tone === "dark";
  const [dialCode, setDialCode] = useState("+91");
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Pre-select a program from the ?program= query param (set by FeaturedPrograms / FundButton).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("program");
    if (code && isProjectCode(code)) {
      setForm((f) => ({ ...f, project: code }));
    }
  }, []);

  const labelClass = `block text-[11px] font-semibold uppercase tracking-[0.16em] ${
    dark ? "text-white/55" : "text-slatey-500"
  }`;
  const inputClass = `mt-1.5 w-full rounded-lg px-3 py-2 text-[13px] outline-none transition ${
    dark
      ? "border border-white/15 bg-white/[0.04] text-white placeholder:text-white/35 focus:border-brand-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-500/30"
      : "border border-line bg-mist text-ink placeholder:text-slatey-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
  }`;

  const update =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount < 1000) {
      setError("Amount must be at least ₹1,000.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/express", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, phone: `${dialCode} ${form.phone}` }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div
        className={`rounded-2xl p-6 text-center shadow-soft ${
          dark ? "border border-white/10 bg-white/[0.03]" : "border border-line bg-white"
        }`}
      >
        <span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-emerald-500/15 text-emerald-400">
          <Icon name="check" size={20} />
        </span>
        <h3 className={`mt-3 font-display text-[18px] ${dark ? "text-white" : "text-ink"}`}>
          Thank you, {form.name || "friend"}!
        </h3>
        <p className={`mt-2 text-[13px] leading-relaxed ${dark ? "text-white/65" : "text-slatey-500"}`}>
          Your expression of interest in <strong>{projectLabel(form.project)}</strong> has been recorded. Our team
          will reach out shortly to discuss your partnership.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setSubmitted(false);
          }}
          className="mt-6 text-[14px] font-semibold text-brand-400 transition-colors hover:text-brand-300"
        >
          Submit another expression
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`rounded-2xl p-4 shadow-soft ${
        dark ? "border border-white/10 bg-white/[0.03]" : "border border-line bg-white"
      }`}
      noValidate
    >
      {/* Honeypot — hidden from users; bots tend to fill it */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={form.company}
        onChange={update("company")}
        className="hidden"
      />

      {/* Full name */}
      <div>
        <label htmlFor="ef-name" className={labelClass}>
          {express.nameLabel} <span className="text-brand-400">*</span>
        </label>
        <input
          id="ef-name"
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      {/* Phone + Email */}
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="ef-phone" className={labelClass}>
            {express.phoneLabel} <span className="text-brand-400">*</span>
          </label>
          <div className="mt-1.5 flex">
            <select
              value={dialCode}
              onChange={(e) => setDialCode(e.target.value)}
              aria-label="Country code"
              className={`shrink-0 rounded-l-lg border-y border-l pr-1 pl-3 text-[13px] outline-none transition ${
                dark
                  ? "border-white/15 bg-white/[0.04] text-white focus:border-brand-400"
                  : "border-line bg-mist text-ink focus:border-brand-400"
              }`}
            >
              {COUNTRY_CODES.map((c) => (
                <option key={c.name} value={c.code}>
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
            <input
              id="ef-phone"
              type="tel"
              required
              value={form.phone}
              onChange={update("phone")}
              placeholder="98765 43210"
              className={`min-w-0 flex-1 rounded-r-lg border-y border-r px-3 py-2 text-[13px] outline-none transition ${
                dark
                  ? "border-white/15 bg-white/[0.04] text-white placeholder:text-white/35 focus:border-brand-400 focus:bg-white/[0.07] focus:ring-2 focus:ring-brand-500/30"
                  : "border-line bg-mist text-ink placeholder:text-slatey-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100"
              }`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="ef-email" className={labelClass}>
            {express.emailLabel} <span className="text-brand-400">*</span>
          </label>
          <input
            id="ef-email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      {/* Project of interest */}
      <fieldset className="mt-3">
        <legend className={labelClass}>
          {express.projectLabel} <span className="text-brand-400">*</span>
        </legend>
        <div className="mt-2 grid gap-2 sm:grid-cols-2">
          {express.projects.map((p) => {
            const selected = form.project === p.code;
            return (
              <button
                type="button"
                key={p.code}
                onClick={() => setForm((f) => ({ ...f, project: p.code }))}
                className={`relative rounded-xl border p-3 text-left transition-all ${
                  selected
                    ? dark
                      ? "border-brand-400 bg-brand-500/10"
                      : "border-brand-400 bg-brand-50"
                    : dark
                    ? "border-white/12 bg-white/[0.02] hover:border-white/25"
                    : "border-line bg-white hover:border-brand-200"
                }`}
              >
                <span
                  className={`absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border transition ${
                    selected
                      ? "border-brand-400 bg-brand-500 text-white"
                      : dark
                      ? "border-white/25"
                      : "border-line"
                  }`}
                >
                  {selected && <Icon name="check" size={12} />}
                </span>
                <p className={`text-[13px] font-semibold ${dark ? "text-white" : "text-ink"}`}>
                  {p.label}
                </p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-brand-400">
                  {p.amount}
                </p>
                <p className={`mt-1 text-[11px] leading-snug ${dark ? "text-white/55" : "text-slatey-500"}`}>
                  {p.desc}
                </p>
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Indicative amount */}
      <div className="mt-3">
        <label htmlFor="ef-amount" className={labelClass}>
          {express.amountLabel} <span className="text-brand-400">*</span>
        </label>
        <div className="relative">
          <span
            className={`pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-[15px] ${
              dark ? "text-white/40" : "text-slatey-400"
            }`}
          >
            ₹
          </span>
          <input
            id="ef-amount"
            type="number"
            min={1000}
            step={1}
            required
            value={form.amount}
            onChange={update("amount")}
            placeholder="30,00,000"
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      {error && <p className="mt-3 text-[13px] font-medium text-rose-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-4 w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        {loading ? "Sending…" : express.submitLabel}
      </button>
    </form>
  );
}
