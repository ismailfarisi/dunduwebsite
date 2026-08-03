/**
 * One-off: the footwear shots, saved to public/products/.
 *
 * Same reason as fetch-fashion.mjs — the ourshopee catalogue carries no
 * footwear at all. These come from a public GitHub repository:
 *
 *   adrianhajdin/nike_landing_page (src/assets/images/)
 *
 * Two formats there. `big-shoe*.png` are plain PNGs. The `shoe*.svg` files
 * look like vectors but are a wrapper around a base64 PNG — an <svg> holding
 * an <image>, which is a photograph in a costume. This pulls the largest
 * embedded PNG out of each (the smaller one is the circular backdrop the
 * landing page draws behind the shoe) and writes it as a real PNG, so the
 * product shots in public/products/ stay one kind of thing.
 *
 * Real photographs of real shoes. The prices in lib/home.ts are demo values;
 * brands are only claimed where the mark is legible in the frame.
 *
 *   node scripts/fetch-footwear.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const REPO =
  "https://raw.githubusercontent.com/adrianhajdin/nike_landing_page/main/src/assets/images";

// slug -> source filename
const PICKS = {
  "shoe-af1-carhartt": "big-shoe2.png",
  "shoe-legend-essential": "shoe4.svg",
  "shoe-kswiss": "shoe5.svg",
  "shoe-nb-247": "shoe7.svg",
  "shoe-knit-runner": "shoe8.svg",
};

/** the biggest base64 PNG in the wrapper is the shoe; the other is the disc */
function extractPng(svg) {
  const blobs = [...svg.matchAll(/data:image\/png;base64,([A-Za-z0-9+/=]+)/g)].map((m) => m[1]);
  if (!blobs.length) return null;
  blobs.sort((a, b) => b.length - a.length);
  return Buffer.from(blobs[0], "base64");
}

const outDir = join(process.cwd(), "public", "products");
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [slug, file] of Object.entries(PICKS)) {
  const res = await fetch(`${REPO}/${file}`);
  if (!res.ok) {
    console.error(`! ${res.status} ${slug} — skipping`);
    continue;
  }

  let buf;
  if (file.endsWith(".svg")) {
    buf = extractPng(await res.text());
    if (!buf) {
      console.error(`! ${slug} — no embedded png, skipping`);
      continue;
    }
  } else {
    buf = Buffer.from(await res.arrayBuffer());
  }

  if (buf.toString("ascii", 1, 4) !== "PNG") {
    console.error(`! ${slug} — not a png, skipping`);
    continue;
  }

  await writeFile(join(outDir, `${slug}.png`), buf);
  console.log(`✓ ${slug}.png (${(buf.length / 1024).toFixed(0)} kB)`);
  ok++;
}

console.log(`\n${ok}/${Object.keys(PICKS).length} saved to public/products/`);
