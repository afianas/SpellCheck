import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Difficulty } from '../../types';
import { DIFFICULTY_CONFIG } from '../../constants/difficulty';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  size?: 'sm' | 'md' | 'lg';
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  size = 'md',
}) => {
  const config = DIFFICULTY_CONFIG[difficulty];
  const stars = '⭐'.repeat(config.stars);

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '22', borderColor: config.color }, styles[size]]}>
      <Text style={[styles.emoji, styles[`emoji_${size}`]]}>{config.emoji}</Text>
      <Text style={[styles.label, styles[`label_${size}`], { color: config.color }]}>
        {config.label}
      </Text>
      <Text style={[styles.stars, styles[`stars_${size}`]]}>{stars}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    borderWidth: 2,
    gap: 4,
    alignSelf: 'flex-start',
  },
  sm: { paddingHorizontal: 10, paddingVertical: 4 },
  md: { paddingHorizontal: 14, paddingVertical: 6 },
  lg: { paddingHorizontal: 18, paddingVertical: 10 },

  emoji: {},
  emoji_sm: { fontSize: 12 },
  emoji_md: { fontSize: 16 },
  emoji_lg: { fontSize: 20 },

  label: { fontFamily: 'Nunito-Bold' },
  label_sm: { fontSize: 12 },
  label_md: { fontSize: 14 },
  label_lg: { fontSize: 18 },

  stars: {},
  stars_sm: { fontSize: 10 },
  stars_md: { fontSize: 12 },
  stars_lg: { fontSize: 16 },
});