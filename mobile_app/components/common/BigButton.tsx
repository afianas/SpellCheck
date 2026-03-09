import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors } from '../../constants/colors';

interface BigButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  disabled?: boolean;
  loading?: boolean;
  emoji?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const BigButton: React.FC<BigButtonProps> = ({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  loading = false,
  emoji,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? Colors.white : Colors.primary} />
      ) : (
        <Text style={[styles.label, styles[`${variant}Label`], textStyle]}>
          {emoji ? `${emoji}  ${label}` : label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 58,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  primary: { backgroundColor: Colors.primary },
  secondary: { backgroundColor: Colors.secondary },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 2.5,
    borderColor: Colors.primary,
    shadowOpacity: 0,
    elevation: 0,
  },
  danger: { backgroundColor: Colors.error },
  disabled: { opacity: 0.5 },
  label: {
    fontSize: 18,
    fontFamily: 'Nunito-Bold',
    letterSpacing: 0.3,
  },
  primaryLabel: { color: Colors.white },
  secondaryLabel: { color: Colors.white },
  ghostLabel: { color: Colors.primary },
  dangerLabel: { color: Colors.white },
});