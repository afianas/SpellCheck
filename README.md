
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

```

AI-Spelling-Tutor/
├── api_server.py               ← FastAPI backend entry point
├── requirements.txt
├── data/
│   └── correct_words.txt       ← Word bank
├── src/
│   ├── hybrid_inference.py     ← DistilBERT + char-level pipeline
│   ├── bert_model.py           ← DistilBERT model loader
│   ├── char_model.py           ← Character-level classifier
│   ├── word_bank.py            ← Word selection by difficulty
│   └── tts.py                  ← Google TTS (gTTS)
├── models/
│   └── char_model/
│       ├── spelling_binary_model.pkl
│       ├── spelling_binary_vectorizer.pkl
│       ├── spelling_error_model.pkl
│       └── spelling_error_vectorizer.pkl
├── distilbert_spelling/        ← Fine-tuned DistilBERT weights
├── app/
│   ├── agent.py
│   └── streamlit_app.py        ← Streamlit web demo
├── mobile_app/
│   ├── app/
│   │   ├── (tabs)/
│   │   │   ├── index.tsx       ← Home screen
│   │   │   ├── practice.tsx    ← Spelling practice screen
│   │   │   └── progress.tsx    ← Progress & stats screen
│   │   ├── feedback.tsx
│   │   └── _layout.tsx
│   ├── components/
│   │   ├── common/             ← Badge, BigButton, LoadingSpinner
│   │   ├── feedback/           ← ConfettiEffect, ResultCard, ErrorExplanation
│   │   ├── home/               ← WordOfTheDay
│   │   ├── practice/           ← WordAudioPlayer, SpellingInput, HintReveal, DifficultySelector
│   │   └── progress/           ← StatCard, StreakCounter
│   ├── hooks/
│   │   ├── useAudio.ts
│   │   ├── useProgress.ts
│   │   ├── useSpellCheck.ts
│   │   └── useWord.ts
│   ├── services/
│   │   ├── api.ts
│   │   ├── spellcheck.ts
│   │   └── wordBank.ts
│   ├── store/
│   │   ├── gameStore.ts
│   │   └── progressStore.ts
│   ├── constants/              ← colors, typography, difficulty
│   ├── types/                  ← TypeScript interfaces
│   ├── utils/                  ← storage, hintGenerator, errorMessages
│   └── assets/
│       └── fonts/              ← Nunito font family
└── notebooks/
    └── spelling.ipynb          ← Model training notebook

---
```
## DEMO
 https://drive.google.com/file/d/1O8GErXYfHnrNbjWfsZ2txzJcwi-bJ9SW/view?usp=sharing 
 
## Screenshots

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 10px;">
  <img src="https://github.com/user-attachments/assets/0a3ba18d-6e3e-4393-8030-fb1e35a1ab04" style="width:100%; border-radius:10px;">
  <img src="https://github.com/user-attachments/assets/480be5ac-f13a-4a06-b0b4-87b43e4d4fd0" style="width:100%; border-radius:10px;">
  <img src="https://github.com/user-attachments/assets/48af6786-b456-4ad0-8567-10d2d0904158" style="width:100%; border-radius:10px;">
  <img src="https://github.com/user-attachments/assets/cbf57e96-4ace-4326-8e31-db17c83556a0" style="width:100%; border-radius:10px;">
  <img src="https://github.com/user-attachments/assets/5a3f8be9-aeec-44ef-bf4b-4ceb2cab65e0" style="width:100%; border-radius:10px;">
  <img src="https://github.com/user-attachments/assets/e42f9e06-92ff-44c4-a06d-1a460dc2bac4" style="width:100%; border-radius:10px;">
</div>
 
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




