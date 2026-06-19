import "./filter-bar.css";
import { FilterInput } from "../filter-input/filter-input";

export function FilterBar() {
  return (
    <div className="filter-bar">
      <FilterInput />
      <div className="filter-bar__results">{0} results</div>
    </div>
  );
}
