"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import Image from "next/image";

import x from "@/assets/icons/x.svg";
import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { searchProducts } from "@/services/search-products";

import "./filter-input.css";

export function FilterInput() {
  const [filterValue, setFilterValue] = useState("");
  const searchAbortControllerRef = useRef<AbortController | null>(null);
  const { setProducts } = useProducts();
  const { setLoadingProgress } = useLoading();

  const debouncedSearchProducts = useDebouncedCallback(async (search: string) => {
    searchAbortControllerRef.current?.abort();

    const abortController = new AbortController();
    searchAbortControllerRef.current = abortController;

    setLoadingProgress(100);

    try {
      const products = await searchProducts(search, abortController.signal);

      if (!abortController.signal.aborted) {
        setProducts(products);
      }
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) {
        throw error;
      }
    } finally {
      if (searchAbortControllerRef.current === abortController) {
        searchAbortControllerRef.current = null;
        setLoadingProgress(0);
      }
    }
  }, 500);

  useEffect(() => {
    return () => {
      searchAbortControllerRef.current?.abort();
    };
  }, []);

  const handleChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      searchAbortControllerRef.current?.abort();
      debouncedSearchProducts(value);
    },
    [debouncedSearchProducts]
  );

  return (
    <div className="filter-input">
      <label className="filter-input__label" htmlFor="filter-name">
        Search products
      </label>
      <input
        type="text"
        className="filter-input__field"
        id="filter-name"
        name="filter-name"
        placeholder="Search for a smartphone..."
        value={filterValue}
        onChange={(e) => handleChange(e.target.value)}
      />
      {filterValue && (
        <button
          type="button"
          className="filter-input__clear"
          aria-label="Clear search"
          onClick={() => handleChange("")}
        >
          <Image src={x} alt="" width={8} height={8} loading="eager" />
        </button>
      )}
    </div>
  );
}
