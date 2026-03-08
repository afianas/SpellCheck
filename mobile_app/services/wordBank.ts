import { api } from './api';
import { Difficulty, WordResponse } from '../types';

export const fetchWord = async (difficulty: Difficulty): Promise<WordResponse> => {
  const { data } = await api.get<WordResponse>('/word', {
    params: { difficulty },
  });
  return data;
};

export const fetchWordOfDay = async (): Promise<WordResponse> => {
  const { data } = await api.get<WordResponse>('/word-of-day');
  return data;
};