import React, { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { SearchResults } from './components/SearchResults';
import { ApiService } from './services/ApiService';

const App = () => {
  const [codeword, setCodeword] = useState('');
  const [actionId, setActionId] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const apiService = new ApiService();

  const handleApiResponse = (response) => {
    if (response.error) {
      setError(response.error);
    } else {
      setResult(`Result: ${JSON.stringify(response)}`);
    }
    setIsLoading(false);
  };

  const searchByCodeword = async () => {
    if (isNaN(Number(codeword)) || codeword.trim() === '') {
      setError('Codeword must be a non-empty integer.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await apiService.getActionIdByCodeword(parseInt(codeword));
      handleApiResponse(response);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  const searchByActionId = async () => {
    if (actionId.trim() === '') {
      setError('Action ID must be a non-empty string.');
      return;
    }
    setIsLoading(true);
    setResult('');
    setError('');
    try {
      const response = await apiService.getCodewordByActionId(actionId);
      handleApiResponse(response);
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>CodeWord Lookup</h1>
      <SearchInput
        label="Codeword (Integer)"
        value={codeword}
        onChange={(value) => { setCodeword(value); setActionId(''); }} // Clear other field to enforce single input
        onSearch={searchByCodeword}
        isLoading={isLoading}
        disabled={!!actionId} // Disable when actionId input is not empty
      />
      <SearchInput
        label="Action ID (String)"
        value={actionId}
        onChange={(value) => { setActionId(value); setCodeword(''); }} // Clear other field to enforce single input
        onSearch={searchByActionId}
        isLoading={isLoading}
        disabled={!!codeword} // Disable when codeword input is not empty
      />
      <SearchResults
        result={result}
        isLoading={isLoading}
        error={error}
      />
    </div>
  );
};

export default App;