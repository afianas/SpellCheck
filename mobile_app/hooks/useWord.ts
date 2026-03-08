import { useState, useCallback } from 'react';
import { fetchWord } from '../services/wordBank';
import { Difficulty, WordResponse } from '../types';

interface UseWordReturn {
  wordData: WordResponse | null;
  isLoading: boolean;
  error: string | null;
  loadNextWord: (difficulty: Difficulty) => Promise<void>;
}

export const useWord = (): UseWordReturn => {
  const [wordData, setWordData] = useState<WordResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadNextWord = useCallback(async (difficulty: Difficulty) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchWord(difficulty);
      setWordData(data);
    } catch (err: any) {
      setError('Could not load a new word. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { wordData, isLoading, error, loadNextWord };
};