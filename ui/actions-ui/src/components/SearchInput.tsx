import React from 'react';
import { SearchInputProps } from '../interfaces';

export const SearchInput: React.FC<SearchInputProps> = ({ label, value, onChange, onSearch, isLoading, disabled }) => {
  return (
    <div>
      <label>{label}: </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading || disabled}
      />
      <button onClick={onSearch} disabled={isLoading || !value || disabled}>Search</button>
    </div>
  );
};