import { create } from 'zustand';
import { ProgressData, Difficulty } from '../types';
import { loadProgress, saveProgress, getAccuracy } from '../utils/storage';

const CORRECT_TO_ADVANCE = 5;

interface ProgressStore {
  progress: ProgressData;
  accuracy: number;
  isLoaded: boolean;
  sessionCorrect: number;
  loadFromStorage: () => Promise<void>;
  recordAttempt: (correct: boolean, difficulty: Difficulty) => Promise<Difficulty>;
  resetProgress: () => Promise<void>;
}

const DEFAULT: ProgressData = {
  wordsPracticed: 0,
  correctCount: 0,
  streak: 0,
  currentDifficulty: 'easy',
  lastPracticed: null,
};

const NEXT_DIFFICULTY: Record<Difficulty, Difficulty> = {
  easy: 'medium',
  medium: 'hard',
  hard: 'hard',
};

function getToday(): string {
  return new Date().toISOString().split('T')[0];
}

function getYesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().split('T')[0];
}

export const useProgressStore = create<ProgressStore>((set, get) => ({
  progress: DEFAULT,
  accuracy: 0,
  isLoaded: false,
  sessionCorrect: 0,

  loadFromStorage: async () => {
    const progress = await loadProgress();
    set({ progress, accuracy: getAccuracy(progress), isLoaded: true });
  },

  recordAttempt: async (correct: boolean, difficulty: Difficulty) => {
    const current = get().progress;
    const today = getToday();
    const yesterday = getYesterday();
    const lastDate = current.lastPracticed;

    let newStreak = current.streak;
    if (correct) {
      if (lastDate === today) {
        newStreak = current.streak;
      } else if (lastDate === yesterday) {
        newStreak = current.streak + 1;
      } else {
        newStreak = 1;
      }
    }

    const newSessionCorrect = correct ? get().sessionCorrect + 1 : get().sessionCorrect;
    let newDifficulty: Difficulty = difficulty;

    if (correct && newSessionCorrect >= CORRECT_TO_ADVANCE) {
      newDifficulty = NEXT_DIFFICULTY[difficulty];
      set({ sessionCorrect: 0 });
      if (__DEV__) console.log(`[Progress] Level up! ${difficulty} → ${newDifficulty}`);
    } else {
      set({ sessionCorrect: newSessionCorrect });
    }

    const updated: ProgressData = {
      wordsPracticed: current.wordsPracticed + 1,
      correctCount: current.correctCount + (correct ? 1 : 0),
      streak: newStreak,
      currentDifficulty: newDifficulty,
      lastPracticed: today,
    };

    await saveProgress(updated);
    set({ progress: updated, accuracy: getAccuracy(updated) });

    return newDifficulty;
  },

  resetProgress: async () => {
    await saveProgress(DEFAULT);
    set({ progress: DEFAULT, accuracy: 0, sessionCorrect: 0 });
  },
}));