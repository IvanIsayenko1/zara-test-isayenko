"use client";

import { useEffect, useState } from "react";

import { LOADING_REVEAL_DELAY, useLoading } from "@/context/loading-context";

import ProductCatalog from "./product-catalog";

let hasLoadedCatalog = false;

export function ProductCatalogPage() {
  const { simulateLoading, stopLoading } = useLoading();
  const [isCatalogReady, setIsCatalogReady] = useState(hasLoadedCatalog);

  // simulate the first catalog load
  useEffect(() => {
    if (hasLoadedCatalog) {
      return;
    }

    simulateLoading();

    const timeoutId = window.setTimeout(() => {
      hasLoadedCatalog = true;
      setIsCatalogReady(true);
    }, LOADING_REVEAL_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
      stopLoading();
    };
  }, [simulateLoading, stopLoading]);

  return <ProductCatalog isReady={isCatalogReady} />;
}
