import Image from "next/image";
import { quickLinks } from "@/lib/home";

function Circle({ label, img }: { label: string; img: string }) {
  return (
    <a
      href="#"
      className="group flex w-[92px] shrink-0 flex-col items-center gap-2 px-1 text-center sm:w-[112px]"
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
        <Circle key={c.label} label={c.label} img={c.img} />
      ))}
    </div>
  );
}

/**
 * The circular category row under the hero, drifting right to left.
 *
 * It runs at every width now. On a phone that costs the swipe — a transform
 * animation and a scroll container can't share one element — but a 70s lap
 * moves about four pixels a second, so nothing is hard to tap, and every
 * category comes past on its own rather than waiting to be found.
 */
export function QuickCircles() {
  return (
    <section className="mt-3 rounded-xl bg-surface py-4 sm:py-5">
      <h2 className="sr-only">Shop by category</h2>

      <div className="marquee px-2">
        <div className="marquee-track marquee-left marquee-slow flex w-max items-start">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
