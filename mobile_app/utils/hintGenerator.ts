export const generateHint = (word: string, revealCount = 2): string => {
  if (!word) return '';

  const letters = word.split('');
  const revealed = new Set<number>();

  // Always reveal first and last letter
  revealed.add(0);
  if (word.length > 1) revealed.add(word.length - 1);

  // Reveal middle letter for longer words
  if (revealCount >= 3 && word.length > 4) {
    revealed.add(Math.floor(word.length / 2));
  }

  return letters
    .map((letter, i) => (revealed.has(i) ? letter : '_'))
    .join(' ');
};