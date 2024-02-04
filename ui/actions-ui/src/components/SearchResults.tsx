
import React from 'react';
import { SearchResultsProps } from '../interfaces'


export const SearchResults: React.FC<SearchResultsProps> = ({ result, isLoading, error }) => {
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return <div>{result && <p>{result}</p>}</div>;
};