"use client";

import { Icon } from "@/components/ui/Icon";

/**
 * "Fund this program" CTA. Smoothly scrolls to the Express Your Interest form
 * and tells it which program to pre-select via a custom event the form listens
 * for (see ExpressForm). Keeps everything client-side — no router navigation.
 */
export function FundButton({
  program,
  className,
  label = "Fund this program",
}: {
  program: string;
  className: string;
  label?: string;
}) {
  return (
    <a href="/express" className={className}>
      {label}
      <Icon name="arrow-right" size={18} />
    </a>
  );
}
