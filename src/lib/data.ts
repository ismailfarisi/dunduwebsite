/**
 * Mock catalogue for the homepage prototype.
 * Titles / prices are modelled on the live ourshopee.com UAE storefront
 * so the layout is stress-tested with realistic string lengths.
 */

export type Product = {
  id: string;
  title: string;
  brand: string;
  price: number;
  was?: number;
  rating?: number;
  reviews?: number;
  express?: boolean;
  lowStock?: number;
  condition?: "Renewed — Excellent" | "Renewed — Very Good";
  tint: string;
};

export type Category = {
  slug: string;
  name: string;
  icon: string;
  tint: string;
};

export const currency = "AED";

export const categories: Category[] = [
  { slug: "mobiles", name: "Mobiles & Tablets", icon: "Smartphone", tint: "#6d5cff" },
  { slug: "pre-owned", name: "Pre-Owned", icon: "RefreshCw", tint: "#0f9d76" },
  { slug: "gaming", name: "Gaming", icon: "Gamepad2", tint: "#e0457b" },
  { slug: "laptops", name: "Laptops & PCs", icon: "Laptop", tint: "#2f7ddf" },
  { slug: "electronics", name: "Electronics", icon: "Tv", tint: "#8a56d6" },
  { slug: "accessories", name: "Accessories", icon: "Headphones", tint: "#d9722a" },
  { slug: "home", name: "Home & Kitchen", icon: "CookingPot", tint: "#c94f3d" },
  { slug: "fashion", name: "Fashion", icon: "Shirt", tint: "#1f9ba4" },
  { slug: "beauty", name: "Health & Beauty", icon: "Sparkles", tint: "#d94f8a" },
  { slug: "toys", name: "Toys & Games", icon: "ToyBrick", tint: "#e8a020" },
  { slug: "sports", name: "Sports & Cycling", icon: "Bike", tint: "#3d8f45" },
  { slug: "baby", name: "Baby & Mother", icon: "Baby", tint: "#e07a9c" },
  { slug: "tools", name: "Tools & Hardware", icon: "Wrench", tint: "#6b7280" },
  { slug: "pets", name: "Pet Supplies", icon: "PawPrint", tint: "#a0672b" },
  { slug: "furnishing", name: "Home Furnishing", icon: "Lamp", tint: "#7c6a52" },
  { slug: "stationery", name: "Stationery", icon: "PenLine", tint: "#4a5cc4" },
  { slug: "automotive", name: "Automotive", icon: "Car", tint: "#37474f" },
  { slug: "school", name: "School Essentials", icon: "Backpack", tint: "#c2591f" },
];

export const dealOfDay: Product[] = [
  {
    id: "d1",
    title: "Apple iPhone 17 Pro Max 256GB Cosmic Orange 5G — 6.9″ Super Retina XDR, A19 Pro",
    brand: "Apple",
    price: 5099,
    was: 6373,
    rating: 4.4,
    reviews: 47,
    express: true,
    lowStock: 6,
    tint: "#d97706",
  },
  {
    id: "d2",
    title: "Samsung Galaxy S26 Ultra 5G, 200MP Quad Camera, 12GB / 256GB, Dual SIM — Black",
    brand: "Samsung",
    price: 3389,
    was: 3999,
    rating: 4.5,
    reviews: 27,
    express: true,
    lowStock: 12,
    tint: "#334155",
  },
  {
    id: "d3",
    title: "Lenovo Legion Go Handheld, Ryzen Z1 Extreme, 16GB / 1TB, 8.8″ 144Hz",
    brand: "Lenovo",
    price: 3500,
    was: 6370,
    rating: 4.3,
    reviews: 61,
    lowStock: 3,
    tint: "#7c3aed",
  },
  {
    id: "d4",
    title: "Nintendo Switch 2 Console + Mario Kart World Bundle, 256GB, Joy-Con 2",
    brand: "Nintendo",
    price: 2179,
    was: 2723,
    rating: 4.5,
    reviews: 26,
    express: true,
    lowStock: 9,
    tint: "#dc2626",
  },
  {
    id: "d5",
    title: "Prestige Air Fryer 4.8L 1500W — Deep Fryer for Crispy Snacks, Easy Clean",
    brand: "Prestige",
    price: 211,
    was: 311,
    rating: 4.2,
    reviews: 88,
    express: true,
    lowStock: 21,
    tint: "#0f766e",
  },
  {
    id: "d6",
    title: "Xiaomi TV A Pro 65″ 2026, 4K QLED Google TV, Dolby Audio, 120Hz Game Boost",
    brand: "Xiaomi",
    price: 1739,
    was: 1999,
    rating: 4.5,
    reviews: 58,
    tint: "#ea580c",
  },
];

