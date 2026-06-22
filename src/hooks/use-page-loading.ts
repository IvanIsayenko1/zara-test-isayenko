"use client";

import { useEffect, useState } from "react";

import { LOADING_REVEAL_DELAY, useLoading } from "@/context/loading-context";

export function usePageLoading() {
  const { simulateLoading, stopLoading } = useLoading();
  const [isPageReady, setIsPageReady] = useState(false);

  useEffect(() => {
    simulateLoading();

    const timeoutId = window.setTimeout(() => {
      setIsPageReady(true);
    }, LOADING_REVEAL_DELAY);

    return () => {
      window.clearTimeout(timeoutId);
      stopLoading();
    };
  }, [simulateLoading, stopLoading]);

  return isPageReady;
}
