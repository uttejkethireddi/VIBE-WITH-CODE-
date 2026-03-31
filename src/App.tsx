/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#040f26] flex flex-col items-center justify-between p-4 md:p-8 relative overflow-hidden">
      {/* Background Neon Blobs */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* Header */}
      <header className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-center z-10 mb-8 gap-4">
        <h1 className="text-6xl md:text-8xl font-glitch tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)] animate-glitch">
          CSK SNAKE
        </h1>
        <div className="bg-blue-950/80 border border-yellow-500/50 px-6 py-2 rounded-xl shadow-[0_0_15px_rgba(250,204,21,0.2)]">
          <span className="text-blue-300 mr-2">SCORE</span>
          <span className="text-2xl font-bold text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]">
            {score}
          </span>
        </div>
      </header>

      {/* Game Area */}
      <main className="flex-1 flex items-center justify-center z-10 mb-8 w-full">
        <div className="relative p-1 rounded-xl bg-gradient-to-br from-yellow-500/40 to-blue-600/40 shadow-[0_0_40px_rgba(250,204,21,0.2)]">
          <div className="bg-[#020b1a] rounded-lg p-2 md:p-4">
            <SnakeGame score={score} setScore={setScore} />
          </div>
        </div>
      </main>

      {/* Footer / Music Player */}
      <footer className="w-full max-w-4xl z-10">
        <MusicPlayer />
      </footer>
    </div>
  );
}
