import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Animated,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useGameStore } from '../../store/gameStore';
import { useProgressStore } from '../../store/progressStore';
import { useSpellCheck } from '../../hooks/useSpellCheck';
import { useWord } from '../../hooks/useWord';
import { WordAudioPlayer } from '../../components/practice/WordAudioPlayer';
import { SpellingInput } from '../../components/practice/SpellingInput';
import { HintReveal } from '../../components/practice/HintReveal';
import { DifficultyBadge } from '../../components/practice/DifficultyBadge';
import { DifficultySelector } from '../../components/practice/Difficultyselector';
import { ResultCard } from '../../components/feedback/ResultCard';
import { ConfettiEffect } from '../../components/feedback/ConfettiEffect';
import { BigButton } from '../../components/common/BigButton';
import { SpellCheckResult, Difficulty } from '../../types';

type Phase = 'loading' | 'input' | 'result';

export default function PracticeScreen() {
  const {
    difficulty,
    score,
    streak,
    setCurrentWord,
    setDifficulty,
    incrementScore,
    incrementStreak,
    resetStreak,
    useHint,
  } = useGameStore();

  const { recordAttempt, sessionCorrect } = useProgressStore();
  const { wordData, isLoading: wordLoading, loadNextWord } = useWord();
  const { check, isChecking } = useSpellCheck();

  const [phase, setPhase] = useState<Phase>('loading');
  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState<SpellCheckResult | null>(null);
  const [hasError, setHasError] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [levelUpMsg, setLevelUpMsg] = useState<string | null>(null);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false);
  const levelUpAnim = useRef(new Animated.Value(0)).current;

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

  const showLevelUp = (newDifficulty: Difficulty) => {
    if (newDifficulty !== difficulty) {
      setLevelUpMsg(`🎉 Level Up! Now on ${newDifficulty.toUpperCase()}`);
      Animated.sequence([
        Animated.timing(levelUpAnim, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.delay(2000),
        Animated.timing(levelUpAnim, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]).start(() => setLevelUpMsg(null));
    }
  };

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setShowDifficultyModal(false);
    setPhase('loading');
    loadNextWord(newDifficulty);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!userInput.trim() || !wordData) return;

    const res = await check(userInput, wordData.word);
    if (!res) return;

    const isCorrect =
      res.correct && userInput.toLowerCase().trim() === wordData.word.toLowerCase();

    const finalResult: SpellCheckResult = { ...res, correct: isCorrect };
    setResult(finalResult);
    setPhase('result');

    if (isCorrect) {
      incrementScore();
      incrementStreak();
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    } else {
      resetStreak();
      setHasError(true);
    }

    const newDifficulty = await recordAttempt(isCorrect, difficulty);

    if (newDifficulty !== difficulty) {
      setDifficulty(newDifficulty);
      showLevelUp(newDifficulty);
    }
  }, [userInput, wordData, difficulty]);

  const handleNextWord = useCallback(async () => {
    setPhase('loading');
    setShowConfetti(false);
    await loadNextWord(difficulty);
  }, [difficulty]);

  if (phase === 'loading' || wordLoading) {
    return (
      <View style={styles.centeredScreen}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading next word...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ConfettiEffect trigger={showConfetti} />

      {levelUpMsg && (
        <Animated.View style={[styles.levelUpBanner, { opacity: levelUpAnim }]}>
          <Text style={styles.levelUpText}>{levelUpMsg}</Text>
        </Animated.View>
      )}

      {/* Difficulty Selector Modal */}
      <Modal
        visible={showDifficultyModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowDifficultyModal(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowDifficultyModal(false)}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Choose Difficulty</Text>
            <DifficultySelector
              current={difficulty}
              onChange={handleDifficultyChange}
            />
            <TouchableOpacity
              style={styles.modalCancel}
              onPress={() => setShowDifficultyModal(false)}
            >
              <Text style={styles.modalCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar */}
        <View style={styles.topBar}>
          <Text style={styles.screenTitle}> ✏️ Practice</Text>
          <TouchableOpacity
            onPress={() => setShowDifficultyModal(true)}
            activeOpacity={0.8}
          >
            <DifficultyBadge difficulty={difficulty} size="sm" />
          </TouchableOpacity>
        </View>

        {/* Score strip */}
        <View style={styles.scoreStrip}>
          <View style={styles.scorePill}>
            <Text style={styles.scoreEmoji}>⭐</Text>
            <Text style={styles.scoreValue}>{score}</Text>
            <Text style={styles.scoreLabel}>Score</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scorePill}>
            <Text style={styles.scoreEmoji}>🔥</Text>
            <Text style={styles.scoreValue}>{streak}</Text>
            <Text style={styles.scoreLabel}>Streak</Text>
          </View>
          <View style={styles.scoreDivider} />
          <View style={styles.scorePill}>
            <Text style={styles.scoreEmoji}>📈</Text>
            <Text style={styles.scoreValue}>{sessionCorrect ?? 0}/5</Text>
            <Text style={styles.scoreLabel}>To level up</Text>
          </View>
        </View>

        {phase === 'input' && wordData && (
          <>
            <View style={styles.promptBox}>
              <Text style={styles.mascot}>🐻</Text>
              <Text style={styles.promptText}>
                Listen carefully and spell the word!
              </Text>
            </View>

            <WordAudioPlayer word={wordData.word} />

            <SpellingInput
              value={userInput}
              onChange={setUserInput}
              onSubmit={handleSubmit}
              hasError={hasError}
            />

            <HintReveal word={wordData.word} onHintUsed={useHint} />

            <BigButton
              label="Check Spelling"
              emoji="✅"
              onPress={handleSubmit}
              loading={isChecking}
              disabled={!userInput.trim()}
            />

            <BigButton
              label="Skip Word"
              variant="ghost"
              onPress={handleNextWord}
            />
          </>
        )}

        {phase === 'result' && result && wordData && (
          <>
            <ResultCard
              correct={result.correct}
              userInput={userInput}
              correctWord={wordData.word}
              errorType={result.error_type}
              suggestion={result.suggestion}
            />

            <BigButton
              label={result.correct ? 'Next Word 🎯' : 'Try Another'}
              onPress={handleNextWord}
            />

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
    gap: 12,
  },
  loadingText: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 16,
    color: Colors.textSecondary,
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
  scoreStrip: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: Colors.border,
  },
  scorePill: { alignItems: 'center', gap: 2, flex: 1 },
  scoreEmoji: { fontSize: 18 },
  scoreValue: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 20,
    color: Colors.textPrimary,
  },
  scoreLabel: {
    fontFamily: 'Nunito-SemiBold',
    fontSize: 11,
    color: Colors.textMuted,
  },
  scoreDivider: { width: 1.5, height: 32, backgroundColor: Colors.border },
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
  levelUpBanner: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: Colors.success,
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    zIndex: 100,
    shadowColor: Colors.success,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  levelUpText: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 18,
    color: Colors.white,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalBox: {
    backgroundColor: Colors.background,
    borderRadius: 28,
    padding: 24,
    width: '100%',
    gap: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 12,
  },
  modalTitle: {
    fontFamily: 'Nunito-ExtraBold',
    fontSize: 22,
    color: Colors.textPrimary,
    textAlign: 'center',
  },
  modalCancel: {
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  modalCancelText: {
    fontFamily: 'Nunito-Bold',
    fontSize: 15,
    color: Colors.textMuted,
  },
});