import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { fetchWordOfDay } from '../../services/wordBank';
import { WordResponse } from '../../types';
import { useAudio } from '../../hooks/useAudio';
import { Colors } from '../../constants/colors';
import { DifficultyBadge } from '../practice/DifficultyBadge';

const FALLBACK_WORDS: WordResponse[] = [
  { word: 'friend', difficulty: 'easy', meaning: 'A person you like and trust.' },
  { word: 'because', difficulty: 'medium', meaning: 'For the reason that.' },
  { word: 'beautiful', difficulty: 'hard', meaning: 'Pleasing to the senses or mind.' },
  { word: 'together', difficulty: 'medium', meaning: 'With each other.' },
  { word: 'journey', difficulty: 'medium', meaning: 'An act of travelling from one place to another.' },
  { word: 'knowledge', difficulty: 'hard', meaning: 'Facts, information, and skills acquired through experience.' },
  { word: 'dream', difficulty: 'easy', meaning: 'A series of thoughts and images during sleep.' },
];

export const WordOfTheDay: React.FC = () => {
  const [wordData, setWordData] = useState<WordResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { playWord, isPlaying, isLoading: audioLoading } = useAudio();

  useEffect(() => {
    fetchWordOfDay()
      .then((data) => setWordData(data))
      .catch(() => {
        const fallback = FALLBACK_WORDS[new Date().getDate() % FALLBACK_WORDS.length];
        setWordData(fallback);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator color={Colors.primary} />
      </View>
    );
  }

  if (!wordData) return null;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.title}>✨ Word of the Day</Text>
        <DifficultyBadge difficulty={wordData.difficulty} size="sm" />
      </View>

      {/* Word + speaker button */}
      <View style={styles.wordRow}>
        <Text style={styles.word}>{wordData.word}</Text>
        <TouchableOpacity
          onPress={() => playWord(wordData.word)}
          style={[styles.speakBtn, (isPlaying || audioLoading) && styles.speakBtnActive]}
          activeOpacity={0.75}
        >
          <Text style={styles.speakIcon}>
            {audioLoading ? '⏳' : isPlaying ? '🔊' : '🎧'}
          </Text>
        </TouchableOpacity>
      </View>

      {wordData.meaning && (
        <Text style={styles.meaning}>{wordData.meaning}</Text>
      )}

      {wordData.example_sentence && (
        <Text style={styles.example}>"{wordData.example_sentence}"</Text>
      )}

      <Text style={styles.tapHint}>Tap 🎧 to hear the word</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    padding: 20,
    gap: 10,
    borderWidth: 2.5,
    borderColor: Colors.primary + '55',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 5,
    minHeight: 80,
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  word: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 36,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  speakBtn: {
    backgroundColor: Colors.primary + '18',
    borderRadius: 50,
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: Colors.primary + '44',
  },
  speakBtnActive: {
    backgroundColor: Colors.primary + '33',
    borderColor: Colors.primary,
  },
  speakIcon: { fontSize: 26 },
  meaning: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  example: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  tapHint: {
    fontFamily: 'Nunito-Regular',
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: 'right',
  },
});