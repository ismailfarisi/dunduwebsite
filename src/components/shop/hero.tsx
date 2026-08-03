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
 * The banner sells a department, so the department is what you see.
 *
 * Its lead listing is the subject — shot large on a lit disc, on the side of
 * the panel the eye lands on — and under it sit three more listings from the
 * same aisle. That row is the difference between "here is a television" and
 * "here is the television aisle": four real products, four real prices, all
 * linked. The category is named in a pill above the headline rather than left
 * to be inferred from a photograph.
 *
 * The photograph is still here, but it is the light in the room now, not the
 * slide. Sharp, it put a woman on a beach behind a blender — a picture with
 * nothing to do with what was being sold. Blurred back to colour and warmth it
 * gives the panel real daylight instead of the flat gradient this started as,
 * and it keeps the campaign: it is August in the UAE and every frame is that
 * heat.
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

  // the listing the slide leads with, so the banner prices itself off the
  // catalogue, and the rest of its aisle underneath
  const item = s.itemId ? allItems.find((it) => it.id === s.itemId) : undefined;
  const off = item?.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;
  const picks = s.picks.map((id) => allItems.find((it) => it.id === id)).filter((it) => it != null);

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
        {/* The layer is 40px bigger than the panel on every side, not scaled: a
            blurred `fill` image feathers into transparency at its own edges,
            and the overscan has to survive the reduced-motion rule that clears
            the pan's transform. */}
        <div aria-hidden className="absolute inset-[-40px] -z-10">
          {heroSlides.map((sl, idx) =>
            near(idx) ? (
              <Image
                key={sl.id}
                src={sl.photo}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 1000px"
                preload={idx === 0}
                className={`object-cover blur-[18px] transition-opacity duration-[900ms] ease-out ${
                  idx === i ? "hero-pan opacity-100" : "opacity-0"
                }`}
                style={{ objectPosition: sl.pos }}
              />
            ) : null,
          )}
        </div>

        {/* The veil the copy is read against. Heavier on the copy side, built
            from --ink so the banner keeps the same dark in either theme. */}
        <div aria-hidden className="hero-scrim absolute inset-0 -z-10" />

        {/* the department's colour, once, as the light behind its product */}
        <div
          aria-hidden
          key={s.id}
          className="hero-tint absolute inset-0 -z-10"
          style={{ "--tint": s.tint } as React.CSSProperties}
        />

        {/* The minimum is the tallest slide, measured, not a round number —
            without a floor the whole page below the hero moved every six
            seconds as the carousel advanced.

            Three type sizes, not two. The panel is not one width above `sm`:
            it is 608–992px in the single-column band, then *narrows* to 670 at
            `lg`, where the 310px Deal of the Day panel arrives beside it, and
            only reaches 926 at `xl`.

            The side padding clears the arrows rather than approximately
            clearing them: they are 40px from each edge, and at `sm:px-7` on a
            670px panel the previous arrow was sitting on the first letter of
            the sub. A phone gets px-4, because there are no arrows on it. */}
        <div className="relative flex min-h-[352px] items-center gap-3 px-4 pb-10 pt-6 sm:min-h-[363px] sm:gap-5 sm:px-12 sm:pb-11 sm:pt-7 xl:gap-7 xl:px-14">
          <div
            key={s.id}
            className="hero-copy min-w-0 flex-1"
            style={{ "--dir": dir } as React.CSSProperties}
          >
            {/* named, not implied. An uppercase eyebrow reads as decoration;
                a pill reads as the aisle you are standing in. */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/14 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-ink-fg ring-1 ring-white/25 backdrop-blur sm:px-3 sm:text-[11px]">
              <span className="size-1.5 rounded-full bg-accent" />
              {s.category}
            </span>
            <h1 className="mt-2.5 text-[20px] font-extrabold leading-[1.06] tracking-tight text-ink-fg min-[400px]:text-[22px] sm:mt-3 sm:text-[30px] xl:text-[38px]">
              {s.line1}
              <br />
              {s.line2}
            </h1>
            <p className="mt-2 line-clamp-2 max-w-md text-[12.5px] leading-relaxed text-ink-fg-muted sm:mt-2.5 sm:text-[13.5px] xl:text-[14.5px]">
              {s.sub}
            </p>

            {/* the hook: a price out of the catalogue beats an adjective */}
            {item && (
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[11.5px] text-ink-fg-muted">From</span>
                <span className="text-[19px] font-extrabold leading-none text-ink-fg tnum xl:text-[22px]">
                  AED {money(item.price)}
                </span>
                {off > 0 && (
                  <span className="rounded-full bg-sale px-2 py-0.5 text-[11px] font-bold text-sale-fg tnum [text-shadow:none]">
                    -{off}%
                  </span>
                )}
              </p>
            )}

            <a
              href="#"
              className="hero-shine relative mt-3.5 inline-block w-fit overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-fg transition-transform [text-shadow:none] hover:-translate-y-0.5 hover:bg-accent-hover sm:mt-4 xl:px-6 xl:text-[14px]"
            >
              {s.cta}
            </a>
          </div>

          {/* The department, stacked: its lead listing large, then the rest of
              the aisle. Catalogue shots are cut out on white, so the tile
              behind them has to be white too — a circle reads as a spotlight
              where a hard-edged rectangle read as an image that failed to
              load, and it lets the product sit larger in the same space.

              The aisle row is on the phone too, at 32px — the department is
              the thing this slide is selling on every screen.

              What the column takes on a phone, the headline loses, and
              "cooler than outside." is the longest line in the set. Held to
              30vw the column leaves 204px at 360, which is where that line
              fits on one at 20px; the extra 2px of type only arrives at 400,
              where there is room for it. */}
          <div className="flex shrink-0 flex-col items-center gap-2.5 self-center sm:gap-3">
            <Link
              href={item ? `/product/${item.id}` : "#"}
              aria-label={item ? `View ${item.title}` : undefined}
              className="hero-stage relative grid aspect-square w-[30vw] max-w-[126px] place-items-center sm:w-[34vw] sm:max-w-[200px] xl:max-w-[228px]"
            >
              <span
                aria-hidden
                className="absolute inset-[-24%] rounded-full blur-2xl"
                style={{
                  backgroundImage: `radial-gradient(closest-side, rgba(${s.tint},.6) 28%, rgba(${s.tint},.24) 60%, transparent 78%)`,
                }}
              />
              <span className="relative size-full overflow-hidden rounded-full bg-white shadow-[0_18px_50px_rgba(0,0,0,.45)] ring-1 ring-white/30 transition-transform duration-300 hover:scale-[1.03]">
                <Image
                  key={s.img}
                  src={s.img}
                  alt={s.alt}
                  fill
                  sizes="(max-width: 640px) 140px, (max-width: 1280px) 200px, 240px"
                  preload
                  className={`hero-art ${
                    /* model photography is cropped to the subject: a
                       full-length figure fitted whole inside a circle is a
                       person you can't see */
                    s.img.includes("fashion-model")
                      ? "object-cover object-top"
                      : "object-contain p-[9%]"
                  }`}
                />
              </span>
            </Link>

            <div className="flex items-center gap-2">
              {picks.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  title={`${p.title} — AED ${money(p.price)}`}
                  className="hero-art relative size-8 overflow-hidden rounded-full bg-white shadow-[0_8px_20px_rgba(0,0,0,.35)] ring-1 ring-white/30 transition-transform duration-200 hover:-translate-y-0.5 sm:size-11 xl:size-12"
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="48px"
                    className="object-contain p-1.5"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

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

        {/* the active dot runs the slide's own clock, so the banner shows how
            long you have rather than changing under you */}
        <div className="absolute bottom-4 left-4 flex gap-2 sm:bottom-5 sm:left-12 xl:left-14">
          {heroSlides.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => jump(idx)}
              aria-label={`Go to ${sl.category}`}
              aria-current={idx === i}
              className={`h-2 overflow-hidden rounded-full transition-all ${
                idx === i ? "w-8 bg-black/40" : "w-2 bg-white/55 hover:bg-white"
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
