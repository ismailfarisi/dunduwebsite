import Image from "next/image";
import { Icon } from "@/components/icon";
import { brands } from "@/lib/home";

function Tile({ name, logo }: { name: string; logo?: string }) {
  return (
    <a
      href="#"
      aria-label={name}
      title={name}
      /* tile stays light in both themes so the brand-coloured marks — several
         of which are near-black — never disappear */
      className="group grid h-[70px] w-[112px] shrink-0 place-items-center rounded-lg bg-white px-4 shadow-card transition-shadow hover:shadow-card-hover"
    >
      {logo ? (
        <span className="relative h-9 w-full">
          <Image
            src={logo}
            alt=""
            fill
            unoptimized
            /* eager: these are ~1KB SVGs, and the row is a moving track —
               lazy loading a tile that slides into view is a blank tile for
               however long the request takes */
            loading="eager"
            className="object-contain opacity-80 transition-opacity group-hover:opacity-100"
          />
        </span>
      ) : (
        /* no CC0 mark exists for this one, so its name is the mark. Set in the
           page's own type rather than approximated as a logo. */
        <span className="w-full truncate text-center text-[12.5px] font-extrabold uppercase tracking-[0.08em] text-[#101215] opacity-75 transition-opacity group-hover:opacity-100">
          {name}
        </span>
      )}
    </a>
  );
}

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 gap-2.5 pr-2.5">
      {brands.map((b) => (
        <Tile key={b.name} name={b.name} logo={b.logo} />
      ))}
    </div>
  );
}

/**
 * Every department's brands, drifting right to left.
 *
 * A grid of ten was a fifth of the list and all of it electronics. Moving,
 * the row carries forty-one across mobiles, laptops, audio, kitchen, fashion,
 * footwear, fragrance and watches in the same strip of page — and the same
 * two-copy track as the category circles, so the loop has no seam.
 */
export function Brands() {
  return (
    <section className="mt-3 -mx-4 rounded-none sm:mx-0 sm:rounded-xl bg-surface p-3 sm:p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[17px] font-extrabold tracking-tight text-fg sm:text-[19px]">
          Shop Top Brands
        </h2>
        <a
          href="#"
          className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-brand hover:underline"
        >
          View All Brands
          <Icon name="ChevronRight" className="size-3.5" />
        </a>
      </div>

      <div className="marquee -mx-3 mt-4 px-3 sm:mx-0 sm:px-0">
        <div className="marquee-track marquee-left marquee-slower flex w-max">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
