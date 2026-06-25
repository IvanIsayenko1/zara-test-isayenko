import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { mockProducts } from "@/mocks/products";
import { searchProducts } from "@/services/search-products";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import { FilterInput } from "./filter-input";

vi.mock("@/context/loading-context", () => ({
  useLoading: vi.fn(),
}));

vi.mock("@/context/products-context", () => ({
  useProducts: vi.fn(),
}));

vi.mock("@/services/search-products", () => ({
  searchProducts: vi.fn(),
}));

const mockedUseLoading = vi.mocked(useLoading);
const mockedUseProducts = vi.mocked(useProducts);
const mockedSearchProducts = vi.mocked(searchProducts);

const setProducts = vi.fn();
const setLoadingProgress = vi.fn();

async function advanceDebounce() {
  await act(async () => {
    vi.advanceTimersByTime(500);
    await Promise.resolve();
    await Promise.resolve();
  });
}

describe("FilterInput", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    setProducts.mockClear();
    setLoadingProgress.mockClear();

    mockedSearchProducts.mockResolvedValue(mockProducts);
    mockedUseProducts.mockReturnValue({
      products: [],
      setProducts,
    });
    mockedUseLoading.mockReturnValue({
      loadingProgress: 0,
      setLoadingProgress,
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("searches products after the debounce delay and updates products context", async () => {
    render(<FilterInput />);

    const input = screen.getByRole("textbox", { name: "Search products" });

    fireEvent.change(input, { target: { value: "samsung" } });

    expect(input).toHaveValue("samsung");
    expect(mockedSearchProducts).not.toHaveBeenCalled();

    await advanceDebounce();

    expect(mockedSearchProducts).toHaveBeenCalledWith("samsung");
    expect(setProducts).toHaveBeenCalledWith(mockProducts);
  });

  it("clears the input and searches with an empty query", async () => {
    render(<FilterInput />);

    const input = screen.getByRole("textbox", { name: "Search products" });

    fireEvent.change(input, { target: { value: "iphone" } });

    const clearButton = screen.getByRole("button", { name: "Clear search" });

    fireEvent.click(clearButton);

    expect(input).toHaveValue("");
    expect(screen.queryByRole("button", { name: "Clear search" })).not.toBeInTheDocument();

    await advanceDebounce();

    expect(mockedSearchProducts).toHaveBeenCalledTimes(1);
    expect(mockedSearchProducts).toHaveBeenCalledWith("");
    expect(setProducts).toHaveBeenCalledWith(mockProducts);
  });
});
