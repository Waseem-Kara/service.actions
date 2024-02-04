export interface IApiService {
    getActionIdByCodeword(codeword: number): Promise<{ actionId?: string, error?: string }>;
    getCodewordByActionId(actionId: string): Promise<{ codewords?: string[], error?: string }>;
  }