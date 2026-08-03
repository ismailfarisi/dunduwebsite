/**
 * One-off: brand logos for the "Shop Top Brands" row.
 *
 * ourshopee.com doesn't publish logo assets, so these come from Simple Icons
 * (CC0) rather than being scraped off brand sites. Brand-coloured SVGs, saved
 * to public/brands/.
 *
 * Source is the Simple Icons repository rather than cdn.simpleicons.org: the
 * CDN colours each mark for you, but it isn't reachable from every network,
 * and the repo is. The repo ships marks with no fill at all, so the colour is
 * read out of its own data file and injected here — same result, one more
 * request.
 *
 *   node scripts/fetch-brands.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REPO = "https://raw.githubusercontent.com/simple-icons/simple-icons/master";

// [slug, display name, colour override].
// A mark whose brand colour is white or near-white disappears on the light
// tile, so it gets an explicit ink value instead.
const BRANDS = [
  // mobiles
  ["apple", "Apple", "101215"],
  ["samsung", "Samsung"],
  ["honor", "HONOR"],
  ["huawei", "Huawei"],
  ["oppo", "OPPO"],
  ["oneplus", "OnePlus"],
  ["motorola", "Motorola"],
  ["nokia", "Nokia"],
  ["xiaomi", "Xiaomi"],
  // laptops & PCs
  ["lenovo", "Lenovo"],
  ["asus", "ASUS"],
  ["hp", "HP"],
  ["dell", "Dell"],
  ["acer", "Acer"],
  ["msi", "MSI", "101215"],
  // TV & audio
  ["sony", "Sony", "101215"],
  ["lg", "LG"],
  ["jbl", "JBL"],
  ["bose", "Bose", "101215"],
  ["panasonic", "Panasonic"],
  // home & kitchen
  ["bosch", "Bosch"],
  ["siemens", "Siemens"],
  // fashion & sports
  ["adidas", "Adidas", "101215"],
  ["nike", "Nike", "101215"],
  ["puma", "Puma", "101215"],
  ["newbalance", "New Balance", "101215"],
  ["reebok", "Reebok"],
  ["underarmour", "Under Armour", "101215"],
  ["zara", "Zara", "101215"],
  ["uniqlo", "Uniqlo"],
];

// Footer socials sit on the dark panel, so they are written out white.
const SOCIALS = [
  ["facebook", "Facebook"],
  ["instagram", "Instagram"],
  ["tiktok", "TikTok"],
  ["youtube", "YouTube"],
];

const outDir = join(process.cwd(), "public", "brands");
const socialDir = join(process.cwd(), "public", "social");
await mkdir(outDir, { recursive: true });
await mkdir(socialDir, { recursive: true });

const dataRes = await fetch(`${REPO}/data/simple-icons.json`);
if (!dataRes.ok) throw new Error(`simple-icons data: ${dataRes.status}`);
const data = await dataRes.json();
const icons = Array.isArray(data) ? data : data.icons;

/** slug -> official hex, so a repo mark can be coloured the way the CDN would. */
const hexOf = new Map(
  icons.map((i) => [
    (i.slug ?? i.title.toLowerCase().replace(/[^a-z0-9]/g, "")).toLowerCase(),
    i.hex,
  ]),
);

/** Simple Icons ships one uncoloured path; a fill on the <svg> covers it. */
function paint(svg, hex) {
  return svg.replace("<svg ", `<svg fill="#${hex}" `);
}

async function grab(slug, color, fallbackHex) {
  const res = await fetch(`${REPO}/icons/${slug}.svg`);
  if (!res.ok) return null;
  const svg = await res.text();
  if (!svg.trimStart().startsWith("<svg")) return null;
  return paint(svg, color ?? fallbackHex ?? "101215");
}

const ok = [];
for (const [slug, name, color] of BRANDS) {
  const svg = await grab(slug, color, hexOf.get(slug));
  if (!svg) {
    console.error(`! ${slug} — not in Simple Icons, skipping`);
    continue;
  }
  await writeFile(join(outDir, `${slug}.svg`), svg);
  ok.push({ slug, name });
  console.log(`${slug.padEnd(12)} ${String(svg.length).padStart(6)}B  ${name}`);
}

const socialsOk = [];
for (const [slug, name] of SOCIALS) {
  const svg = await grab(slug, "FFFFFF");
  if (!svg) {
    console.error(`! ${slug} — not in Simple Icons, skipping`);
    continue;
  }
  await writeFile(join(socialDir, `${slug}.svg`), svg);
  socialsOk.push({ slug, name });
  console.log(`${slug.padEnd(12)} ${String(svg.length).padStart(6)}B  ${name} (social)`);
}

console.log(`\n${ok.length}/${BRANDS.length} brands -> public/brands/`);
console.log(`${socialsOk.length}/${SOCIALS.length} socials -> public/social/`);
