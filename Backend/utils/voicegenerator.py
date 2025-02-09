import sys
import json
from TTS.api import TTS

# Load the TTS model
tts_model = TTS("output/multi_language_model.pth")

def generate_voice(text, language, speaker_id):
    output_path = f"public/audio/generated_voice_{language}_{speaker_id}.wav"
    tts_model.tts_to_file(text=text, file_path=output_path, speaker=speaker_id, language=language)
    return output_path

if __name__ == "__main__":
    try:
        data = json.loads(sys.stdin.read())  # Read input from Node.js
        text = data["text"]
        language = data.get("language", "en")  # Default to English
        speaker_id = data.get("speaker_id", "default")

        file_path = generate_voice(text, language, speaker_id)

        # Print JSON response back to Node.js
        print(json.dumps({"file_path": file_path}))
    except Exception as e:
        print(json.dumps({"error": str(e)}))


