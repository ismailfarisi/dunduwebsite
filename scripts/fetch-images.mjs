/**
 * One-off: pulls the product shots used by the demo out of scrape.json and
 * writes them to public/products/. Demo asset fetch — not part of the build.
 *
 *   node scripts/fetch-images.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const PICKS = {
  // flash deals
  "iphone-15-pro-max": 54,
  "galaxy-s26-ultra": 27,
  "xiaomi-tv-a-pro-65": 86,
  "farberware-cookware": 101,
  "xiaomi-blender": 127,
  "casio-enticer": 115,
  "lattafa-fakhar-gold": 79,
  "jvc-70-qled": 88,
  // new arrivals
  "valentino-voce-viva": 77,
  "givenchy-eaudemoiselle": 78,
  "armaf-club-de-nuit": 83,
  "armaf-yum-yum": 82,
  // best sellers
  "galaxy-s24-ultra": 53,
  "sony-bravia-50": 85,
  "geepas-microwave": 125,
  "delcasa-cookware": 105,
  // promo tiles
  "asus-tuf-gaming": 42,
  "armaf-odyssey": 84,
  "seiko-prospex": 117,
  "prestige-cast-iron": 106,
  // hero
  "honor-magic-v5": 4,
};

function sniff(buf) {
  if (buf.length < 12) return null;
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP")
    return "webp";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.toString("ascii", 1, 4) === "PNG") return "png";
  if (buf.toString("ascii", 4, 12) === "ftypavif") return "avif";
  return null;
}

const root = process.cwd();
const outDir = join(root, "public", "products");
await mkdir(outDir, { recursive: true });

const all = JSON.parse(await readFile(join(root, "scripts", "scrape.json"), "utf8"));

let ok = 0;
const manifest = {};

for (const [slug, idx] of Object.entries(PICKS)) {
  const item = all[idx];
  if (!item) {
    console.error(`! no item at index ${idx} (${slug})`);
    continue;
  }
  const url = item.src;

  const res = await fetch(url, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
      referer: "https://ourshopee.com/",
      accept: "image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    console.error(`! ${res.status} ${slug} -> ${url}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());

  // The CDN serves WebP whatever the URL extension says, so name by content —
  // a .png file holding WebP bytes makes next/image 400.
  const ext = sniff(buf);
  if (!ext) {
    console.error(`! ${slug}: unrecognised image bytes`);
    continue;
  }
  const file = `${slug}.${ext}`;
  await writeFile(join(outDir, file), buf);
  manifest[slug] = {
    file: `/products/${file}`,
    bytes: buf.length,
    title: item.title,
    price: item.price,
    was: item.was,
    rating: item.rating,
    reviews: item.reviews,
  };
  ok++;
  console.log(`${slug.padEnd(26)} ${String(buf.length).padStart(7)}B  ${item.title.slice(0, 60)}`);
}

await writeFile(join(root, "scripts", "image-manifest.json"), JSON.stringify(manifest, null, 2));
console.log(`\n${ok}/${Object.keys(PICKS).length} downloaded -> public/products/`);
