import "./button.css";
import { ButtonProps } from "./button.types";

export default function Button({ label, onClick, variant, disabled }: ButtonProps) {
  return (
    <button
      className={`button button--${variant}`}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
