import { useProducts } from "@/context/products-context";

import "./filter-bar.css";
import { FilterInput } from "./filter-input/filter-input";

export function FilterBar() {
  const { products } = useProducts();

  return (
    <div className="filter-bar">
      <FilterInput />
      <div className="filter-bar__results">{products.length} results</div>
    </div>
  );
}
