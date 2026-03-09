import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

interface BadgeProps {
  label: string;
  color?: string;
  emoji?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  color = Colors.primary,
  emoji,
}) => (
  <View style={[styles.badge, { backgroundColor: color + '22', borderColor: color }]}>
    {emoji && <Text style={styles.emoji}>{emoji}</Text>}
    <Text style={[styles.label, { color }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    paddingHorizontal: 12,
    paddingVertical: 4,
    gap: 4,
    alignSelf: 'flex-start',
  },
  emoji: { fontSize: 13 },
  label: {
    fontFamily: 'Nunito-Bold',
    fontSize: 13,
  },
});