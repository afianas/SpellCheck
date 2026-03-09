import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';

interface StreakCounterProps {
  streak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({ streak }) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (streak > 0) {
      Animated.sequence([
        Animated.spring(pulseAnim, { toValue: 1.15, useNativeDriver: true }),
        Animated.spring(pulseAnim, { toValue: 1, useNativeDriver: true }),
      ]).start();
    }
  }, [streak]);

  const getMessage = () => {
    if (streak === 0) return 'Start your streak!';
    if (streak < 3) return 'Keep going! 💪';
    if (streak < 7) return "You're on fire! 🔥";
    if (streak < 15) return 'Unstoppable! ⚡';
    return 'LEGENDARY! 👑';
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.streakBubble, { transform: [{ scale: pulseAnim }] }]}
      >
        <Text style={styles.streakEmoji}>🔥</Text>
        <Text style={styles.streakNumber}>{streak}</Text>
      </Animated.View>
      <Text style={styles.streakLabel}>Day Streak</Text>
      <Text style={styles.streakMessage}>{getMessage()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 6 },
  streakBubble: {
    backgroundColor: Colors.primary,
    borderRadius: 60,
    width: 110,
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.primaryDark,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
  },
  streakEmoji: { fontSize: 28 },
  streakNumber: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 36,
    color: Colors.white,
    lineHeight: 40,
  },
  streakLabel: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.textSecondary,
  },
  streakMessage: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.primary,
  },
});