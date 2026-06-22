"use client";

import { useProducts } from "@/context/products-context";

import { ProductCard } from "../product-card/product-card";
import "./product-grid.css";

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
