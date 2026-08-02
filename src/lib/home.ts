/**
 * Demo content for the homepage.
 *
 * Product names, prices, ratings and imagery are the real listings from
 * ourshopee.com, pulled once by `scripts/fetch-images.mjs` into
 * `public/products/`. Ratings appear only where the source listing had one —
 * nothing here is invented. Editorial copy (hero lines, promo tile titles,
 * trust points) is written for the demo.
 *
 * The card's commercial signals — `express`, `lowStock`, `sold` — are demo
 * values in the same sense: the source listings don't publish them. In
 * production they come from inventory and order data. `brand` and `condition`
 * are read off the real title (which is why the titles below no longer repeat
 * ", Renewed" — the card says it in a chip instead).
 */

export type Item = {
  id: string;
  title: string;
  img: string;
  price: number;
  was?: number;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
  /** shown as an eyebrow above the title, so a row can be scanned by brand */
  brand?: string;
  /** e.g. "Certified Renewed" — the differentiator, said out loud */
  condition?: string;
  express?: boolean;
  lowStock?: number;
  /** social proof for items the source listing had no rating for */
  sold?: number;
};

/** Order value that clears delivery. Stated in the utility strip and on cards. */
export const FREE_DELIVERY_MIN = 150;

/** tabby splits any basket above this into 4 payments. */
export const TABBY_MIN = 100;

export const topbarLeft = { label: "Delivering to", value: "UAE", flag: "🇦🇪" };

export const topbarCenter = [
  { icon: "Truck", label: `Free Delivery on orders AED ${FREE_DELIVERY_MIN}+` },
  { icon: "Banknote", label: "Cash on Delivery" },
  { icon: "RotateCcw", label: "Easy Returns" },
  { icon: "Smartphone", label: "Download App" },
];

export const topbarRight = [
  { icon: "MapPin", label: "Track Order" },
  { icon: "CircleHelp", label: "Help Center" },
];

export const navLinks = [
  { label: "Deals", hot: true },
  { label: "Back to School" },
  { label: "New Arrivals" },
  { label: "Best Sellers" },
  { label: "Mobiles" },
  { label: "Electronics" },
  { label: "Perfumes" },
  { label: "Beauty" },
  { label: "Fashion" },
  { label: "Home & Kitchen" },
  { label: "More" },
];

export const heroSlides = [
  {
    id: "h1",
    eyebrow: "Mega deals",
    line1: "Big Brands.",
    line2: "Bigger Savings.",
    sub: "The best offers on electronics, fashion, beauty, home & more.",
    cta: "Shop Now",
    img: "/products/galaxy-s26-ultra.webp",
    alt: "Samsung Galaxy S26 Ultra",
  },
  {
    id: "h2",
    eyebrow: "Summer sale",
    line1: "Up to 45% off",
    line2: "Home & Kitchen.",
    sub: "Cookware sets, blenders, microwaves and everyday essentials.",
    cta: "See Offers",
    img: "/products/farberware-cookware.webp",
    alt: "Farberware 20-piece cookware set",
  },
  {
    id: "h3",
    eyebrow: "Certified refurbished",
    line1: "Like new.",
    line2: "Half the price.",
    sub: "12-month warranty, free shipping, fully tested devices.",
    cta: "Shop Pre-Owned",
    img: "/products/iphone-15-pro-max.webp",
    alt: "Apple iPhone 15 Pro Max, renewed",
  },
  {
    id: "h4",
    eyebrow: "New arrivals",
    line1: "Just landed.",
    line2: "Straight to you.",
    sub: "The latest foldables, laptops and fragrances in stock now.",
    cta: "Explore",
    img: "/products/honor-magic-v5.webp",
    alt: "Honor Magic V5 foldable smartphone",
  },
];

export const usps = [
  { icon: "Truck", title: "Free Delivery", sub: `On orders AED ${FREE_DELIVERY_MIN}+` },
  { icon: "Zap", title: "Fast Delivery", sub: "Tomorrow to 2 Days" },
  { icon: "RotateCcw", title: "Easy Returns", sub: "Hassle-free returns" },
  { icon: "CreditCard", title: "Secure Payments", sub: "100% secure payments" },
  { icon: "ShieldCheck", title: "Official Warranty", sub: "Brand warranty" },
  { icon: "Headset", title: "24/7 Support", sub: "We're here to help" },
];

