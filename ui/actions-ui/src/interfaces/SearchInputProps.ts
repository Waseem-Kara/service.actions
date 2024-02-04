export interface SearchInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
  isLoading: boolean;
  disabled: boolean;
  }