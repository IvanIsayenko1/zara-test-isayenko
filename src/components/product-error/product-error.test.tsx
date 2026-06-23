import { afterEach, describe, expect, it, vi } from "vitest";

import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ProductError from "./product-error";

vi.mock("@/hooks/use-complete-header-loading", () => ({
  useCompleteHeaderLoading: vi.fn(),
}));

const mockedUseCompleteHeaderLoading = vi.mocked(useCompleteHeaderLoading);

describe("ProductError", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("completes header loading when rendered", () => {
    render(<ProductError resetAction={vi.fn()} />);

    expect(mockedUseCompleteHeaderLoading).toHaveBeenCalled();
  });

  it("renders retry and catalog actions", () => {
    render(<ProductError resetAction={vi.fn()} />);

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "TRY AGAIN" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "BACK TO CATALOG" })).toHaveAttribute("href", "/");
  });

  it("calls reset when retry is clicked", () => {
    const reset = vi.fn();

    render(<ProductError resetAction={reset} />);

    fireEvent.click(screen.getByRole("button", { name: "TRY AGAIN" }));

    expect(reset).toHaveBeenCalledTimes(1);
  });
});