export const trending: Product[] = [
  {
    id: "t1",
    title: "Apple iPhone 16 Pro Max 256GB Desert Titanium, 6.9″ OLED, 48MP",
    brand: "Apple",
    price: 4599,
    was: 4799,
    rating: 4.3,
    reviews: 312,
    express: true,
    tint: "#a16207",
  },
  {
    id: "t2",
    title: "Samsung Galaxy S25 Ultra Dual SIM Titanium Black 12GB / 256GB 5G",
    brand: "Samsung",
    price: 2879,
    was: 3598,
    rating: 4.4,
    reviews: 227,
    express: true,
    tint: "#1e293b",
  },
  {
    id: "t3",
    title: "Sony PlayStation 5 Slim Disc Edition 1TB with DualSense Controller",
    brand: "Sony",
    price: 2599,
    was: 3249,
    rating: 4.4,
    reviews: 27,
    tint: "#1d4ed8",
  },
  {
    id: "t4",
    title: "Lenovo Yoga 7i 2-in-1 16″ 2K Touch, Core Ultra 7 155U, 16GB / 1TB, Win 11",
    brand: "Lenovo",
    price: 3499,
    was: 3699,
    rating: 4.3,
    reviews: 23,
    tint: "#4338ca",
  },
  {
    id: "t5",
    title: "TCL 55″ P7K QLED 4K UHD Google TV, Dolby Vision & Atmos (2025)",
    brand: "TCL",
    price: 1299,
    was: 1449,
    rating: 4.4,
    reviews: 38,
    express: true,
    tint: "#0e7490",
  },
  {
    id: "t6",
    title: "Lattafa Yara Eau de Parfum 100ml for Women — Oriental Vanilla",
    brand: "Lattafa",
    price: 77,
    was: 138,
    rating: 4.4,
    reviews: 231,
    express: true,
    tint: "#be185d",
  },
  {
    id: "t7",
    title: "Honor Magic V5 Foldable 5G, 16GB / 512GB, 7.95″ OLED + Watch Fit Active",
    brand: "Honor",
    price: 5499,
    was: 6329,
    rating: 4.4,
    reviews: 19,
    tint: "#b45309",
  },
  {
    id: "t8",
    title: "Cetaphil Moisturizing Cream 550g — Dry to Very Dry Sensitive Skin",
    brand: "Cetaphil",
    price: 93,
    was: 149,
    rating: 4.6,
    reviews: 402,
    express: true,
    tint: "#0369a1",
  },
];

export const renewed: Product[] = [
  {
    id: "r1",
    title: "Apple iPhone 15 Pro Max 256GB Natural Titanium, Single SIM & eSIM",
    brand: "Apple",
    price: 2340,
    was: 4999,
    rating: 4.4,
    reviews: 24,
    condition: "Renewed — Excellent",
    tint: "#57534e",
  },
  {
    id: "r2",
    title: "Samsung Galaxy S24 Ultra 12GB / 256GB 5G Titanium Black",
    brand: "Samsung",
    price: 2625,
    was: 4299,
    rating: 4.3,
    reviews: 24,
    condition: "Renewed — Excellent",
    tint: "#292524",
  },
  {
    id: "r3",
    title: "HP EliteBook 840 G8 14″ Core i5 11th Gen, 16GB / 256GB, Win 10 Pro",
    brand: "HP",
    price: 950,
    was: 1899,
    rating: 4.5,
    reviews: 22,
    condition: "Renewed — Excellent",
    tint: "#475569",
  },
  {
    id: "r4",
    title: "Dell Latitude 7420 14″ Core i7 11th Gen, 16GB / 512GB, Iris Xe, Win 11 Pro",
    brand: "Dell",
    price: 1000,
    was: 2199,
    rating: 4.5,
    reviews: 24,
    condition: "Renewed — Excellent",
    tint: "#1e40af",
  },
  {
    id: "r5",
    title: "Apple iPhone 13 128GB 5G Starlight, Single SIM & eSIM",
    brand: "Apple",
    price: 1057,
    was: 1999,
    rating: 4.4,
    reviews: 227,
    condition: "Renewed — Excellent",
    tint: "#78716c",
  },
  {
    id: "r6",
    title: "Lenovo ThinkPad T490 14″ FHD Core i5 8th Gen, 16GB / 256GB, Win 10 Pro",
    brand: "Lenovo",
    price: 715,
    was: 1399,
    rating: 4.6,
    reviews: 24,
    condition: "Renewed — Very Good",
    tint: "#3f3f46",
  },
];

