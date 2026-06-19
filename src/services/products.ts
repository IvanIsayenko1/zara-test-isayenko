import type { Product } from "@/types/product";

const PRODUCTS_API_URL =
  "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";

const PRODUCTS_API_KEY = "87909682e6cd74208f41a6ef39fe4191";

export async function fetchProducts(): Promise<Product[]> {
  const response = await fetch(PRODUCTS_API_URL, {
    cache: "no-store",
    headers: {
      "x-api-key": PRODUCTS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch products");
  }

  return response.json();
}
