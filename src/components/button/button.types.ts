export type ButtonProps = {
  label: string;
  onClick?: () => void;
  variant?: "primary" | "outlined" | "danger";
  disabled?: boolean;
};
