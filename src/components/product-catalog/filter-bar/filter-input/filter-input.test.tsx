import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { mockProducts } from "@/mocks/products";
import { fetchProducts } from "@/services/products";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import { FilterInput } from "./filter-input";

vi.mock("@/context/loading-context", () => ({
  useLoading: vi.fn(),
}));

vi.mock("@/context/products-context", () => ({
  useProducts: vi.fn(),
}));

vi.mock("@/services/products", () => ({
  fetchProducts: vi.fn(),
}));

const mockedUseLoading = vi.mocked(useLoading);
const mockedUseProducts = vi.mocked(useProducts);
const mockedFetchProducts = vi.mocked(fetchProducts);

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

    mockedFetchProducts.mockResolvedValue(mockProducts);
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
    expect(mockedFetchProducts).not.toHaveBeenCalled();

    await advanceDebounce();

    expect(mockedFetchProducts).toHaveBeenCalledWith({ search: "samsung" });
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

    expect(mockedFetchProducts).toHaveBeenCalledTimes(1);
    expect(mockedFetchProducts).toHaveBeenCalledWith({ search: "" });
    expect(setProducts).toHaveBeenCalledWith(mockProducts);
  });
});
