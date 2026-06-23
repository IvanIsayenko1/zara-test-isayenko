import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useProducts } from "@/context/products-context";
import { mockProducts } from "@/mocks/products";
import { cleanup, render, screen } from "@testing-library/react";

import { ProductGrid } from "./product-grid";

const mockedUseProducts = vi.mocked(useProducts);

vi.mock("../product-card/product-card", () => ({
  ProductCard: () => <div data-testid="product-card">Product card</div>,
}));

vi.mock("@/context/products-context", () => ({
  useProducts: vi.fn(),
}));

describe("ProductGrid", () => {
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({ products: mockProducts, setProducts: vi.fn() });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it("renders product grid with products", () => {
    render(<ProductGrid />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(mockProducts.length);
  });
});
