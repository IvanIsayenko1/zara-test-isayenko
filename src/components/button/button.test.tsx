import { afterEach, describe, expect, it, vi } from "vitest";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import Button from "./button";

describe("Button", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the label", () => {
    render(<Button label="PAY" variant="primary" />);

    expect(screen.getByRole("button", { name: "PAY" })).toBeInTheDocument();
  });

  it("applies the variant and custom class", () => {
    render(<Button label="CONTINUE SHOPPING" variant="outlined" className="cart-footer__button" />);

    const button = screen.getByRole("button", { name: "CONTINUE SHOPPING" });

    expect(button).toHaveClass("button", "button--outlined", "cart-footer__button");
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();

    render(<Button label="Eliminar" variant="danger" onClick={onClick} />);

    fireEvent.click(screen.getByRole("button", { name: "Eliminar" }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("does not call onClick when disabled", () => {
    const onClick = vi.fn();

    render(<Button label="Añadir" variant="primary" onClick={onClick} disabled />);

    const button = screen.getByRole("button", { name: "Añadir" });

    expect(button).toBeDisabled();

    fireEvent.click(button);

    expect(onClick).not.toHaveBeenCalled();
  });
});
