"use client";

import { FilterBar } from "./filter-bar/filter-bar";
import "./product-catalog.css";
import { ProductGrid } from "./product-grid/product-grid";

export default function ProductCatalog({ isReady }: { isReady: boolean }) {
  return (
    <div className={`product-catalog ${isReady ? "product-catalog--open" : ""}`}>
      {isReady && (
        <>
          <FilterBar />
          <ProductGrid />
        </>
      )}
    </div>
  );
}
