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
}: {
  program: string;
  className: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent("aim:select-program", { detail: program }));
    document.getElementById("express")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <a href="#express" onClick={handleClick} className={className}>
      Fund this program
      <Icon name="arrow-right" size={18} />
    </a>
  );
}
