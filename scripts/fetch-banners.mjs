/**
 * One-off: the banner photography, saved to public/banners/.
 *
 * The hero used to be a product cutout floating on a purple gradient — a
 * template, not a shop. A banner sells a season, and a season needs a
 * photograph. These are the lifestyle shots from Magento's open sample data
 * set:
 *
 *   magento/magento2-sample-data (pub/media/wysiwyg/) — the editorial
 *   photography behind the Luma demo store
 *
 * Every one is a real outdoor summer photograph, which is the whole point:
 * the shop is in the UAE and it is August. Nobody in these frames is holding
 * a product, so no slide claims anything the catalogue can't back — the photo
 * carries the weather, and the copy and the price carry the department.
 *
 * They are wide crops (roughly 2.4:1 to 3.3:1) with the subject in the left
 * third and open sky or sand to the right, which is why the copy panel and
 * its scrim sit on the right-hand side of the banner.
 *
 *   node scripts/fetch-banners.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE =
  "https://raw.githubusercontent.com/magento/magento2-sample-data/2.4-develop/pub/media/wysiwyg";

/** slug -> path under the wysiwyg tree, and what is actually in the frame */
const PICKS = {
  // a woman sitting cross-legged on sand, deep blue sea and sky behind her
  "summer-calm": "home/home-main.jpg",
  // a runner's legs on wet sand, hazy sun — the "45° outside" the TV slide means
  "summer-heat": "mens/mens-main.jpg",
  // a woman running a lake path at dusk, water and pale sky
  "summer-dusk": "sale/sale-main.jpg",
  // a woman in a hoodie and leggings leaning on a dune fence — a full outfit
  "summer-dunes": "new/new-main.jpg",
  // hands together above the head, facing a sunrise over water
  "summer-sunrise": "gear/gear-main.jpg",
  // warrior pose on a beach under a vivid blue sky
  "summer-shore": "womens/womens-main.jpg",
};

const OUT = join(process.cwd(), "public", "banners");

await mkdir(OUT, { recursive: true });

for (const [slug, path] of Object.entries(PICKS)) {
  const url = `${BASE}/${path}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(OUT, `${slug}.jpg`), buf);
  console.log(`${slug}.jpg  ${(buf.length / 1024).toFixed(0)} KB  <- ${path}`);
}
