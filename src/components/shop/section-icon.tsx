import { Icon } from "@/components/icon";

/**
 * The mark that opens a section.
 *
 * Every section on this page had a title and only some of them had an icon,
 * which made the icon read as decoration where it appeared rather than as a
 * marker. One chip, one size, one colour, in front of every section heading:
 * finding the kitchen row is now a matter of finding the pot.
 *
 * It sits beside the heading block rather than inside the eyebrow, so it lines
 * up whether the section has an eyebrow above its title or not.
 */
export function SectionIcon({ name }: { name: string }) {
  return (
    <span
      aria-hidden
      className="grid size-9 shrink-0 place-items-center rounded-lg bg-brand-soft text-brand-soft-fg sm:size-10"
    >
      <Icon name={name} className="size-[18px] sm:size-5" />
    </span>
  );
}
