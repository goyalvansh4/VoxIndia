const path = require("path");
const fs = require("fs");
const axios = require("axios");

const createVoice = async (req, res) => {
    try {
        const response = await axios({
            method: "get",
            url: `http://YOUR_FASTAPI_SERVER_IP:8000/generate-voice/`,
            params: { text:"Hello World", language:"en" },
            responseType: "stream", // Important: Receive as stream
        });

        // Define file path
        const filePath = `./received_audio/${language}.wav`;

        // Ensure directory exists
        if (!fs.existsSync("./received_audio")) {
            fs.mkdirSync("./received_audio");
        }

        // Save the file
        const writer = fs.createWriteStream(filePath);
        response.data.pipe(writer);

        writer.on("finish", () => {
            console.log(`Audio file saved: ${filePath}`);
        });

    } catch (error) {
        console.error("Error fetching TTS audio:", error.message);
    }
};

module.exports = { createVoice };
