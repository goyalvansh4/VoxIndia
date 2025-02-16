import React, { useState, useRef } from "react";

const Home = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en"); // Default to English
  const [gender, setGender] = useState("male"); // Default to Male
  const [loading, setLoading] = useState(false);
  const audioRef = useRef(null);

  // Language Options with Labels
  const languageOptions = [
    { code: "en", label: "English" },
    { code: "hi", label: "Hindi" },
    { code: "es", label: "Spanish" },
  ];

  // Gender Options
  const genderOptions = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ];

  const handleGenerateSpeech = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    setAudioUrl(null); // Clear previous audio before generating new one

    try {
      const response = await fetch("http://localhost:3000/api/v1/generate-voice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language, gender }),
      });

      if (!response.ok) throw new Error("Failed to generate speech");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      setAudioUrl(url);
      setText(""); // Clear input field

      // Play audio automatically
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play();
      }
    } catch (error) {
      console.error("Error generating audio:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Text to Speech Converter</h1>

        {/* Audio Player */}
        {audioUrl && (
          <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-4">
            <audio ref={audioRef} controls className="w-full">
              <source src={audioUrl} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleGenerateSpeech} className="w-full max-w-lg flex flex-col gap-4 mt-6 bg-white p-6 rounded-lg shadow-md">
          
          {/* Text Input */}
          <input
            type="text"
            placeholder="Enter text..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
          />

          {/* Language Selector */}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          >
            {languageOptions.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.label}
              </option>
            ))}
          </select>

          {/* Gender Selector */}
          <div className="flex gap-4">
            {genderOptions.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value={opt.value}
                  checked={gender === opt.value}
                  onChange={() => setGender(opt.value)}
                  className="accent-blue-500"
                />
                {opt.label}
              </label>
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`p-2 text-white rounded-md ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={loading}
          >
            {loading ? "Generating..." : "Generate Speech"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default Home;