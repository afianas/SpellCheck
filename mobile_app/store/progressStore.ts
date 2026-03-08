import { create } from 'zustand';
import { ProgressData, Difficulty } from '../types';
import { loadProgress, saveProgress, getAccuracy } from '../utils/storage';

interface ProgressStore {
  progress: ProgressData;
  accuracy: number;
  isLoaded: boolean;
  loadFromStorage: () => Promise<void>;
  recordAttempt: (correct: boolean, difficulty: Difficulty) => Promise<void>;
  resetProgress: () => Promise<void>;
}

const DEFAULT: ProgressData = {
  wordsPracticed: 0,
  correctCount: 0,
  streak: 0,
  currentDifficulty: 'easy',
  lastPracticed: null,
};

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: DEFAULT,
  accuracy: 0,
  isLoaded: false,

  loadFromStorage: async () => {
    const progress = await loadProgress();
    set({ progress, accuracy: getAccuracy(progress), isLoaded: true });
  },

  recordAttempt: async (correct, difficulty) => {
    const current = get().progress;
    const today = new Date().toISOString().split('T')[0];

    // Streak: increment if correct, reset if wrong
    let newStreak = correct ? current.streak + 1 : 0;

    // If last practiced was not today, reset streak on first wrong
    if (!correct && current.lastPracticed !== today) {
      newStreak = 0;
    }

    const updated: ProgressData = {
      wordsPracticed: current.wordsPracticed + 1,
      correctCount: current.correctCount + (correct ? 1 : 0),
      streak: newStreak,
      currentDifficulty: difficulty,
      lastPracticed: today,
    };

    await saveProgress(updated);
    set({ progress: updated, accuracy: getAccuracy(updated) });
  },

  resetProgress: async () => {
    await saveProgress(DEFAULT);
    set({ progress: DEFAULT, accuracy: 0 });
  },
}));