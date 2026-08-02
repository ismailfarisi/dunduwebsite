"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icon";

export function Rail({
  title,
  subtitle,
  href = "#",
  accent,
  children,
}: {
  title: string;
  subtitle?: string;
  href?: string;
  accent?: React.ReactNode;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="mt-9 sm:mt-8">
      <div className="mb-3 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h2 className="text-[22px] font-extrabold leading-tight tracking-tight text-fg sm:text-xl sm:font-bold">
              {title}
            </h2>
            {accent}
          </div>
          {subtitle && (
            <p className="mt-1 text-[13px] text-fg-muted sm:mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={href}
            className="text-[13px] font-semibold text-brand hover:underline"
          >
            View all
          </a>
          <div className="hidden gap-1 sm:flex">
            <button
              type="button"
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label={`Scroll ${title} left`}
              className="grid size-8 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-border-strong hover:text-fg disabled:opacity-35"
            >
              <Icon name="ChevronLeft" className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label={`Scroll ${title} right`}
              className="grid size-8 place-items-center rounded-full border border-border bg-surface text-fg-muted transition-colors hover:border-border-strong hover:text-fg disabled:opacity-35"
            >
              <Icon name="ChevronRight" className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* full-bleed on mobile so the next card peeks past the screen edge and
          the rail reads as scrollable without an arrow affordance */}
      <div
        ref={ref}
        onScroll={sync}
        className="rail -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 scroll-pl-4 sm:-mx-1 sm:px-1 sm:scroll-pl-1"
      >
        {children}
      </div>
    </section>
  );
}
