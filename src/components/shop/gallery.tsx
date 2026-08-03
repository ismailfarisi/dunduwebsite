"use client";

import { useState } from "react";
import Image from "next/image";
import { Icon } from "@/components/icon";
import type { Item } from "@/lib/home";

function money(n: number) {
  return n.toLocaleString("en-AE", { maximumFractionDigits: 2 });
}

/**
 * Main shot plus a thumbnail rail — and the rail only exists where the
 * catalogue genuinely holds more than one view. Padding it out with the same
 * photo four times is the standard marketplace lie about how much you get to
 * see before buying.
 *
 * `mix-blend-multiply` drops each shot's own white background into the lit
 * backdrop. Every image here is a cutout on white; without it the photo lands
 * as a hard white rectangle on the gradient.
 */
export function Gallery({ item }: { item: Item }) {
  const views = item.imgs?.length ? item.imgs : [item.img];
  const [active, setActive] = useState(0);

  const off = item.was ? Math.round(((item.was - item.price) / item.was) * 100) : 0;
  const saved = item.was ? item.was - item.price : 0;

  return (
    <div className="self-start rounded-xl border border-border bg-surface p-3 sm:p-4 lg:sticky lg:top-[152px]">
      <div
        className="group relative aspect-square w-full overflow-hidden rounded-lg"
        style={{
          backgroundImage:
            "radial-gradient(115% 115% at 50% 12%, #ffffff 0%, #f4f5f7 52%, #e7e9ee 100%)",
        }}
      >
        <Image
          key={views[active]}
          src={views[active]}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 92vw, 460px"
          preload
          className="object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-[1.07]"
        />

        <div className="absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {off > 0 && (
            <>
              <span className="rounded-lg bg-sale px-2.5 py-1.5 text-[15px] font-extrabold leading-none text-sale-fg shadow-card tnum">
                -{off}%
              </span>
              {saved >= 100 && (
                <span className="rounded-md bg-sale-soft px-2 py-1 text-[10.5px] font-bold uppercase leading-none tracking-wide text-sale tnum">
                  Save AED {money(saved)}
                </span>
              )}
            </>
          )}
          {item.isNew && (
            <span className="rounded-lg bg-brand px-2.5 py-1.5 text-[11px] font-bold uppercase leading-none text-brand-fg">
              New
            </span>
          )}
        </div>

        {item.condition && (
          <span className="absolute right-3 top-3 rounded-md bg-white/90 px-2 py-1 text-[10.5px] font-bold uppercase tracking-wide text-success backdrop-blur">
            {item.condition}
          </span>
        )}

        <span className="pointer-events-none absolute bottom-3 right-3 hidden items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold text-fg-muted opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 lg:flex">
          <Icon name="Search" className="size-3.5" />
          Hover to zoom
        </span>
      </div>

      {views.length > 1 && (
        <div className="mt-3 flex gap-2">
          {views.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`View ${i + 1} of ${views.length}`}
              aria-current={i === active}
              className={`relative aspect-square w-[68px] overflow-hidden rounded-lg border-2 bg-white transition-colors sm:w-[76px] ${
                i === active ? "border-brand" : "border-border hover:border-border-strong"
              }`}
            >
              <Image src={src} alt="" fill sizes="76px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
