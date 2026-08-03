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
  /** extra views of the same product, main first — a thumbnail rail only
      appears where there genuinely is more than one angle */
  imgs?: string[];
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

/**
 * Six slides, one per department, chosen for a UAE August rather than for
 * variety: the season is 45°C outside, which is why the banner leads with the
 * sale, then the categories people buy to stay indoors comfortably, then the
 * phone, the wardrobe and the fragrance.
 *
 * Gaming, Toys, Sports and Pre-Owned are strong categories but the catalogue
 * holds no listings behind three of them, and a slide that can't quote a real
 * price is a slide that shouts an adjective.
 *
 * A banner slide sells a department, so the department has to be what you see.
 *
 * `img` is the subject: the department's lead listing, shot large. `picks` are
 * two or three more listings from the same department under it, which is what
 * turns "here is a television" into "here is the television aisle" — and every
 * one of them is a real id out of the catalogue below, priced and linked.
 *
 * `tint` is the department's colour. The panel is one flat step of it — no
 * photograph, no gradient — which is what lets the product cutouts sit on the
 * banner with nothing drawn around them.
 */
export const heroSlides = [
  {
    id: "h1",
    category: "Summer Sale",
    eyebrow: "Summer Sale",
    line1: "The whole store,",
    line2: "cooler than outside.",
    sub: "Every department marked down while the heat lasts — renewed phones lead at more than half off.",
    cta: "Shop the sale",
    img: "/products/iphone-15-pro-max.webp",
    alt: "Apple iPhone 15 Pro Max, renewed",
    itemId: "b1",
    /* a store-wide sale, so the row crosses departments on purpose */
    picks: ["f2", "f3", "n4"],
    tint: "213,232,79",
  },
  {
    id: "h2",
    category: "TV & Audio",
    eyebrow: "TV & Audio",
    line1: "45° outside.",
    line2: "70 inches inside.",
    sub: "QLED, 4K and Dolby Atmos — the summer plan that doesn't involve going out.",
    cta: "Shop TV & Audio",
    img: "/products/jvc-70-qled.webp",
    alt: "JVC 70 inch QLED 4K smart TV",
    itemId: "f2",
    /* two, not three: the catalogue holds three televisions and no audio,
       and a gaming laptop in the TV aisle is a row padding itself out */
    picks: ["b4", "b3"],
    tint: "120,180,255",
  },
  {
    id: "h3",
    category: "Home & Kitchen",
    eyebrow: "Home & Kitchen",
    line1: "Blend it.",
    line2: "Chill it. Repeat.",
    sub: "Blenders, cookware and everything else that makes August indoors bearable.",
    cta: "Shop home & kitchen",
    img: "/products/xiaomi-blender.webp",
    alt: "Xiaomi smart touch blender",
    itemId: "f4",
    picks: ["f3", "f7", "k1"],
    tint: "125,232,190",
  },
  {
    id: "h4",
    category: "Fashion",
    eyebrow: "Summer fashion",
    line1: "Menswear.",
    line2: "Womenswear.",
    sub: "Short sleeves for both, in cotton and jersey — plus the trainers and the bag.",
    cta: "Shop fashion",
    img: "/products/fashion-model-women.jpg",
    alt: "Model wearing a red top",
    /** the department's floor price, which is what "From" means on a category slide */
    itemId: "w3",
    picks: ["m2", "sh1", "s1"],
    tint: "255,150,190",
  },
  {
    id: "h6",
    category: "Health & Beauty",
    eyebrow: "Health & Beauty",
    line1: "Fragrance that",
    line2: "survives August.",
    sub: "Fresh florals and light orientals in 100ml — Lattafa, Armaf, Givenchy and Valentino.",
    cta: "Shop fragrance",
    img: "/products/lattafa-fakhar-gold.webp",
    alt: "Lattafa Fakhar Gold eau de parfum",
    itemId: "n4",
    picks: ["n1", "f8", "x1"],
    tint: "247,190,120",
  },
  {
    id: "h5",
    category: "Mobiles & Tablets",
    eyebrow: "Mobiles & Tablets",
    line1: "Flagship camera.",
    line2: "Summer price.",
    sub: "200MP, 120Hz and a 6.9-inch AMOLED — new, renewed and everything between.",
    cta: "Shop mobiles",
    img: "/products/galaxy-s26-ultra.webp",
    alt: "Samsung Galaxy S26 Ultra",
    itemId: "b2",
    /* the other two phones in the catalogue — there is no tablet in it */
    picks: ["b1", "f1"],
    tint: "183,155,247",
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
const mensSummerTee: Item = {
  id: "m1",
  title: "Short Sleeve Performance Tee, Moisture Wicking, Grey",
  img: "/products/mens-summer-tee.jpg",
  imgs: [
    "/products/mens-summer-tee.jpg",
    "/products/mens-summer-tee-back.jpg",
    "/products/mens-summer-tee-detail.jpg",
  ],
  price: 55,
  was: 89,
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

const womensSummerTee: Item = {
  id: "w1",
  title: "Short Sleeve Scoop Neck Tee, Stretch Jersey, Black",
  img: "/products/womens-summer-tee.jpg",
  imgs: [
    "/products/womens-summer-tee.jpg",
    "/products/womens-summer-tee-back.jpg",
    "/products/womens-summer-tee-detail.jpg",
  ],
  price: 49,
  was: 75,
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
 * Footwear. Photography from adrianhajdin/nike_landing_page — see
 * scripts/fetch-footwear.mjs — and the same demo-price caveat as the rest of
 * the clothing.
 *
 * Brands are claimed only where the mark is legible in the frame: the swoosh,
 * the N, the K-Swiss wordmark, the three stripes. The knit runner carries no
 * visible mark, so it carries no brand rather than a guessed one.
 */
const nikeAf1: Item = {
  id: "sh1",
  title: "Nike Air Force 1 '07 Premium, Canvas & Corduroy, Tan",
  brand: "Nike",
  img: "/products/shoe-af1-carhartt.png",
  price: 549,
  was: 699,
  express: true,
  lowStock: 5,
};

const nikeLegend: Item = {
  id: "sh2",
  title: "Nike Legend Essential Training Shoe, Black & Gum",
  brand: "Nike",
  img: "/products/shoe-legend-essential.png",
  price: 279,
  was: 359,
  express: true,
  sold: 240,
};

const newBalance247: Item = {
  id: "sh3",
  title: "New Balance 247 Nubuck & Mesh Trainer, Olive",
  brand: "New Balance",
  img: "/products/shoe-nb-247.png",
  price: 329,
  was: 429,
  sold: 180,
};

const kswissTrainer: Item = {
  id: "sh4",
  title: "K-Swiss Chunky Court Trainer, White, Teal & Orange",
  brand: "K-Swiss",
  img: "/products/shoe-kswiss.png",
  price: 249,
  was: 319,
  express: true,
  sold: 150,
};

const knitRunner: Item = {
  id: "sh5",
  title: "Knit Runner, Primeknit Upper, Gradient Sole, Purple",
  img: "/products/shoe-knit-runner.png",
  price: 189,
  was: 259,
  sold: 320,
  lowStock: 11,
};

/**
 * A department the site sold exactly one of — the school trainers — while
 * Fashion sat next to it with six garments. Six pairs, one rail.
 */
export const footwear: Item[] = [
  nikeAf1,
  trailTrainers,
  newBalance247,
  nikeLegend,
  kswissTrainer,
  knitRunner,
];

/**
 * One section, two wardrobes, in season.
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
  title: "Summer weight, both wardrobes",
  sub: "Six pieces for a UAE August — short sleeves first, and nothing heavier than jersey behind them.",
  groups: [
    { label: "Men's", items: [mensSummerTee, raglanTee, mensVneckTee] },
    { label: "Women's", items: [womensSummerTee, womensBoatNeckTop, womensVneckTee] },
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
      ...footwear,
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

/**
 * How many listings sit behind a price door, counted off the catalogue.
 *
 * The door shows this and not "from AED x" or "up to x% off": the bands are
 * cumulative, so the cheapest listing and the deepest discount in the shop sit
 * under every one of them, and all four doors printed the same number. The
 * count is the figure that actually differs — 8, 17, 24, 26.
 */
export function bandStats(max: number): { count: number; maxOff: number } {
  const inBand = allItems.filter((i) => i.price < max);
  return {
    count: inBand.length,
    maxOff: inBand.reduce(
      (best, i) => (i.was ? Math.max(best, Math.round(((i.was - i.price) / i.was) * 100)) : best),
      0,
    ),
  };
}

function pick(...ids: string[]): Item[] {
  return ids
    .map((id) => allItems.find((i) => i.id === id))
    .filter((i): i is Item => Boolean(i));
}

/** Read off the bands themselves, so the menu can't drift from the doors. */
const budgetLinks = budgetBands.map((b) => `Under AED ${b.toLocaleString("en-AE")}`);

export function itemById(id: string): Item | undefined {
  return allItems.find((i) => i.id === id);
}

/**
 * Which department a listing belongs to, worked out from the sections it is
 * actually merchandised in rather than from a `category` field nobody
 * maintains. Order matters: the first match wins, so a renewed phone reads as
 * Mobiles rather than as Best Sellers.
 */
const departments: { label: string; items: Item[] }[] = [
  { label: "Footwear", items: footwear },
  { label: "Fashion", items: fashion.groups.flatMap((g) => g.items) },
  { label: "Home & Kitchen", items: homeKitchen },
  { label: "Back to School", items: backToSchool.picks.map((p) => p.item) },
  { label: "New Arrivals", items: newArrivals },
  { label: "Best Sellers", items: bestSellers },
  { label: "Deals", items: flashDeals },
];

export function departmentOf(item: Item): string {
  return departments.find((d) => d.items.some((i) => i.id === item.id))?.label ?? "All Products";
}

/**
 * What to show under a listing: same brand first — the strongest signal we
 * have — then the rest of its department, then nothing. No filler: a row that
 * pads itself out with a microwave under a t-shirt is worse than a short row.
 */
export function relatedTo(item: Item, limit = 5): Item[] {
  const dept = departments.find((d) => d.items.some((i) => i.id === item.id))?.items ?? [];
  const ranked = [
    ...allItems.filter((i) => i.id !== item.id && i.brand && i.brand === item.brand),
    ...dept.filter((i) => i.id !== item.id),
  ];
  return [...new Map(ranked.map((i) => [i.id, i])).values()].slice(0, limit);
}

/**
 * The listing's own title, split back into the specs it was written from.
 *
 * ourshopee titles are comma-separated spec lists ("12GB / 256GB 5G Titanium
 * Black"), which is the only structured product data this demo has — so the
 * detail page reads them out rather than inventing a description. The first
 * fragment is dropped: it is the product name, which is already the heading.
 */
export function highlightsOf(item: Item): string[] {
  return item.title
    .split(/,|—/)
    .slice(1)
    .map((s) => s.trim())
    .filter((s) => s.length > 1 && s.length < 48);
}

export type MegaMenu = {
  columns: { title: string; links: string[] }[];
  /** three real listings, so the panel shows the department instead of naming it */
  items?: Item[];
  cta: string;
};

/**
 * The panel behind each nav link, keyed by that link's label.
 *
 * A nav item that only navigates makes the shopper guess what's behind it; the
 * panel answers with the department's own vocabulary and three listings that
 * are actually in it. Every product here is `pick`ed out of the catalogue by
 * id, so a panel can never advertise something the site doesn't sell — and a
 * column that has no listings behind it (Beauty's skincare, say) shows the
 * links and simply omits the products rather than borrowing someone else's.
 *
 * "All Categories" has no entry: it opens the twelve category circles, which
 * are already data (quickLinks) and already have art.
 */
export const megaMenus: Record<string, MegaMenu> = {
  Deals: {
    columns: [
      { title: "Today", links: ["Flash Deals", "Deal of the Day", "Clearance"] },
      { title: "By budget", links: budgetLinks },
    ],
    items: pick("f1", "f2", "f8"),
    cta: "Shop all deals",
  },
  "Back to School": {
    columns: [
      { title: "The list", links: ["Laptops", "Backpacks", "Watches", "Footwear"] },
      { title: "Everyday", links: ["T-shirts & tops", "Trainers", "Under AED 100"] },
    ],
    items: pick("x2", "s1", "s2"),
    cta: "Shop the list",
  },
  "New Arrivals": {
    columns: [
      { title: "Just landed", links: ["This week", "Fragrance", "Mobiles", "Fashion"] },
      { title: "Coming soon", links: ["Pre-order", "Back in stock"] },
    ],
    items: pick("n1", "n2", "n4"),
    cta: "See everything new",
  },
  "Best Sellers": {
    columns: [
      { title: "Top rated", links: ["Mobiles", "TV & Audio", "Home & Kitchen"] },
      { title: "Most bought", links: ["This month", "All time"] },
    ],
    items: pick("b1", "b2", "b4"),
    cta: "Shop best sellers",
  },
  Mobiles: {
    columns: [
      { title: "By brand", links: ["Apple", "Samsung", "HONOR", "Xiaomi"] },
      { title: "By type", links: ["Smartphones", "Foldables", "Renewed phones"] },
    ],
    items: pick("b2", "b1", "f1"),
    cta: "Shop all mobiles",
  },
  Electronics: {
    columns: [
      { title: "TV & Audio", links: ["4K & QLED TVs", "Smart TVs", "65 inch & above"] },
      { title: "Laptops & PCs", links: ["Gaming laptops", "Everyday laptops"] },
    ],
    items: pick("f2", "b3", "x2"),
    cta: "Shop electronics",
  },
  Perfumes: {
    columns: [
      { title: "For her", links: ["Floral", "Oriental", "Eau de parfum"] },
      { title: "For him", links: ["Woody", "Aromatic", "Gift sets"] },
    ],
    items: pick("n1", "n2", "n4"),
    cta: "Shop all perfumes",
  },
  Beauty: {
    columns: [
      { title: "Fragrance", links: ["Women's perfume", "Men's perfume", "Unisex"] },
      { title: "More beauty", links: ["Skincare", "Hair care", "Bath & body"] },
    ],
    items: pick("n3", "f8"),
    cta: "Shop beauty",
  },
  Fashion: {
    columns: [
      { title: "Men's", links: ["T-shirts", "Short sleeve", "Watches"] },
      { title: "Women's", links: ["Tops", "T-shirts", "Under AED 100"] },
      { title: "Shoes & bags", links: ["Trainers", "Backpacks"] },
    ],
    items: pick("w1", "m1", "s2"),
    cta: "Shop fashion",
  },
  "Home & Kitchen": {
    columns: [
      { title: "Cookware", links: ["Cookware sets", "Cast iron", "Pans & pots"] },
      { title: "Appliances", links: ["Microwaves", "Blenders", "Small appliances"] },
    ],
    items: pick("f3", "k1", "f7"),
    cta: "Shop home & kitchen",
  },
  More: {
    columns: [
      { title: "Departments", links: ["Gaming", "Sports & Cycling", "Toys & Games", "Pre-Owned"] },
      { title: "Help", links: ["Track Order", "Returns & Refunds", "Help Center"] },
    ],
    cta: "See all departments",
  },
};

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

/**
 * The brand row, across every department rather than just the electronics
 * ten it used to carry.
 *
 * Logos are Simple Icons (CC0) — see scripts/fetch-brands.mjs. Where a brand
 * the catalogue actually sells has no CC0 mark (Armaf, Casio, Geepas and the
 * rest are not in Simple Icons), it appears as a wordmark instead. A drawn
 * approximation of someone's logo would be worse than their name set in type.
 *
 * Order interleaves departments on purpose: the row moves, and nine phone
 * brands in a block followed by six laptop brands reads as a stall.
 */
export const brands: { name: string; logo?: string }[] = [
  { name: "Apple", logo: "/brands/apple.svg" },
  { name: "Adidas", logo: "/brands/adidas.svg" },
  { name: "Sony", logo: "/brands/sony.svg" },
  { name: "Armaf" },
  { name: "Bosch", logo: "/brands/bosch.svg" },
  { name: "Samsung", logo: "/brands/samsung.svg" },
  { name: "Nike", logo: "/brands/nike.svg" },
  { name: "Casio" },
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "Lattafa" },
  { name: "Lenovo", logo: "/brands/lenovo.svg" },
  { name: "Puma", logo: "/brands/puma.svg" },
  { name: "Panasonic", logo: "/brands/panasonic.svg" },
  { name: "Farberware" },
  { name: "HONOR", logo: "/brands/honor.svg" },
  { name: "Zara", logo: "/brands/zara.svg" },
  { name: "Seiko" },
  { name: "JBL", logo: "/brands/jbl.svg" },
  { name: "Prestige" },
  { name: "ASUS", logo: "/brands/asus.svg" },
  { name: "New Balance", logo: "/brands/newbalance.svg" },
  { name: "Xiaomi", logo: "/brands/xiaomi.svg" },
  { name: "Givenchy" },
  { name: "Siemens", logo: "/brands/siemens.svg" },
  { name: "Huawei", logo: "/brands/huawei.svg" },
  { name: "Uniqlo", logo: "/brands/uniqlo.svg" },
  { name: "Geepas" },
  { name: "HP", logo: "/brands/hp.svg" },
  { name: "Reebok", logo: "/brands/reebok.svg" },
  { name: "Bose", logo: "/brands/bose.svg" },
  { name: "Valentino" },
  { name: "Dell", logo: "/brands/dell.svg" },
  { name: "Under Armour", logo: "/brands/underarmour.svg" },
  { name: "Delcasa" },
  { name: "OPPO", logo: "/brands/oppo.svg" },
  { name: "Fjällräven" },
  { name: "Acer", logo: "/brands/acer.svg" },
  { name: "Motorola", logo: "/brands/motorola.svg" },
  { name: "MSI", logo: "/brands/msi.svg" },
  { name: "OnePlus", logo: "/brands/oneplus.svg" },
  { name: "Nokia", logo: "/brands/nokia.svg" },
];

export const trustPoints = [
  { icon: "Users", title: "Trusted by Millions", sub: "Over 2M+ happy customers" },
  { icon: "Star", title: "4.6/5 Customer Rating", sub: "Based on 50K+ reviews" },
  { icon: "RotateCcw", title: "7 Days Easy Returns", sub: "No questions asked" },
  { icon: "ShieldCheck", title: "Secure Checkout", sub: "100% payment protection" },
];

/**
 * What travels across the top strip.
 *
 * The utility promises and the proof points, in one loop. The strip used to
 * say "Easy Returns" while the row above the footer said "7 Days Easy
 * Returns"; this keeps the specific version and drops the vague one, so the
 * two places agree. `trustPoints` still has its own row down there, where it
 * is read at decision time rather than glanced at.
 *
 * `sub` renders muted after the title, so a point reads as a claim and its
 * evidence rather than as a slogan.
 */
export const topbarStrip: { icon: string; title: string; sub?: string }[] = [
  { icon: "Truck", title: `Free Delivery on orders AED ${FREE_DELIVERY_MIN}+` },
  ...trustPoints.map((t) => ({ icon: t.icon, title: t.title, sub: t.sub })),
  { icon: "Banknote", title: "Cash on Delivery", sub: "Pay when it arrives" },
  { icon: "Smartphone", title: "Download the App", sub: "iOS & Android" },
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
