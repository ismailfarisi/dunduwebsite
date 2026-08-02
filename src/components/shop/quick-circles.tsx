import Image from "next/image";
import { quickLinks } from "@/lib/home";

function Circle({ label, img, className = "" }: { label: string; img: string; className?: string }) {
  return (
    <a
      href="#"
      className={`group flex shrink-0 flex-col items-center gap-2 px-1 text-center ${className}`}
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

function Row({ hidden = false }: { hidden?: boolean }) {
  return (
    <div aria-hidden={hidden} className="flex shrink-0 items-start">
      {quickLinks.map((c) => (
        <Circle key={c.label} label={c.label} img={c.img} className="w-[112px]" />
      ))}
    </div>
  );
}

/**
 * The circular category row under the hero.
 *
 * Two layouts, because the right answer differs by input. Below `lg` it stays
 * a swipe rail: taking manual control of the primary category row away from a
 * touch screen to animate it would be a bad trade. From `lg` up it drifts
 * right to left — same two-copy track as the top strip, paused on hover so a
 * category you are aiming at holds still.
 */
export function QuickCircles() {
  return (
    <section className="mt-3 rounded-xl border border-border bg-surface py-4 sm:py-5">
      <h2 className="sr-only">Shop by category</h2>

      <div className="rail flex gap-1 overflow-x-auto px-3 scroll-pl-3 sm:px-4 sm:scroll-pl-4 lg:hidden">
        {quickLinks.map((c) => (
          <Circle key={c.label} label={c.label} img={c.img} className="w-[86px]" />
        ))}
      </div>

      <div className="marquee hidden px-2 lg:block">
        <div className="marquee-track marquee-left marquee-slow flex w-max items-start">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
