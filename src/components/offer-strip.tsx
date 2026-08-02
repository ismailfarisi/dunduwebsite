"use client";

import { useState } from "react";
import { X } from "lucide-react";

/** Slim sticky offer bar, mobile only, dismissible — 36px, not a bottom nav. */
export function OfferStrip() {
  const [gone, setGone] = useState(false);
  if (gone) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex h-9 items-center justify-center gap-2 bg-accent px-3 text-accent-fg lg:hidden">
      <p className="truncate text-[12.5px] font-semibold">
        Save an extra 5% on your first app order
      </p>
      <button
        type="button"
        onClick={() => setGone(true)}
        aria-label="Dismiss offer"
        className="grid size-7 shrink-0 place-items-center rounded-full"
      >
        <X className="size-4" strokeWidth={2.25} aria-hidden />
      </button>
    </div>
  );
}
