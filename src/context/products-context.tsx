"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";

type ProductsContextValue = {
  products: Product[];
  setProducts: (products: Product[]) => void;
};

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);

  const value = useMemo(
    () => ({
      products,
      setProducts,
    }),
    [products]
  );

  return (
    <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}
