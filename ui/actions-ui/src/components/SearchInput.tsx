import React from 'react';
import { SearchInputProps } from '../interfaces';

export const SearchInput: React.FC<SearchInputProps> = ({ label, value, onChange, onSearch, isLoading }) => {
  return (
    <div>
      <label>{label}: </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={isLoading}
      />
      <button onClick={onSearch} disabled={isLoading || !value}>Search</button>
    </div>
  );
};