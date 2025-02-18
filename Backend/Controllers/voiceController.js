const path = require("path");
const fs = require("fs");
const axios = require("axios");

const createVoice = async (req, res) => {
    const { text, language } = req.query;  // Get text and language dynamically from query parameters

    if (!text || !language) {
        return res.status(400).send("Text and language parameters are required.");
    }

    try {
        const response = await axios({
            method: "get",
            url: `http://YOUR_FASTAPI_SERVER_IP:8000/generate-voice/`, // Replace with your actual FastAPI server URL
            params: { text: text, language: language },
            responseType: "stream",  // Important: Receive as stream
        });

        // Define file path dynamically
        const filePath = path.join(__dirname, `./received_audio/${language}.wav`);

        // Ensure directory exists
        if (!fs.existsSync("./received_audio")) {
            fs.mkdirSync("./received_audio");
        }

        // Save the file
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            console.log(`Audio file saved at: ${filePath}`);
            res.send({ message: "Audio file saved successfully", file_path: filePath });
        });

        writer.on("error", (err) => {
            console.error("Error saving file:", err.message);
            res.status(500).send("Error saving audio file.");
        });

    } catch (error) {
        console.error("Error fetching TTS audio:", error.message);
        res.status(500).send("Error generating audio file.");
    }
};

module.exports = { createVoice };
