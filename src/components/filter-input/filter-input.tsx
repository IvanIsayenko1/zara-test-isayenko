"use client";
import { useState } from "react";
import "./filter-input.css";
import Image from "next/image";
import x from "@/assets/icons/x.svg";

export function FilterInput() {
  const [filterValue, setFilterValue] = useState("");

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
