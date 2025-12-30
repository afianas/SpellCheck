# src/hybrid_inference.py

import joblib
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast

# --------------------------------------------------
# Load DICTIONARY
# --------------------------------------------------

with open("data/correct_words.txt") as f:
    DICTIONARY = set(
        w.strip().lower()
        for w in f
        if w.strip().isalpha()
    )

# --------------------------------------------------
# Common misspellings (high-confidence overrides)
# --------------------------------------------------

COMMON_MISSPELLINGS = {
    "definately": "definitely",
    "seperate": "separate",
    "recieve": "receive",
    "goverment": "government",
    "occured": "occurred",
    "untill": "until",
    "wich": "which"
}

# --------------------------------------------------
# Load Char-Level Models
# --------------------------------------------------

binary_model = joblib.load(
    "models/char_model/spelling_binary_model.pkl"
)
binary_vectorizer = joblib.load(
    "models/char_model/spelling_binary_vectorizer.pkl"
)

error_model = joblib.load(
    "models/char_model/spelling_error_model.pkl"
)
error_vectorizer = joblib.load(
    "models/char_model/spelling_error_vectorizer.pkl"
)

ERROR_NAMES = {
    0: "correct",
    1: "letter_drop",
    2: "letter_swap",
    3: "extra_letter",
    4: "vowel_confusion"
}

# --------------------------------------------------
# Load DistilBERT Model
# --------------------------------------------------

BERT_DIR = "distilbert_spelling"

bert_model = DistilBertForSequenceClassification.from_pretrained(BERT_DIR)
bert_tokenizer = DistilBertTokenizerFast.from_pretrained(BERT_DIR)
bert_model.eval()

# --------------------------------------------------
# DistilBERT Prediction
# --------------------------------------------------

def bert_predict(word: str) -> float:
    """
    Returns probability that the word is CORRECT
    """
    inputs = bert_tokenizer(
        word,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=16
    )

    with torch.no_grad():
        outputs = bert_model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)
    return probs[0][1].item()  # LABEL_1 = correct

# --------------------------------------------------
# Char-Level Prediction
# --------------------------------------------------

def char_predict(word: str, threshold: float = 0.6):
    X = binary_vectorizer.transform([word])
    prob_correct = binary_model.predict_proba(X)[0, 1]

    if prob_correct >= threshold:
        return {
            "correct": True,
            "confidence": float(prob_correct),
            "error_type": "none"
        }

    X_err = error_vectorizer.transform([word])
    error_pred = error_model.predict(X_err)[0]

    return {
        "correct": False,
        "confidence": float(prob_correct),
        "error_type": ERROR_NAMES[error_pred]
    }

# --------------------------------------------------
# Hybrid Inference (FINAL DECISION)
# --------------------------------------------------

def hybrid_check(
    word: str,
    bert_threshold: float = 0.3,
    char_threshold: float = 0.6
):
    word = word.lower().strip()

    # 1️⃣ Dictionary (highest trust)
    if word in DICTIONARY:
        return {
            "word": word,
            "correct": True,
            "confidence": 1.0,
            "source": "dictionary",
            "error_type": "none"
        }

    # 2️⃣ Known common misspellings
    if word in COMMON_MISSPELLINGS:
        return {
            "word": word,
            "correct": False,
            "confidence": 1.0,
            "source": "common_misspelling",
            "error_type": "common_misspelling",
            "suggestion": COMMON_MISSPELLINGS[word]
        }

    # 3️⃣ DistilBERT plausibility
    bert_conf = bert_predict(word)

    # 4️⃣ Char-level spelling analysis
    char_result = char_predict(word, threshold=char_threshold)

    # 5️⃣ Final decision logic
    if bert_conf < bert_threshold and not char_result["correct"]:
        return {
            "word": word,
            "correct": False,
            "confidence": max(bert_conf, char_result["confidence"]),
            "source": "bert + char",
            "error_type": char_result["error_type"]
        }

    if not char_result["correct"]:
        return {
            "word": word,
            "correct": False,
            "confidence": char_result["confidence"],
            "source": "char",
            "error_type": char_result["error_type"]
        }

    return {
        "word": word,
        "correct": True,
        "confidence": max(bert_conf, char_result["confidence"]),
        "source": "bert + char",
        "error_type": "none"
    }
