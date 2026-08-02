/**
 * One-off: the Back to School product shots, saved to public/products/.
 *
 * Everything else in public/products/ came off ourshopee.com via
 * fetch-images.mjs, but that catalogue is electronics, fragrance and kitchen —
 * it has no bag, no footwear and no clothing, and the section needs all three.
 * These three come from public GitHub repositories instead, which is the only
 * image source reachable from this environment:
 *
 *   backpack, t-shirt  keikaavousi/fake-store-api (public/img/) — the product
 *                      photography behind fakestoreapi.com's demo catalogue
 *   trainers           adrianhajdin/nike_landing_page (src/assets/images/)
 *
 * Same standing as the rest of the demo imagery: real product photographs of
 * real products, used to make the page legible rather than to represent stock.
 * The prices in lib/home.ts that go with them are demo values — unlike the
 * ourshopee listings, neither source publishes one.
 *
 *   node scripts/fetch-school.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FAKE_STORE =
  "https://raw.githubusercontent.com/keikaavousi/fake-store-api/master/public/img";
const NIKE_LANDING =
  "https://raw.githubusercontent.com/adrianhajdin/nike_landing_page/main/src/assets/images";

// slug -> source URL
const PICKS = {
  "foldsack-backpack": `${FAKE_STORE}/81fPKd-2AYL._AC_SL1500_.jpg`,
  "raglan-henley-tee": `${FAKE_STORE}/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg`,
  "trail-trainers": `${NIKE_LANDING}/big-shoe3.png`,
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

const outDir = join(process.cwd(), "public", "products");
await mkdir(outDir, { recursive: true });

let ok = 0;
for (const [slug, url] of Object.entries(PICKS)) {
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`! ${res.status} ${slug} — skipping`);
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const ext = sniff(buf);
  if (!ext) {
    console.error(`! ${slug} — unrecognised image data, skipping`);
    continue;
  }

  await writeFile(join(outDir, `${slug}.${ext}`), buf);
  console.log(`✓ ${slug}.${ext} (${(buf.length / 1024).toFixed(0)} kB)`);
  ok++;
}

console.log(`\n${ok}/${Object.keys(PICKS).length} saved to public/products/`);
