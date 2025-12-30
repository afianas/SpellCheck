import joblib
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Load char-level models
binary_model = joblib.load(
    os.path.join(BASE_DIR, "models/char_model/spelling_binary_model.pkl")
)
binary_vectorizer = joblib.load(
    os.path.join(BASE_DIR, "models/char_model/spelling_binary_vectorizer.pkl")
)

error_model = joblib.load(
    os.path.join(BASE_DIR, "models/char_model/spelling_error_model.pkl")
)
error_vectorizer = joblib.load(
    os.path.join(BASE_DIR, "models/char_model/spelling_error_vectorizer.pkl")
)

# Load dictionary
with open(os.path.join(BASE_DIR, "data/correct_words.txt")) as f:
    DICTIONARY = set(w.strip().lower() for w in f if w.strip())


ERROR_NAMES = {
    0: "correct",
    1: "letter_drop",
    2: "letter_swap",
    3: "extra_letter",
    4: "vowel_confusion"
}


def char_check(word, threshold=0.6):
    word = word.lower()

    if word in DICTIONARY:
        return {
            "word": word,
            "correct": True,
            "confidence": 1.0,
            "error_type": "none"
        }

    X = binary_vectorizer.transform([word])
    prob_correct = binary_model.predict_proba(X)[0][1]

    if prob_correct > threshold:
        return {
            "word": word,
            "correct": True,
            "confidence": float(prob_correct),
            "error_type": "none"
        }

    X_err = error_vectorizer.transform([word])
    err_pred = error_model.predict(X_err)[0]

    return {
        "word": word,
        "correct": False,
        "confidence": float(prob_correct),
        "error_type": ERROR_NAMES[err_pred]
    }
