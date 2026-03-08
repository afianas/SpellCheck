import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';
import { ErrorType } from '../../types';
import { getErrorInfo } from '../../utils/errorMessages';

interface ResultCardProps {
  correct: boolean;
  userInput: string;
  correctWord: string;
  errorType: ErrorType;
  suggestion?: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  correct,
  userInput,
  correctWord,
  errorType,
  suggestion,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.7)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const errorInfo = getErrorInfo(errorType);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        tension: 120,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.card,
        correct ? styles.correctCard : styles.incorrectCard,
        { transform: [{ scale: scaleAnim }], opacity: opacityAnim },
      ]}
    >
      <Text style={styles.mainEmoji}>{correct ? '🎉' : errorInfo.emoji}</Text>

      <Text style={[styles.resultTitle, correct ? styles.correctText : styles.incorrectText]}>
        {correct ? 'Perfect!' : errorInfo.title}
      </Text>

      <Text style={styles.message}>
        {correct ? 'You nailed it! Great spelling!' : errorInfo.message}
      </Text>

      {!correct && (
        <View style={styles.diffContainer}>
          <View style={styles.diffRow}>
            <Text style={styles.diffLabel}>You wrote:</Text>
            <Text style={styles.userWord}>{userInput}</Text>
          </View>
          <Text style={styles.arrow}>↓</Text>
          <View style={styles.diffRow}>
            <Text style={styles.diffLabel}>Correct:</Text>
            <Text style={styles.correctWord}>{suggestion ?? correctWord}</Text>
          </View>
        </View>
      )}

      {!correct && errorInfo.tip ? (
        <View style={styles.tipBox}>
          <Text style={styles.tipText}>💬 {errorInfo.tip}</Text>
        </View>
      ) : null}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  correctCard: {
    backgroundColor: Colors.successLight,
    borderWidth: 3,
    borderColor: Colors.success,
  },
  incorrectCard: {
    backgroundColor: Colors.errorLight,
    borderWidth: 3,
    borderColor: Colors.error,
  },
  mainEmoji: { fontSize: 52 },
  resultTitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 28,
  },
  correctText: { color: Colors.success },
  incorrectText: { color: Colors.error },
  message: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  diffContainer: {
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 14,
    width: '100%',
  },
  diffRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  diffLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textMuted,
    width: 80,
  },
  userWord: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: Colors.error,
    textDecorationLine: 'line-through',
    letterSpacing: 2,
  },
  arrow: {
    fontSize: 20,
    color: Colors.textMuted,
  },
  correctWord: {
    fontFamily: 'Nunito-Bold',
    fontSize: 22,
    color: Colors.success,
    letterSpacing: 2,
  },
  tipBox: {
    backgroundColor: Colors.primary + '22',
    borderRadius: 12,
    padding: 12,
    width: '100%',
    marginTop: 4,
  },
  tipText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textPrimary,
    textAlign: 'center',
    lineHeight: 20,
  },
});