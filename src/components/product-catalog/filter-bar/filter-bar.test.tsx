import { beforeEach, describe, expect, it, vi } from "vitest";

import { useProducts } from "@/context/products-context";
import { mockProducts } from "@/mocks/products";
import { render, screen } from "@testing-library/react";

import { FilterBar } from "./filter-bar";

vi.mock("@/context/products-context", () => ({
  useProducts: vi.fn(),
}));

vi.mock("./filter-input/filter-input", () => ({
  FilterInput: () => <input placeholder="Search for a smartphone..." />,
}));

const mockedUseProducts = vi.mocked(useProducts);

describe("FilterBar", () => {
  beforeEach(() => {
    mockedUseProducts.mockReturnValue({
      products: mockProducts,
      setProducts: vi.fn(),
    });
  });

  it("renders the search input and product result count", () => {
    render(<FilterBar />);

    expect(screen.getByPlaceholderText("Search for a smartphone...")).toBeInTheDocument();
    expect(screen.getByText("2 results")).toBeInTheDocument();
  });
});
