"use client";

import { useState } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { CartItem, useCart } from "@/context/cart-context";
import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";
import type { ProductDetail as ProductDetailData } from "@/types/product";

import Button from "../button/button";
import DelayedFadeIn from "../delayed-fade-in/delayed-fade-in";
import ColorSelector from "./color-selector/color-selector";
import ProductDetailNavigation from "./navigation/product-detail-navigation";
import "./product-detail.css";
import SimilarProducts from "./similar-products/similar-products";
import ProductDetailSpecs from "./specs/product-detail-specs";
import StorageSelector from "./storage-selector/storage-selector";

export default function ProductDetail({ product }: { product: ProductDetailData }) {
  const router = useRouter();
  useCompleteHeaderLoading();

  // context
  const { addToCart } = useCart();

  // state
  const [price, setPrice] = useState<number | null>(null);
  const [storage, setStorage] = useState<string | null>(null);
  const [colorHEX, setColorHEX] = useState<string | null>(null);

  // computed
  const productColorImageUrl =
    product.colorOptions.find((option) => option.hexCode === colorHEX)?.imageUrl ||
    product.colorOptions[0].imageUrl;
  const isAddButtonDisabled = !storage || !colorHEX;

  const storageHandler = (value: string) => {
    const newPrice =
      product.storageOptions.find((option) => option.capacity === value)?.price ?? price;
    setPrice(newPrice);
    setStorage(value);
  };

  const colorHandler = (value: string) => {
    setColorHEX(value);
  };

  const addHandler = () => {
    const productToAdd: CartItem = {
      brand: product.brand,
      name: product.name,
      price: price!,
      color: product.colorOptions.find((option) => option.hexCode === colorHEX)!.name,
      storage: storage!,
      id: product.id,
      imageUrl: productColorImageUrl,
    };

    addToCart(productToAdd);

    router.push("/cart");
  };

  return (
    <DelayedFadeIn className="product-detail">
      <ProductDetailNavigation />

      <div className="product-detail__content">
        <div className="product-detail__overview">
          <div className="product-detail__image-wrapper">
            <Image
              src={productColorImageUrl}
              alt={product.name}
              className="product-detail__image"
              fill
              sizes="(min-width: 1024px) 510px, (min-width: 768px) calc(100vw - 80px), calc(100vw - 32px)"
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
              title="Storage. How much space do you need?"
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
              className="product-detail__summary__add-button"
              label="ADD"
              onClick={addHandler}
              variant="primary"
              disabled={isAddButtonDisabled}
            />
          </div>
        </div>

        <ProductDetailSpecs product={product} />

        <SimilarProducts product={product} />
      </div>
    </DelayedFadeIn>
  );
}