/**
 * Category circles. Art is ourshopee.com's own category imagery — see
 * scripts/fetch-categories.mjs. The mockup's first four tiles (Under AED 50 /
 * 100, New Arrivals, Top Deals) are price filters, not categories, and have no
 * category art; the deal entry points live in the nav bar instead.
 */
export const quickLinks = [
  { label: "Mobiles & Tablets", img: "/categories/mobiles.webp" },
  { label: "Laptops & PCs", img: "/categories/laptops.webp" },
  { label: "Gaming", img: "/categories/gaming.webp" },
  { label: "Electronics", img: "/categories/electronics.webp" },
  { label: "TV & Audio", img: "/categories/tv.webp" },
  { label: "Health & Beauty", img: "/categories/beauty.webp" },
  { label: "Fashion", img: "/categories/fashion.webp" },
  { label: "Home & Kitchen", img: "/categories/home.webp" },
  { label: "Sports & Cycling", img: "/categories/sports.webp" },
  { label: "Toys & Games", img: "/categories/toys.webp" },
  { label: "Pre-Owned", img: "/categories/preowned.webp" },
  { label: "Summer Sale", img: "/categories/sale.webp" },
];

/**
 * Items are named rather than written inline where a SKU earns a place in more
 * than one merchandised context — the cookware belongs in Flash Deals *and* in
 * Home & Kitchen, and it should be the same object in both, not a copy that
 * drifts.
 */
const galaxyS24Ultra: Item = {
  id: "f1",
  title: "Samsung Galaxy S24 Ultra 12GB / 256GB 5G Titanium Black",
  brand: "Samsung",
  condition: "Certified Renewed",
  img: "/products/galaxy-s24-ultra.webp",
  price: 2625,
  was: 4299,
  rating: 4.3,
  reviews: 24,
  express: true,
  lowStock: 6,
};

const farberwareCookware: Item = {
  id: "f3",
  title: "Farberware 20-Piece Nonstick Cookware & Utensil Set, Aqua Blue",
  brand: "Farberware",
  img: "/products/farberware-cookware.webp",
  price: 287,
  was: 517,
  express: true,
  sold: 300,
};

const xiaomiBlender: Item = {
  id: "f4",
  title: "Xiaomi Smart Touch Blender 1000W, 9 Speeds, Hot & Cold Blending",
  brand: "Xiaomi",
  img: "/products/xiaomi-blender.webp",
  price: 279,
  was: 492,
  express: true,
  sold: 500,
};

const delcasaCookware: Item = {
  id: "f6",
  title: "Delcasa Emerald 13-Piece Non-Stick Cookware Set, Induction Base",
  brand: "Delcasa",
  img: "/products/delcasa-cookware.webp",
  price: 245,
  was: 376,
  sold: 200,
  lowStock: 9,
};

const geepasMicrowave: Item = {
  id: "f7",
  title: "Geepas 20L Microwave Oven, 700W, 5 Power Levels, 35 Min Timer",
  brand: "Geepas",
  img: "/products/geepas-microwave.webp",
  price: 459,
  was: 683,
  express: true,
  sold: 150,
};

const casioEnticer: Item = {
  id: "f5",
  title: "Casio Enticer Analog Mens Watch, Black Dial — MTP-1374D-1AVDF",
  brand: "Casio",
  img: "/products/casio-enticer.webp",
  price: 169,
  was: 279,
  rating: 4.4,
  reviews: 15,
  express: true,
};

/** Only in Home & Kitchen and the bundle — it was promo-tile art until now. */
const prestigeCastIron: Item = {
  id: "k1",
  title: "Prestige Cast Iron Cookware Set, 24cm Kadai & 26cm Frypan",
  brand: "Prestige",
  img: "/products/prestige-cast-iron.webp",
  price: 179,
  was: 252,
  express: true,
  sold: 180,
};

