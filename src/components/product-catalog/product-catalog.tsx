"use client";

import { useEffect } from "react";

import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { Product } from "@/types/product";

import { FilterBar } from "./filter-bar/filter-bar";
import "./product-catalog.css";
import { ProductGrid } from "./product-grid/product-grid";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const { setProducts } = useProducts();
  const { simulateLoading, isComplete } = useLoading();

  // Set products and simulate loading state
  useEffect(() => {
    setProducts(products);
    if (!isComplete) {
      simulateLoading();
    }
  }, [setProducts, products, simulateLoading, isComplete]);

  return (
    <div className={`product-catalog ${isComplete ? "product-catalog--open" : ""}`}>
      {isComplete && (
        <>
          <FilterBar />
          <ProductGrid />
        </>
      )}
    </div>
  );
}
