import { Difficulty } from '../types';
import { Colors } from './colors';

interface DifficultyConfig {
  label: string;
  stars: number;
  color: string;
  emoji: string;
}

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    label: 'Easy',
    stars: 1,
    color: Colors.easy,
    emoji: '🌱',
  },
  medium: {
    label: 'Medium',
    stars: 2,
    color: Colors.medium,
    emoji: '🌟',
  },
  hard: {
    label: 'Hard',
    stars: 3,
    color: Colors.hard,
    emoji: '🔥',
  },
};