import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ErrorType } from '../../types';
import { getErrorInfo } from '../../utils/errorMessages';
import { Colors } from '../../constants/colors';

interface ErrorExplanationProps {
  errorType: ErrorType;
  userInput: string;
  correctWord: string;
}

export const ErrorExplanation: React.FC<ErrorExplanationProps> = ({
  errorType,
  userInput,
  correctWord,
}) => {
  const info = getErrorInfo(errorType);

  if (errorType === 'none') return null;

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{info.emoji}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{info.title}</Text>
        <Text style={styles.message}>{info.message}</Text>
        {info.tip ? (
          <Text style={styles.tip}>💬 {info.tip}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.errorLight,
    borderRadius: 16,
    padding: 14,
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.error + '44',
    alignItems: 'flex-start',
  },
  emoji: { fontSize: 28, marginTop: 2 },
  textContainer: { flex: 1, gap: 4 },
  title: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.error,
  },
  message: {
    fontFamily: 'Nunito-Regular',
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  tip: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: Colors.textPrimary,
    marginTop: 4,
    lineHeight: 18,
  },
});