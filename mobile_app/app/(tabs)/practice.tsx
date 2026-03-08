import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useGameStore } from '../../store/gameStore';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import { useWord } from '../../hooks/useWord';
import { useProgress } from '../../hooks/useProgress';
import { WordAudioPlayer } from '../../components/practice/WordAudioPlayer';
import { SpellingInput } from '../../components/practice/SpellingInput';
import { HintReveal } from '../../components/practice/HintReveal';
import { DifficultyBadge } from '../../components/practice/DifficultyBadge';
import { ResultCard } from '../../components/feedback/ResultCard';
import { BigButton } from '../../components/common/BigButton';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';
import { SpellCheckResult } from '../../types';

type Phase = 'loading' | 'input' | 'result';

export default function PracticeScreen() {
  const { difficulty, setCurrentWord, incrementScore, incrementStreak, resetStreak, useHint } =
    useGameStore();
  const { wordData, isLoading: wordLoading, loadNextWord } = useWord();
  const { check, isChecking } = useSpellCheck();
  const { recordAttempt } = useProgress();

  const [phase, setPhase] = useState<Phase>('loading');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<SpellCheckResult | null>(null);
  const [hasError, setHasError] = useState(false);

  // Load first word on mount
  useEffect(() => {
    loadNextWord(difficulty);
  }, []);

  useEffect(() => {
    if (wordData) {
      setCurrentWord(wordData.word);
      setPhase('input');
      setUserInput('');
      setResult(null);
      setHasError(false);
    }
  }, [wordData]);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim() || !wordData) return;

    const res = await check(userInput, wordData.word);
    if (!res) return;

    // Agent logic: check if user typed the right word regardless of spell check
    const isCorrect = res.correct && userInput.toLowerCase().trim() === wordData.word.toLowerCase();

    const finalResult: SpellCheckResult = { ...res, correct: isCorrect };
    setResult(finalResult);
    setPhase('result');

    if (isCorrect) {
      incrementScore();
      incrementStreak();
    } else {
      resetStreak();
      setHasError(true);
    }

    await recordAttempt(isCorrect, difficulty);
  }, [userInput, wordData, difficulty]);

  const handleNextWord = useCallback(async () => {
    setPhase('loading');
    await loadNextWord(difficulty);
  }, [difficulty]);

  // ─── Loading ───────────────────────────────────────────────
  if (phase === 'loading' || wordLoading) {
    return (
      <View style={styles.centeredScreen}>
        <LoadingSpinner message="Loading next word..." />
      </View>
    );
  }

  // ─── Input phase ──────────────────────────────────────────
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.screenTitle}>✏️ Spelling Practice</Text>
          <DifficultyBadge difficulty={difficulty} size="sm" />
        </View>

        {phase === 'input' && wordData && (
          <>
            {/* Mascot prompt */}
            <View style={styles.promptBox}>
              <Text style={styles.mascot}>🐻</Text>
              <Text style={styles.promptText}>
                Listen carefully and spell the word!
              </Text>
            </View>

            {/* Audio player */}
            <WordAudioPlayer word={wordData.word} />

            {/* Input */}
            <SpellingInput
              value={userInput}
              onChange={setUserInput}
              onSubmit={handleSubmit}
              hasError={hasError}
            />

            {/* Hint */}
            <HintReveal word={wordData.word} onHintUsed={useHint} />

            {/* Submit */}
            <BigButton
              label="Check Spelling"
              emoji="✅"
              onPress={handleSubmit}
              loading={isChecking}
              disabled={!userInput.trim()}
            />

            {/* Skip */}
            <BigButton
              label="Skip Word"
              variant="ghost"
              onPress={handleNextWord}
            />
          </>
        )}

        {phase === 'result' && result && wordData && (
          <>
            {/* Result card */}
            <ResultCard
              correct={result.correct}
              userInput={userInput}
              correctWord={wordData.word}
              errorType={result.error_type}
              suggestion={result.suggestion}
            />

            {/* Next word */}
            <BigButton
              label={result.correct ? 'Next Word 🎯' : 'Try Another'}
              onPress={handleNextWord}
            />

            {/* Try again same word */}
            {!result.correct && (
              <BigButton
                label="Try This Word Again"
                variant="secondary"
                onPress={() => {
                  setPhase('input');
                  setUserInput('');
                  setResult(null);
                  setHasError(false);
                }}
              />
            )}
          </>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: Colors.background },
  content: { padding: 20, paddingTop: 56, gap: 18, paddingBottom: 40 },
  centeredScreen: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  screenTitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 22,
    color: Colors.textPrimary,
  },

  promptBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 16,
    gap: 12,
    borderWidth: 2,
    borderColor: Colors.border,
  },
  mascot: { fontSize: 36 },
  promptText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.textSecondary,
    flex: 1,
    lineHeight: 22,
  },
});