import { useProducts } from "@/context/products-context";

import { FilterInput } from "../filter-input/filter-input";
import "./filter-bar.css";

export function FilterBar() {
  const { products } = useProducts();

  return (
    <div className="filter-bar">
      <FilterInput />
      <div className="filter-bar__results">{products.length} results</div>
    </div>
  );
}
