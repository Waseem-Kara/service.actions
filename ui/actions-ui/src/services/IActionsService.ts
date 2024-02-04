export interface IActionsService {
    getActionIdByCodeword(codeword: number): Promise<{ actionId?: string, error?: string }>;
    getCodewordsByActionId(actionId: string): Promise<{ codewords?: string[], error?: string }>;
  }