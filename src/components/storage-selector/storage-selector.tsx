import "./storage-selector.css";
import type { StorageSelectorProps } from "./storage-selector.types";
import { useState } from "react";

export default function StorageSelector<Option extends string>({
  title,
  options,
  value,
  onSelect,
}: StorageSelectorProps<Option>) {
  const [selectedOption, setSelectedOption] = useState<Option | null>(value);

  return (
    <div className="storage-selector">
      <div className="storage-selector__label">{title}</div>
      <div className="storage-selector__options">
        {options.map((option, index) => (
          <div
            key={index}
            className={`storage-selector__option ${option === selectedOption ? "storage-selector__option--selected" : ""}`}
            onClick={() => {
              setSelectedOption(option);
              onSelect(option);
            }}
          >
            <div className="storage-selector__option-label">{option}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
