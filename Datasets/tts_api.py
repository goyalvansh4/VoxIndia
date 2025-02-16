from fastapi import FastAPI
from TTS.api import TTS

import torch

# Allow loading full model checkpoint (trusted source)
torch_load = torch.load
def safe_load(*args, **kwargs):
    kwargs['weights_only'] = False  # Force full model loading
    return torch_load(*args, **kwargs)

torch.load = safe_load  # Override torch.load

app = FastAPI()
tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")

@app.get("/generate-voice/")
def generate_voice(text: str, language: str = "hi"):
    output_path = f"generated_audio/{language}.wav"
    # tts.tts_to_file(text=text, language=language, file_path=output_path)
    tts.tts_to_file(text=text, language=language, speaker="p301", file_path=output_path)
    return {"audio_file": output_path}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
