import type { ProductDetail } from "@/types/product";

import { mockProducts } from "./products";

export const mockProductDetail: ProductDetail = {
  id: "galaxy-s24",
  brand: "Samsung",
  name: "Galaxy S24 Ultra",
  basePrice: 1329,
  description: "A premium smartphone with a large screen and powerful camera system.",
  rating: 4.8,
  specs: {
    screen: "6.8 inches",
    resolution: "3120 x 1440",
    processor: "Snapdragon 8 Gen 3",
    mainCamera: "200 MP",
    selfieCamera: "12 MP",
    battery: "5000 mAh",
    os: "Android",
    screenRefreshRate: "120 Hz",
  },
  colorOptions: [
    {
      name: "Black",
      hexCode: "#000000",
      imageUrl: "https://example.com/galaxy-s24-black.png",
    },
    {
      name: "Violet",
      hexCode: "#8f6aa7",
      imageUrl: "https://example.com/galaxy-s24-violet.png",
    },
  ],
  storageOptions: [
    {
      capacity: "256 GB",
      price: 1329,
    },
    {
      capacity: "512 GB",
      price: 1459,
    },
  ],
  similarProducts: mockProducts,
};
