"use client";

import { useCallback, useState } from "react";

import Image from "next/image";

import x from "@/assets/icons/x.svg";
import { useLoading } from "@/context/loading-context";
import { useProducts } from "@/context/products-context";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { fetchProducts } from "@/services/products";

import "./filter-input.css";

export function FilterInput() {
  const [filterValue, setFilterValue] = useState("");
  const { setProducts } = useProducts();
  const { setLoadingProgress } = useLoading();

  const searchProducts = useDebouncedCallback(async (search: string) => {
    setLoadingProgress(100);
    const products = await fetchProducts({ search });
    setLoadingProgress(0);
    setProducts(products);
  }, 500);

  const handleChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      searchProducts(value);
    },
    [searchProducts]
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
