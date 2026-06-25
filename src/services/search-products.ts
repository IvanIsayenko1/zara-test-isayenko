import type { Product } from "@/types/product";

export async function searchProducts(search: string, signal?: AbortSignal): Promise<Product[]> {
  const params = new URLSearchParams();

  if (search) {
    params.set("search", search);
  }

  const response = await fetch(`/api/products?${params.toString()}`, { signal });

  if (!response.ok) {
    throw new Error("Could not search products");
  }

  return response.json();
}
