import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useRouter } from "next/navigation";

import { useCart } from "@/context/cart-context";
import { mockCartItems } from "@/mocks/cart-items";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";

import Cart from "./cart";

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/context/cart-context", () => ({
  useCart: vi.fn(),
}));

const mockedUseRouter = vi.mocked(useRouter);
const mockedUseCart = vi.mocked(useCart);

const removeFromCart = vi.fn();
const push = vi.fn();

function renderCart(cartItems = mockCartItems) {
  mockedUseRouter.mockReturnValue({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
  });
  mockedUseCart.mockReturnValue({
    cartItems,
    addToCart: vi.fn(),
    removeFromCart,
  });

  return render(<Cart />);
}

describe("Cart", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("renders the cart item count", () => {
    renderCart();

    expect(screen.getByText(`Cart (${mockCartItems.length})`)).toBeInTheDocument();
  });

  it("renders cart items", () => {
    renderCart();

    mockCartItems.forEach((item) => {
      expect(screen.getByText(`${item.brand} ${item.name}`)).toBeInTheDocument();
      expect(screen.getByText(`${item.price} EUR`)).toBeInTheDocument();
    });
  });

  it("removes the selected cart item", () => {
    renderCart();

    fireEvent.click(screen.getAllByRole("button", { name: "Eliminar" })[1]);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  });

  it("renders the cart footer", () => {
    renderCart();

    expect(screen.getAllByRole("button", { name: "CONTINUE SHOPPING" })).toHaveLength(2);
  });

  it("fades in the cart after the transition delay", () => {
    vi.useFakeTimers();

    const { container } = renderCart();
    const cart = container.querySelector(".cart");

    expect(cart).not.toHaveClass("delayed-fade-in--visible");

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(cart).toHaveClass("delayed-fade-in--visible");
  });
});
