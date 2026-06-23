import { afterEach, describe, expect, it } from "vitest";

import { mockProducts } from "@/mocks/products";
import { cleanup, render, screen } from "@testing-library/react";

import { ProductCard } from "./product-card";

describe("ProductCard", () => {
  afterEach(() => {
    cleanup();
  });

  it("should render correctly", () => {
    const product = mockProducts[0];
    render(<ProductCard product={product} />);
    const productCard = screen.getByTestId("product-card");
    expect(productCard).toBeInTheDocument();
    expect(productCard).toHaveAttribute("href", `/product/${product.id}`);
  });

  it("should render expected content", () => {
    const product = mockProducts[0];
    render(<ProductCard product={product} />);
    const productCard = screen.getByTestId("product-card");

    expect(productCard).toHaveTextContent(product.name);
    expect(productCard).toHaveTextContent(product.brand);
    expect(productCard).toHaveTextContent(`${product.basePrice} EUR`);
    expect(screen.getByAltText(`Photo of ${product.name}`)).toBeInTheDocument();
  });
});
