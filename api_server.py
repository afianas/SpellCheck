# api_server.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from src.hybrid_inference import hybrid_check
from src.word_bank import pick_word
from src.tts import speak

app = FastAPI(title="AI Spelling Tutor API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class SpellCheckRequest(BaseModel):
    word: str
    target_word: str | None = None

class SpellCheckResponse(BaseModel):
    word: str
    correct: bool
    confidence: float
    source: str
    error_type: str
    suggestion: str | None = None

class WordResponse(BaseModel):
    word: str
    difficulty: str
    meaning: str | None = None
    example_sentence: str | None = None

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/spellcheck", response_model=SpellCheckResponse)
def spellcheck(body: SpellCheckRequest):
    result = hybrid_check(body.word)
    if body.target_word and body.word.lower().strip() != body.target_word.lower().strip():
        result["correct"] = False
        if result.get("error_type") == "none":
            result["error_type"] = "letter_swap"
    return SpellCheckResponse(**result)

@app.get("/word", response_model=WordResponse)
def get_word(difficulty: str = "easy"):
    if difficulty not in ("easy", "medium", "hard"):
        raise HTTPException(status_code=400, detail="difficulty must be easy, medium, or hard")
    word = pick_word(difficulty)
    return WordResponse(word=word, difficulty=difficulty)

@app.get("/word-of-day", response_model=WordResponse)
def word_of_day():
    import random
    from datetime import date
    rng = random.Random(str(date.today()))
    word = pick_word("medium")
    return WordResponse(word=word, difficulty="medium")

@app.get("/speak")
def speak_word(word: str):
    if not word or len(word) > 50:
        raise HTTPException(status_code=400, detail="Invalid word")
    audio_path = speak(word)
    return FileResponse(
        audio_path,
        media_type="audio/mpeg",
        filename=f"{word}.mp3",
    )