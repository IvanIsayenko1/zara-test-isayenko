"use client";
import { useEffect, useState } from "react";
import "./filter-input.css";
import Image from "next/image";
import x from "@/assets/icons/x.svg";
import { useDebounce } from "@/hooks/use-debounce";
import { useProducts } from "@/context/products-context";
import { useLoading } from "@/context/loading-context";
import { fetchProducts } from "@/services/products";

export function FilterInput() {
  const [filterValue, setFilterValue] = useState("");
  const debouncedSearch = useDebounce(filterValue, 500);
  const { setProducts } = useProducts();
  const { setLoadingProgress, setIsComplete } = useLoading();

  useEffect(() => {
    const fetchData = async () => {
      setLoadingProgress(100);
      const products = await fetchProducts({ search: debouncedSearch });
      setLoadingProgress(0);
      setIsComplete(true);
      setProducts(products);
    };
    fetchData();
  }, [debouncedSearch, setProducts, setLoadingProgress, setIsComplete]);

  return (
    <div className="filter-input">
      <input
        type="text"
        className="filter-input__field"
        id="filter-name"
        name="filter-name"
        placeholder="Search for a smartphone..."
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
      {filterValue && (
        <button
          type="button"
          className="filter-input__clear"
          aria-label="Clear search"
          onClick={() => setFilterValue("")}
        >
          <Image src={x} alt="" width={8} height={8} />
        </button>
      )}
    </div>
  );
}
