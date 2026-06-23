import { afterEach, describe, expect, it } from "vitest";

import { cleanup, render, screen } from "@testing-library/react";

import HorizontalScroll from "./horizontal-scroll";

describe("HorizontalScroll", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders children inside a custom scroll viewport", () => {
    const { container } = render(
      <HorizontalScroll className="similar-products__carousel">
        <span>Scrollable content</span>
      </HorizontalScroll>
    );

    expect(screen.getByText("Scrollable content")).toBeInTheDocument();
    expect(container.querySelector(".horizontal-scroll__viewport")).toBeInTheDocument();
    expect(container.querySelector(".horizontal-scroll__track")).toBeInTheDocument();
    expect(container.querySelector(".horizontal-scroll__thumb")).toHaveStyle("width: 150px");
  });
});
