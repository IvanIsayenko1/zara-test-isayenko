"use client";

import { type ReactNode, createContext, useContext, useMemo, useState } from "react";

export type LoadingProgress = 0 | 50 | 100;

type LoadingContextValue = {
  loadingProgress: LoadingProgress;
  setLoadingProgress: (progress: LoadingProgress) => void;
};

const LoadingContext = createContext<LoadingContextValue | null>(null);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingProgress, setLoadingProgressState] = useState<LoadingProgress>(0);

  const value = useMemo(
    () => ({
      loadingProgress,
      setLoadingProgress: setLoadingProgressState,
    }),
    [loadingProgress, setLoadingProgressState]
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