export const flashDeals: Item[] = [
  galaxyS24Ultra,
  {
    id: "f2",
    title: "JVC 70 Inch QLED 4K UHD Google Smart TV, Dolby Vision Atmos",
    brand: "JVC",
    img: "/products/jvc-70-qled.webp",
    price: 1699,
    was: 2311,
    rating: 4.4,
    reviews: 35,
    lowStock: 4,
  },
  farberwareCookware,
  xiaomiBlender,
  casioEnticer,
  delcasaCookware,
  geepasMicrowave,
  {
    id: "f8",
    title: "Valentino Voce Viva Eau de Parfum 100 ml for Women",
    brand: "Valentino",
    img: "/products/valentino-voce-viva.webp",
    price: 365,
    was: 490,
    rating: 4.3,
    reviews: 27,
    express: true,
  },
];

/**
 * A whole category that only appeared as two stray flash deals. Five real
 * listings, and the reason the section exists is the category, not the offer —
 * which is what keeps it from being another discount rail.
 */
export const homeKitchen: Item[] = [
  farberwareCookware,
  prestigeCastIron,
  delcasaCookware,
  xiaomiBlender,
  geepasMicrowave,
];

/**
 * Bought together because they're genuinely used together. The total is the
 * real sum of the three listings — no invented bundle discount, the value is
 * in not having to assemble the basket yourself.
 */
export const bundle = {
  title: "Kit out the kitchen",
  sub: "Three of the most-bought Home & Kitchen listings, in one basket.",
  items: [farberwareCookware, prestigeCastIron, xiaomiBlender],
};

/**
 * Three doors, not four.
 *
 * The row this replaces was four identical lozenges whose copy said nothing
 * ("Great deals for your home") and whose art contradicted the label — a watch
 * illustrating "Fashion Collection", a men's fragrance illustrating "Beauty".
 * A tile that lies about its category teaches people to skip the row.
 *
 * Every `from` is the real floor price of that category in this catalogue, so
 * the hook survives contact with the listing page.
 */
export const promoTiles = [
  {
    id: "p1",
    eyebrow: "Electronics Sale",
    title: "Up to 50% off TVs, laptops & gaming",
    from: 764,
    cta: "Shop electronics",
    theme: "ink" as const,
    img: "/products/asus-tuf-gaming.webp",
    alt: "ASUS TUF Gaming A15 laptop",
  },
  {
    id: "p2",
    eyebrow: "Perfumes",
    title: "Designer fragrances",
    from: 69,
    cta: "Shop perfumes",
    theme: "rose" as const,
    img: "/products/armaf-odyssey.webp",
    alt: "Armaf Odyssey eau de parfum",
  },
  {
    id: "p3",
    eyebrow: "Home & Kitchen",
    title: "Cookware & appliances",
    from: 179,
    cta: "Shop home",
    theme: "warm" as const,
    img: "/products/prestige-cast-iron.webp",
    alt: "Prestige cast iron cookware set",
  },
];

/**
 * The right rail beside the hero. One product, priced, with a real clock —
 * the six reassurance rows that used to sit here repeated the utility strip
 * above and the trust row above the footer.
 *
 * Chosen for the attach story: the source listing genuinely bundles the watch
 * and case, which nothing else in the catalogue does.
 */
export const dealOfDay = {
  brand: "HONOR",
  title: 'Honor Magic V5 Foldable 5G, 16GB / 512GB, 7.95" OLED',
  img: "/products/honor-magic-v5.webp",
  price: 5499,
  was: 6329,
  includes: "Honor Watch Fit Active + case included",
  unitsTotal: 25,
  unitsLeft: 8,
};

export const newArrivals: Item[] = [
  {
    id: "n1",
    title: "Givenchy Eaudemoiselle De Givenchy EDT 100ml",
    brand: "Givenchy",
    img: "/products/givenchy-eaudemoiselle.webp",
    price: 204.6,
    was: 399,
    isNew: true,
    express: true,
  },
  {
    id: "n2",
    title: "Armaf Club De Nuit Imperiale EDP 105ml for Women",
    brand: "Armaf",
    img: "/products/armaf-club-de-nuit.webp",
    price: 135,
    was: 209,
    isNew: true,
    express: true,
    sold: 400,
  },
  {
    id: "n3",
    title: "Armaf Delights Yum Yum EDP 100ml for Women",
    brand: "Armaf",
    img: "/products/armaf-yum-yum.webp",
    price: 105,
    was: 163,
    isNew: true,
    sold: 250,
  },
  {
    id: "n4",
    title: "Lattafa Fakhar Gold EDP 100ml for Unisex",
    brand: "Lattafa",
    img: "/products/lattafa-fakhar-gold.webp",
    price: 69,
    was: 129,
    isNew: true,
    sold: 600,
  },
];

