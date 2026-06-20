"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { useProducts } from "@/context/products-context";
import "./product-grid.css";
import { ProductCard } from "../product-card/product-card";

const CARD_WIDTH = 344;
const HORIZONTAL_PADDING = 200;

export function ProductGrid() {
  const { products } = useProducts();
  const gridViewportRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(1);

  useEffect(() => {
    const gridViewport = gridViewportRef.current;

    if (!gridViewport) {
      return;
    }

    const updateColumnCount = () => {
      const availableWidth = gridViewport.clientWidth - HORIZONTAL_PADDING;
      const nextColumnCount = Math.max(1, Math.floor(availableWidth / CARD_WIDTH));
      const visibleColumnCount = Math.min(products.length || 1, nextColumnCount);

      setColumnCount(visibleColumnCount);
    };

    updateColumnCount();

    const resizeObserver = new ResizeObserver(updateColumnCount);
    resizeObserver.observe(gridViewport);

    return () => {
      resizeObserver.disconnect();
    };
  }, [products.length]);

  const gridStyle = {
    "--product-grid-columns": columnCount,
  } as CSSProperties;

  return (
    <div ref={gridViewportRef} className="product-grid">
      <div className="product-grid__cards" style={gridStyle}>
        {products.map((product, index) => (
          <ProductCard key={`${product.id}-${index}`} product={product} />
        ))}
      </div>
    </div>
  );
}
