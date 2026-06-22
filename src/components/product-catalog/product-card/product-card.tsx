"use client";

import Image from "next/image";
import Link from "next/link";

import "./product-card.css";
import type { ProductCardProps } from "./product-card.types";

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link className="product-card" href={`/product/${product.id}`} data-testid="product-card">
      <div className="product-card__image-wrapper">
        <div className="product-card__image-inner">
          <Image
            src={product.imageUrl}
            alt={`Photo of ${product.name}`}
            className="product-card__image"
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="eager"
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
