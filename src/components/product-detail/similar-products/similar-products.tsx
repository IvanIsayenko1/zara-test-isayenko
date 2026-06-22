"use client";

import { ProductDetail } from "@/types/product";

import { ProductCard } from "../../product-card/product-card";
import "./similar-products.css";

export default function SimilarProducts({ product }: { product: ProductDetail }) {
  return (
    <div className="similar-products">
      <div className="similar-products__title">SIMILAR PRODUCTS</div>
      <div className="similar-products__carousel">
        {product.similarProducts.map((item, index) => (
          <ProductCard product={item} key={item.id + index} />
        ))}
      </div>
    </div>
  );
}
