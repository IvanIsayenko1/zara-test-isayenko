"use client";

import { useCart } from "@/context/cart-context";

import { DelayedFadeIn } from "../delayed-fade-in/delayed-fade-in";
import CartFooter from "./cart-footer/cart-footer";
import CartItem from "./cart-item/cart-item";
import "./cart.css";

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const handleRemove = (index: number) => {
    removeFromCart(index);
  };

  return (
    <DelayedFadeIn className="cart" delay={100}>
      <div className="cart__content">
        <div className="cart__count">Cart ({cartItems.length})</div>
        <div className="cart__items">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} onRemove={() => handleRemove(index)} />
          ))}
        </div>
      </div>
      <CartFooter />
    </DelayedFadeIn>
  );
}
