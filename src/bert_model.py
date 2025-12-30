import os
import torch
from transformers import DistilBertForSequenceClassification, DistilBertTokenizerFast

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "distilbert_spelling")

model = DistilBertForSequenceClassification.from_pretrained(MODEL_DIR)
tokenizer = DistilBertTokenizerFast.from_pretrained(MODEL_DIR)

model.eval()


def bert_predict(word):
    inputs = tokenizer(
        word,
        return_tensors="pt",
        truncation=True,
        padding=True,
        max_length=16
    )

    with torch.no_grad():
        outputs = model(**inputs)

    probs = torch.softmax(outputs.logits, dim=1)
    return probs[0][1].item()  # probability "correct"
