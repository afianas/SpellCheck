import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProgressData } from '../types';

const KEYS = {
  PROGRESS: '@spelling_tutor_progress',
};

const DEFAULT_PROGRESS: ProgressData = {
  wordsPracticed: 0,
  correctCount: 0,
  streak: 0,
  currentDifficulty: 'easy',
  lastPracticed: null,
};

export const loadProgress = async (): Promise<ProgressData> => {
  try {
    const raw = await AsyncStorage.getItem(KEYS.PROGRESS);
    if (!raw) return DEFAULT_PROGRESS;
    return JSON.parse(raw) as ProgressData;
  } catch {
    return DEFAULT_PROGRESS;
  }
};

export const saveProgress = async (data: ProgressData): Promise<void> => {
  try {
    await AsyncStorage.setItem(KEYS.PROGRESS, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to save progress', e);
  }
};

export const clearProgress = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(KEYS.PROGRESS);
  } catch (e) {
    console.warn('Failed to clear progress', e);
  }
};

export const getAccuracy = (progress: ProgressData): number => {
  if (progress.wordsPracticed === 0) return 0;
  return Math.round((progress.correctCount / progress.wordsPracticed) * 100);
};