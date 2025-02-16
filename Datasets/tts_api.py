from fastapi import FastAPI
from TTS.api import TTS

import torch
import os

# Allow loading full model checkpoint (trusted source)
torch_load = torch.load
def safe_load(*args, **kwargs):
    kwargs['weights_only'] = False  # Force full model loading
    return torch_load(*args, **kwargs)

torch.load = safe_load  # Override torch.load

app = FastAPI()
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")

@app.get("/generate-voice/")
async def generate_voice(text: str, language: str = "en"):
    # Create the output directory if it doesn't exist
    output_dir = "generated_audio"
    os.makedirs(output_dir, exist_ok=True)

    output_path = os.path.join(output_dir, f"{language}.wav")

    try:
        # Using speaker_wav for voice cloning (replace with your voice sample)
        tts.tts_to_file(
            text=text,
            language=language,
            speaker_wav="sample_audio.wav",  # Replace with the path to your voice sample file
            file_path=output_path
        )

        return {"audio_file": output_path}

    except Exception as e:
        print(f"Error during TTS generation: {e}")
        return {"error": str(e)}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)