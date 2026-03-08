import { useState } from 'react';
import { checkSpelling } from '../services/spellcheck';
import { SpellCheckResult } from '../types';

interface UseSpellCheckReturn {
  result: SpellCheckResult | null;
  isChecking: boolean;
  error: string | null;
  check: (word: string, targetWord?: string) => Promise<SpellCheckResult | null>;
  reset: () => void;
}

export const useSpellCheck = (): UseSpellCheckReturn => {
  const [result, setResult] = useState<SpellCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const check = async (
    word: string,
    targetWord?: string
  ): Promise<SpellCheckResult | null> => {
    if (!word.trim()) return null;

    setIsChecking(true);
    setError(null);

    try {
      const data = await checkSpelling({
        word: word.trim().toLowerCase(),
        target_word: targetWord,
      });
      setResult(data);
      return data;
    } catch (err: any) {
      const msg = err?.response?.data?.detail ?? 'Could not connect to spelling checker.';
      setError(msg);
      return null;
    } finally {
      setIsChecking(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { result, isChecking, error, check, reset };
};