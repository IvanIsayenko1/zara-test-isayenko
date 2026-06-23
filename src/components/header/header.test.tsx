import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { usePathname } from "next/navigation";

import { CartItem, useCart } from "@/context/cart-context";
import { LoadingProgress, useLoading } from "@/context/loading-context";
import { mockCartItems } from "@/mocks/cart-items";
import { cleanup, render, screen } from "@testing-library/react";

import Header from "./header";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

vi.mock("@/context/cart-context", () => ({
  useCart: vi.fn(),
}));

vi.mock("@/context/loading-context", () => ({
  useLoading: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);
const mockedUseCart = vi.mocked(useCart);
const mockedUseLoading = vi.mocked(useLoading);

function renderHeader({
  pathname = "/",
  cartItems = [],
  loadingProgress = 0,
}: {
  pathname?: string;
  cartItems?: CartItem[];
  loadingProgress?: LoadingProgress;
} = {}) {
  mockedUsePathname.mockReturnValue(pathname);
  mockedUseCart.mockReturnValue({
    cartItems,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  });
  mockedUseLoading.mockReturnValue({
    loadingProgress,
    setLoadingProgress: vi.fn(),
  });

  return render(<Header />);
}

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders the logo as a link to the catalog", () => {
    renderHeader();

    const logoLink = screen.getByRole("link", { name: "Logo" });

    expect(logoLink).toHaveAttribute("href", "/");
  });

  it("renders the cart link with the cart item count outside the cart page", () => {
    const { container } = renderHeader({ cartItems: mockCartItems });

    const cartLink = container.querySelector(".header__cart");

    expect(cartLink).toHaveAttribute("href", "/cart");
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("hides the cart link on the cart page", () => {
    const { container } = renderHeader({ pathname: "/cart" });

    expect(container.querySelector(".header__cart")).not.toBeInTheDocument();
  });

  it("shows the loading state when loading progress is greater than zero", () => {
    const { container } = renderHeader({ loadingProgress: 50 });

    const header = container.querySelector(".header");

    expect(header).toHaveClass("header--loading");
    expect(header).toHaveStyle("--header-loading-progress: 0.5");
  });
});
