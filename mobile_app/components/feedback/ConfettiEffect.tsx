import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const COLORS = ['#FFB830', '#4FC3F7', '#66BB6A', '#AB47BC', '#EF5350', '#FFA726'];
const PIECES = 20;

interface ConfettiPiece {
  x: Animated.Value;
  y: Animated.Value;
  opacity: Animated.Value;
  rotate: Animated.Value;
  color: string;
  size: number;
}

export const ConfettiEffect: React.FC<{ trigger: boolean }> = ({ trigger }) => {
  const pieces = useRef<ConfettiPiece[]>(
    Array.from({ length: PIECES }, () => ({
      x: new Animated.Value(Math.random() * width),
      y: new Animated.Value(-20),
      opacity: new Animated.Value(1),
      rotate: new Animated.Value(0),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: Math.random() * 10 + 6,
    }))
  ).current;

  useEffect(() => {
    if (!trigger) return;

    const animations = pieces.map((piece) => {
      piece.y.setValue(-20);
      piece.x.setValue(Math.random() * width);
      piece.opacity.setValue(1);
      piece.rotate.setValue(0);

      return Animated.parallel([
        Animated.timing(piece.y, {
          toValue: height * 0.6,
          duration: 1500 + Math.random() * 1000,
          useNativeDriver: true,
        }),
        Animated.timing(piece.rotate, {
          toValue: 360 * (Math.random() > 0.5 ? 1 : -1),
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(piece.opacity, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]);
    });

    Animated.stagger(50, animations).start();
  }, [trigger]);

  return (
    <View style={styles.container} pointerEvents="none">
      {pieces.map((piece, i) => (
        <Animated.View
          key={i}
          style={[
            styles.piece,
            {
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              transform: [
                { translateX: piece.x },
                { translateY: piece.y },
                {
                  rotate: piece.rotate.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
              opacity: piece.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
  },
  piece: {
    position: 'absolute',
    borderRadius: 3,
  },
});