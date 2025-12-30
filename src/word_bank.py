import random
from pathlib import Path

WORDS_FILE = Path("data/correct_words.txt")

def load_words():
    with open(WORDS_FILE, "r") as f:
        words = [w.strip().lower() for w in f if w.strip()]
    return words

ALL_WORDS = load_words()

EASY_WORDS = [w for w in ALL_WORDS if len(w) <= 4]
MEDIUM_WORDS = [w for w in ALL_WORDS if 5 <= len(w) <= 7]
HARD_WORDS = [w for w in ALL_WORDS if len(w) > 7]

def pick_word(difficulty="easy"):
    if difficulty == "medium":
        return random.choice(MEDIUM_WORDS)
    elif difficulty == "hard":
        return random.choice(HARD_WORDS)
    return random.choice(EASY_WORDS)
