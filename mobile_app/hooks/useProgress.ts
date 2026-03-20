import { useEffect } from 'react';
import { useProgressStore } from '../store/progressStore';

export const useProgress = () => {
  const {
    progress,
    accuracy,
    isLoaded,
    sessionCorrect,
    loadFromStorage,
    recordAttempt,
    resetProgress,
  } = useProgressStore();

  useEffect(() => {
    if (!isLoaded) {
      loadFromStorage();
    }
  }, []);

  return {
    progress,
    accuracy,
    isLoaded,
    sessionCorrect: sessionCorrect ?? 0,
    recordAttempt,
    resetProgress,
  };
};