import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

const TRACKS = [
  {
    id: 1,
    title: "Neon Genesis",
    artist: "AI Synthbot Alpha",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Cyber Drift",
    artist: "AI Synthbot Beta",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Digital Horizon",
    artist: "AI Synthbot Gamma",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  }
];

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);

  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentTrack.url;
      if (isPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(console.error);
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const handleEnded = () => {
    nextTrack();
  };

  return (
    <div className="bg-blue-950/60 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-4 shadow-[0_0_20px_rgba(250,204,21,0.1)] flex flex-col md:flex-row items-center justify-between gap-4">
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        src={currentTrack.url}
      />

      {/* Track Info */}
      <div className="flex items-center gap-4 w-full md:w-1/3">
        <div className="w-12 h-12 shrink-0 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_0_10px_rgba(250,204,21,0.5)]">
          <Music className="text-blue-950 w-6 h-6" />
        </div>
        <div className="overflow-hidden">
          <h3 className="text-yellow-400 font-bold truncate drop-shadow-[0_0_5px_rgba(250,204,21,0.5)]">{currentTrack.title}</h3>
          <p className="text-blue-300/80 text-sm truncate">{currentTrack.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center w-full md:w-1/3 gap-3">
        <div className="flex items-center gap-6">
          <button onClick={prevTrack} className="text-blue-300 hover:text-yellow-400 transition-colors">
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 rounded-full bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-yellow-400 hover:bg-yellow-400 hover:text-blue-950 transition-all shadow-[0_0_15px_rgba(250,204,21,0.4)]"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
          </button>
          <button onClick={nextTrack} className="text-blue-300 hover:text-yellow-400 transition-colors">
            <SkipForward className="w-6 h-6" />
          </button>
        </div>
        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-blue-900/50 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-[0_0_10px_rgba(250,204,21,0.8)] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center justify-end gap-3 w-full md:w-1/3">
        <button onClick={() => setVolume(v => v === 0 ? 0.5 : 0)} className="text-blue-300 hover:text-yellow-400 transition-colors">
          {volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-24 h-1.5 bg-blue-900/50 rounded-full appearance-none cursor-pointer accent-yellow-500"
        />
      </div>
    </div>
  );
}
