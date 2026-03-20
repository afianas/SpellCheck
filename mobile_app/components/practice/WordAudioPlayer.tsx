import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useAudio } from '../../hooks/useAudio';
import { Colors } from '../../constants/colors';

interface Props {
  word: string;
}

export const WordAudioPlayer: React.FC<Props> = ({ word }) => {
  const { playWord, isPlaying, isLoading, stop } = useAudio();

  return (
    <View style={styles.container}>
      {/* Normal speed button */}
      <TouchableOpacity
        style={[styles.btn, styles.btnPrimary, isPlaying && styles.btnActive]}
        onPress={() => playWord(word, false)}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        {isLoading ? (
          <ActivityIndicator color={Colors.white} size="small" />
        ) : (
          <Text style={styles.btnIcon}>{isPlaying ? '🔊' : '🎧'}</Text>
        )}
        <Text style={styles.btnLabel}>
          {isLoading ? 'Loading...' : isPlaying ? 'Playing...' : 'Play Word'}
        </Text>
      </TouchableOpacity>

      {/* Slow speed button */}
      <TouchableOpacity
        style={[styles.btn, styles.btnSlow]}
        onPress={() => playWord(word, true)}
        disabled={isLoading}
        activeOpacity={0.8}
      >
        <Text style={styles.btnIcon}>🐢</Text>
        <Text style={[styles.btnLabel, { color: Colors.secondary }]}>
          Play Slowly
        </Text>
      </TouchableOpacity>

      {/* Repeat button */}
      <TouchableOpacity
        style={styles.repeatBtn}
        onPress={() => playWord(word, false)}
        disabled={isLoading}
        activeOpacity={0.7}
      >
        <Text style={styles.repeatIcon}>🔁</Text>
        <Text style={styles.repeatLabel}>Repeat</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 18,
    gap: 10,
    borderWidth: 2.5,
  },
  btnPrimary: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primaryDark,
  },
  btnActive: {
    backgroundColor: Colors.primaryDark,
  },
  btnSlow: {
    backgroundColor: Colors.white,
    borderColor: Colors.secondary,
  },
  btnIcon: { fontSize: 24 },
  btnLabel: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: Colors.white,
  },
  repeatBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 4,
  },
  repeatIcon: { fontSize: 16 },
  repeatLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 14,
    color: Colors.textMuted,
  },
});