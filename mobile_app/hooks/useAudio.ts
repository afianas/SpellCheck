import { useState, useCallback } from 'react';
import { Audio } from 'expo-av';
import { api } from '../services/api';

interface UseAudioReturn {
  isPlaying: boolean;
  isLoading: boolean;
  playWord: (word: string, slow?: boolean) => Promise<void>;
  stop: () => Promise<void>;
}

export const useAudio = (): UseAudioReturn => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const stop = useCallback(async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
    setIsPlaying(false);
  }, [sound]);

  const playWord = useCallback(
    async (word: string, slow: boolean = false) => {
      if (!word) return;
      await stop();
      setIsLoading(true);

      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
        });

        const audioUrl = `${api.defaults.baseURL}/speak?word=${encodeURIComponent(word)}${slow ? '&slow=true' : ''}`;

        console.log('[useAudio] Loading from:', audioUrl, slow ? '(slow)' : '(normal)');

        const { sound: newSound } = await Audio.Sound.createAsync(
          {
            uri: audioUrl,
            headers: {
              'ngrok-skip-browser-warning': 'true',
            },
          },
          {
            shouldPlay: true,
          }
        );

        setSound(newSound);
        setIsPlaying(true);

        newSound.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded && status.didJustFinish) {
            setIsPlaying(false);
            newSound.unloadAsync();
            setSound(null);
          }
        });
      } catch (err) {
        console.warn('[useAudio] Failed to play word:', err);
        setIsPlaying(false);
      } finally {
        setIsLoading(false);
      }
    },
    [stop]
  );

  return { isPlaying, isLoading, playWord, stop };
};