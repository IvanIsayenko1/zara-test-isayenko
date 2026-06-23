import { afterEach, describe, expect, it, vi } from "vitest";

import { LoadingProvider } from "@/context/loading-context";
import { ProductsProvider, useProducts } from "@/context/products-context";
import { mockProducts } from "@/mocks/products";
import { cleanup, render, screen } from "@testing-library/react";

import ProductCatalog from "./product-catalog";
import { ProductCatalogPage } from "./product-catalog-page";

vi.mock("./filter-bar/filter-bar", () => ({
  FilterBar: () => <div data-testid="filter-bar">Filter bar</div>,
}));

vi.mock("./product-grid/product-grid", () => ({
  ProductGrid: () => <div data-testid="product-grid">Product grid</div>,
}));

function ProductCountProbe() {
  const { products: storedProducts } = useProducts();

  return <div>{storedProducts.length} stored products</div>;
}

function renderProductCatalog() {
  return render(
    <LoadingProvider>
      <ProductsProvider initialProducts={mockProducts}>
        <ProductCatalog />
        <ProductCountProbe />
      </ProductsProvider>
    </LoadingProvider>
  );
}

function renderProductCatalogPage() {
  return render(
    <LoadingProvider>
      <ProductsProvider initialProducts={mockProducts}>
        <ProductCatalogPage />
      </ProductsProvider>
    </LoadingProvider>
  );
}

describe("ProductCatalog", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("stores the initial products in context", async () => {
    renderProductCatalog();

    expect(await screen.findByText("2 stored products")).toBeInTheDocument();
  });

  it("renders the catalog content", () => {
    renderProductCatalog();

    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("product-grid")).toBeInTheDocument();
  });

  it("renders the catalog page", () => {
    renderProductCatalogPage();

    expect(screen.getByTestId("filter-bar")).toBeInTheDocument();
    expect(screen.getByTestId("product-grid")).toBeInTheDocument();
  });
});
