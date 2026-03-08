import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { generateHint } from '../../utils/hintGenerator';
import { Colors } from '../../constants/colors';

interface HintRevealProps {
  word: string;
  onHintUsed?: () => void;
}

type HintLevel = 'hidden' | 'partial' | 'full';

export const HintReveal: React.FC<HintRevealProps> = ({ word, onHintUsed }) => {
  const [level, setLevel] = useState<HintLevel>('hidden');
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  const reveal = (nextLevel: HintLevel) => {
    setLevel(nextLevel);
    onHintUsed?.();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const hint = generateHint(word, 2);

  return (
    <View style={styles.container}>
      {level === 'hidden' && (
        <TouchableOpacity onPress={() => reveal('partial')} style={styles.hintBtn}>
          <Text style={styles.hintBtnText}>💡 Show Hint</Text>
        </TouchableOpacity>
      )}

      {level === 'partial' && (
        <Animated.View style={[styles.hintBox, { opacity: fadeAnim }]}>
          <Text style={styles.hintLabel}>Hint:</Text>
          <Text style={styles.hintText}>{hint}</Text>
          <TouchableOpacity onPress={() => reveal('full')} style={styles.revealBtn}>
            <Text style={styles.revealBtnText}>👁 Reveal Word</Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      {level === 'full' && (
        <Animated.View style={[styles.revealBox, { opacity: fadeAnim }]}>
          <Text style={styles.hintLabel}>The word was:</Text>
          <Text style={styles.revealWord}>{word}</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 8 },
  hintBtn: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 50,
    backgroundColor: Colors.hint + '22',
    borderWidth: 2,
    borderColor: Colors.hint,
  },
  hintBtnText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 16,
    color: Colors.hint,
  },
  hintBox: {
    alignItems: 'center',
    backgroundColor: Colors.hint + '11',
    borderRadius: 16,
    padding: 16,
    gap: 8,
    width: '100%',
  },
  hintLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textSecondary,
  },
  hintText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 26,
    color: Colors.hint,
    letterSpacing: 8,
  },
  revealBtn: {
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 50,
    backgroundColor: Colors.hint,
    marginTop: 4,
  },
  revealBtnText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 14,
    color: Colors.white,
  },
  revealBox: {
    alignItems: 'center',
    backgroundColor: Colors.hint + '22',
    borderRadius: 16,
    padding: 16,
    gap: 4,
    width: '100%',
  },
  revealWord: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 32,
    color: Colors.hint,
    letterSpacing: 3,
  },
});