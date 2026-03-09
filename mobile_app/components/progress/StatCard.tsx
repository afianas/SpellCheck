import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface StatCardProps {
  emoji: string;
  value: string | number;
  label: string;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  emoji,
  value,
  label,
  color = Colors.primary,
}) => (
  <View style={[styles.card, { borderColor: color + '44' }]}>
    <Text style={styles.emoji}>{emoji}</Text>
    <Text style={[styles.value, { color }]}>{value}</Text>
    <Text style={styles.label}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 18,
    alignItems: 'center',
    gap: 4,
    borderWidth: 2.5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: { fontSize: 30 },
  value: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 30,
  },
  label: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 13,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
});