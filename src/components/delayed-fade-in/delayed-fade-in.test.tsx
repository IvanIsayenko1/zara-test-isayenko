import { afterEach, describe, expect, it, vi } from "vitest";

import { act, cleanup, render, screen } from "@testing-library/react";

import DelayedFadeIn from "./delayed-fade-in";

describe("DelayedFadeIn", () => {
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("shows content only after the configured delay", () => {
    vi.useFakeTimers();

    const { container } = render(
      <DelayedFadeIn delay={300}>
        <span>Loaded content</span>
      </DelayedFadeIn>
    );

    const wrapper = container.querySelector(".delayed-fade-in");

    expect(screen.getByText("Loaded content")).toBeInTheDocument();
    expect(wrapper).not.toHaveClass("delayed-fade-in--visible");

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(wrapper).not.toHaveClass("delayed-fade-in--visible");

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(wrapper).toHaveClass("delayed-fade-in--visible");
  });

  it("applies custom class and duration", () => {
    const { container } = render(
      <DelayedFadeIn className="product-detail" duration={700}>
        <span>Loaded content</span>
      </DelayedFadeIn>
    );

    const wrapper = container.querySelector(".delayed-fade-in");

    expect(wrapper).toHaveClass("product-detail");
    expect(wrapper).toHaveStyle("--delayed-fade-in-duration: 700ms");
  });
});
