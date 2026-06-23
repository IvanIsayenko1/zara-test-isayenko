import { afterEach, describe, expect, it, vi } from "vitest";

import { mockProductDetail } from "@/mocks/product-detail";
import { cleanup, render, screen } from "@testing-library/react";

import SimilarProducts from "./similar-products";

vi.mock("../../product-catalog/product-card/product-card", () => ({
  ProductCard: ({ product }: { product: { id: string; name: string } }) => (
    <a data-testid="product-card" href={`/product/${product.id}`}>
      {product.name}
    </a>
  ),
}));

describe("SimilarProducts", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the title and similar product cards", () => {
    render(<SimilarProducts product={mockProductDetail} />);

    expect(screen.getByText("SIMILAR PRODUCTS")).toBeInTheDocument();
    expect(screen.getAllByTestId("product-card")).toHaveLength(
      mockProductDetail.similarProducts.length
    );

    mockProductDetail.similarProducts.forEach((product) => {
      expect(screen.getByRole("link", { name: product.name })).toHaveAttribute(
        "href",
        `/product/${product.id}`
      );
    });
  });
});
