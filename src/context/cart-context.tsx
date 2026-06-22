"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

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

const CART_STORAGE_KEY = "cart-items";
const CART_STORAGE_EVENT = "cart-items-change";
const EMPTY_CART: CartItem[] = [];

const CartContext = createContext<CartContextValue | null>(null);

let cachedCartValue = "";
let cachedCartItems: CartItem[] = EMPTY_CART;

const parseCartItems = (storedCart: string | null) => {
  if (!storedCart) {
    cachedCartValue = "";
    cachedCartItems = EMPTY_CART;

    return cachedCartItems;
  }

  if (storedCart === cachedCartValue) {
    return cachedCartItems;
  }

  try {
    const parsedCart = JSON.parse(storedCart);

    cachedCartValue = storedCart;
    cachedCartItems = Array.isArray(parsedCart) ? (parsedCart as CartItem[]) : EMPTY_CART;

    return cachedCartItems;
  } catch {
    cachedCartValue = storedCart;
    cachedCartItems = EMPTY_CART;

    return cachedCartItems;
  }
};

const getCartSnapshot = () => {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  return parseCartItems(window.localStorage.getItem(CART_STORAGE_KEY));
};

const getServerSnapshot = () => EMPTY_CART;

const subscribeToCartStorage = (callback: () => void) => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === CART_STORAGE_KEY) {
      callback();
    }
  };

  window.addEventListener("storage", handleStorageChange);
  window.addEventListener(CART_STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener("storage", handleStorageChange);
    window.removeEventListener(CART_STORAGE_EVENT, callback);
  };
};

const setStoredCartItems = (cartItems: CartItem[]) => {
  if (cartItems.length === 0) {
    window.localStorage.removeItem(CART_STORAGE_KEY);
  } else {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }

  window.dispatchEvent(new Event(CART_STORAGE_EVENT));
};

export function CartProvider({ children }: { children: ReactNode }) {
  const cartItems = useSyncExternalStore(
    subscribeToCartStorage,
    getCartSnapshot,
    getServerSnapshot
  );

  const addToCart = useCallback((item: CartItem) => {
    setStoredCartItems([...getCartSnapshot(), item]);
  }, []);

  const removeFromCart = useCallback((index: number) => {
    setStoredCartItems(getCartSnapshot().filter((_, i) => i !== index));
  }, []);

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
