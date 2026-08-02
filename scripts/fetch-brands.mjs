/**
 * One-off: brand logos for the "Shop Top Brands" row.
 *
 * ourshopee.com doesn't publish logo assets, so these come from Simple Icons
 * (CC0) rather than being scraped off brand sites. Brand-coloured SVGs, saved
 * to public/brands/.
 *
 *   node scripts/fetch-brands.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

// [slug, display name, colour override].
// Simple Icons serves each mark in its official brand colour; Sony's is white,
// which disappears on the light tile, so it gets an explicit ink value.
const BRANDS = [
  ["apple", "Apple"],
  ["samsung", "Samsung"],
  ["sony", "Sony", "101215"],
  ["xiaomi", "Xiaomi"],
  ["lenovo", "Lenovo"],
  ["asus", "ASUS"],
  ["lg", "LG"],
  ["hp", "HP"],
  ["dell", "Dell"],
  ["honor", "HONOR"],
  // philips and huawei: no Simple Icons entry / not needed for the 10-up row
];

// Footer socials sit on the dark panel, so they are fetched already white.
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

const ok = [];
for (const [slug, name, color] of BRANDS) {
  const res = await fetch(
    `https://cdn.simpleicons.org/${slug}${color ? `/${color}` : ""}`,
  );
  if (!res.ok) {
    console.error(`! ${res.status} ${slug} — skipping`);
    continue;
  }
  const svg = await res.text();
  if (!svg.trimStart().startsWith("<svg")) {
    console.error(`! ${slug}: not an svg — skipping`);
    continue;
  }
  await writeFile(join(outDir, `${slug}.svg`), svg);
  ok.push({ slug, name });
  console.log(`${slug.padEnd(10)} ${String(svg.length).padStart(6)}B  ${name}`);
}

const socialsOk = [];
for (const [slug, name] of SOCIALS) {
  const res = await fetch(`https://cdn.simpleicons.org/${slug}/FFFFFF`);
  if (!res.ok) {
    console.error(`! ${res.status} ${slug} — skipping`);
    continue;
  }
  const svg = await res.text();
  if (!svg.trimStart().startsWith("<svg")) {
    console.error(`! ${slug}: not an svg — skipping`);
    continue;
  }
  await writeFile(join(socialDir, `${slug}.svg`), svg);
  socialsOk.push({ slug, name });
  console.log(`${slug.padEnd(10)} ${String(svg.length).padStart(6)}B  ${name} (social)`);
}

console.log(`\n${ok.length}/${BRANDS.length} brands -> public/brands/`);
console.log(`${socialsOk.length}/${SOCIALS.length} socials -> public/social/\n`);
console.log("export const brands = [");
for (const b of ok) console.log(`  { name: "${b.name}", logo: "/brands/${b.slug}.svg" },`);
console.log("];");
console.log("export const socials = [");
for (const s of socialsOk)
  console.log(`  { name: "${s.name}", icon: "/social/${s.slug}.svg" },`);
console.log("];");