export const underHundred: Product[] = [
  {
    id: "u1",
    title: "La Parfum Oud Al Ameer EDP 100ml Unisex — Oriental Woody",
    brand: "La Parfum",
    price: 41.5,
    was: 99,
    rating: 4.1,
    reviews: 63,
    tint: "#7c2d12",
  },
  {
    id: "u2",
    title: "Delcasa DC3029 2-Layer Dish Drying Rack, Rust-Proof, Drain Tray",
    brand: "Delcasa",
    price: 35,
    was: 69,
    rating: 4.0,
    reviews: 41,
    tint: "#0891b2",
  },
  {
    id: "u3",
    title: "Xiaomi Mijia Lint Remover C3, 5-Blade, USB-C Rechargeable",
    brand: "Xiaomi",
    price: 65,
    rating: 4.4,
    reviews: 120,
    express: true,
    tint: "#ea580c",
  },
  {
    id: "u4",
    title: "Casio Mens Analog Watch MTP-V004D-7BUDF, Stainless Steel",
    brand: "Casio",
    price: 96,
    was: 143,
    rating: 4.3,
    reviews: 58,
    tint: "#334155",
  },
  {
    id: "u5",
    title: "Grabit Wall Mount Bracket for 23–55″ TVs, Tilt, Black — GWB-44T",
    brand: "Grabit",
    price: 99,
    was: 148,
    rating: 4.2,
    reviews: 77,
    express: true,
    tint: "#3f3f46",
  },
  {
    id: "u6",
    title: "Generic 1200W 5L Electric Hot Pot, Non-Stick, Multi-Function",
    brand: "Generic",
    price: 69,
    was: 75,
    rating: 3.9,
    reviews: 33,
    tint: "#b91c1c",
  },
];

export const heroSlides = [
  {
    id: "h1",
    eyebrow: "Limited time",
    title: "iPhone 17 Pro Max",
    sub: "20% off + 5% extra on the app",
    price: 5099,
    was: 6373,
    cta: "Shop the deal",
    from: "#3b1d9e",
    to: "#c2410c",
  },
  {
    id: "h2",
    eyebrow: "Certified refurbished",
    title: "Like new, half the price",
    sub: "12-month warranty · free shipping",
    price: 730,
    was: 1299,
    cta: "Shop Pre-Owned",
    from: "#064e3b",
    to: "#0f766e",
  },
  {
    id: "h3",
    eyebrow: "Summer sale",
    title: "Home & kitchen up to 44% off",
    sub: "Air fryers, cookware, dispensers",
    price: 211,
    was: 311,
    cta: "See offers",
    from: "#7c2d12",
    to: "#b45309",
  },
];

export const trustPoints = [
  { icon: "Truck", title: "Free delivery over AED 100", sub: "Next-day in Dubai & Sharjah" },
  { icon: "ShieldCheck", title: "100% authentic", sub: "Sourced from official distributors" },
  { icon: "RotateCcw", title: "7-day free returns", sub: "No questions, refund to source" },
  { icon: "CreditCard", title: "Pay in 4 with Tabby", sub: "0% interest · COD available" },
];
