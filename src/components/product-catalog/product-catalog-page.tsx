"use client";

import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";

import ProductCatalog from "./product-catalog";

export function ProductCatalogPage() {
  useCompleteHeaderLoading();

  return <ProductCatalog />;
}
