# OurShopee — homepage redesign prototype

A working redesign of the ourshopee.com UAE homepage. Next.js 16 (App Router) +
Tailwind v4, mock data, no backend.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # type-check + production build
npm run lint
```

## Routes

| Route | What it is |
| --- | --- |
| `/` | **Current design.** Built to the supplied mockup — dark utility bar, green `OurShopee` wordmark, black hero with a lime CTA, deal-of-the-day rail, flash deals, promo tiles, New Arrivals / Best Sellers, brands, trust row, dark footer. |
| `/v1` | The earlier redesign, kept for reference. Same tokens, different composition. |

Components for the current design live in `src/components/shop/`, content in
`src/lib/home.ts`. `/v1` uses the flat `src/components/*` files and `src/lib/data.ts`.

### The product card

`shop/item-card.tsx` states the four things that decide a purchase here, not
just image / name / price:

| Signal | Where it comes from | Why it's on the card |
| --- | --- | --- |
| `-53%` + `SAVE AED 2,659` | `was - price` | Percent catches the eye, dirhams land the point. Absolute savings beat a percentage above ~AED 300, so the dirham chip only renders when the saving clears 100. |
| `Certified Renewed` | `item.condition` | Refurbished-with-warranty is the actual differentiator, and it used to be the last word of a title that `line-clamp-2` cut off. Titles in `home.ts` no longer repeat ", Renewed" — the chip says it. |
| `or 4 × AED 585 with tabby` | `price / 4`, above `TABBY_MIN` | AED 2,340 reads as unaffordable; AED 585 reads as a decision. |
| `Tomorrow` / `Only 3 left` / `Free delivery` | `express`, `lowStock`, `FREE_DELIVERY_MIN` | Ranked, and **capped at two** — free delivery is last because most of the catalogue clears the threshold, so it reassures rather than differentiates. |

Plus a brand eyebrow (a row can be scanned by brand instead of read), and
`{sold}+ bought this month` in the rating row for items the source listing had
no rating for — an empty row there makes a product look worse than it is.

Three things worth keeping:

- **Everything below `mt-auto` is fixed-height and single-line.** That's what
  keeps price baselines and Add-to-cart aligned across a rail when one card has
  a rating and stock warning and its neighbour has neither. Rows *above*
  `mt-auto` may vary — it absorbs the difference. The struck-through MRP gets
  its own reserved line for the same reason: on a four-digit price it wraps if
  it shares a row with the price, and the wrap is what breaks the alignment.
- **The card needs ~175px to hold all of that.** New Arrivals / Best Sellers
  were 1×4 inside a half-width section, which left 144px and truncated every
  one of those lines; they're 2×2 now, at ~300px.
- **`z-10` on the wishlist and Add-to-cart buttons is load-bearing.** The title
  carries a stretched link (`after:absolute inset-0`); as a later positioned
  sibling it paints over anything in the card that isn't lifted above it, and
  swallows the click. The wishlist heart was already unclickable this way.

### The right rail

`shop/deal-of-day.tsx` replaced a stack of six reassurance rows (Free Delivery,
Secure Payments, 24/7 Support …) that repeated the utility strip above it and
the trust row above the footer — the same four promises, three times, on one
page. It's the best 310px above the fold, so it now holds one merchandised
product: photo, price, saving, the bundled extras, instalments, a units-claimed
bar and a Buy button.

The utility strip is `lg:` only, so mobile keeps one 28px line of the three USPs
that matter rather than losing them entirely.

**Its clock counts to midnight, not for a duration.** `FlashDeals` starts its
countdown from `Date.now()` on mount, so it reads the same 2:45:30 to every
visitor on every visit — a returning shopper can see it's theatre. A deal of the
day has an end that genuinely exists, so `ToMidnight` uses it: honest, and it
still resets daily. Worth porting to the flash rail with a real end timestamp.

### Promo tiles

Three doors, not four, and one of them large enough to carry a real product
shot. The row this replaced was four identical lozenges whose copy said nothing
("Great deals for your home") and whose art contradicted the label — a watch
illustrating "Fashion Collection", a men's fragrance illustrating "Beauty
Bestsellers". Each tile now leads with a real floor price from the catalogue.

**The bug underneath it:** tile colours were raw `dark:` utilities. Tailwind's
`dark:` variant keys off `prefers-color-scheme` while the palette keys off
`data-theme`, so a light page on a dark-OS machine rendered this row dark — the
tile titles landed at roughly 1.5:1 against their own background. Tiles are
`--tile-*` tokens now, and the rendered page contains **zero** `dark:` classes,
which is the invariant worth keeping: if it can't drift, it won't.

Pills invert their tile — background is the tile's foreground colour and vice
versa — so contrast holds in both themes from one pair of values.

### Search

`Suggestions` in `shop/site-header.tsx` serves both the desktop dropdown and the
mobile sheet, and it merchandises rather than autocompletes: real products with
image, price, MRP and discount; trending queries; category chips; and a
recovery path instead of a dead end when nothing matches. `searchItems()` in
`home.ts` requires every word to land somewhere in the brand, title or
condition.

Product rows call `preventDefault()` on **mousedown**. The input closes the
panel on blur behind a 120ms timer, and without that the row moves out from
under the pointer before the click resolves.

### Sections, and why each one exists

The first rebuild answered the live site's twelve near-identical rails by
cutting to three modules, which overcorrected: 16 SKUs, New Arrivals all
fragrance, Best Sellers all screens, and two categories in the catalogue with
nowhere to live. The page order is the merchandising — each section answers a
question the one above it didn't:

| Section | The question |
| --- | --- |
| Hero + Deal of the Day | what's worth looking at today |
| Category circles | where do I browse |
| Flash Deals | what's urgent |
| **Budget doors** | what can I afford — deal-led traffic navigates by price before category |
| Promo tiles | which category is on offer |
| New Arrivals / Best Sellers | what's fresh, what's proven |
| **Certified Refurbished** | is the cheap option safe |
| **Home & Kitchen** | a whole category that only appeared as two stray flash deals |
| **Kit out the kitchen** | attach — the only thing here that lifts basket value without new traffic |
| Brands / trust | who am I buying from |

Three things about the data those sections needed:

- **A SKU that earns two contexts is one object, not two.** The cookware
  belongs in Flash Deals *and* Home & Kitchen, so those items are named consts
  that both arrays reference — a copy drifts the moment stock or price moves.
  `allItems` de-dupes by `id` for search and the budget doors.
- **Budget doors show real thumbnails from the band** (`itemsUnder`), so the
  door shows what's behind it. Under AED 100 renders two, because two is how
  many there are — no filler.
- **The bundle total is the honest sum of three listings.** No invented bundle
  discount; the saving quoted is the sum of each listing's own markdown. What
  it sells is not assembling the basket yourself.

Rail plumbing (`hooks/use-rail-scroll.ts`) is shared by `FlashDeals` and
`RailSection` so the arrow and snap behaviour can't diverge between them.

**Not built: recently viewed / continue shopping.** It's the
highest-converting module on a returning-visitor page and it belongs here — but
every link on this prototype is `href="#"`, so there is no genuine view history
to read. Faking one would be the same sin as the countdown that resets on every
load.

### Product imagery

Real listings from ourshopee.com — names, prices, ratings and photos. They were
pulled once and committed to `public/products/` so the demo has no runtime
dependency on their CDN:

```bash
node scripts/fetch-images.mjs   # re-fetch from scripts/scrape.json
```

`scripts/scrape.json` holds ~140 scraped listings; `PICKS` at the top of the
script maps a slug to an index in that list, so swapping a product is a
one-line change plus a re-run. `scripts/image-manifest.json` records what was
downloaded (source title, price, rating) — it is the provenance trail for
`src/lib/home.ts`.

Two things to know:

- **Ratings appear only where the source listing had one.** Nothing is invented,
  so some cards show a rating and some don't. The card reserves that row's
  height either way, which is why prices still line up across a row.
- **Name files by content, not by URL.** The CDN serves WebP whatever the URL
  extension says; saving those bytes as `.png` makes `next/image` return 400.
  The script sniffs magic bytes and names accordingly.

Editorial copy (hero lines, promo tile titles, trust points) is written for the
demo.

### Category circles

The circular row under the hero uses ourshopee.com's own category art:

```bash
node scripts/fetch-categories.mjs   # -> public/categories/
```

`scripts/cats.json` is the scraped image list; `PICKS` maps slug → index +
label. Circles stay `bg-white` in both themes because the source art is shot on
white.

The mockup's first four tiles — Under AED 50, Under AED 100, New Arrivals, Top
Deals — are price filters rather than categories and have no category art, so
this row is twelve real categories instead. The deal entry points still live in
the nav bar (Deals, with the HOT badge).

### Brand and social logos

ourshopee.com doesn't publish logo assets, so these come from
[Simple Icons](https://simpleicons.org) (CC0) rather than being scraped off
brand sites:

```bash
node scripts/fetch-brands.mjs   # -> public/brands/ and public/social/
```

- Simple Icons serves each mark in its **official brand colour**, and Sony's is
  white — invisible on the light tile. The script takes a per-brand colour
  override for cases like that.
- Brand tiles stay `bg-white` in both themes so near-black marks never vanish in
  dark mode. Footer socials are fetched pre-coloured white for the dark panel.
- SVGs render through `next/image` with `unoptimized`, which skips the optimizer
  — no `dangerouslyAllowSVG` needed.

Payment marks (VISA, Mastercard, tabby, tamara, Pay) are still styled text.

All of this is used for a local demo. Clear rights before shipping anything
public.

### Accent

The whole page is driven by tokens in `globals.css` — `--brand` (wordmark green,
links), `--accent` (lime CTA pill), `--ink` (hero, dark tiles, footer). Switching
to the orange variant of the mockup is a change to those three values, not markup.

## What this fixes

Problems observed on the live site (2026-08-02) and how the prototype answers them.

| Live site | Here |
| --- | --- |
| Hero carousel paints as an empty box for several seconds; page busy enough to stall script injection | Hero is a CSS gradient rendered server-side — first paint is complete, images can layer in later |
| Product images load with no reserved space, so the grid reflows | `ProductImage` is a fixed `aspect-square` box; nothing shifts |
| "Deliver to" stuck on *Fetching location…* | Location resolves to a stored value; geolocation is an enhancement, never a blocking spinner |
| Category bar clips its last item mid-word | Horizontal scroll container with snap points and no clipped edge |
| ~12 near-identical product rails; refurbished (the actual differentiator) is buried | Every section answers a different question — urgency, budget, category, proof, condition, attach; refurbished gets its own framed band |
| Discount, savings, MRP and price all compete for attention | One price hierarchy: price largest, MRP struck through, discount as a single badge |
| No delivery-speed, stock, or BNPL signal on cards | Cards carry express, low-stock and "4 × AED n with Tabby" |
| Trust info (returns, authenticity, payment) only in footer prose | Utility strip at the top, trust bar above the footer |
| Footer reads © 2025 | `new Date().getFullYear()` |

## Mobile

Reworked after reviewing **goldapple.ae** at a 390px viewport. What was borrowed,
and what it bought:

| Gold Apple pattern | Applied here | Height reclaimed |
| --- | --- | --- |
| One 56px icon-only bar, nothing else pinned | Utility strip and category bar are `lg:` only; mobile is a single 56px row | ~48px permanently |
| Header persists but content dominates | Header slides away on scroll-down, returns on scroll-up (`useHideOnScroll`) | 56px while browsing |
| Search is an icon, not a field | Icon opens a full-screen search sheet with trending queries | — |
| Delivery address as a small centred label | Same, and it scrolls away instead of being pinned | — |
| Full-bleed imagery, content to the screen edge | Hero, rails and the refurbished block bleed `-mx-4` | — |
| Circular category bubbles in one scrolling row | Circles on mobile, framed grid from `sm` up | ~85px |
| Wide, chrome-free product cards | No border/shadow/Add-to-cart on mobile; card is image, name, price | ~44px per card |
| Sticky offer bar at the bottom | 36px dismissible strip | — |

Net: the first product card is now visible around 760px down instead of ~1150px,
and each rail shows ~1.9 cards with the next one peeking past the edge.

Two mobile-specific gotchas worth remembering:

- **`scroll-padding` must match rail padding.** With `scroll-snap-align: start`,
  a full-bleed rail (`-mx-4 px-4`) snaps the first card flush to the screen edge
  and ignores the padding. Every rail carries `scroll-pl-4 sm:scroll-pl-1`.
- Everything above is scoped with `sm:` / `lg:` prefixes — desktop is untouched.

## Structure

```
src/app/globals.css     design tokens (light + dark), rail + focus primitives
src/app/layout.tsx      fonts, metadata, anti-flash theme script
src/app/page.tsx        homepage composition
src/lib/data.ts         mock catalogue (AED, real-length titles)
src/hooks/use-hide-on-scroll.ts   mobile header show/hide
src/components/
  header.tsx            desktop: utility strip + inline search + category bar
                        mobile: one 56px row + drawer + full-screen search sheet
  hero.tsx              auto-advancing hero + two evergreen entry cards
  category-tiles.tsx    18 categories — circles on mobile, grid on desktop
  rail.tsx              titled horizontal rail, full-bleed on mobile
  product-card.tsx      the unit that carries most of the redesign
  offer-strip.tsx       dismissible sticky offer bar (mobile)
  trust-bar.tsx, footer.tsx, countdown.tsx, theme-toggle.tsx, icon.tsx
```

## Conventions worth keeping

- **Tokens, not hex.** Every colour is a CSS variable in `globals.css` with a light
  and dark value. `bg-surface`, `text-fg-muted`, `bg-sale` — no raw palette classes
  in components.
- **Reserve space for anything that arrives late.** Fixed image ratio, `min-h` on
  the card badge row so price baselines align across a row.
- **Motion is opt-out.** The hero pauses on hover/focus and does not auto-advance
  under `prefers-reduced-motion`.
- **Flex and grid items don't shrink by default.** `min-width` is `auto`, so an
  item sized by its content overflows narrow viewports even with `max-w` set.
  Bitten twice: `<main>` needed `w-full` (flex item of `<body>`), and the
  New Arrivals / Best Sellers sections needed `min-w-0` (grid items wrapping a
  scrolling card row). Symptom both times: a horizontal scrollbar on mobile.

## Not built

Product listing, PDP, cart and checkout. Product imagery is a tinted placeholder
by design — swap `ProductImage` for `next/image` and the layout is unchanged.
#   d u n d u w e b s i t e  
 