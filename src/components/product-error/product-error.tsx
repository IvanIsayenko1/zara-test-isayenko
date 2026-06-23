"use client";

import { useRouter } from "next/navigation";

import Button from "@/components/button/button";
import { useCompleteHeaderLoading } from "@/hooks/use-complete-header-loading";

import "./product-error.css";

export default function ProductError({ resetAction }: { resetAction: () => void }) {
  const router = useRouter();
  useCompleteHeaderLoading();

  return (
    <div className="product-error">
      <div className="product-error__content">
        <div className="product-error__eyebrow">Error</div>
        <h1 className="product-error__title">Something went wrong</h1>
        <p className="product-error__message">
          We could not load the products. Try again or go back to the catalog.
        </p>
      </div>

      <div className="product-error__actions">
        <Button label="TRY AGAIN" variant="primary" onClick={resetAction} />
        <Button
          label="BACK TO CATALOG"
          variant="outlined"
          className="product-error__button"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
    </div>
  );
}
