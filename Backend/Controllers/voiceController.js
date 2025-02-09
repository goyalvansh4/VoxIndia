const { spawn } = require("child_process");
const path = require("path");

const createVoice = async (req, res) => {
  const { text, language, speaker_id } = req.body;

    if (!text) {
        return res.status(400).json({ error: "Text is required" });
    }

    // Run the Python script using child_process
    const pythonProcess = spawn("python", [path.join(__dirname, "../utils/voicegenerator.py")]);

    // Send data to Python script
    pythonProcess.stdin.write(JSON.stringify({ text, language, speaker_id }));
    pythonProcess.stdin.end();

    let result = "";

    // Read output from Python script
    pythonProcess.stdout.on("data", (data) => {
        result += data.toString();
    });

    pythonProcess.stdout.on("end", () => {
        try {
            const response = JSON.parse(result);
            res.json(response);
        } catch (error) {
            res.status(500).json({ error: "Failed to parse Python response" });
        }
    });

    pythonProcess.stderr.on("data", (data) => {
        console.error("Python Error:", data.toString());
    });

    pythonProcess.on("error", (error) => {
        console.error("Error executing Python script:", error);
        res.status(500).json({ error: "Python execution failed" });
    });
}

module.exports = {createVoice}

