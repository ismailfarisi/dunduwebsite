import Image from "next/image";
import { quickLinks } from "@/lib/home";

function Circle({ label, img }: { label: string; img: string }) {
  return (
    <a
      href="#"
      className="group flex w-[86px] shrink-0 flex-col items-center gap-2 px-1 text-center lg:w-auto"
    >
      {/* circle stays light in both themes — the source art is shot on white */}
      <span className="relative size-[62px] overflow-hidden rounded-full bg-white ring-1 ring-border transition-all group-hover:ring-brand sm:size-[68px]">
        <Image
          src={img}
          alt=""
          fill
          sizes="68px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </span>
      {/* reserved height so one- and two-line labels keep the row even */}
      <span className="min-h-[28px] text-[11.5px] font-medium leading-tight text-fg-muted group-hover:text-fg">
        {label}
      </span>
    </a>
  );
}

/**
 * The circular category row under the hero.
 *
 * A swipe rail below `lg`, an even twelve-up grid above it — the row holds
 * still either way, and the hero next to it is the only thing on the page
 * that moves on its own.
 */
export function QuickCircles() {
  return (
    <section className="mt-3 rounded-xl bg-surface py-4 shadow-card sm:py-5">
      <h2 className="sr-only">Shop by category</h2>

      <div className="rail flex gap-1 overflow-x-auto px-3 scroll-pl-3 sm:px-4 sm:scroll-pl-4 lg:grid lg:grid-cols-12 lg:gap-0 lg:overflow-visible">
        {quickLinks.map((c) => (
          <Circle key={c.label} label={c.label} img={c.img} />
        ))}
      </div>
    </section>
  );
}
