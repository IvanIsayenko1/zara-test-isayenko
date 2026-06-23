import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { mockCartItems, mockCartTotal } from "@/mocks/cart-items";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import CartFooter from "./cart-footer";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/context/cart-context", () => ({
  useCart: vi.fn(),
}));

const mockedUseRouter = vi.mocked(useRouter);
const mockedUseCart = vi.mocked(useCart);
const push = vi.fn();

function renderCartFooter(items = mockCartItems) {
  mockedUseRouter.mockReturnValue({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
  });
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

  it("navigates to the catalog when continue shopping is clicked", () => {
    renderCartFooter();

    const continueShoppingButtons = screen.getAllByRole("button", {
      name: "CONTINUE SHOPPING",
    });

    expect(continueShoppingButtons).toHaveLength(2);

    fireEvent.click(continueShoppingButtons[0]);

    expect(push).toHaveBeenCalledWith("/");
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
    expect(screen.getAllByRole("button", { name: "CONTINUE SHOPPING" })).toHaveLength(2);
  });
});
