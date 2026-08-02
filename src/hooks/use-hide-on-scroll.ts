"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Returns false while the user is scrolling down past `threshold`, true again
 * as soon as they scroll up. Used to give the mobile header back to content —
 * the single biggest source of "more scrolling area".
 */
export function useHideOnScroll(threshold = 120) {
  const [visible, setVisible] = useState(true);
  const last = useRef(0);

  useEffect(() => {
    last.current = window.scrollY;
    let frame = 0;

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const delta = y - last.current;

        // ignore sub-pixel jitter and rubber-banding at the top
        if (Math.abs(delta) > 6) {
          setVisible(y < threshold || delta < 0);
          last.current = y;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return visible;
}
