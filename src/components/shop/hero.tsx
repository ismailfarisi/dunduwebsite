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
 * The banner is made of products on a colour.
 *
 * Nothing behind them is doing any work: no photograph, no scrim, no aurora,
 * no wash. The panel is one flat step of the department's own colour, and the
 * only things on it are the aisle's lead listing at full size, the rest of
 * that aisle underneath, and what they cost.
 *
 * The background is drawn rather than washed. A flat field was honest and dull
 * and a gradient is the thing that replaced; this is a composition, struck
 * entirely from the department's own colour: a deep field, a dot grid across
 * it, and a lit disc for the products to stand on with a ring turning slowly
 * around it. Every edge is hard, because a soft fade is a gradient by another
 * name.
 *
 * The disc is not decoration. Catalogue shots are cut out on white, and
 * `mix-blend-multiply` turns that white into whatever is behind it — so on the
 * deep field a white blender would have gone the colour of the field and
 * disappeared. Standing them on a near-white disc instead keeps every product
 * crisp and lets the colour live around them, which is also the more
 * interesting picture.
 *
 * The panel therefore stays light in both themes and carries its own text
 * colours — see --banner-* in globals.css.
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

  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_310px]">
      {/* banner — rendered on the server too, so it is never an empty box */}
      <div
        className="relative isolate -mx-4 overflow-hidden rounded-none transition-colors duration-700 sm:mx-0 sm:rounded-xl"
        /* The field, at half strength — a colour you notice rather than the
           tint of one. `isolate` is also what the products blend against: it
           makes this panel the isolation group, so `mix-blend-multiply` on a
           product finds these layers and nothing on the page under them. */
        style={{ backgroundColor: "var(--banner-deep)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Texture, not a wash: a dot grid in the field's own colour, faded out
            across the middle so it stays behind the copy and leaves the stage
            alone. The wedge is one hard-edged shape in the corner, which is
            what stops a large flat panel reading as an unloaded image. */}
        <div
          aria-hidden
          className="hero-dots absolute inset-0 -z-10"
          style={{
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,.16) 1.4px, transparent 1.5px)`,
          }}
        />
        <div
          aria-hidden
          className="absolute -bottom-[38%] -left-[12%] -z-10 size-[62%] rotate-[18deg] rounded-[28%]"
          style={{ backgroundColor: `rgba(${s.tint},.16)` }}
        />

        {/* The minimum is the tallest slide, measured, not a round number —
            without a floor the whole page below the hero moved every six
            seconds as the carousel advanced.

            Three type sizes, not two. The panel is not one width above `sm`:
            it is 608–992px in the single-column band, then *narrows* to 670 at
            `lg`, where the 310px Deal of the Day panel arrives beside it, and
            only reaches 926 at `xl`.

            The side padding clears the arrows rather than approximately
            clearing them: they are 40px from each edge. A phone gets px-4,
            because there are no arrows on it. */}
        <div className="relative flex min-h-[352px] items-center gap-3 px-4 pb-10 pt-6 sm:min-h-[363px] sm:gap-5 sm:px-12 sm:pb-11 sm:pt-7 xl:gap-7 xl:px-14">
          <div
            key={s.id}
            className="hero-copy min-w-0 flex-1"
            style={{ "--dir": dir } as React.CSSProperties}
          >
            {/* named, not implied. An uppercase eyebrow reads as decoration;
                a pill reads as the aisle you are standing in. */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-banner-fg ring-1 ring-white/25 backdrop-blur sm:px-3 sm:text-[11px]">
              <span className="size-1.5 rounded-full" style={{ backgroundColor: `rgb(${s.tint})` }} />
              {s.category}
            </span>
            <h1 className="mt-2.5 text-[20px] font-extrabold leading-[1.06] tracking-tight text-banner-fg min-[400px]:text-[22px] sm:mt-3 sm:text-[31px] xl:text-[42px]">
              {s.line1}
              <br />
              {s.line2}
            </h1>
            <p className="mt-2 line-clamp-2 max-w-md text-[12.5px] leading-relaxed text-banner-fg-muted sm:mt-2.5 sm:text-[13.5px] xl:text-[14.5px]">
              {s.sub}
            </p>

            {/* the hook: a price out of the catalogue beats an adjective */}
            {item && (
              <p className="mt-3 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[11.5px] text-banner-fg-muted">From</span>
                <span className="text-[19px] font-extrabold leading-none text-banner-fg tnum xl:text-[22px]">
                  AED {money(item.price)}
                </span>
              </p>
            )}

            {/* the lime, and it can be the lime again: the field is the shop's
                purple on every slide now, not the department's own colour, so
                there is no longer a panel for a lime pill to disappear into */}
            <a
              href="#"
              className="hero-shine relative mt-3.5 inline-block w-fit overflow-hidden rounded-full bg-accent px-5 py-2.5 text-[13px] font-bold text-accent-fg transition-transform hover:-translate-y-0.5 sm:mt-4 xl:px-6 xl:text-[14px]"
            >
              {s.cta}
            </a>
          </div>

          {/* The department, stacked: its lead listing at full size, then the
              rest of the aisle under it. No tile behind either.

              The aisle row is on the phone too, at 32px. What that column
              takes the headline loses, and "cooler than outside." is the
              longest line in the set — so the row is held to 112px there,
              which leaves the 204px that line needs at 20px. */}
          <div className="relative flex shrink-0 flex-col items-center gap-2.5 self-center sm:w-[38%] sm:gap-3 xl:w-[36%]">
            {/* The lit disc, sized to clear the whole group — lead plus aisle
                row — with about 20px to spare at every breakpoint, and never
                taller than the 363px floor. */}
            {/* The stage is a circle from `sm` and a rounded panel below it.
                A circle wide enough to hold the group is wider than the column
                it is centred on, and on a 390px phone that put 31px of it
                under the sub — muted purple text on a near-white disc, which
                is text you cannot read. The panel hugs the column instead, so
                the copy keeps its full width. The halo and the ring only make
                sense around a circle, so they wait for one. */}
            <span
              aria-hidden
              className="hidden sm:block absolute left-1/2 top-1/2 -z-10 size-[338px] -translate-x-1/2 -translate-y-1/2 rounded-full xl:size-[372px]"
              style={{ backgroundColor: `rgba(${s.tint},.22)` }}
            />
            <span
              aria-hidden
              className="absolute -inset-x-2 -inset-y-3 -z-10 rounded-[26px] sm:inset-auto sm:left-1/2 sm:top-1/2 sm:size-[300px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-full xl:size-[336px]"
              style={{
                backgroundColor: `color-mix(in srgb, rgb(${s.tint}) 7%, var(--banner-base))`,
                boxShadow: "0 22px 60px rgb(0 0 0 / 0.45)",
              }}
            />
            <span
              aria-hidden
              className="hero-orbit hidden sm:block absolute left-1/2 top-1/2 -z-10 size-[356px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed xl:size-[392px]"
              style={{ borderColor: `rgba(${s.tint},.6)` }}
            />
            <Link
              href={item ? `/product/${item.id}` : "#"}
              aria-label={item ? `View ${item.title}` : undefined}
              className="relative grid aspect-square w-[30vw] max-w-[126px] place-items-center transition-transform duration-300 hover:scale-[1.03] sm:w-[34vw] sm:max-w-[200px] xl:max-w-[210px]"
            >
              <Image
                key={s.img}
                src={s.img}
                alt={s.alt}
                fill
                sizes="(max-width: 640px) 130px, (max-width: 1280px) 200px, 210px"
                preload
                /* the model shot is cropped to the subject rather than fitted
                   whole — a full-length figure scaled into a square is a person
                   you can't see — but it is studio-on-white like the cutouts,
                   so it blends onto the panel like them instead of sitting in
                   a card of its own */
                className={`hero-art mix-blend-multiply ${
                  s.img.includes("fashion-model")
                    ? "object-cover object-top"
                    : "object-contain"
                }`}
              />
            </Link>

            {/* The saving, at the size a saving deserves. It used to be an
                11px chip at the end of the price line, which is where you put
                a number you don't want read. Overlapping the stage is also
                what stops the group reading as a circle with things in it. */}
            {off > 0 && (
              <span className="hero-burst z-10 grid size-[54px] place-items-center rounded-full bg-accent text-accent-fg shadow-[0_8px_22px_rgb(0_0_0/0.35)] sm:size-[72px] xl:size-[80px]">
                <span className="text-center text-[15px] font-extrabold leading-none tnum sm:text-[20px] xl:text-[22px]">
                  -{off}%
                </span>
              </span>
            )}

            <div className="flex items-center gap-2 sm:gap-3">
              {picks.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  title={`${p.title} — AED ${money(p.price)}`}
                  /* the blend goes on the link, not on the image inside it:
                     `hero-art` animates opacity and transform here, which makes
                     this an isolation group, and a multiply set on the child
                     then blends against this link's own empty backdrop instead
                     of the panel — which is how three white rectangles ended up
                     on the banner while the lead product blended fine */
                  className="hero-art relative size-8 mix-blend-multiply transition-transform duration-200 hover:-translate-y-0.5 sm:size-12 xl:size-16"
                >
                  <Image
                    src={p.img}
                    alt={p.title}
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* dark on a light panel, which is the opposite of what these were */}
        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/65 sm:grid"
        >
          <Icon name="ChevronLeft" className="size-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white ring-1 ring-white/20 backdrop-blur transition-colors hover:bg-black/65 sm:grid"
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
                idx === i ? "w-8 bg-white/25" : "w-2 bg-white/40 hover:bg-white/70"
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
