"use client";

import dynamic from "next/dynamic";

import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";

const ProductError = dynamic(() => import("@/components/product-error/product-error"));

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useCompleteHeaderLoading();
  return <ProductError resetAction={reset} />;
}
