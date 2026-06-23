import { afterEach, describe, expect, it, vi } from "vitest";

import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ColorSelector from "./color-selector";

const options = [
  { value: "#000000", label: "Black" },
  { value: "#8f6aa7", label: "Violet" },
] as const;

describe("ColorSelector", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders the title and color options", () => {
    const { container } = render(
      <ColorSelector title="Color" options={options} value={null} onSelect={vi.fn()} />
    );

    expect(screen.getByText("Color")).toBeInTheDocument();
    expect(container.querySelectorAll(".color-selector__option")).toHaveLength(2);
  });

  it("shows the selected color label after selecting an option", () => {
    const onSelect = vi.fn();
    const { container } = render(
      <ColorSelector title="Color" options={options} value={null} onSelect={onSelect} />
    );

    const colorOptions = container.querySelectorAll(".color-selector__option");

    fireEvent.click(colorOptions[1]);

    expect(onSelect).toHaveBeenCalledWith("#8f6aa7");
    expect(colorOptions[1]).toHaveClass("color-selector__option--selected");
    expect(screen.getByText("Violet")).toBeInTheDocument();
  });

  it("shows the hovered color label and restores the selected label on mouse leave", () => {
    const { container } = render(
      <ColorSelector title="Color" options={options} value="#000000" onSelect={vi.fn()} />
    );

    const colorOptions = container.querySelectorAll(".color-selector__option");

    expect(screen.getByText("Black")).toBeInTheDocument();

    fireEvent.mouseEnter(colorOptions[1]);

    expect(screen.getByText("Violet")).toBeInTheDocument();

    fireEvent.mouseLeave(colorOptions[1]);

    expect(screen.getByText("Black")).toBeInTheDocument();
  });
});
