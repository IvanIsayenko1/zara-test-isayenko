"use client";

import ProductError from "@/components/product-error/product-error";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ProductError resetAction={reset} />;
}
