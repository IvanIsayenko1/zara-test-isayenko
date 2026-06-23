"use client";

import { DelayedFadeIn } from "@/components/delayed-fade-in/delayed-fade-in";

import { FilterBar } from "./filter-bar/filter-bar";
import "./product-catalog.css";
import { ProductGrid } from "./product-grid/product-grid";

export default function ProductCatalog() {
  return (
    <DelayedFadeIn className="product-catalog">
      <FilterBar />
      <ProductGrid />
    </DelayedFadeIn>
  );
}
