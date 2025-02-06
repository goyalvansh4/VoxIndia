import React, { useState } from 'react';

const Home = () => {
  const [audio, setAudio] = useState(null);
  const [text, setText] = useState('');
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
    <>
    <h1 className='text-3xl font-bold text-center'>Text To Speech</h1>
    <div className="flex flex-col items-center justify-center min-h-screen p-4 relative">
  
      <div className="p-6 rounded-lg w-full">
        
        {audio && (
          <div className="mt-4">
            <audio controls className="w-full">
              <source src={audio} type="audio/mp3" />
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
      <form onSubmit={handleGenerateSpeech} className="fixed bottom-4 w-full max-w-4xl flex gap-2 p-4 bg-white shadow-lg rounded-lg">
        <input 
          type="text" 
          placeholder="Enter the text..." 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          type="submit" 
          className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex justify-center items-center"
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Speech'}
        </button>
      </form>
    </div>
    </>
  );
};

export default Home;