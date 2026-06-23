"use client";

import { HeaderLoadingComplete } from "@/components/header-loading/header-loading-complete";

import ProductCatalog from "./product-catalog";

export function ProductCatalogPage() {
  return (
    <>
      <HeaderLoadingComplete />
      <ProductCatalog />
    </>
  );
}
