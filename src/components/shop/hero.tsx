"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { DealOfDay } from "@/components/shop/deal-of-day";
import { allItems, heroSlides, usps } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

export function Hero() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((v) => (v + 1) % heroSlides.length), 6000);
    return () => window.clearInterval(t);
  }, [paused]);

  const s = heroSlides[i];
  const go = (d: 1 | -1) => setI((v) => (v + d + heroSlides.length) % heroSlides.length);

  // the listing the slide is showing, so the banner can quote a real price
  const item = s.itemId ? allItems.find((it) => it.id === s.itemId) : undefined;
  const off = item?.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;

  return (
    <section className="grid gap-3 lg:grid-cols-[1fr_310px]">
      {/* banner — rendered on the server too, so it is never an empty box */}
      <div
        className="relative isolate overflow-hidden rounded-xl bg-ink"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* Three layers rather than one: a cool highlight top-right behind the
            product, brand green rising from the bottom-left under the copy, and
            a lime bloom where the two meet. A single flat wash reads as an
            unloaded image. */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage: [
              "radial-gradient(75% 95% at 80% 26%, rgba(255,255,255,.20) 0%, transparent 58%)",
              "radial-gradient(58% 78% at 2% 102%, rgba(95,154,31,.26) 0%, transparent 58%)",
              "radial-gradient(40% 55% at 58% 100%, rgba(213,232,79,.14) 0%, transparent 62%)",
            ].join(","),
          }}
        />

        {/* At `lg` the row height comes from Deal of the Day beside it, not
            from these minimums — they only bind once the banner is on its own
            row below `lg`. */}
        {/* pb clears the dots. They are absolutely positioned, and once the
            banner got short enough the vertically centred copy reached them —
            the CTA and the dots were overlapping. */}
        <div className="relative flex min-h-[230px] items-center gap-3 px-5 pb-10 pt-6 pr-11 sm:min-h-[270px] sm:gap-6 sm:px-14 sm:pb-11 sm:pr-16 lg:min-h-[300px]">
          <div key={s.id} className="hero-copy min-w-0 flex-1">
            <span className="w-fit text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
              {s.eyebrow}
            </span>
            <h1 className="mt-3 text-[24px] font-extrabold leading-[1.06] tracking-tight text-ink-fg sm:text-[42px]">
              {s.line1}
              <br />
              {s.line2}
            </h1>
            <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-ink-fg-muted sm:text-[14.5px]">
              {s.sub}
            </p>

            {/* the hook: a price out of the catalogue beats an adjective */}
            {item && (
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-[12px] text-ink-fg-muted">From</span>
                <span className="text-[20px] font-extrabold leading-none text-ink-fg tnum sm:text-[23px]">
                  AED {money(item.price)}
                </span>
                {off > 0 && (
                  <span className="rounded-full bg-sale px-2 py-0.5 text-[11px] font-bold text-sale-fg tnum">
                    -{off}%
                  </span>
                )}
              </p>
            )}

            <a
              href="#"
              className="mt-5 inline-block w-fit rounded-full bg-accent px-6 py-2.5 text-[13.5px] font-bold text-accent-fg transition-transform hover:bg-accent-hover hover:-translate-y-0.5 sm:mt-6 sm:px-7 sm:py-3 sm:text-[14px]"
            >
              {s.cta}
            </a>
          </div>

          {/* A disc, not the white slab this used to be.
              Catalogue shots are cut out on white, so the tile behind them has
              to be white too — but a hard-edged rectangle of it reads as a
              placeholder that failed to load. A circle with a lime bloom behind
              it reads as a spotlight, and it lets the product sit ~40% larger
              in the same space. Mobile gets one too: the banner used to be a
              wall of text with the product hidden below `md`. */}
          <div
            aria-hidden
            className="relative flex aspect-square w-[32%] max-w-[118px] shrink-0 items-center justify-center self-center sm:w-[36%] sm:max-w-[200px] lg:max-w-[228px]"
          >
            <span
              className="absolute inset-[-26%] rounded-full blur-2xl"
              style={{
                backgroundImage:
                  "radial-gradient(closest-side, rgba(213,232,79,.55) 30%, rgba(213,232,79,.22) 62%, transparent 78%)",
              }}
            />
            <span className="relative size-full overflow-hidden rounded-full bg-white shadow-[0_18px_50px_rgba(0,0,0,.45)] ring-1 ring-white/25">
              <Image
                key={s.img}
                src={s.img}
                alt=""
                fill
                sizes="(max-width: 640px) 132px, (max-width: 1024px) 210px, 268px"
                preload
                className="hero-art object-contain p-[13%]"
              />
            </span>
          </div>
        </div>

        <button
          onClick={() => go(-1)}
          aria-label="Previous slide"
          className="absolute left-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 sm:grid"
        >
          <Icon name="ChevronLeft" className="size-4" />
        </button>
        <button
          onClick={() => go(1)}
          aria-label="Next slide"
          className="absolute right-2 top-1/2 hidden size-8 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/25 sm:grid"
        >
          <Icon name="ChevronRight" className="size-4" />
        </button>

        <div className="absolute bottom-4 left-5 flex gap-2 sm:bottom-5 sm:left-14">
          {heroSlides.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}: ${sl.line1}`}
              aria-current={idx === i}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-5 bg-accent" : "w-2 bg-white/35 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>

      <DealOfDay />

      {/* The six USP rows that used to hold this rail said the same four things
          as the utility strip above and the trust row above the footer. The
          strip is desktop-only, so mobile keeps one 28px line of it. */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-border bg-surface px-3 py-2 lg:hidden">
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
