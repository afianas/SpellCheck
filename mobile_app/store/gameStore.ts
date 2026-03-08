import { create } from 'zustand';
import { Difficulty, GameSession } from '../types';

interface GameStore extends GameSession {
  setCurrentWord: (word: string) => void;
  setDifficulty: (difficulty: Difficulty) => void;
  incrementScore: () => void;
  incrementStreak: () => void;
  resetStreak: () => void;
  useHint: () => void;
  resetSession: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentWord: '',
  difficulty: 'easy',
  score: 0,
  streak: 0,
  hintsUsed: 0,

  setCurrentWord: (word) => set({ currentWord: word }),
  setDifficulty: (difficulty) => set({ difficulty }),
  incrementScore: () => set((s) => ({ score: s.score + 1 })),
  incrementStreak: () => set((s) => ({ streak: s.streak + 1 })),
  resetStreak: () => set({ streak: 0 }),
  useHint: () => set((s) => ({ hintsUsed: s.hintsUsed + 1 })),
  resetSession: () =>
    set({ currentWord: '', score: 0, streak: 0, hintsUsed: 0, difficulty: 'easy' }),
}));