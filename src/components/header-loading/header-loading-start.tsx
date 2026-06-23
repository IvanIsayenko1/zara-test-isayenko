"use client";

import { useEffect } from "react";

import { useLoading } from "@/context/loading-context";

export function HeaderLoadingStart() {
  const { setLoadingProgress } = useLoading();

  useEffect(() => {
    setLoadingProgress(50);
  }, [setLoadingProgress]);

  return null;
}
