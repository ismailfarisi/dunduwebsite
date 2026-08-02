/**
 * One-off: the menswear and womenswear shots, saved to public/products/.
 *
 * Same reason as fetch-school.mjs — the ourshopee catalogue behind the rest of
 * this demo carries no clothing at all, so the photography comes from a public
 * GitHub repository instead:
 *
 *   keikaavousi/fake-store-api (public/img/) — the product photography behind
 *   fakestoreapi.com's demo catalogue
 *
 * Real photographs of real garments. The prices in lib/home.ts that go with
 * them are demo values, because the source publishes none; the titles describe
 * the garment in the frame and the brand on its visible label.
 *
 *   node scripts/fetch-fashion.mjs
 */
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const FAKE_STORE =
  "https://raw.githubusercontent.com/keikaavousi/fake-store-api/master/public/img";

/**
 * The hero's fashion slide needs people, not garments: a flat cutout of a
 * black jacket is a listing, and a banner has to sell the department. These
 * two are model photography from Magento's open sample data set
 * (magento/magento2-sample-data, shot on white like everything else here).
 */
const MAGENTO =
  "https://raw.githubusercontent.com/magento/magento2-sample-data/2.4-develop/pub/media/catalog/product";

// slug -> source filename
const PICKS = {
  "mens-vneck-tee": "71YXzeOuslL._AC_UY879_.jpg",
  "womens-boat-neck-top": "71z3kpMAYsL._AC_UY879_.jpg",
  "womens-vneck-tee": "51eg55uWmdL._AC_UX679_.jpg",
};

/**
 * slug -> path under the Magento media tree.
 *
 * The two jackets this section opened with are gone: it is August in the UAE.
 * Their replacements are short-sleeved, and they are model shots for the same
 * reason the banner is — a garment reads as summer on a person faster than it
 * does laid flat.
 */
const MODELS = {
  "fashion-model-men": "m/s/ms01-blue_main.jpg",
  "fashion-model-women": "w/s/ws03-red_main.jpg",
  "mens-summer-tee": "m/s/ms04-red_main.jpg",
  "womens-summer-tee": "w/s/ws05-black_main.jpg",
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

const sources = [
  ...Object.entries(PICKS).map(([slug, file]) => [slug, `${FAKE_STORE}/${file}`]),
  ...Object.entries(MODELS).map(([slug, path]) => [slug, `${MAGENTO}/${path}`]),
];

let ok = 0;
for (const [slug, url] of sources) {
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

console.log(`\n${ok}/${sources.length} saved to public/products/`);
