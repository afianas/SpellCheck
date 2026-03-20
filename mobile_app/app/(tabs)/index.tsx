import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/colors';
import { WordOfTheDay } from '../../components/home/WordOfTheDay';
import { useProgress } from '../../hooks/useProgress';
import { getAccuracy } from '../../utils/storage';
import { DIFFICULTY_CONFIG } from '../../constants/difficulty';

const SPELLING_TIPS = [
  "Break long words into smaller parts. Say each syllable out loud!",
  "When in doubt, sound it out — say the word slowly letter by letter.",
  "Think of a word you know that rhymes — it might have the same spelling pattern.",
  "Some words just need to be memorised — practice makes perfect!",
  "Try writing the word 3 times to help your brain remember it.",
];

export default function HomeScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const accuracy = getAccuracy(progress);
  const diffConfig = DIFFICULTY_CONFIG[progress.currentDifficulty];

  // Pick a tip based on day of year so it changes daily
  const tipIndex = new Date().getDate() % SPELLING_TIPS.length;
  const todaysTip = SPELLING_TIPS[tipIndex];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.mascot}>🐻</Text>
        <Text style={styles.greeting}>Hey there! 👋</Text>
        <Text style={styles.subtitle}>Ready to practise spelling today?</Text>
      </View>

      {/* Quick stats strip */}
      <View style={styles.statsStrip}>
        <View style={styles.statPill}>
          <Text style={styles.statValue}>{progress.wordsPracticed}</Text>
          <Text style={styles.statLabel}>Words</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statPill}>
          <Text style={styles.statValue}>{accuracy}%</Text>
          <Text style={styles.statLabel}>Accuracy</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.statPill}>
          <Text style={styles.statValue}>🔥 {progress.streak}</Text>
          <Text style={styles.statLabel}>Streak</Text>
        </View>
      </View>

      {/* Current level card */}
      <View style={[styles.levelCard, { borderColor: diffConfig.color + '55' }]}>
        <Text style={styles.levelLabel}>Current Level</Text>
        <View style={styles.levelRow}>
          <Text style={styles.levelEmoji}>{diffConfig.emoji}</Text>
          <Text style={[styles.levelName, { color: diffConfig.color }]}>
            {diffConfig.label}
          </Text>
          <Text style={styles.levelStars}>{'⭐'.repeat(diffConfig.stars)}</Text>
        </View>
        <Text style={styles.levelHint}>
          Get 5 correct answers in a row to level up!
        </Text>
      </View>

      {/* Word of the Day */}
      <WordOfTheDay />

      {/* CTA */}
      <TouchableOpacity
        style={styles.practiceBtn}
        onPress={() => router.push('/(tabs)/practice')}
        activeOpacity={0.85}
      >
        <Text style={styles.practiceBtnText}>✏️  Start Practising</Text>
      </TouchableOpacity>

      {/* Daily tip */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Spelling Tip of the Day</Text>
        <Text style={styles.tipText}>{todaysTip}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingTop: 60, gap: 16, paddingBottom: 40 },

  header: { alignItems: 'center', gap: 4, marginBottom: 4 },
  mascot: { fontSize: 56 },
  greeting: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 32,
    color: Colors.textPrimary,
  },
  subtitle: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 17,
    color: Colors.textSecondary,
    textAlign: 'center',
  },

  statsStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  statPill: { alignItems: 'center', gap: 2, flex: 1 },
  statValue: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 22,
    color: Colors.textPrimary,
  },
  statLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 12,
    color: Colors.textMuted,
  },
  divider: { width: 1.5, height: 32, backgroundColor: Colors.border },

  levelCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 16,
    gap: 6,
    borderWidth: 2.5,
  },
  levelLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: Colors.textMuted,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelEmoji: { fontSize: 24 },
  levelName: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 24,
  },
  levelStars: { fontSize: 16 },
  levelHint: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: Colors.textMuted,
  },

  practiceBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 22,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 7,
  },
  practiceBtnText: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 22,
    color: Colors.white,
  },

  tipCard: {
    backgroundColor: Colors.secondary + '18',
    borderRadius: 18,
    padding: 16,
    borderWidth: 2,
    borderColor: Colors.secondary + '44',
    gap: 6,
  },
  tipTitle: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: Colors.secondaryDark,
  },
  tipText: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
});