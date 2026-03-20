import tempfile
import os

def speak(text: str, slow: bool = False) -> str:
    from gtts import gTTS

    fd, path = tempfile.mkstemp(suffix=".mp3")
    os.close(fd)

    tts = gTTS(text=text, lang='en', tld='us', slow=slow)
    tts.save(path)

    return path