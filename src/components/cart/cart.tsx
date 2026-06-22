"use client";

import { useEffect, useState } from "react";

import { useCart } from "@/context/cart-context";

import CartFooter from "./cart-footer/cart-footer";
import CartItem from "./cart-item/cart-item";
import "./cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const [isFalseLoadingDone, setIsFalseLoadingDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsFalseLoadingDone(true);
    }, 0);
  }, []);

  const handleRemove = (index: number) => {
    removeFromCart(index);
  };

  return (
    <div className={`cart ${isFalseLoadingDone ? "cart--open" : ""}`}>
      <div className="cart__content">
        <div className="cart__count">Cart ({cartItems.length})</div>
        <div className="cart__items">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} onRemove={() => handleRemove(index)} />
          ))}
        </div>
      </div>
      <CartFooter />
    </div>
  );
}
