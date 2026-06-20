"use client";

import { useProducts } from "@/context/products-context";
import "./product-grid.css";
import { ProductCard } from "../product-card/product-card";

export function ProductGrid() {
  const { products } = useProducts();

  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <ProductCard key={`${product.id}-${index}`} product={product} />
      ))}
    </div>
  );
}
