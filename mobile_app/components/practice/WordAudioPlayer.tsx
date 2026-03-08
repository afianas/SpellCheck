import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { useAudio } from '../../hooks/useAudio';
import { Colors } from '../../constants/colors';

interface WordAudioPlayerProps {
  word: string;
}

export const WordAudioPlayer: React.FC<WordAudioPlayerProps> = ({ word }) => {
  const { isPlaying, isLoading, playWord } = useAudio();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, { toValue: 0.92, useNativeDriver: true }),
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }),
    ]).start();
    playWord(word);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPress={handlePress}
          disabled={isLoading}
          activeOpacity={0.85}
          style={[styles.button, isPlaying && styles.buttonPlaying]}
        >
          <Text style={styles.icon}>{isLoading ? '⏳' : isPlaying ? '🔊' : '🎧'}</Text>
          <Text style={styles.label}>
            {isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Hear the Word'}
          </Text>
        </TouchableOpacity>
      </Animated.View>
      <TouchableOpacity onPress={handlePress} disabled={isLoading || isPlaying} style={styles.repeatBtn}>
        <Text style={styles.repeatText}>🔁 Repeat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', gap: 10 },
  button: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 18, paddingHorizontal: 36,
    borderRadius: 24, gap: 10,
    shadowColor: Colors.secondaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, shadowRadius: 8, elevation: 6,
  },
  buttonPlaying: { backgroundColor: Colors.secondaryDark },
  icon: { fontSize: 28 },
  label: { fontFamily: 'Nunito-Bold', fontSize: 20, color: Colors.white },
  repeatBtn: { paddingVertical: 8, paddingHorizontal: 16 },
  repeatText: { fontFamily: 'Nunito-SemiBold', fontSize: 15, color: Colors.textSecondary },
});