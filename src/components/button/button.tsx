import "./button.css";
import { ButtonProps } from "./button.types";

export default function Button({ label, onClick, variant, disabled, className }: ButtonProps) {
  return (
    <button
      className={`button button--${variant} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
