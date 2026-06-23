import { afterEach, describe, expect, it } from "vitest";

import { mockProductDetail } from "@/mocks/product-detail";
import { cleanup, render, screen } from "@testing-library/react";

import ProductDetailSpecs from "./product-detail-specs";

describe("ProductDetailSpecs", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the specifications title", () => {
    render(<ProductDetailSpecs product={mockProductDetail} />);

    expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();
  });

  it("renders product specification values", () => {
    render(<ProductDetailSpecs product={mockProductDetail} />);

    expect(screen.getByText(mockProductDetail.brand)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.description)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.screen)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.resolution)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.processor)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.mainCamera)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.selfieCamera)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.battery)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.os)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.specs.screenRefreshRate)).toBeInTheDocument();
  });
});
