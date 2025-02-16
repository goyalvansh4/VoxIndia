const path = require("path");
const fs = require("fs");
const gTTS = require("gtts");

// Define language options with gender preferences
const languageOptions = {
    "en-male": "en-us", // Default English Male (US)
    "en-female": "en-uk", // English Female (UK Accent)
    "hi-male": "hi", // Hindi Male
    "hi-female": "hi-in", // Hindi Female
    "es-male": "es", // Spanish Male
    "es-female": "es-es", // Spanish Female
};


const createVoice = async (req, res) => {
    const { text, language, gender } = req.body;

    if (!text || !language || !gender) {
        return res.status(400).json({ error: "Text, language, and gender are required" });
    }

    // Choose the correct language variant
    const selectedLanguage = languageOptions[`${language}-${gender}`];
    if (!selectedLanguage) {
        return res.status(400).json({ error: "Invalid language or gender selection" });
    }

    try {
        const tts = new gTTS(text, selectedLanguage);
        const filePath = path.join(__dirname, "output.mp3");

        // Save audio file
        tts.save(filePath, (err) => {
            if (err) {
                console.error("Error saving audio:", err);
                return res.status(500).json({ error: "Failed to generate speech" });
            }

            // Send the generated file
            res.sendFile(filePath, (err) => {
                if (err) {
                    console.error("Error sending file:", err);
                }
                // Optional: Delete the file after response
                setTimeout(() => fs.unlinkSync(filePath), 5000);
            });
        });

    } catch (error) {
        console.error("TTS Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = {createVoice}

