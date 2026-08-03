"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { ItemCard } from "@/components/shop/item-card";
import { useRailScroll } from "@/hooks/use-rail-scroll";
import { flashDeals } from "@/lib/home";

function Countdown({ hours = 2, minutes = 45, seconds = 30 }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + (hours * 3600 + minutes * 60 + seconds) * 1000;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [hours, minutes, seconds]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const parts =
    left == null
      ? ["--", "--", "--"]
      : [
          pad(Math.floor(left / 3600_000)),
          pad(Math.floor((left % 3600_000) / 60_000)),
          pad(Math.floor((left % 60_000) / 1000)),
        ];
  const labels = ["Hrs", "Mins", "Secs"];

  return (
    <span className="flex items-center gap-1.5" aria-label="Time left on these deals">
      {parts.map((p, i) => (
        <span key={labels[i]} className="flex flex-col items-center">
          <span className="grid h-7 w-9 place-items-center rounded-md bg-ink text-[13px] font-bold text-ink-fg tnum">
            {p}
          </span>
          <span className="mt-0.5 text-[9.5px] font-medium uppercase tracking-wide text-fg-subtle">
            {labels[i]}
          </span>
        </span>
      ))}
    </span>
  );
}

export function FlashDeals() {
  const { ref, atStart, atEnd, sync, nudge } = useRailScroll();

  return (
    <section className="relative mt-3 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:p-4">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <h2 className="flex items-center gap-1.5 text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
          <Icon name="Zap" className="size-[18px] fill-fg text-fg" strokeWidth={0} />
          Flash Deals
        </h2>
        <Countdown />
        <a
          href="#"
          className="tap ml-auto flex items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          View All Deals
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      <div
        ref={ref}
        onScroll={sync}
        className="rail -mx-3 mt-4 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:-mx-1 sm:px-1 sm:scroll-pl-1"
      >
        {flashDeals.map((d) => (
          <div
            key={d.id}
            className="w-[46vw] max-w-[220px] shrink-0 sm:w-[172px] sm:max-w-none lg:w-[196px]"
          >
            <ItemCard item={d} />
          </div>
        ))}
      </div>

      <button
        onClick={() => nudge(-1)}
        disabled={atStart}
        aria-label="Scroll flash deals left"
        className="absolute left-1 top-1/2 hidden size-8 translate-y-2 place-items-center rounded-full bg-surface text-fg-muted shadow-card-hover transition-opacity hover:text-fg disabled:pointer-events-none disabled:opacity-0 sm:grid"
      >
        <Icon name="ChevronLeft" className="size-4" />
      </button>
      <button
        onClick={() => nudge(1)}
        disabled={atEnd}
        aria-label="Scroll flash deals right"
        className="absolute right-1 top-1/2 hidden size-8 translate-y-2 place-items-center rounded-full bg-surface text-fg-muted shadow-card-hover transition-opacity hover:text-fg disabled:pointer-events-none disabled:opacity-0 sm:grid"
      >
        <Icon name="ChevronRight" className="size-4" />
      </button>
    </section>
  );
}
