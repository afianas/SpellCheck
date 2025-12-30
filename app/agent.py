from src.word_bank import pick_word
from src.hybrid_inference import hybrid_check

def agent_pick_word(history: dict):
    difficulty = history.get("difficulty", "easy")
    word = pick_word(difficulty)
    history["current_word"] = word
    return word


def tutoring_agent(user_input: str, history: dict):
    current_word = history["current_word"]

    # 1️⃣ Check spelling of what user typed
    result = hybrid_check(user_input)

    feedback = ""
    next_action = "new_word"

    # 2️⃣ If spelling incorrect OR word mismatch
    if (not result["correct"]) or (user_input != current_word):
        et = result["error_type"]

        if et == "letter_swap":
            feedback = "You swapped some letters. Try spelling it slowly."
            next_action = "repeat"

        elif et == "vowel_confusion":
            feedback = "The vowel sound is tricky here. Say it out loud."
            next_action = "repeat"

        elif et == "extra_letter":
            feedback = "You added an extra letter. Watch closely."
            next_action = "repeat"

        elif et == "letter_drop":
            feedback = "You missed a letter. Try again."
            next_action = "repeat"

        else:
            feedback = f"Almost! The correct spelling was **{current_word}**."
            next_action = "new_word"

        return {
            "correct": False,
            "feedback": feedback,
            "error_type": et,
            "next_action": next_action
        }

    # 3️⃣ Correct answer
    feedback = "Great job! 🎉"

    # Increase difficulty agentically
    if history["difficulty"] == "easy":
        history["difficulty"] = "medium"
    elif history["difficulty"] == "medium":
        history["difficulty"] = "hard"

    return {
        "correct": True,
        "feedback": feedback,
        "error_type": "none",
        "next_action": "new_word"
    }
