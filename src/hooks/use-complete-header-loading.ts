"use client";

import { useEffect } from "react";

import { useLoading } from "@/context/loading-context";

const HEADER_LOADING_RESET_DELAY = 300;

export function useCompleteHeaderLoading() {
  const { setLoadingProgress } = useLoading();

  useEffect(() => {
    setLoadingProgress(100);

    const timeoutId = window.setTimeout(() => {
      setLoadingProgress(0);
    }, HEADER_LOADING_RESET_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [setLoadingProgress]);
}
