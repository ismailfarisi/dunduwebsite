import { Icon } from "@/components/icon";

/**
 * The logo, rebuilt: white lockup on a brand-purple badge, with a cart in
 * place of the S and the .com tucked under the baseline — the real mark
 * rather than two words in two colours.
 *
 * Everything is sized in `em`, so the caller sets one font-size and the badge,
 * the cart and the .com scale with it.
 *
 * `plain` drops the badge and keeps the lockup. It is for callers that are
 * already painting the badge themselves — a purple ribbon, say — where drawing
 * a second purple rectangle inside the first one is just a seam.
 */
export function Wordmark({
  className = "",
  plain = false,
}: {
  className?: string;
  plain?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center gap-[0.06em] font-extrabold leading-none tracking-tight text-logo-fg ${
        plain ? "" : "rounded-[0.3em] bg-logo px-[0.36em] py-[0.22em]"
      } ${className}`}
    >
      <span>Our</span>
      <Icon name="ShoppingCart" className="size-[0.95em] shrink-0" strokeWidth={2.4} />
      <span>hopee</span>
      <span className="self-end pb-[0.04em] text-[0.4em] font-bold tracking-normal">.com</span>
    </span>
  );
}
