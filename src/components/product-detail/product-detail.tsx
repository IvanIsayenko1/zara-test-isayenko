"use client";

import { useLoading } from "@/context/loading-context";
import type { ProductDetail as ProductDetailData } from "@/types/product";
import { useEffect, useState } from "react";
import "./product-detail.css";
import Image from "next/image";
import StorageSelector from "../storage-selector/storage-selector";
import ColorSelector from "../color-selector/color-selector";
import Button from "../button/button";
import ProductDetailSpecs from "./specs/product-detail-specs";
import SimilarProducts from "./similar-products/similar-products";
import ProductDetailNavigation from "./navigation/product-detail-navigation";

export default function ProductDetail({ product }: { product: ProductDetailData }) {
  const { simulateLoading, isComplete, setIsComplete } = useLoading();
  const [price, setPrice] = useState<number | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const productColorImageUrl =
    product.colorOptions.find((option) => option.hexCode === color)?.imageUrl ||
    product.colorOptions[0].imageUrl;
  const isAddButtonDisabled = !storage || !color;

  const storageHandler = (value: string) => {
    const newPrice =
      product.storageOptions.find((option) => option.capacity === value)?.price ?? price;
    setPrice(newPrice);
    setStorage(value);
  };

  const colorHandler = (value: string) => {
    setColor(value);
  };

  useEffect(() => {
    setIsComplete(false);
    simulateLoading();
  }, [simulateLoading, setIsComplete]);

  return (
    <div className={`product-detail ${isComplete ? "product-detail--open" : ""}`}>
      <ProductDetailNavigation />

      <div className="product-detail__content">
        <div className="product-detail__overview">
          <div className="product-detail__image-wrapper">
            <Image
              src={productColorImageUrl}
              alt={product.name}
              className="product-detail__image"
              fill
              sizes="510px"
              loading="eager"
            />
          </div>
          <div className="product-detail__summary">
            <div className="product-detail__heading">
              <div className="product-detail__title">{product.name}</div>
              <div className="product-detail__price">
                {!price && `from `}
                {price || product.basePrice} EUR
              </div>
            </div>

            <StorageSelector
              title="Storage ¿hOW MUCH SPACE DO YOU NEED?"
              options={product.storageOptions.map((option) => option.capacity)}
              value={null}
              onSelect={storageHandler}
            />

            <ColorSelector
              title="color. pick your favourite."
              options={product.colorOptions.map((option) => ({
                value: option.hexCode,
                label: option.name,
              }))}
              value={null}
              onSelect={colorHandler}
            />

            <Button
              label="Añadir"
              onClick={() => {}}
              variant="primary"
              disabled={isAddButtonDisabled}
            />
          </div>
        </div>

        <ProductDetailSpecs product={product} />

        <SimilarProducts product={product} />
      </div>
    </div>
  );
}
