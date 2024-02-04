import axios from 'axios';
import { IActionsService } from './IActionsService';
import { ActionsServiceApiResponse } from '../interfaces';

export class ActionsService implements IActionsService {
  private API_BASE_URL = 'http://localhost:8000';

  async getActionIdByCodeword(codeword: number): Promise<{ actionId?: string, error?: string }> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/actions/codeword/${codeword}`);
      return { actionId: response.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return { error: 'Action not found with the provided Codeword.' };
        }
      }
      return { error: 'An unexpected error occurred.' };
    }
  }

  async getCodewordsByActionId(actionId: string): Promise<{ codewords?: string[], error?: string }> {
    try {
      const response = await axios.get(`${this.API_BASE_URL}/actions/id/${actionId}`);
debugger;
      if (response?.status === 204) {
        return { error: 'Could not find any actions with the provided Action ID.' };
      }
      return { codewords: response.data };
    } catch (error) {
      return { error: 'An unexpected error occurred.' };
    }
  }
}