"use client";

import { useState, useEffect, useRef } from "react";
import { Icon } from "@/components/ui/Icon";

type Pledge = {
  id: string;
  name: string;
  amount: number;
  created_at: string;
};

type FeedItem = Pledge & { animKey: number };

const AVATAR_COLORS = [
  "bg-brand-500",
  "bg-emerald-500",
  "bg-violet-500",
  "bg-amber-500",
];

function getTimeAgo(dateStr: string): string {
  const diffSec = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
}

function initials(name: string) {
  return name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();
}

function formatAmount(n: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

export function LiveExpressionsPanel() {
  const [open, setOpen] = useState(true);
  const [pledges, setPledges] = useState<Pledge[]>([]);
  const [feedItems, setFeedItems] = useState<FeedItem[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const feedIndexRef = useRef(0);
  const animKeyRef = useRef(0);
  const burstDoneRef = useRef(false);
  const pledgesRef = useRef(pledges);
  pledgesRef.current = pledges;

  // Poll API every 5 seconds
  useEffect(() => {
    const load = () =>
      fetch("/api/pledges")
        .then((r) => r.json())
        .then((data: Pledge[]) => setPledges(data))
        .catch(() => {});

    void load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  // Feed pledges into the panel one by one
  useEffect(() => {
    if (!pledges.length) return;

    const addNext = () => {
      const list = pledgesRef.current;
      if (!list.length) return;
      const item = list[feedIndexRef.current % list.length]!;
      animKeyRef.current += 1;
      setFeedItems((prev) => {
        const next = [...prev, { ...item, animKey: animKeyRef.current }];
        return next.length > 50 ? next.slice(-50) : next;
      });
      feedIndexRef.current += 1;
    };

    if (!burstDoneRef.current) {
      burstDoneRef.current = true;
      const burst = Math.min(pledges.length, 5);
      for (let i = 0; i < burst; i++) setTimeout(addNext, i * 200);
    }

    const id = setInterval(addNext, 3000);
    return () => clearInterval(id);
  }, [pledges]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [feedItems.length]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 rounded-xl border border-line bg-white py-2.5 pl-2.5 pr-4 shadow-card transition-all hover:scale-105 hover:shadow-card-hover sm:bottom-6 sm:right-6"
      >
        <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
          <Icon name="users" size={16} className="text-brand-600" />
          <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
          </span>
        </div>
        <span className="text-[13px] font-semibold text-ink">
          {pledges.length} {pledges.length === 1 ? "Expression" : "Expressions"}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex h-[400px] w-[300px] flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-2xl sm:bottom-6 sm:right-6 sm:w-[340px]">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between border-b border-line bg-mist px-4 py-3">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50">
              <Icon name="users" size={16} className="text-brand-600" />
            </div>
            <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
          </div>
          <div>
            <p className="text-[13px] font-semibold text-ink">Live Expressions</p>
            <p className="text-[10px] text-slatey-400">{pledges.length} supporters</p>
          </div>
        </div>
        <button
          onClick={() => setOpen(false)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slatey-400 transition-colors hover:bg-line hover:text-ink"
          aria-label="Minimize"
        >
          <Icon name="close" size={14} />
        </button>
      </div>

      {/* Feed */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        {!feedItems.length ? (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mist">
              <Icon name="users" size={22} className="text-slatey-300" />
            </div>
            <p className="text-[13px] text-slatey-400">No expressions yet</p>
            <p className="text-[11px] text-slatey-300">Be the first to express!</p>
          </div>
        ) : (
          <div className="flex min-h-full flex-col justify-end">
            {feedItems.map((item, i) => (
              <div
                key={item.animKey}
                className="flex items-center gap-3 px-4 py-2.5 animate-[slideUp_0.3s_ease-out]"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white ${AVATAR_COLORS[i % AVATAR_COLORS.length]}`}
                >
                  {initials(item.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="truncate text-[13px] font-semibold text-ink">{item.name}</p>
                    <span className="shrink-0 text-[10px] text-slatey-300">
                      {getTimeAgo(item.created_at)}
                    </span>
                  </div>
                  <p className="text-[11px] text-slatey-400">
                    expressed{" "}
                    <span className="font-bold text-emerald-600">{formatAmount(item.amount)}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
