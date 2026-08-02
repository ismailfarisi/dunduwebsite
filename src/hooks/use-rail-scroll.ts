"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Horizontal rail plumbing: a ref for the scroller, whether it is parked at
 * either end (so the arrows can hide rather than sit there disabled), and a
 * nudge of just under one viewport-width.
 *
 * A ResizeObserver re-checks on layout change — without it a rail that starts
 * short enough to need no arrows keeps them hidden after the window widens.
 */
export function useRailScroll() {
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

  const nudge = useCallback((dir: 1 | -1) => {
    ref.current?.scrollBy({
      left: dir * ref.current.clientWidth * 0.85,
      behavior: "smooth",
    });
  }, []);

  return { ref, atStart, atEnd, sync, nudge };
}
