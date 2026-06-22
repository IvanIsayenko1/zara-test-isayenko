import { ProductCatalogPage } from "@/components/product-catalog/product-catalog-page";
import { ProductsProvider } from "@/context/products-context";
import { fetchProducts } from "@/services/products";

export default async function Home() {
  const products = await fetchProducts({});

  return (
    <ProductsProvider initialProducts={products}>
      <ProductCatalogPage />
    </ProductsProvider>
  );
}
