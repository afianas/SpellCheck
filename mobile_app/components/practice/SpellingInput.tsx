import React, { useRef } from 'react';
import { View, TextInput, Text, StyleSheet, Animated } from 'react-native';
import { Colors } from '../../constants/colors';

interface SpellingInputProps {
  value: string;
  onChange: (text: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  hasError?: boolean;
}

export const SpellingInput: React.FC<SpellingInputProps> = ({
  value,
  onChange,
  onSubmit,
  disabled = false,
  hasError = false,
}) => {
  const shakeAnim = useRef(new Animated.Value(0)).current;

  const shake = () => {
    Animated.sequence([
      Animated.timing(shakeAnim, { toValue: 10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -10, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: -8, duration: 60, useNativeDriver: true }),
      Animated.timing(shakeAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
    ]).start();
  };

  React.useEffect(() => {
    if (hasError) shake();
  }, [hasError]);

  return (
    <Animated.View
      style={[styles.wrapper, { transform: [{ translateX: shakeAnim }] }]}
    >
      <Text style={styles.label}>Type what you heard:</Text>
      <TextInput
        style={[styles.input, hasError && styles.inputError, disabled && styles.inputDisabled]}
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        returnKeyType="done"
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        editable={!disabled}
        placeholder="Type here..."
        placeholderTextColor={Colors.textMuted}
        selectionColor={Colors.primary}
      />
      <Text style={styles.charCount}>{value.length} letters</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    gap: 8,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 3,
    borderColor: Colors.border,
    borderRadius: 18,
    paddingHorizontal: 22,
    paddingVertical: 18,
    fontSize: 28,
    fontFamily: 'Nunito-Bold',
    color: Colors.textPrimary,
    textAlign: 'center',
    letterSpacing: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  inputError: {
    borderColor: Colors.error,
    backgroundColor: Colors.errorLight,
  },
  inputDisabled: {
    opacity: 0.6,
  },
  charCount: {
    fontFamily: 'Nunito-Regular',
    fontSize: 13,
    color: Colors.textMuted,
    textAlign: 'right',
  },
});