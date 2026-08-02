"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { currency, heroSlides } from "@/lib/data";

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

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_320px]">
      {/* The slide is rendered server-side too, so the hero is never an empty
          box while assets load — the single biggest flaw on the current site. */}
      {/* full-bleed on mobile, framed from sm up */}
      <div
        className="relative isolate -mx-4 overflow-hidden sm:mx-0 sm:rounded-2xl"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        <div
          className="absolute inset-0 -z-10 transition-[background] duration-500"
          style={{ background: `linear-gradient(115deg, ${s.from} 0%, ${s.to} 100%)` }}
        />
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(60% 80% at 80% 20%, rgba(255,255,255,.35) 0%, transparent 60%)",
          }}
        />

        <div className="flex min-h-[260px] flex-col justify-center p-6 sm:min-h-[320px] sm:p-10">
          <span className="w-fit rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-white/95 backdrop-blur">
            {s.eyebrow}
          </span>
          <h1 className="mt-3 max-w-[15ch] text-[34px] font-extrabold leading-[1.03] tracking-tight text-white sm:text-[44px]">
            {s.title}
          </h1>
          <p className="mt-2 text-[14px] text-white/85 sm:text-[16px]">{s.sub}</p>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            <a
              href="#"
              className="rounded-xl bg-accent px-5 py-2.5 text-[14px] font-bold text-accent-fg shadow-lg transition-transform hover:-translate-y-0.5"
            >
              {s.cta}
            </a>
            <p className="text-white">
              <span className="text-[12px] opacity-80">from </span>
              <span className="text-[22px] font-bold tnum">
                {currency} {s.price.toLocaleString("en-AE")}
              </span>{" "}
              <span className="text-[13px] line-through opacity-70 tnum">
                {s.was.toLocaleString("en-AE")}
              </span>
            </p>
          </div>
        </div>

        <div className="absolute bottom-4 left-6 flex gap-1.5 sm:left-10">
          {heroSlides.map((sl, idx) => (
            <button
              key={sl.id}
              onClick={() => setI(idx)}
              aria-label={`Go to slide ${idx + 1}: ${sl.title}`}
              aria-current={idx === i}
              className={`h-1.5 rounded-full transition-all ${
                idx === i ? "w-7 bg-white" : "w-2.5 bg-white/45 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Side stack: two evergreen entry points. Side-by-side and compact on
          mobile so they cost ~80px instead of ~190px of scroll. */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-1">
        {[
          {
            icon: "RefreshCw",
            title: "Certified refurbished",
            sub: "Up to 55% off · 12-month warranty",
            subShort: "Up to 55% off",
            cls: "bg-success-soft text-success",
          },
          {
            icon: "CreditCard",
            title: "Split any order in 4",
            sub: "Tabby & Tamara · 0% interest",
            subShort: "Tabby & Tamara",
            cls: "bg-brand-soft text-brand-soft-fg",
          },
        ].map((e) => (
          <a
            key={e.title}
            href="#"
            className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-3 shadow-card transition-shadow hover:shadow-card-hover sm:flex-row sm:items-center sm:gap-3 sm:p-4"
          >
            <span
              className={`grid size-9 shrink-0 place-items-center rounded-xl sm:size-11 ${e.cls}`}
            >
              <Icon name={e.icon} className="size-[18px] sm:size-5" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-bold leading-tight text-fg sm:text-[14px]">
                {e.title}
              </span>
              <span className="mt-0.5 block text-[11px] text-fg-muted sm:hidden">
                {e.subShort}
              </span>
              <span className="hidden text-[12px] text-fg-muted sm:block">{e.sub}</span>
            </span>
            <Icon
              name="ChevronRight"
              className="ml-auto hidden size-4 shrink-0 text-fg-subtle transition-transform group-hover:translate-x-0.5 sm:block"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
