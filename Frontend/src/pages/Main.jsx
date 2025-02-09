import React, { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Home from './Home';
import Navbar from '../components/Navbar';
import TextToSpeech from './TextToSpeech';
import Cookies from 'js-cookie'
import {Route, Routes, useNavigate } from 'react-router';

const Main = () => {

  

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <aside className="w-1/5 bg-gray-800 text-white p-4 shadow-lg">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<TextToSpeech />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Main;