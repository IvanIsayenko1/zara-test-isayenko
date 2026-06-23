"use client";

import HorizontalScroll from "@/components/horizontal-scroll/horizontal-scroll";
import { ProductDetail } from "@/types/product";

import { ProductCard } from "../../product-catalog/product-card/product-card";
import "./similar-products.css";

export default function SimilarProducts({ product }: { product: ProductDetail }) {
  return (
    <div className="similar-products">
      <div className="similar-products__title">SIMILAR PRODUCTS</div>
      <HorizontalScroll className="similar-products__carousel">
        {product.similarProducts.map((item, index) => (
          <ProductCard product={item} key={item.id + index} />
        ))}
      </HorizontalScroll>
    </div>
  );
}
