import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useLoading } from "@/context/loading-context";
import { act, cleanup, render, renderHook } from "@testing-library/react";

import { useCompleteHeaderLoading } from "../../hooks/use-complete-header-loading";
import { HeaderLoadingStart } from "./header-loading-start";

vi.mock("@/context/loading-context", () => ({
  useLoading: vi.fn(),
}));

const mockedUseLoading = vi.mocked(useLoading);
const setLoadingProgress = vi.fn();

describe("Header loading markers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseLoading.mockReturnValue({
      loadingProgress: 0,
      setLoadingProgress,
    });
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("sets header loading progress to 50 when route loading starts", () => {
    render(<HeaderLoadingStart />);

    expect(setLoadingProgress).toHaveBeenCalledWith(50);
  });

  it("sets header loading progress to 100 and then resets it", () => {
    vi.useFakeTimers();

    renderHook(() => useCompleteHeaderLoading());

    expect(setLoadingProgress).toHaveBeenCalledWith(100);

    act(() => {
      vi.runOnlyPendingTimers();
    });

    expect(setLoadingProgress).toHaveBeenCalledWith(0);
  });
});
