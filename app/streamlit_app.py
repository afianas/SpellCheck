import streamlit as st
import sys
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from app.agent import tutoring_agent, agent_pick_word
from src.tts import speak

st.set_page_config(page_title="AI Spelling Tutor", layout="centered")

# ---------------- SESSION STATE ----------------
if "history" not in st.session_state:
    st.session_state.history = {
        "difficulty": "easy",
        "current_word": None
    }

# ---------------- UI ----------------
st.title("🎓 AI Spelling Tutor")
st.subheader(f"Difficulty: {st.session_state.history['difficulty'].capitalize()}")

# Pick word if not exists
if st.session_state.history["current_word"] is None:
    st.session_state.history["current_word"] = agent_pick_word(
        st.session_state.history
    )

# 🔊 Speak button
if st.button("🔊 Tell me the word"):
    audio = speak(st.session_state.history["current_word"])
    st.audio(audio)

user_input = st.text_input("Type the word you heard:")

if st.button("Submit"):
    response = tutoring_agent(user_input.lower(), st.session_state.history)

    if response["correct"]:
        st.success("✅ Correct!")
        st.balloons()
        st.session_state.history["current_word"] = agent_pick_word(
            st.session_state.history
        )
    else:
        st.error("❌ Incorrect")
        st.info(f"🧠 Error type: {response['error_type']}")
        st.warning(response["feedback"])

# New word button
if st.button("🔁 New word"):
    st.session_state.history["current_word"] = agent_pick_word(
        st.session_state.history
    )
