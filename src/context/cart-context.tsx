"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  brand: string;
  name: string;
  storage: string;
  color: string;
  price: number;
  id: string;
  imageUrl: string;
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (index: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setItems] = useState<CartItem[]>([]);

  const addToCart = useCallback(
    (item: CartItem) => {
      setItems([...cartItems, item]);
    },
    [cartItems]
  );

  const removeFromCart = useCallback(
    (index: number) => {
      setItems(cartItems.filter((_, i) => i !== index));
    },
    [cartItems]
  );

  const value = useMemo(
    () => ({
      cartItems,
      addToCart,
      removeFromCart,
    }),
    [cartItems, addToCart, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
