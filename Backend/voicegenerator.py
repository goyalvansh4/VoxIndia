from gtts import gTTS
import sys
import os

# Get text from command-line arguments
text = sys.argv[1] if len(sys.argv) > 1 else "Default text"

# Define the output folder
output_folder = os.path.join(os.path.dirname(os.path.abspath(__file__)), "output")

# Ensure the folder exists
os.makedirs(output_folder, exist_ok=True)

# Define the file path
file_path = os.path.join(output_folder, "output.mp3")

# Generate and save the TTS file
tts = gTTS(text=text, lang="en")
tts.save(file_path)

# Print the absolute path of the file so Node.js can find it
print(file_path)
