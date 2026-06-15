"use client";

import { useState } from "react";
import { express } from "@/lib/content";
import { Icon } from "@/components/ui/Icon";

const labelClass =
  "block text-[12px] font-semibold uppercase tracking-[0.14em] text-slatey-500";
const inputClass =
  "mt-2 w-full rounded-lg border border-line bg-mist px-4 py-3 text-[15px] text-ink outline-none transition placeholder:text-slatey-400 focus:border-brand-400 focus:bg-white focus:ring-2 focus:ring-brand-100";

const empty = { name: "", email: "", phone: "", amount: "", company: "" };

export function ExpressForm() {
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const update =
    (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(form.amount);
    if (!amount || amount % 10000 !== 0) {
      setError("Amount must be a positive multiple of ₹10,000.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/express", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
      <div className="mt-8 rounded-2xl border border-line bg-white p-8 text-center shadow-soft">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-500">
          <Icon name="check" size={24} />
        </span>
        <h2 className="mt-4 font-display text-[22px] text-ink">
          Thank you, {form.name || "friend"}!
        </h2>
        <p className="mt-2 text-[14.5px] leading-relaxed text-slatey-500">
          Your pledge of ₹{Number(form.amount).toLocaleString("en-IN")} has been recorded.
          Our team will reach out shortly to confirm your contribution.
        </p>
        <button
          type="button"
          onClick={() => {
            setForm(empty);
            setSubmitted(false);
          }}
          className="mt-6 text-[14px] font-semibold text-brand-600 transition-colors hover:text-brand-700"
        >
          Submit another pledge
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="mt-5 rounded-2xl border border-line bg-white p-7 shadow-soft sm:p-8"
      noValidate
    >
      {/* Honeypot — hidden from users, bots tend to fill it */}
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

      <div>
        <label htmlFor="name" className={labelClass}>
          Full Name
        </label>
        <input
          id="name"
          type="text"
          required
          value={form.name}
          onChange={update("name")}
          placeholder="Full Name"
          className={inputClass}
        />
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={update("email")}
            placeholder="you@email.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={update("phone")}
            placeholder="9000011223"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="amount" className={labelClass}>
          {express.amountLabel}
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 mt-1 -translate-y-1/2 text-[15px] text-slatey-400">
            ₹
          </span>
          <input
            id="amount"
            type="number"
            min={10000}
            step={10000}
            required
            value={form.amount}
            onChange={update("amount")}
            placeholder="10000"
            className={`${inputClass} pl-9`}
          />
        </div>
      </div>

      {error && (
        <p className="mt-3 text-[13px] font-medium text-rose-600">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-7 w-full justify-center disabled:pointer-events-none disabled:opacity-60"
      >
        {loading ? "Sending…" : express.submitLabel}
      </button>
    </form>
  );
}
