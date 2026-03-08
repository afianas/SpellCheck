import { useEffect } from 'react';
import { useProgressStore } from '../store/progressStore';

export const useProgress = () => {
  const {
    progress,
    accuracy,
    isLoaded,
    loadFromStorage,
    recordAttempt,
    resetProgress,
  } = useProgressStore();

  useEffect(() => {
    if (!isLoaded) {
      loadFromStorage();
    }
  }, []);

  return { progress, accuracy, isLoaded, recordAttempt, resetProgress };
};