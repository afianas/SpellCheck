import tempfile
import os

def speak(text: str) -> str:
    import pyttsx3
    
    fd, path = tempfile.mkstemp(suffix=".wav")
    os.close(fd)

    engine = pyttsx3.init()
    engine.save_to_file(text, path)
    engine.runAndWait()
    engine.stop()

    return path