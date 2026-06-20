"use client";

import { useEffect } from "react";
import { FilterBar } from "../filter-bar/filter-bar";
import { ProductGrid } from "../product-grid/product-grid";

import "./product-catalog.css";
import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { Product } from "@/types/product";

export default function ProductCatalog({ products }: { products: Product[] }) {
  const { setProducts } = useProducts();
  const { simulateLoading, isComplete } = useLoading();

  useEffect(() => {
    setProducts(products);
    console.log(isComplete);
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
