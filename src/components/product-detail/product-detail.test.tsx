import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";
import { mockProductDetail } from "@/mocks/product-detail";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ProductDetail from "./product-detail";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/context/cart-context", () => ({
  useCart: vi.fn(),
}));

vi.mock("@/hooks/use-complete-header-loading", () => ({
  useCompleteHeaderLoading: vi.fn(),
}));

const mockedUseRouter = vi.mocked(useRouter);
const mockedUseCart = vi.mocked(useCart);
const mockedUseCompleteHeaderLoading = vi.mocked(useCompleteHeaderLoading);

const addToCart = vi.fn();
const push = vi.fn();
const routerMock: ReturnType<typeof useRouter> = {
  back: vi.fn(),
  forward: vi.fn(),
  prefetch: vi.fn(),
  push,
  refresh: vi.fn(),
  replace: vi.fn(),
};

function renderProductDetail() {
  mockedUseRouter.mockReturnValue(routerMock);
  mockedUseCart.mockReturnValue({
    cartItems: [],
    addToCart,
    removeFromCart: vi.fn(),
  });

  return render(<ProductDetail product={mockProductDetail} />);
}

describe("ProductDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("completes the header loading when it renders", () => {
    renderProductDetail();

    expect(mockedUseCompleteHeaderLoading).toHaveBeenCalled();
  });

  it("renders product information and options", () => {
    renderProductDetail();

    expect(screen.getAllByText(mockProductDetail.name).length).toBeGreaterThan(0);
    expect(screen.getByText(/from\s*1329\s*EUR/i)).toBeInTheDocument();
    expect(screen.getByAltText(mockProductDetail.name)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.storageOptions[0].capacity)).toBeInTheDocument();
    expect(screen.getByText(mockProductDetail.storageOptions[1].capacity)).toBeInTheDocument();
    expect(screen.getByText("SPECIFICATIONS")).toBeInTheDocument();
    expect(screen.getByText("SIMILAR PRODUCTS")).toBeInTheDocument();
  });

  it("updates the price when a storage option is selected", () => {
    renderProductDetail();
    const mockedOption = mockProductDetail.storageOptions[1];

    fireEvent.click(screen.getByText(mockedOption.capacity));

    expect(screen.getByText(`${mockedOption.price} EUR`)).toBeInTheDocument();
  });

  it("adds the selected product to the cart and navigates to cart", () => {
    const { container } = renderProductDetail();
    const mockedOption = mockProductDetail.storageOptions[1];

    fireEvent.click(screen.getByText(mockedOption.capacity));
    fireEvent.click(container.querySelectorAll(".color-selector__option")[1]);
    fireEvent.click(screen.getByRole("button", { name: "ADD" }));

    expect(addToCart).toHaveBeenCalledWith({
      brand: mockProductDetail.brand,
      name: mockProductDetail.name,
      price: mockedOption.price,
      color: mockProductDetail.colorOptions[1].name,
      storage: mockedOption.capacity,
      id: mockProductDetail.id,
      imageUrl: mockProductDetail.colorOptions[1].imageUrl,
    });
    expect(push).toHaveBeenCalledWith("/cart");
  });

  it("keeps add button disabled until storage and color are selected", () => {
    const { container } = renderProductDetail();
    const mockedOption = mockProductDetail.storageOptions[0];

    const addButton = screen.getByRole("button", { name: "ADD" });

    expect(addButton).toBeDisabled();

    fireEvent.click(screen.getByText(mockedOption.capacity));

    expect(addButton).toBeDisabled();

    fireEvent.click(container.querySelectorAll(".color-selector__option")[0]);

    expect(addButton).not.toBeDisabled();
  });
});
