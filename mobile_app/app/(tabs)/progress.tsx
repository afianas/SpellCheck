import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useProgress } from '../../hooks/useProgress';
import { StatCard } from '../../components/progress/StatCard';
import { StreakCounter } from '../../components/progress/StreakCounter';
import { DifficultyBadge } from '../../components/practice/DifficultyBadge';
import { getAccuracy } from '../../utils/storage';

export default function ProgressScreen() {
  const { progress, resetProgress } = useProgress();
  const accuracy = getAccuracy(progress);
  const incorrect = progress.wordsPracticed - progress.correctCount;

  const handleReset = () => {
    Alert.alert(
      'Reset Progress?',
      'This will clear all your stats and return to Easy level. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Reset', style: 'destructive', onPress: resetProgress },
      ]
    );
  };

  // Accuracy bar width
  const accuracyColor =
    accuracy >= 80 ? Colors.success : accuracy >= 60 ? Colors.medium : Colors.error;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>📊 Your Progress</Text>

      {/* Streak */}
      <View style={styles.card}>
        <StreakCounter streak={progress.streak} />
      </View>

      {/* Accuracy bar */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Overall Accuracy</Text>
        <Text style={[styles.accuracyValue, { color: accuracyColor }]}>{accuracy}%</Text>
        <View style={styles.barBackground}>
          <View
            style={[
              styles.barFill,
              { width: `${accuracy}%` as any, backgroundColor: accuracyColor },
            ]}
          />
        </View>
        <Text style={styles.accuracyHint}>
          {accuracy >= 80
            ? '🏆 Excellent!'
            : accuracy >= 60
            ? '💪 Good work!'
            : '🌱 Keep practising!'}
        </Text>
      </View>

      {/* Stats grid */}
      <View style={styles.statsGrid}>
        <StatCard
          emoji="📖"
          value={progress.wordsPracticed}
          label="Words Practised"
          color={Colors.secondary}
        />
        <StatCard
          emoji="✅"
          value={progress.correctCount}
          label="Correct"
          color={Colors.success}
        />
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          emoji="❌"
          value={incorrect}
          label="Incorrect"
          color={Colors.error}
        />
        <StatCard
          emoji="🎯"
          value={`${accuracy}%`}
          label="Accuracy"
          color={accuracyColor}
        />
      </View>

      {/* Current difficulty */}
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Current Level</Text>
        <DifficultyBadge difficulty={progress.currentDifficulty} size="lg" />
        <Text style={styles.levelHint}>
          {progress.currentDifficulty === 'easy' && '🌱 Words with 4 or fewer letters'}
          {progress.currentDifficulty === 'medium' && '🌟 Words with 5–7 letters'}
          {progress.currentDifficulty === 'hard' && '🔥 Words with 8+ letters'}
        </Text>
        <Text style={styles.levelSubHint}>
          Get 5 correct answers in a row to level up!
        </Text>
      </View>

      {/* Motivational message */}
      <View style={styles.motivationBox}>
        <Text style={styles.motivationEmoji}>
          {accuracy >= 80 ? '🏆' : accuracy >= 60 ? '💪' : '🌱'}
        </Text>
        <Text style={styles.motivationText}>
          {accuracy >= 80
            ? 'Amazing work! You are a spelling superstar!'
            : accuracy >= 60
            ? 'Great effort! Keep practising and you will get even better!'
            : 'Every word you learn makes you smarter. Keep going!'}
        </Text>
      </View>

      {/* Reset */}
      <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
        <Text style={styles.resetText}>🗑 Reset All Progress</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingTop: 60, gap: 16, paddingBottom: 40 },

  title: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 30,
    color: Colors.textPrimary,
    marginBottom: 4,
  },

  card: {
    backgroundColor: Colors.white,
    borderRadius: 22,
    padding: 20,
    alignItems: 'center',
    gap: 10,
    borderWidth: 2,
    borderColor: Colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  cardLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.textSecondary,
    alignSelf: 'flex-start',
  },
  accuracyValue: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 42,
    alignSelf: 'flex-start',
  },
  barBackground: {
    width: '100%',
    height: 16,
    backgroundColor: Colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 8,
  },
  accuracyHint: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
    alignSelf: 'flex-start',
  },
  levelHint: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  levelSubHint: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: Colors.textMuted,
  },

  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },

  motivationBox: {
    backgroundColor: Colors.primary + '18',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 2,
    borderColor: Colors.primary + '44',
  },
  motivationEmoji: { fontSize: 36 },
  motivationText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 15,
    color: Colors.textPrimary,
    flex: 1,
    lineHeight: 22,
  },

  resetBtn: {
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.error + '88',
    backgroundColor: Colors.errorLight,
  },
  resetText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: Colors.error,
  },
});