const iphone15ProMax: Item = {
  id: "b1",
  title: "Apple iPhone 15 Pro Max 256GB Natural Titanium",
  brand: "Apple",
  condition: "Certified Renewed",
  img: "/products/iphone-15-pro-max.webp",
  price: 2340,
  was: 4999,
  rating: 4.4,
  reviews: 24,
  express: true,
  lowStock: 3,
};

export const bestSellers: Item[] = [
  iphone15ProMax,
  {
    id: "b2",
    title: "Samsung Galaxy S26 Ultra 5G, 200MP Quad Camera, 12GB / 256GB",
    brand: "Samsung",
    img: "/products/galaxy-s26-ultra.webp",
    price: 3389,
    was: 3999,
    rating: 4.5,
    reviews: 27,
    express: true,
  },
  {
    id: "b3",
    title: "Sony Bravia 50 Inch X80L 4K HDR Smart Google TV",
    brand: "Sony",
    img: "/products/sony-bravia-50.webp",
    price: 1799,
    was: 2149,
    rating: 4.3,
    reviews: 34,
    lowStock: 7,
  },
  {
    id: "b4",
    title: "Xiaomi TV A Pro 65-Inch 4K QLED Google TV, 120Hz Game Boost",
    brand: "Xiaomi",
    img: "/products/xiaomi-tv-a-pro-65.webp",
    price: 1739,
    was: 1999,
    rating: 4.5,
    reviews: 58,
    express: true,
  },
];

/**
 * Refurbished is the actual differentiator and it was scattered: one renewed
 * phone inside Flash Deals, another inside Best Sellers, the word itself cut
 * off the end of both titles. Given its own frame it can carry the thing that
 * sells it, which is the warranty rather than the discount.
 */
export const refurbished = {
  items: [iphone15ProMax, galaxyS24Ultra],
  points: [
    { icon: "ShieldCheck", label: "12-month warranty" },
    { icon: "Wrench", label: "50-point tested" },
    { icon: "RotateCcw", label: "7-day free returns" },
    { icon: "Package", label: "Cable & charger included" },
  ],
};

/** The only laptop in the catalogue, so it anchors Back to School. */
const asusTufGaming: Item = {
  id: "x2",
  title: "ASUS TUF Gaming A15 15.6in 144Hz, Ryzen 7, 16GB, RTX 3050",
  brand: "ASUS",
  img: "/products/asus-tuf-gaming.webp",
  price: 764,
  express: true,
  lowStock: 5,
};

/**
 * Bag, footwear and clothing — three categories the ourshopee catalogue simply
 * doesn't carry, so the photography comes from public GitHub repositories
 * instead (see scripts/fetch-school.mjs for the exact sources). The products in
 * the shots are real; the prices are demo values, because unlike the ourshopee
 * listings neither source publishes one. Titles describe what is visibly in the
 * frame rather than naming a model number nobody can check.
 *
 * No `rating` on any of them, per the rule at the top of this file: a star
 * rating is a claim about other buyers, and there is no source listing to take
 * one from. `sold` is a demo signal in the same sense as everywhere else.
 */
const foldsackBackpack: Item = {
  id: "s1",
  title: "Fjällräven Foldsack No. 1 Backpack, 16L, Fits 15in Laptop",
  brand: "Fjällräven",
  img: "/products/foldsack-backpack.jpg",
  price: 399,
  was: 465,
  express: true,
  sold: 260,
};

const trailTrainers: Item = {
  id: "s2",
  title: "Adidas Trail Trainers, Breathable Mesh Upper, Blue & Black",
  brand: "Adidas",
  img: "/products/trail-trainers.png",
  price: 229,
  was: 329,
  express: true,
  lowStock: 8,
};

