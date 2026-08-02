import Image from "next/image";
import { Icon } from "@/components/icon";
import { brands } from "@/lib/home";

export function Brands() {
  return (
    <section className="mt-3 rounded-xl border border-border bg-surface p-3 sm:p-4">
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

      <div className="rail -mx-3 mt-4 flex gap-2.5 overflow-x-auto px-3 pb-1 scroll-pl-3 sm:mx-0 sm:grid sm:grid-cols-5 sm:overflow-visible sm:px-0 lg:grid-cols-10">
        {brands.map((b) => (
          <a
            key={b.name}
            href="#"
            aria-label={b.name}
            title={b.name}
            /* tile stays light in both themes so the brand-coloured marks —
               several of which are near-black — never disappear */
            className="group grid h-[70px] w-[112px] shrink-0 place-items-center rounded-lg border border-border bg-white px-4 transition-colors hover:border-border-strong sm:w-auto"
          >
            <span className="relative h-9 w-full">
              <Image
                src={b.logo}
                alt=""
                fill
                unoptimized
                className="object-contain opacity-80 transition-opacity group-hover:opacity-100"
              />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
