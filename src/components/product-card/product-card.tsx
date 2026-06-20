"use client";

import Image from "next/image";
import "./product-card.css";
import type { ProductCardProps } from "./product-card.types";
import Link from "next/link";
import { useLoading } from "@/context/loading-context";

export function ProductCard({ product }: ProductCardProps) {
  const { setIsComplete } = useLoading();

  return (
    <Link
      className="product-card"
      href={`/product/${product.id}`}
      onClick={() => {
        setIsComplete(false);
      }}
    >
      <div className="product-card__image-wrapper">
        <div className="product-card__image-inner">
          <Image
            src={product.imageUrl}
            alt={`Photo of ${product.name}`}
            className="product-card__image"
            fill
          />
        </div>
      </div>
      <div className="product-card__footer">
        <div className="product-card__meta">
          <span className="product-card__brand">{product.brand}</span>
          <span className="product-card__name">{product.name}</span>
        </div>
        <span className="product-card__price">{product.basePrice} EUR</span>
      </div>
    </Link>
  );
}
