// ───── The product catalog ─────
// Ecommerce-style product entries for the shopping carousel. Prices are the
// same verified figures as the price index (one source of truth for numbers,
// this file adds the product framing + images). Images are provider-published
// product creatives supplied by the site operator - never generated. A null
// image renders the provider-logo tile fallback; never invent a product shot.

export type CatalogProduct = {
  id: string;
  providerId: string;
  /** Shopping-card product title, e.g. "Quad by MEDVi 4-in-1 Dissolvable". */
  name: string;
  /** Short corner chip label, e.g. "4-in-1". Omit for no chip. */
  chip?: string;
  format: "injection" | "drops" | "tablet" | "sublingual";
  /** Headline price, e.g. "$114" or "$1.63". */
  price: string;
  /** Price unit shown after the price, e.g. "mo" (default) or "tablet". */
  unit?: string;
  /** Struck-through regular price when the headline is promotional. */
  regularPrice?: string;
  /** The honest condition attached to the price. */
  priceNote: string;
  shipping: string;
  image: string | null;
};

// Operator-supplied product creatives + prices only - never fabricate a shot or
// a figure. Prices here are as published by the provider and can change, so the
// priceNote carries the honest "confirm current rate" condition and the ED
// product carousel renders these cards WITHOUT Product/Offer schema (a
// promotional price must never become a stale structured-data claim).
export const PRODUCT_CATALOG: CatalogProduct[] = [
  {
    id: "quad-4in1",
    providerId: "quad",
    name: "Quad by MEDVi 4-in-1 Dissolvable",
    chip: "4-in-1",
    format: "sublingual",
    price: "$114",
    regularPrice: "$179",
    priceNote: "Starting price - confirm the current rate at MEDVi",
    shipping: "Free rush shipping",
    image: "/products/quad.webp",
  },
  {
    id: "dudemeds-generics",
    providerId: "dudemeds",
    name: "DudeMeds Sildenafil & Tadalafil",
    chip: "Generics",
    format: "tablet",
    price: "$1.63",
    unit: "tablet",
    priceNote: "Starting per-tablet price - confirm the current rate at DudeMeds",
    shipping: "Free shipping",
    image: "/products/dudemeds.webp",
  },
];

/** Numeric value for sorting ("from $179" → 179). */
export function productPriceValue(p: CatalogProduct): number {
  return Number(p.price.replace(/[^0-9]/g, "")) || 9999;
}
