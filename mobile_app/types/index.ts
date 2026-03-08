export type Difficulty = 'easy' | 'medium' | 'hard';

export type ErrorType =
  | 'none'
  | 'letter_swap'
  | 'vowel_confusion'
  | 'extra_letter'
  | 'letter_drop'
  | 'common_misspelling';

export interface SpellCheckResult {
  word: string;
  correct: boolean;
  confidence: number;
  source: string;
  error_type: ErrorType;
  suggestion?: string;
}

export interface WordResponse {
  word: string;
  difficulty: Difficulty;
  meaning?: string;
  example_sentence?: string;
}

export interface ProgressData {
  wordsPracticed: number;
  correctCount: number;
  streak: number;
  currentDifficulty: Difficulty;
  lastPracticed: string | null;
}

export interface GameSession {
  currentWord: string;
  difficulty: Difficulty;
  score: number;
  streak: number;
  hintsUsed: number;
}