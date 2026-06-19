"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type LoadingProgress = 0 | 50 | 100;

const LOADING_RESET_DELAY = 500;

type LoadingContextValue = {
  loadingProgress: LoadingProgress;
  setLoadingProgress: (progress: LoadingProgress) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingProgress, setLoadingProgressState] =
    useState<LoadingProgress>(0);
  const loadingResetTimeoutRef = useRef<number | null>(null);

  const setLoadingProgress = useCallback((progress: LoadingProgress) => {
    if (loadingResetTimeoutRef.current) {
      window.clearTimeout(loadingResetTimeoutRef.current);
      loadingResetTimeoutRef.current = null;
    }

    setLoadingProgressState(progress);

    if (progress === 100) {
      loadingResetTimeoutRef.current = window.setTimeout(() => {
        setLoadingProgressState(0);
        loadingResetTimeoutRef.current = null;
      }, LOADING_RESET_DELAY);
    }
  }, []);

  const value = useMemo(
    () => ({
      loadingProgress,
      setLoadingProgress,
    }),
    [loadingProgress, setLoadingProgress]
  );

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);

  if (!context) {
    throw new Error("useLoading must be used inside LoadingProvider");
  }

  return context;
}
