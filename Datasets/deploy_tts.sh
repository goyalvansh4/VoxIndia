#!/bin/bash

# Run the TTS API in the background
nohup python3 tts_api.py &

# Make the API publicly accessible using Cloudflare Tunnel
cloudflared tunnel --url http://localhost:8000
