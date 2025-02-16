#!/bin/bash

# Update system and install dependencies
sudo apt update && sudo apt upgrade -y
sudo apt install python3 python3-pip git ffmpeg -y

# Install Coqui TTS
pip install TTS fastapi uvicorn
