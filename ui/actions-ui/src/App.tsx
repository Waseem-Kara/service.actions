import React, { useState } from 'react';
import { SearchInput } from './components/SearchInput';
import { SearchResults } from './components/SearchResults';
import { ActionsService } from './services/ActionsService';

type ApiResponse = {
  actionId?: string;
  codewords?: string[];
  error?: string;
};

const App = () => {
  const [codeword, setCodeword] = useState<string>('');
  const [actionId, setActionId] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const actionsService = new ActionsService();

  const handleApiResponse = (response: ApiResponse): void => {
    setError(response.error || '');
    setResult(response.actionId ?
       `Associated Action ID: ${response.actionId}` :
        response.codewords ?
         `Associated Codeword(s): ${response.codewords.join(', ')}` :
          'No results found.');
    setIsLoading(false);
  };

  const searchByCodeword = async (): Promise<void> => {
    if (isNaN(Number(codeword)) || codeword.trim() === '') {
      setError('Codeword must be a non-empty integer.');
      return;
    }
    setIsLoading(true);
    clearResults();
    try {
      const response = await actionsService.getActionIdByCodeword(parseInt(codeword));
      handleApiResponse(response);
    } catch (error) {
      handleError();
    }
  };

  const searchByActionId = async (): Promise<void> => {
    if (actionId.trim() === '') {
      setError('Action ID must be a non-empty string.');
      return;
    }
    setIsLoading(true);
    clearResults();
    try {
      const response = await actionsService.getCodewordsByActionId(actionId);
      handleApiResponse(response);
    } catch (error) {
      handleError();
    }
  };

  const clearResults = (): void => {
    setResult('');
    setError('');
  };

  const handleError = (): void => {
    setError('An unexpected error occurred. Please try again.');
    setIsLoading(false);
  };

  return (
    <div className="App">
      <SearchInput
        label="Codeword (number)"
        value={codeword}
        onChange={setCodeword}
        onSearch={searchByCodeword}
        isLoading={isLoading}
      />
      <SearchInput
        label="Action ID (string)"
        value={actionId}
        onChange={setActionId}
        onSearch={searchByActionId}
        isLoading={isLoading}
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