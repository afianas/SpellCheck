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

export const WordOfTheDay: React.FC = () => {
  const [wordData, setWordData] = useState<WordResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { playWord, isPlaying } = useAudio();

  useEffect(() => {
    fetchWordOfDay()
      .then(setWordData)
      .catch(() => setWordData(null))
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

      <TouchableOpacity
        onPress={() => playWord(wordData.word)}
        style={styles.wordRow}
        activeOpacity={0.7}
      >
        <Text style={styles.word}>{wordData.word}</Text>
        <Text style={styles.speakIcon}>{isPlaying ? '🔊' : '🎧'}</Text>
      </TouchableOpacity>

      {wordData.meaning && (
        <Text style={styles.meaning}>{wordData.meaning}</Text>
      )}

      {wordData.example_sentence && (
        <Text style={styles.example}>"{wordData.example_sentence}"</Text>
      )}
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
    gap: 10,
  },
  word: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 36,
    color: Colors.textPrimary,
    letterSpacing: 2,
  },
  speakIcon: {
    fontSize: 26,
  },
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
});
