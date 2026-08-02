/**
 * One-off: category circle art from ourshopee.com, saved to public/categories/.
 * Reads scripts/cats.json (scraped image list) and picks by index.
 *
 *   node scripts/fetch-categories.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

// slug -> [index in cats.json, display label]
const PICKS = {
  mobiles: [3, "Mobiles & Tablets"],
  laptops: [5, "Laptops & PCs"],
  gaming: [4, "Gaming"],
  electronics: [6, "Electronics"],
  tv: [63, "TV & Audio"],
  beauty: [8, "Health & Beauty"],
  fashion: [7, "Fashion"],
  home: [0, "Home & Kitchen"],
  sports: [10, "Sports & Cycling"],
  toys: [9, "Toys & Games"],
  preowned: [2, "Pre-Owned"],
  sale: [1, "Summer Sale"],
};

function sniff(buf) {
  if (buf.length < 12) return null;
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP")
    return "webp";
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (buf.toString("ascii", 1, 4) === "PNG") return "png";
  return null;
}

const root = process.cwd();
const outDir = join(root, "public", "categories");
await mkdir(outDir, { recursive: true });

const all = JSON.parse(await readFile(join(root, "scripts", "cats.json"), "utf8"));

const ok = [];
for (const [slug, [idx, label]] of Object.entries(PICKS)) {
  const item = all[idx];
  if (!item) {
    console.error(`! no entry at index ${idx} (${slug})`);
    continue;
  }
  const res = await fetch(item.src, {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0 Safari/537.36",
      referer: "https://ourshopee.com/",
      accept: "image/webp,image/*,*/*;q=0.8",
    },
  });
  if (!res.ok) {
    console.error(`! ${res.status} ${slug}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const ext = sniff(buf);
  if (!ext) {
    console.error(`! ${slug}: unrecognised image bytes`);
    continue;
  }
  await writeFile(join(outDir, `${slug}.${ext}`), buf);
  ok.push({ slug, label, ext, source: item.label });
  console.log(`${slug.padEnd(12)} ${String(buf.length).padStart(7)}B  ${label}  <- ${item.label}`);
}

console.log(`\n${ok.length}/${Object.keys(PICKS).length} downloaded -> public/categories/\n`);
console.log("export const quickLinks = [");
for (const c of ok)
  console.log(`  { label: "${c.label}", img: "/categories/${c.slug}.${c.ext}" },`);
console.log("];");
