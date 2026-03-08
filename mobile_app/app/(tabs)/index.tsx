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

export default function HomeScreen() {
  const router = useRouter();
  const { progress } = useProgress();
  const accuracy = getAccuracy(progress);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey there! 👋</Text>
        <Text style={styles.subtitle}>Ready to practise spelling today?</Text>
        <Text style={styles.mascot}>🐻</Text>
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

      {/* Tips */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Spelling Tip</Text>
        <Text style={styles.tipText}>
          Break long words into smaller parts. Say each syllable out loud before you write it!
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingTop: 60, gap: 20, paddingBottom: 40 },

  header: { alignItems: 'center', gap: 4, marginBottom: 4 },
  mascot: { fontSize: 56, marginTop: 8 },
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