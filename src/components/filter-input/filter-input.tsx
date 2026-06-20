"use client";
import { useCallback, useState } from "react";
import "./filter-input.css";
import Image from "next/image";
import x from "@/assets/icons/x.svg";
import { useDebouncedCallback } from "@/hooks/use-debounce";
import { useProducts } from "@/context/products-context";
import { useLoading } from "@/context/loading-context";
import { fetchProducts } from "@/services/products";

export function FilterInput() {
  const [filterValue, setFilterValue] = useState("");
  const { setProducts } = useProducts();
  const { setLoadingProgress, setIsComplete } = useLoading();

  const searchProducts = useDebouncedCallback(
    async (search: string) => {
      setLoadingProgress(100);
      const products = await fetchProducts({ search });
      setLoadingProgress(0);
      setIsComplete(true);
      setProducts(products);
    },
    500
  );

  const handleChange = useCallback(
    (value: string) => {
      setFilterValue(value);
      searchProducts(value);
    },
    [searchProducts]
  );

  return (
    <div className="filter-input">
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
