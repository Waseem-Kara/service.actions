import axios from 'axios';
import { IApiService } from './IApiService';

export class ApiService implements IApiService {
  private API_BASE_URL = 'http://localhost:8000';

  async getActionIdByCodeword(codeword: number): Promise<{ actionId?: string, error?: string }> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/get_action_by_codeword/${codeword}`);
      return response.data.actionId;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { error: 'Item not found.' };
        }
        if (error.response?.status === 204) {
          return { error: 'No content for the given codeword.' };
        }
      }
      return { error: 'An unexpected error occurred.' };
    }
  }

  async getCodewordByActionId(actionId: string): Promise<{ codewords?: string[], error?: string }> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/get_codeword_by_action_id/${actionId}`);
      return response.data.codewords;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { error: 'Item not found.' };
        }
        if (error.response?.status === 204) {
          return { error: 'No content for the given action ID.' };
        }
      }
      return { error: 'An unexpected error occurred.' };
    }
  }
}