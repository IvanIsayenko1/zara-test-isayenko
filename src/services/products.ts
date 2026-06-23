import type { Product, ProductDetail } from "@/types/product";

const PRODUCTS_API_URL = "https://prueba-tecnica-api-tienda-moviles.onrender.com/products";

const PRODUCTS_API_KEY = "87909682e6cd74208f41a6ef39fe4191";

const SHOULD_SIMULATE_PRODUCT_ERROR = false;
const SHOULD_SIMULATE_PRODUCT_DELAY = false;
const PRODUCT_FETCH_DELAY = 3000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchProducts({
  limit = 20,
  search = "",
}: {
  limit?: number;
  search?: string;
}): Promise<Product[]> {
  if (SHOULD_SIMULATE_PRODUCT_DELAY) {
    await delay(PRODUCT_FETCH_DELAY);
  }

  if (SHOULD_SIMULATE_PRODUCT_ERROR) {
    throw new Error("Simulated products fetch error");
  }

  const response = await fetch(`${PRODUCTS_API_URL}?limit=${limit}&search=${search}`, {
    next: { revalidate: 300 },
    headers: {
      "x-api-key": PRODUCTS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch products");
  }

  return response.json();
}

export async function fetchProduct(id: string): Promise<ProductDetail> {
  if (SHOULD_SIMULATE_PRODUCT_DELAY) {
    await delay(PRODUCT_FETCH_DELAY);
  }

  if (SHOULD_SIMULATE_PRODUCT_ERROR) {
    throw new Error("Simulated product fetch error");
  }

  const response = await fetch(`${PRODUCTS_API_URL}/${id}`, {
    cache: "no-store",
    headers: {
      "x-api-key": PRODUCTS_API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error("Could not fetch product");
  }

  return response.json();
}
