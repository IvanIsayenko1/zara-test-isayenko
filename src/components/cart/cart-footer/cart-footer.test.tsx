import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCart } from "@/context/cart-context";
import { mockCartItems, mockCartTotal } from "@/mocks/cart-items";
import { cleanup, render, screen } from "@testing-library/react";

import CartFooter from "./cart-footer";

vi.mock("@/context/cart-context", () => ({
  useCart: vi.fn(),
}));

const mockedUseCart = vi.mocked(useCart);

function renderCartFooter(items = mockCartItems) {
  mockedUseCart.mockReturnValue({
    cartItems: items,
    addToCart: vi.fn(),
    removeFromCart: vi.fn(),
  });

  return render(<CartFooter />);
}

describe("CartFooter", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders continue shopping links to the catalog", () => {
    renderCartFooter();

    const continueShoppingLinks = screen.getAllByRole("link", { name: "CONTINUE SHOPPING" });

    expect(continueShoppingLinks).toHaveLength(2);
    continueShoppingLinks.forEach((link) => {
      expect(link).toHaveAttribute("href", "/");
    });
  });

  it("renders total and pay buttons when the cart has items", () => {
    renderCartFooter();

    expect(screen.getAllByText("Total")).toHaveLength(2);
    expect(screen.getAllByText(`${mockCartTotal} EUR`)).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: "PAY" })).toHaveLength(2);
  });

  it("does not render total or pay buttons when the cart is empty", () => {
    renderCartFooter([]);

    expect(screen.queryByText("Total")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "PAY" })).not.toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: "CONTINUE SHOPPING" })).toHaveLength(2);
  });
});
