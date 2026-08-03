"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/icon";
import { DealOfDay } from "@/components/shop/deal-of-day";
import { allItems, heroSlides, usps } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/** one slide, and the fill on the active dot, run to the same clock */
const SLIDE_MS = 6000;

const N = heroSlides.length;

/**
 * The banner is a photograph.
 *
 * It used to be a cutout product floating on a purple gradient, which is what
 * a template looks like — the shot could have been any shot and the panel
 * behind it said nothing. Now a real summer photograph fills the frame, a
 * scrim darkens the side the words are on, and the words sit on top of it.
 * The product hasn't left; it's a chip beside the price, where it says which
 * listing the slide is quoting without competing with the picture.
 *
 * The scrim changes edge with the viewport, because the photography does. Every
 * shot in the set frames its subject in the left third, so on a wide panel the
 * copy takes the open right-hand side and the scrim runs right-to-left. A phone
 * crops that frame to about half its width and there is no "side" left, so the
 * scrim runs bottom-to-top and the copy sits on the floor of the banner.
 */
export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  /** which way the last change went, so the copy enters from that side */
  const [dir, setDir] = useState(1);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // the timer always moves forward, so the copy enters from the right
    const t = window.setInterval(() => {
      setDir(1);
      setI((v) => (v + 1) % N);
    }, SLIDE_MS);
    return () => window.clearInterval(t);
  }, [paused]);

  const s = heroSlides[i];
  const go = (d: 1 | -1) => {
    setDir(d);
    setI((v) => (v + d + N) % N);
  };
  const jump = (to: number) => {
    setDir(to > i ? 1 : -1);
    setI(to);
  };

  // a banner on a phone has no arrows, so the gesture has to be the control
  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
  };

  // the listing the slide is showing, so the banner can quote a real price
  const item = s.itemId ? allItems.find((it) => it.id === s.itemId) : undefined;
  const off = item?.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;

  /* Only the slide either side of this one is mounted. Six full-bleed
     photographs is about 440 KB, and five of them are behind the one you can
     see — this keeps the first paint to the one that matters and still has the
     next frame decoded before the crossfade needs it. */
  const near = (idx: number) => idx === i || idx === (i + 1) % N || idx === (i - 1 + N) % N;

  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_310px]">
      {/* banner — rendered on the server too, so it is never an empty box */}
      <div
        className="relative isolate -mx-4 overflow-hidden rounded-none bg-ink sm:mx-0 sm:rounded-xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div aria-hidden className="absolute inset-0 -z-10">
          {heroSlides.map((sl, idx) =>
            near(idx) ? (
              <Image
                key={sl.id}
                src={sl.photo}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                /* the one above the fold on every breakpoint, and the largest
                   element on the page — it is the LCP candidate */
                preload={idx === 0}
                className={`object-cover transition-opacity duration-[900ms] ease-out ${
                  idx === i ? "hero-pan opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: sl.pos }}
              />
            ) : null,
          )}
        </div>

        {/* Two scrims, one per edge, swapped at `sm`. Both are built from --ink
            so the banner keeps the same black in either theme, and both stop
            short of the far edge — a scrim that reaches all the way across is
            just a dark rectangle with a photo hiding under it. */}
        <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

        {/* the slide's own colour, laid into the darkened panel the copy sits
            on — enough to tie the photograph to the department without
            tinting the photograph */}
        <div
          aria-hidden
          key={s.id}
          className="hero-tint absolute inset-0 -z-10"
          style={{ "--tint": s.tint } as React.CSSProperties}
        />

        {/* The minimum is the tallest slide, measured, not a round number —
            without a floor the whole page below the hero moved every six
            seconds as the carousel advanced.

            Mobile stacks to the floor of the frame and reserves pb for the
            dots; from `sm` the copy takes the open right-hand half of the
            photograph, and pr clears the next arrow. */}
        <div className="relative flex min-h-[352px] flex-col justify-end px-4 pb-11 pt-6 sm:min-h-[363px] sm:flex-row sm:items-center sm:justify-end sm:px-10 sm:pb-14 sm:pr-14 sm:pt-8">
          <div
            key={s.id}
            className="hero-copy w-full sm:w-[54%] lg:w-[52%]"
            style={{ "--dir": dir } as React.CSSProperties}
          >
            <span className="w-fit text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              {s.eyebrow}
            </span>
            <h1 className="mt-2.5 text-[26px] font-extrabold leading-[1.06] tracking-tight text-ink-fg sm:mt-3 sm:text-[40px]">
              {s.line1}
              <br />
              {s.line2}
            </h1>
            <p className="mt-2.5 line-clamp-2 text-[13px] leading-relaxed text-ink-fg-muted sm:mt-3 sm:text-[14.5px]">
              {s.sub}
            </p>

            {/* One row: the listing the slide is quoting, and the way in.
                Stacked they cost 68px of a 363px banner, which the headline
                needs more. Wraps rather than shrinks on a narrow phone. */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5 sm:mt-5 sm:gap-3">
              {item && (
                <Link
                  href={`/product/${item.id}`}
                  /* no text-shadow inside the two solid chips — they carry
                     their own background, and the shadow only muddied them */
                  className="group flex items-center gap-2.5 rounded-full bg-white/12 py-1 pl-1 pr-3.5 ring-1 ring-white/20 backdrop-blur transition-colors [text-shadow:none] hover:bg-white/20"
                >
                  <span className="relative size-9 shrink-0 overflow-hidden rounded-full bg-white sm:size-10">
                    <Image
                      src={s.img}
                      alt={s.alt}
                      fill
                      sizes="40px"
                      className="object-contain p-1"
                    />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[9.5px] font-bold uppercase tracking-[0.12em] text-ink-fg-muted">
                      From
                    </span>
                    <span className="block text-[14.5px] font-extrabold leading-tight text-ink-fg tnum sm:text-[15.5px]">
                      AED {money(item.price)}
                    </span>
                  </span>
                  {off > 0 && (
                    <span className="shrink-0 rounded-full bg-sale px-1.5 py-0.5 text-[10.5px] font-bold text-sale-fg tnum">
                      -{off}%
                    </span>
                  )}
                </Link>
              )}

              <a
                href="#"
                className="hero-shine relative inline-block w-fit overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-bold text-accent-fg transition-transform [text-shadow:none] hover:-translate-y-0.5 hover:bg-accent-hover sm:px-6 sm:text-[14px]"
              >
                {s.cta}
              </a>
            </div>
          </div>
        </div>

        {/* dark rather than translucent white: the left half of the frame is
            open sky in most of these shots, and a white button on it vanished */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/55 sm:grid"
        >
          <Icon name="ChevronLeft" className="size-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-black/35 text-white backdrop-blur transition-colors hover:bg-black/55 sm:grid"
        >
          <Icon name="ChevronRight" className="size-4" />
        </button>

        {/* bottom-left on a phone, where the scrim is; bottom-right on a wide
            panel, under the copy — over on the left it would be white dots on
            a bright sky. The active dot runs the slide's own clock, so the
            banner shows how long you have rather than changing under you. */}
        <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-6 sm:left-auto sm:right-10">
          {heroSlides.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => jump(idx)}
              aria-label={`Go to ${sl.category}`}
              aria-current={idx === i}
              className={`h-2 overflow-hidden rounded-full transition-all ${
                idx === i ? "w-8 bg-black/35" : "w-2 bg-white/55 hover:bg-white"
              }`}
            >
              {idx === i && (
                <span
                  key={sl.id}
                  className="hero-progress block h-full w-full origin-left rounded-full bg-accent"
                  /* paused freezes the fill where it is. Dropping the class
                     instead would snap the bar to full — which reads as "this
                     slide is about to change" at the exact moment it can't. */
                  style={{
                    animationDuration: `${SLIDE_MS}ms`,
                    animationPlayState: paused ? "paused" : "running",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <DealOfDay />

      {/* The six USP rows that used to hold this rail said the same four things
          as the utility strip above and the trust row above the footer. The
          strip is desktop-only, so mobile keeps one 28px line of it. */}
      <div className="flex items-center justify-between gap-2 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface px-3 py-2 lg:hidden">
        {usps.slice(0, 3).map((u) => (
          <span
            key={u.title}
            className="flex min-w-0 items-center gap-1.5 text-[11px] font-semibold text-fg-muted"
          >
            <Icon name={u.icon} className="size-3.5 shrink-0 text-fg" />
            <span className="truncate">{u.title}</span>
          </span>
        ))}
      </div>
    </section>
  );
}
