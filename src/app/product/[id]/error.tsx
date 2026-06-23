"use client";

import dynamic from "next/dynamic";

const ProductError = dynamic(() => import("@/components/product-error/product-error"));

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ProductError resetAction={reset} />;
}
