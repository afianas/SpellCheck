import { ErrorType } from '../types';

interface ErrorInfo {
  title: string;
  message: string;
  emoji: string;
  tip: string;
}

export const ERROR_MESSAGES: Record<ErrorType, ErrorInfo> = {
  none: {
    title: 'Perfect!',
    message: 'Flawless spelling!',
    emoji: '🎉',
    tip: '',
  },
  letter_swap: {
    title: 'Letters Swapped!',
    message: 'You switched two letters around.',
    emoji: '🔀',
    tip: 'Try saying the word slowly, one sound at a time.',
  },
  vowel_confusion: {
    title: 'Tricky Vowel!',
    message: 'The vowel sound tripped you up.',
    emoji: '🔤',
    tip: 'Say the word out loud and listen to the vowel sound.',
  },
  extra_letter: {
    title: 'Extra Letter!',
    message: "You added a letter that doesn't belong.",
    emoji: '➕',
    tip: 'Read your spelling out loud — does each letter have a sound?',
  },
  letter_drop: {
    title: 'Missing Letter!',
    message: 'You forgot to include a letter.',
    emoji: '🔍',
    tip: 'Count the letters and say each part of the word.',
  },
  common_misspelling: {
    title: 'Common Mix-up!',
    message: 'This word is tricky for lots of people!',
    emoji: '🤔',
    tip: 'This one is worth memorising — it comes up a lot!',
  },
};

export const getErrorInfo = (errorType: ErrorType): ErrorInfo => {
  return ERROR_MESSAGES[errorType] ?? ERROR_MESSAGES.none;
};