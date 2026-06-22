import ProductDetail from "@/components/product-detail/product-detail";
import { fetchProduct } from "@/services/products";

import "./product-page.css";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return <ProductDetail product={product} />;
}
