

# 🧠 SpellCheck – An Intelligent Learning Agent

An **AI-powered spelling tutor** designed as an intelligent learning agent rather than a traditional spell checker.
The system detects spelling mistakes, classifies error types, provides educational feedback, and adapts difficulty based on user performance.

This project was developed as part of the **IBM SkillsBuild – Applied Artificial Intelligence program**.

---

## 📌 Project Overview

Traditional spell checkers only indicate whether a word is correct or incorrect.
This project goes further by acting as a **learning-focused AI agent** that:

* Explains *why* a spelling is wrong
* Identifies the *type* of error
* Adapts difficulty to the learner
* Encourages improvement through feedback

---

## 🎯 Key Features

* Intelligent spelling correctness detection
* Error-type classification:

  * Letter swap
  * Letter drop
  * Extra letter
  * Vowel confusion
* Hybrid AI inference using:

  * Rule-based logic
  * Classical machine learning
  * Transformer-based deep learning
* Adaptive difficulty progression (easy → medium → hard)
* Text-to-speech word delivery
* Interactive Streamlit interface

---

## 🧠 AI Techniques Used

### Natural Language Processing (NLP)

* Character-level analysis using n-grams
* Enables detection of spelling patterns and unseen words

### Machine Learning

* Supervised learning using Logistic Regression
* Binary classification (correct vs incorrect spelling)
* Multi-class classification for error type detection

### Deep Learning (Transformers)

* DistilBERT fine-tuned for word plausibility detection
* Improves robustness and reduces false positives

### Hybrid AI System

* Combines dictionary rules, ML predictions, and transformer confidence
* Produces more reliable and explainable decisions

### AI Agent Logic

* Observes user input
* Decides feedback and next action
* Adapts difficulty based on performance

---

## ⚙️ Technology Stack

* **Language:** Python
* **ML:** Scikit-learn
* **Deep Learning:** Transformers (DistilBERT)
* **NLP:** Character n-grams
* **Frontend:** Streamlit
* **Development Platform:** Google Colab
* **Text-to-Speech:** pyttsx3
* **Model Storage:** Joblib

---

## 📊 Model Evaluation

| Model              | Metric      | Performance         |
| ------------------ | ----------- | ------------------- |
| Character-level ML | Accuracy    | ~70%                |
| Character-level ML | F1-score    | ~0.70               |
| DistilBERT         | Accuracy    | 90%+                |
| Hybrid System      | Reliability | Improved robustness |

---

## 🖥️ Running the Application

1. Clone the repository:

```bash
git clone https://github.com/yourusername/AI-Spelling-Tutor.git
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the Streamlit app:

```bash
streamlit run app/streamlit_app.py
```

---

## 📁 Project Structure

```
AI-Spelling-Tutor/
│
├── app/                  # Streamlit app & agent logic
├── src/                  # Core AI inference and utilities
├── models/               # Trained ML and transformer models
├── data/                 # Word lists and datasets
├── notebooks/            # Training and experimentation notebooks
├── requirements.txt
└── README.md
```

---
## 📦 Pretrained DistilBERT Model

Due to GitHub file size limitations, the fine-tuned DistilBERT model used in this project is hosted externally.

🔗 **Download the DistilBERT model from Google Drive:**  
[https://drive.google.com/drive/folders/1vtmAJMCh0IcBntfTnukbL9NPWSHHL0tn?usp=sharing]

### How to use the downloaded model:
1. Download and extract the folder from Google Drive.
2. Place the extracted folder in the project root directory.
3. Ensure the folder name matches the path used in the code (e.g., `distilbert_spelling/`).

Once downloaded and placed correctly, the application will load the model automatically.

## 🎓 Learning Outcomes

* Designed and implemented an AI agent
* Applied NLP and machine learning techniques
* Built a hybrid AI system
* Evaluated models using appropriate metrics
* Developed a real-world educational AI application

---
🛠️ Project Status: Under development. Features and updates coming soon.

## Project Versions

This repository contains multiple versions of the application:

- Streamlit prototype (initial AI spelling tutor)
- React Native mobile app (child-friendly learning interface) - work under progress

The mobile application communicates with the backend AI models via API.