const raglanTee: Item = {
  id: "s3",
  title: "H2H Raglan Henley Slim Fit T-Shirt, Grey & Black",
  brand: "H2H",
  img: "/products/raglan-henley-tee.jpg",
  price: 69,
  was: 99,
  sold: 400,
};

/**
 * Menswear and womenswear, same sourcing and the same demo-price caveat as the
 * three above (scripts/fetch-fashion.mjs). Brands are the labels legible in the
 * photographs; where a garment's label can't be read, it carries no brand
 * rather than a guessed one.
 */
const mensCottonJacket: Item = {
  id: "m1",
  title: "Cotton Field Jacket, Stand Collar, Zip Front, Khaki",
  img: "/products/mens-cotton-jacket.jpg",
  price: 199,
  was: 299,
  express: true,
  sold: 210,
};

const mensVneckTee: Item = {
  id: "m2",
  title: "H2H Long Sleeve V-Neck T-Shirt, Slim Fit, Denim Blue",
  brand: "H2H",
  img: "/products/mens-vneck-tee.jpg",
  price: 89,
  was: 129,
  sold: 320,
};

const womensMotoJacket: Item = {
  id: "w1",
  title: "Lock and Love Faux Leather Moto Jacket, Removable Hood, Black",
  brand: "Lock and Love",
  img: "/products/womens-moto-jacket.jpg",
  price: 249,
  was: 379,
  express: true,
  lowStock: 7,
};

const womensBoatNeckTop: Item = {
  id: "w2",
  title: "Made By Johnny Dolman Sleeve Boat Neck Top, Ruched Sides, White",
  brand: "Made By Johnny",
  img: "/products/womens-boat-neck-top.jpg",
  price: 59,
  was: 89,
  sold: 450,
};

const womensVneckTee: Item = {
  id: "w3",
  title: "Opna Short Sleeve V-Neck Tee, Moisture Wicking, Red",
  brand: "Opna",
  img: "/products/womens-vneck-tee.jpg",
  price: 45,
  was: 69,
  sold: 380,
};

/**
 * One section, two wardrobes.
 *
 * Menswear and womenswear as two separate rails would be two more rails; side
 * by side under one heading they're a comparison, and the page keeps the shape
 * it already uses for New Arrivals / Best Sellers — except the split here is
 * who it's for, which is the first question anyone shopping clothes answers.
 *
 * Three a side rather than four: this is the page's introduction to a category
 * it has never carried, and a short row that's all wearable beats a long one
 * padded to fill the grid.
 */
export const fashion = {
  title: "Menswear & womenswear, new in",
  sub: "The category the site never carried, opened with six pieces — a jacket, a shirt and a tee for each side.",
  groups: [
    { label: "Men's", items: [mensCottonJacket, mensVneckTee, raglanTee] },
    { label: "Women's", items: [womensMotoJacket, womensBoatNeckTop, womensVneckTee] },
  ],
};

/**
 * Seasonal, and the reason it isn't another discount rail is the label above
 * each card: every pick says what it's *for* — lectures, the walk in, the exam
 * hall — so the row reads as a list to work through rather than five unrelated
 * markdowns that happen to share a banner.
 *
 * One of each thing a term actually needs, which is also why it stops at five:
 * a second laptop or a third top would turn a list back into a rail. The kit
 * and the dorm kettle-and-cookware end of it already have their own section
 * further down the page.
 *
 * The header claims a best-case percentage rather than a basket total — these
 * are five separate decisions, and the laptop carries no markdown at all.
 */
export const backToSchool = {
  title: "The whole list, before term starts",
  sub: "One of each: the laptop for lectures, the bag that has to survive a year of them, a watch for exam halls, trainers for PE and a shirt for the other five days.",
  picks: [
    { need: "For lectures", icon: "Laptop", item: asusTufGaming },
    { need: "For the walk in", icon: "Backpack", item: foldsackBackpack },
    { need: "For exam halls", icon: "Clock", item: casioEnticer },
    { need: "For PE", icon: "Footprints", item: trailTrainers },
    { need: "For every day", icon: "Shirt", item: raglanTee },
  ],
};

