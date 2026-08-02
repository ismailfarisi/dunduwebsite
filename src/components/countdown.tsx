"use client";

import { useEffect, useState } from "react";

/** Renders nothing until mounted, so server and client markup always agree. */
export function Countdown({ hours = 6 }: { hours?: number }) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = Date.now() + hours * 3600_000;
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, [hours]);

  const pad = (n: number) => String(n).padStart(2, "0");
  const parts =
    left == null
      ? ["--", "--", "--"]
      : [
          pad(Math.floor(left / 3600_000)),
          pad(Math.floor((left % 3600_000) / 60_000)),
          pad(Math.floor((left % 60_000) / 1000)),
        ];

  return (
    <span className="inline-flex items-center gap-1" aria-label="Time left on these deals">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1">
          <span className="rounded bg-sale px-1.5 py-0.5 text-[12px] font-bold text-white tnum">
            {p}
          </span>
          {i < 2 && <span className="text-[12px] font-bold text-sale">:</span>}
        </span>
      ))}
    </span>
  );
}
