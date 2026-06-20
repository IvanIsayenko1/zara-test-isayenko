import ProductDetail from "@/components/product-detail/product-detail";
import "./product-page.css";
import { fetchProduct } from "@/services/products";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await fetchProduct(id);

  return <ProductDetail product={product} />;
}
