import pyttsx3
import tempfile
import os

_engine = pyttsx3.init()

def speak(text: str) -> str:
    fd, path = tempfile.mkstemp(suffix=".mp3")
    os.close(fd)

    _engine.save_to_file(text, path)
    _engine.runAndWait()

    return path
