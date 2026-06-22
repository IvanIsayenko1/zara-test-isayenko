"use client";

import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type LoadingProgress = 0 | 50 | 100;

export const LOADING_REVEAL_DELAY = 700;

type LoadingContextValue = {
  loadingProgress: LoadingProgress;
  setLoadingProgress: (progress: LoadingProgress) => void;
  simulateLoading: () => void;
  stopLoading: () => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingProgress, setLoadingProgressState] = useState<LoadingProgress>(0);
  const loadingTimeoutsRef = useRef<number[]>([]);

  const clearLoadingTimeouts = useCallback(() => {
    loadingTimeoutsRef.current.forEach((timeoutId) => {
      window.clearTimeout(timeoutId);
    });
    loadingTimeoutsRef.current = [];
  }, []);

  const stopLoading = useCallback(() => {
    clearLoadingTimeouts();
    setLoadingProgressState(0);
  }, [clearLoadingTimeouts]);

  const simulateLoading = useCallback(() => {
    clearLoadingTimeouts();

    setLoadingProgressState(50);

    const completeTimeoutId = window.setTimeout(() => {
      setLoadingProgressState(100);
    }, 300);

    const resetTimeoutId = window.setTimeout(() => {
      setLoadingProgressState(0);
    }, LOADING_REVEAL_DELAY);

    loadingTimeoutsRef.current = [completeTimeoutId, resetTimeoutId];
  }, [clearLoadingTimeouts]);

  useEffect(() => {
    return () => {
      clearLoadingTimeouts();
    };
  }, [clearLoadingTimeouts]);

  const value = useMemo(
    () => ({
      loadingProgress,
      simulateLoading,
      setLoadingProgress: setLoadingProgressState,
      stopLoading,
    }),
    [loadingProgress, simulateLoading, setLoadingProgressState, stopLoading]
  );

  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
}
