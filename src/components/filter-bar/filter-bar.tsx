import "./filter-bar.css";
import { FilterInput } from "../filter-input/filter-input";
import { useProducts } from "@/context/products-context";

export function FilterBar() {
  const { products } = useProducts();

  return (
    <div className="filter-bar">
      <FilterInput />
      <div className="filter-bar__results">{products.length} results</div>
    </div>
  );
}
