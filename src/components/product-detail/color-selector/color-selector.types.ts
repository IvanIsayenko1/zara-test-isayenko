export type ColorSelectorProps<Option extends string> = {
  title: string;
  options: readonly { value: Option; label: string }[];
  value: Option | null;
  onSelect: (option: Option) => void;
};
