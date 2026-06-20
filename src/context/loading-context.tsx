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

const LOADING_COMPLETE_DELAY = 500;
const LOADING_RESET_DELAY = 800;

type LoadingContextValue = {
  loadingProgress: LoadingProgress;
  setLoadingProgress: (progress: LoadingProgress) => void;
  simulateLoading: () => void;
  isComplete: boolean;
  setIsComplete: (isComplete: boolean) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingProgress, setLoadingProgressState] = useState<LoadingProgress>(0);
  const loadingResetTimeoutRef = useRef<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const simulateLoading = useCallback(() => {
    setIsComplete(false);
    setLoadingProgressState(50);

    loadingResetTimeoutRef.current = window.setTimeout(() => {
      setLoadingProgressState(100);
      loadingResetTimeoutRef.current = null;
    }, LOADING_COMPLETE_DELAY);

    loadingResetTimeoutRef.current = window.setTimeout(() => {
      setLoadingProgressState(0);
      loadingResetTimeoutRef.current = null;
      setIsComplete(true);
    }, LOADING_RESET_DELAY);
  }, [setLoadingProgressState, loadingResetTimeoutRef, setIsComplete]);

  const value = useMemo(
    () => ({
      loadingProgress,
      isComplete,
      simulateLoading,
      setIsComplete,
      setLoadingProgress: setLoadingProgressState,
    }),
    [loadingProgress, isComplete, simulateLoading, setIsComplete, setLoadingProgressState]
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
