import { afterEach, describe, expect, it, vi } from "vitest";

import { mockCartItems } from "@/mocks/cart-items";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import CartItem from "./cart-item";

describe("CartItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the cart item information", () => {
    const item = mockCartItems[0];

    render(<CartItem item={item} onRemove={vi.fn()} />);

    expect(screen.getByText(`${item.brand} ${item.name}`)).toBeInTheDocument();
    expect(screen.getByText(`${item.storage} | ${item.color}`)).toBeInTheDocument();
    expect(screen.getByText(`${item.price} EUR`)).toBeInTheDocument();
    expect(screen.getByAltText(item.name)).toBeInTheDocument();
  });

  it("calls onRemove when the remove button is clicked", () => {
    const onRemove = vi.fn();

    render(<CartItem item={mockCartItems[0]} onRemove={onRemove} />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
