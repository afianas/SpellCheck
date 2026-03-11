
# 🐻 AI Spelling Tutor

An AI-powered mobile spelling tutor app built with React Native and Expo, backed by a FastAPI server running a hybrid DistilBERT + character-level inference pipeline.

---

## 📱 Features

- 🎧 Listen to words spoken aloud via text-to-speech
- ✅ Real-time spelling error detection across 4 error types
- 📈 Adaptive difficulty — auto-advances from Easy → Medium → Hard
- 🔥 Daily streak tracking
- 💡 Hints system
- 📊 Progress tracking with accuracy stats
- ✨ Word of the Day with offline fallback
- 🎉 Confetti animation on correct answers

---

## 🧠 Tech Stack

### Mobile
- React Native + Expo SDK 54
- TypeScript
- Expo Router (file-based navigation)
- Zustand (state management)
- Axios
- expo-av (audio)
- AsyncStorage (local persistence)

### Backend
- Python 3.12
- FastAPI + Uvicorn
- pyttsx3 (text-to-speech)
- Ngrok (dev tunneling)

### AI / ML
- DistilBERT (HuggingFace Transformers) — context-aware spelling classification
- PyTorch — model inference
- Scikit-learn Logistic Regression — character-level error type classification
- CountVectorizer with char n-grams — feature extraction
- Custom hybrid pipeline: dictionary → common misspellings → BERT → char model

---
## 🗺 App Flow
<img width="875" height="697" alt="Screenshot 2026-03-11 223937" src="https://github.com/user-attachments/assets/4334d518-2002-4e25-b0e6-f675b7a2a8e3" />


## 🏗 Architecture

<img width="877" height="567" alt="Screenshot 2026-03-11 223843" src="https://github.com/user-attachments/assets/bd62b093-0402-4e50-9ea0-653376747141" />


## 🗂 Project Structure


AI-Spelling-Tutor/
├── api_server.py              ← FastAPI backend
├── src/
│   ├── hybrid_inference.py    ← DistilBERT + char-level pipeline
│   ├── word_bank.py           ← Word selection by difficulty
│   └── tts.py                 ← Text-to-speech
├── data/correct_words.txt
├── models/char_model/
├── distilbert_spelling/
└── mobile_app/
    ├── app/
    │   ├── _layout.tsx
    │   ├── feedback.tsx
    │   └── (tabs)/
    │       ├── index.tsx      ← Home
    │       ├── practice.tsx   ← Spelling practice
    │       └── progress.tsx   ← Stats & progress
    ├── components/
    ├── hooks/
    ├── services/
    ├── store/
    ├── types/
    └── utils/

---
## DEMO
 https://drive.google.com/file/d/1MT9RB3m0YGTVKr0dF5mG0qanV6kbEai8/view?usp=sharing 
## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/afianas/SpellCheck.git
cd AI-Spelling-Tutor
```

### 2. Set up Python environment

```bash
python -m venv .venv
.venv\Scripts\Activate.ps1       # Windows
# source .venv/bin/activate      # Mac/Linux

pip install -r requirements.txt
```

### 3. Start the backend

```bash
uvicorn api_server:app --host 0.0.0.0 --port 8000 --reload
```

### 4. Start ngrok tunnel

```bash
ngrok http 8000
```

Copy the ngrok URL (e.g. `https://xxxx.ngrok-free.app`)

### 5. Set up mobile app environment

```bash
cd mobile_app
```

Create a `.env` file:
```
EXPO_PUBLIC_API_URL=https://xxxx.ngrok-free.app
```

### 6. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 7. Add fonts

Download [Nunito](https://fonts.google.com/specimen/Nunito) and place these files in `mobile_app/assets/fonts/`:
- `Nunito-Regular.ttf`
- `Nunito-SemiBold.ttf`
- `Nunito-Bold.ttf`
- `Nunito-ExtraBold.ttf`

### 8. Start Expo

```bash
npx expo start --clear
```

Scan the QR code with Expo Go on your phone.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| POST | `/spellcheck` | Check spelling of a word |
| GET | `/word?difficulty=easy` | Get a random word |
| GET | `/word-of-day` | Get word of the day |
| GET | `/speak?word=hello` | Get TTS audio for a word |

---

## 🎮 How It Works

1. App fetches a word from the backend based on current difficulty
2. Word is spoken aloud via TTS through the `/speak` endpoint
3. User types what they heard
4. Backend runs the hybrid inference pipeline:
   - Dictionary lookup first
   - Common misspelling check
   - DistilBERT transformer classification
   - Character-level error type detection
5. Result returned with error type and suggestion
6. Progress saved locally — streak updates daily, difficulty advances after 5 correct answers

---

## 📊 Difficulty Progression

| Level | Words | Advances After |
|-------|-------|----------------|
| 🌱 Easy | 4 or fewer letters | 5 correct answers |
| 🌟 Medium | 5–7 letters | 5 correct answers |
| 🔥 Hard | 8+ letters | stays at Hard |

---

## ⚠️ Known Limitations

- Ngrok free tier URLs expire — update `.env` each session
- TTS uses pyttsx3 which requires the backend to be running
- No cloud sync — progress is stored on-device only

---

## 📄 License

MIT
```

The mobile application communicates with the backend AI models via API.




