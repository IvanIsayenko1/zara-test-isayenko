import ProductCatalog from "@/components/product-catalog/product-catalog";
import { fetchProducts } from "@/services/products";

export default async function Home() {
  const products = await fetchProducts({});

  return <ProductCatalog products={products} />;
}
