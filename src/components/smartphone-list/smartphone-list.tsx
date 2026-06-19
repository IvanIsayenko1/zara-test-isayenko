"use client";

import { useProducts } from "@/context/products-context";
import "./smartphone-list.css";
import { SmarthponeCard } from "../smartphone-card/smartphone-card";

export function SmartphoneList() {
  const { products } = useProducts();

  return (
    <div className="smartphone-list">
      {products.map((product, index) => (
        <SmarthponeCard key={`${product.id}-${index}`} product={product} />
      ))}
    </div>
  );
}
