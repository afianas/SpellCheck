import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Difficulty } from '../../types';
import { Colors } from '../../constants/colors';
import { DIFFICULTY_CONFIG } from '../../constants/difficulty';

interface Props {
  current: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = ['easy', 'medium', 'hard'];

export const DifficultySelector: React.FC<Props> = ({ current, onChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Choose Difficulty</Text>
      <View style={styles.row}>
        {DIFFICULTIES.map((d) => {
          const config = DIFFICULTY_CONFIG[d];
          const isActive = current === d;
          return (
            <TouchableOpacity
              key={d}
              style={[
                styles.btn,
                { borderColor: config.color },
                isActive && { backgroundColor: config.color },
              ]}
              onPress={() => onChange(d)}
              activeOpacity={0.75}
            >
              <Text style={styles.btnEmoji}>{config.emoji}</Text>
              <Text
                style={[
                  styles.btnLabel,
                  { color: isActive ? Colors.white : config.color },
                ]}
              >
                {config.label}
              </Text>
              <Text
                style={[
                  styles.btnStars,
                  { opacity: isActive ? 1 : 0.5 },
                ]}
              >
                {'⭐'.repeat(config.stars)}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  label: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: Colors.textSecondary,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  btn: {
    flex: 1,
    borderWidth: 2.5,
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.white,
  },
  btnEmoji: { fontSize: 20 },
  btnLabel: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 14,
  },
  btnStars: { fontSize: 10 },
});