import type { CartItem } from "@/context/cart-context";

export const mockCartItems: CartItem[] = [
  {
    brand: "Samsung",
    name: "Galaxy S24 Ultra",
    storage: "256 GB",
    color: "Black",
    price: 1329,
    id: "SMG-S24U",
    imageUrl: "https://example.com/samsung.png",
  },
  {
    brand: "Apple",
    name: "iPhone 15 Pro",
    storage: "128 GB",
    color: "Natural Titanium",
    price: 1159,
    id: "APL-IP15P",
    imageUrl: "https://example.com/iphone.png",
  },
];

export const mockCartTotal = mockCartItems.reduce((acc, item) => acc + item.price, 0);
