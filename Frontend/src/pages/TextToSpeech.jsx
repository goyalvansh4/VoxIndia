import React, { useState } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [language, setLanguage] = useState('en');
  const [voice, setVoice] = useState('default');
  const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerateSpeech = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setLoading(true);
    try {
      // Simulate fetching audio from an API
      setTimeout(() => {
        setAudio('sample-audio-url.mp3'); // Replace with real URL
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error generating speech", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-xl font-bold text-center mb-4">Text to Speech</h1>
        <form onSubmit={handleGenerateSpeech} className="relative space-y-4">
        <div className="flex justify-end space-x-2">
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
                className="p-1 border rounded-md text-sm"
              >
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="hi">Hindi</option>
                <option value="pa">Punjabi</option>
                <option value="fr">French</option>
              </select>
              <select 
                value={voice} 
                onChange={(e) => setVoice(e.target.value)} 
                className="p-1 border rounded-md text-sm"
              >
                <option value="default">Default Voice</option>
                <option value="male">Male Voice</option>
                <option value="female">Female Voice</option>
              </select>
            </div>
          <div className=" flex items-center">
            <textarea 
              placeholder="Enter the text..." 
              value={text} 
              onChange={(e) => setText(e.target.value)} 
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-40"
            />
            
          </div>
          <div className="flex items-center space-x-2">
            <button 
              type="submit" 
              className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex justify-center items-center w-1/3"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Speech'}
            </button>
          </div>
        </form>
        {audio && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
            <a href={audio} download className="block mt-2 text-center text-blue-500 hover:underline">Download MP3</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;