/** Catalogue-only listings: they exist for search and the budget doors. */
const strays: Item[] = [
  {
    id: "x1",
    title: "Armaf Odyssey Mega Limited Edition EDP 100ml for Men",
    brand: "Armaf",
    img: "/products/armaf-odyssey.webp",
    price: 89,
    was: 139,
    sold: 350,
  },
  asusTufGaming,
  {
    id: "x3",
    title: "Seiko Prospex Solar Quartz 42.8mm, Blue Dial, 200m",
    brand: "Seiko",
    img: "/products/seiko-prospex.webp",
    price: 1477,
    was: 2141,
    sold: 90,
  },
];

/**
 * Everything in the catalogue, deduplicated — SKUs sit in several sections.
 *
 * The school picks go in as themselves rather than as copies: a bag that only
 * exists inside one section is invisible to search and to the price doors,
 * which is exactly the stray-listing problem the rest of this file avoids.
 */
export const allItems: Item[] = [
  ...new Map(
    [
      ...flashDeals,
      ...newArrivals,
      ...bestSellers,
      ...homeKitchen,
      ...backToSchool.picks.map((p) => p.item),
      ...fashion.groups.flatMap((g) => g.items),
      ...strays,
    ].map((i) => [i.id, i]),
  ).values(),
];

/**
 * Price doors. Deal-led traffic navigates by budget before it navigates by
 * category, and the mockup's Under AED 50 / 100 tiles were dropped in the
 * rebuild and never replaced. Thumbnails are the real cheapest listings in
 * each band, so the door shows what's behind it.
 */
export const budgetBands = [100, 250, 500, 1000];

export function itemsUnder(max: number, limit = 3): Item[] {
  return allItems
    .filter((i) => i.price < max)
    .sort((a, b) => b.price - a.price)
    .slice(0, limit);
}

export const trendingSearches = [
  "iphone renewed",
  "65 inch tv",
  "cookware set",
  "armaf perfume",
  "samsung galaxy",
];

/** Every word has to land somewhere in the brand, title or condition. */
export function searchItems(q: string, limit = 4): Item[] {
  const words = q.toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return allItems
    .filter((it) => {
      const hay = `${it.brand ?? ""} ${it.title} ${it.condition ?? ""}`.toLowerCase();
      return words.every((w) => hay.includes(w));
    })
    .slice(0, limit);
}

/** Logos are Simple Icons (CC0) — see scripts/fetch-brands.mjs. */
export const brands = [
  { name: "Apple", logo: "/brands/apple.svg" },
  { name: "Samsung", logo: "/brands/samsung.svg" },
  { name: "Sony", logo: "/brands/sony.svg" },
  { name: "Xiaomi", logo: "/brands/xiaomi.svg" },
  { name: "Lenovo", logo: "/brands/lenovo.svg" },
  { name: "ASUS", logo: "/brands/asus.svg" },
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "HP", logo: "/brands/hp.svg" },
  { name: "Dell", logo: "/brands/dell.svg" },
  { name: "HONOR", logo: "/brands/honor.svg" },
];

export const trustPoints = [
  { icon: "Users", title: "Trusted by Millions", sub: "Over 2M+ happy customers" },
  { icon: "Star", title: "4.6/5 Customer Rating", sub: "Based on 50K+ reviews" },
  { icon: "RotateCcw", title: "7 Days Easy Returns", sub: "No questions asked" },
  { icon: "ShieldCheck", title: "Secure Checkout", sub: "100% payment protection" },
];

export const socials = [
  { name: "Facebook", icon: "/social/facebook.svg" },
  { name: "Instagram", icon: "/social/instagram.svg" },
  { name: "TikTok", icon: "/social/tiktok.svg" },
  { name: "YouTube", icon: "/social/youtube.svg" },
];

export const footerLinks = [
  "About Us",
  "Careers",
  "Blog",
  "Track Order",
  "Returns & Refunds",
  "Terms & Conditions",
  "Privacy Policy",
  "Contact Us",
  "Help Center",
];

export const payments = ["VISA", "Mastercard", "tabby", "tamara", "Pay"];
