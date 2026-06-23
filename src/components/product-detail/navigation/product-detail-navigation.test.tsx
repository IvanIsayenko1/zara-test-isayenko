import { afterEach, describe, expect, it } from "vitest";

import { cleanup, render, screen } from "@testing-library/react";

import ProductDetailNavigation from "./product-detail-navigation";

describe("ProductDetailNavigation", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders a back link to the catalog", () => {
    render(<ProductDetailNavigation />);

    expect(screen.getByRole("link", { name: /back/i })).toHaveAttribute("href", "/");
    expect(screen.getByAltText("Navigate back")).toBeInTheDocument();
  });
});
