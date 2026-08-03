"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { Wordmark } from "@/components/shop/wordmark";
import { dealOfDay, TABBY_MIN } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * Counts to midnight, not to a duration.
 *
 * The flash-deal clock starts from `Date.now()` on mount, so it reads the same
 * two hours forty-five to every visitor on every visit. A deal of the day has
 * an end that actually exists — end of today — so the number is true and it
 * still resets daily. Renders `--` until the client has a clock, which also
 * keeps it out of the server HTML.
 */
function ToMidnight() {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => {
      const end = new Date();
      end.setHours(24, 0, 0, 0);
      setLeft(end.getTime() - Date.now());
    };
    tick();
    const t = window.setInterval(tick, 1000);
    return () => window.clearInterval(t);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const text =
    left == null
      ? "--:--:--"
      : [
          pad(Math.floor(left / 3600_000)),
          pad(Math.floor((left % 3600_000) / 60_000)),
          pad(Math.floor((left % 60_000) / 1000)),
        ].join(":");

  return (
    <span className="text-[12.5px] font-bold text-accent tnum" aria-label="Time left today">
      {text}
    </span>
  );
}

export function DealOfDay() {
  const d = dealOfDay;
  const off = Math.round(((d.was - d.price) / d.was) * 100);
  const claimed = d.unitsTotal - d.unitsLeft;
  const pct = Math.round((claimed / d.unitsTotal) * 100);

  return (
    <aside className="-mx-4 flex flex-col overflow-hidden rounded-none bg-surface shadow-card sm:mx-0 sm:rounded-xl">
      <header className="flex items-center justify-between gap-2 bg-ink px-3 py-2">
        <h2 className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-wide text-ink-fg">
          <Icon name="Flame" className="size-4 fill-accent text-accent" strokeWidth={0} />
          Deal of the Day
        </h2>
        <ToMidnight />
      </header>

      {/* The brand ribbon, travelling left to right under the clock.
          Two identical copies of the run, sliding -50% → 0, so the frame where
          it snaps back is the frame before it and there is no seam; the mask on
          .marquee fades both ends so a lockup arrives and leaves rather than
          popping. It pauses on hover with every other marquee on the page, and
          the reduced-motion block stops it dead.

          aria-hidden: it is the shop's own name repeated eight times, which is
          decoration to look at and noise to listen to. */}
      <div aria-hidden className="marquee bg-logo py-[5px]">
        <div className="marquee-track marquee-ribbon flex w-max items-center">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex items-center">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center gap-2.5 pr-2.5">
                  <Wordmark plain className="text-[12px]" />
                  <Icon name="Flame" className="size-2.5 fill-accent text-accent" strokeWidth={0} />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Side by side at every width now, not stacked in the desktop rail.
          This panel is the taller half of the hero row, so it decides where
          the category circles land — and a full-width 16/9 shot of a phone was
          spending ~110px of that on white space beside it. Beside the identity
          block instead, the same image costs nothing: the brand, title and
          price were never as tall as it was. */}
      <div className="flex flex-1 flex-col p-3 lg:p-2.5">
        {/* flex-1 + stretch: the panel is stretched to the banner's height, and
            the leftover is better spent making the product bigger than left as
            a dead band between the price and the progress bar */}
        <div className="flex gap-3 lg:flex-1">
          {/* max-w: 38% of a tablet-width panel is a 305px square, which made
              this card taller than the banner it sits under */}
          <div className="relative aspect-square w-[38%] max-w-[150px] shrink-0 overflow-hidden rounded-lg bg-white lg:aspect-auto lg:w-[124px] lg:max-w-none lg:self-stretch">
            {/* above the fold on every breakpoint, and large enough that it wins
                LCP off the hero — so it loads eagerly rather than lazily */}
            <Image
              src={d.img}
              alt={d.title}
              fill
              sizes="(max-width: 1024px) 40vw, 124px"
              priority
              className="object-contain p-2"
            />
            <span className="absolute left-1.5 top-1.5 rounded-md bg-success px-1.5 py-0.5 text-[11.5px] font-extrabold leading-tight text-success-fg tnum">
              {off}% OFF
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <span className="block text-[10px] font-bold uppercase tracking-[0.1em] text-fg-subtle">
              {d.brand}
            </span>
            <h3 className="mt-0.5 line-clamp-2 text-[13px] font-semibold leading-snug text-fg">
              <a href="#">{d.title}</a>
            </h3>

            <div className="mt-1.5 flex flex-wrap items-baseline gap-x-2">
              <span className="text-[20px] font-extrabold leading-none text-fg tnum">
                AED {money(d.price)}
              </span>
              <span className="text-[12px] text-fg-subtle line-through tnum">
                AED {money(d.was)}
              </span>
            </div>
            <p className="mt-1 text-[11.5px] font-bold text-success tnum">
              Save AED {money(d.was - d.price)}
            </p>
          </div>
        </div>

        {/* full width under both, where the progress bar has room to be read.
            The row above takes the slack, so this block sits on the floor of
            the panel without a gap opening above it. */}
        <div className="pt-2">
          {/* the attach story — the only bundled listing in the catalogue, so
              it does the work a generic "great value" line can't */}
          <p className="flex items-start gap-1.5 text-[11.5px] leading-tight text-success">
            <Icon name="Sparkles" className="mt-px size-3.5 shrink-0" />
            {d.includes}
          </p>

          {d.price >= TABBY_MIN && (
            <p className="mt-1.5 text-[11px] text-fg-muted tnum">
              or 4 × AED {money(Math.round(d.price / 4))} with{" "}
              <span className="font-bold text-fg">tabby</span>
            </p>
          )}

          {/* scarcity you can check: units, not a bar with no number on it */}
          <div className="mt-2">
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-3">
              <div className="h-full rounded-full bg-sale" style={{ width: `${pct}%` }} />
            </div>
            <p className="mt-1.5 text-[11px] font-semibold text-fg-muted tnum">
              {claimed} of {d.unitsTotal} claimed —{" "}
              <span className="text-sale">only {d.unitsLeft} left</span>
            </p>
          </div>

          <button
            type="button"
            className="mt-2.5 w-full rounded-lg bg-accent py-2 text-[13.5px] font-bold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            Add to cart
          </button>
        </div>
      </div>
    </aside>
  );
}
