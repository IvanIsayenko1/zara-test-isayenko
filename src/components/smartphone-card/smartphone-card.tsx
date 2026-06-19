"use client";

import Image from "next/image";
import "./smartphone-card.css";
import { useSmartphoneDetail } from "@/context/smartphone-detail-context";
import type { SmarthponeCardProps } from "./smartphone-card.types";

export function SmarthponeCard({ product }: SmarthponeCardProps) {
  const { openPhone } = useSmartphoneDetail();

  const handleClick = () => {
    openPhone(product.id);
  };

  return (
    <div className="smartphone-card" onClick={handleClick}>
      <div className="smartphone-card__image-wrapper">
        <div className="smartphone-card__image-inner">
          <Image
            src={product.imageUrl}
            alt={`Photo of ${product.name}`}
            className="smartphone-card__image"
            fill
          />
        </div>
      </div>
      <div className="smartphone-card__footer">
        <div className="smartphone-card__footer__content">
          <span className="smartphone-card__brand">{product.brand}</span>
          <span className="smartphone-card__model">{product.name}</span>
        </div>
        <span className="smartphone-card__price">
          {product.basePrice} EUR
        </span>
      </div>
    </div>
  );
}
