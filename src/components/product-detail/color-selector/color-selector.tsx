import { useState } from "react";

import "./color-selector.css";
import { ColorSelectorProps } from "./color-selector.types";

export default function ColorSelector({
  title,
  options,
  value,
  onSelect,
}: ColorSelectorProps<string>) {
  const [selectedOption, setSelectedOption] = useState(value);
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  return (
    <div className="color-selector">
      <div className="color-selector__label">{title}</div>
      <div className="color-selector__options-container">
        <div className="color-selector__options">
          {options.map((option) => (
            <button
              type="button"
              key={option.value}
              className={`color-selector__option ${selectedOption === option.value ? "color-selector__option--selected" : ""}`}
              aria-label={option.label}
              aria-pressed={selectedOption === option.value}
              onClick={() => {
                setSelectedOption(option.value);
                onSelect(option.value);
              }}
              onMouseEnter={() => {
                setHoveredOption(option.value);
              }}
              onMouseLeave={() => {
                setHoveredOption(null);
              }}
            >
              <div
                className="color-selector__swatch"
                style={{ backgroundColor: option.value }}
              ></div>
            </button>
          ))}
        </div>
        <div className="color-selector__selected">
          {hoveredOption !== null &&
            options.find((option) => option.value === hoveredOption)?.label}
          {!hoveredOption &&
            selectedOption !== null &&
            options.find((option) => option.value === selectedOption)?.label}
        </div>
      </div>
    </div>
  );
}
