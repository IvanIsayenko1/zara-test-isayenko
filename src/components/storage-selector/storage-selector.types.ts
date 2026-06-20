export type StorageSelectorProps<Option extends string> = {
  title: string;
  options: readonly Option[];
  value: Option | null;
  onSelect: (option: Option) => void;
};
