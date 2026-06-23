import { afterEach, describe, expect, it, vi } from "vitest";

import { useRouter } from "next/navigation";

import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

import ProductError from "./product-error";

vi.mock("@/hooks/use-complete-header-loading", () => ({
  useCompleteHeaderLoading: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

const mockedUseCompleteHeaderLoading = vi.mocked(useCompleteHeaderLoading);
const mockedUseRouter = vi.mocked(useRouter);
const push = vi.fn();

function renderProductError(resetAction = vi.fn()) {
  mockedUseRouter.mockReturnValue({
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
    push,
    refresh: vi.fn(),
    replace: vi.fn(),
  });

  return render(<ProductError resetAction={resetAction} />);
}

describe("ProductError", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("completes header loading when rendered", () => {
    renderProductError();

    expect(mockedUseCompleteHeaderLoading).toHaveBeenCalled();
  });

  it("renders retry and catalog actions", () => {
    renderProductError();

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "TRY AGAIN" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "BACK TO CATALOG" })).toBeInTheDocument();
  });

  it("calls reset when retry is clicked", () => {
    const reset = vi.fn();

    renderProductError(reset);

    fireEvent.click(screen.getByRole("button", { name: "TRY AGAIN" }));

    expect(reset).toHaveBeenCalledTimes(1);
  });

  it("navigates to catalog when back to catalog is clicked", () => {
    renderProductError();

    fireEvent.click(screen.getByRole("button", { name: "BACK TO CATALOG" }));

    expect(push).toHaveBeenCalledWith("/");
  });
});
