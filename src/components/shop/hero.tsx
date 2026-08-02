"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import { DealOfDay } from "@/components/shop/deal-of-day";
import { heroSlides, usps } from "@/lib/home";

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
  const go = (d: 1 | -1) =>
    setI((v) => (v + d + heroSlides.length) % heroSlides.length);

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
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            backgroundImage:
              "radial-gradient(70% 90% at 78% 45%, rgba(255,255,255,.16) 0%, transparent 62%), radial-gradient(50% 70% at 20% 110%, rgba(213,232,79,.14) 0%, transparent 60%)",
          }}
        />

        {/* Catalogue shots are on white, so on the dark panel they sit inside a
            light tile rather than floating as fake cut-outs. */}
        <div
          aria-hidden
          className="absolute inset-y-6 right-6 hidden w-[38%] max-w-[300px] overflow-hidden rounded-2xl bg-white md:block"
        >
          <Image
            key={s.img}
            src={s.img}
            alt=""
            fill
            sizes="300px"
            priority
            className="object-contain p-6"
          />
        </div>

        {/* px clears the edge arrows so the copy is never sat on */}
        <div className="relative flex min-h-[260px] flex-col justify-center px-6 py-8 sm:min-h-[300px] sm:px-14 md:max-w-[58%] lg:min-h-[340px]">
          <span className="w-fit text-[11px] font-bold uppercase tracking-[0.18em] text-accent">
            {s.eyebrow}
          </span>
          <h1 className="mt-3 text-[32px] font-extrabold leading-[1.06] tracking-tight text-ink-fg sm:text-[42px]">
            {s.line1}
            <br />
            {s.line2}
          </h1>
          <p className="mt-3 max-w-sm text-[13.5px] leading-relaxed text-ink-fg-muted sm:text-[14.5px]">
            {s.sub}
          </p>
          <a
            href="#"
            className="mt-6 w-fit rounded-full bg-accent px-7 py-3 text-[14px] font-bold text-accent-fg transition-colors hover:bg-accent-hover"
          >
            {s.cta}
          </a>
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

        <div className="absolute bottom-5 left-6 flex gap-2 sm:left-14">
          {heroSlides.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}: ${sl.line1}`}
              aria-current={idx === i}
              className={`size-2 rounded-full transition-colors ${
                idx === i ? "bg-accent" : "bg-white/35 hover:bg-white/60"
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
