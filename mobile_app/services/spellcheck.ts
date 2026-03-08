import { api } from './api';
import { SpellCheckResult } from '../types';

export interface SpellCheckPayload {
  word: string;
  target_word?: string;
}

export const checkSpelling = async (
  payload: SpellCheckPayload
): Promise<SpellCheckResult> => {
  const { data } = await api.post<SpellCheckResult>('/spellcheck', payload);
  return data;
};