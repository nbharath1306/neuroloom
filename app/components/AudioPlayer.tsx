'use client';

import { useState, useEffect, useRef } from 'react';

interface AudioPlayerProps {
  text: string;
  title: string;
  onClose: () => void;
}

export default function AudioPlayer({ text, title, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Load available voices
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      
      // Prefer English voices, prioritize Google or natural-sounding ones
      const preferredVoice = availableVoices.find(v => 
        v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural'))
      ) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
      
      setSelectedVoice(preferredVoice);
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const speak = () => {
    if (!text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = speed;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      
      // Update progress
      const words = text.split(' ');
      const duration = (words.length / (150 * speed)) * 60 * 1000; // Estimate duration
      const increment = 100 / (duration / 100);
      
      intervalRef.current = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            return 100;
          }
          return prev + increment;
        });
      }, 100);
    };

    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
      setProgress(100);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const togglePlayPause = () => {
    if (!isPlaying && !isPaused) {
      speak();
    } else if (isPlaying) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      setIsPlaying(false);
    } else if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    }
  };

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const changeSpeed = (newSpeed: number) => {
    setSpeed(newSpeed);
    if (isPlaying || isPaused) {
      stop();
      setTimeout(() => speak(), 100);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-slideUp">
      <div className="glass-strong border-t" style={{ 
        borderColor: 'var(--border-color)',
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(20px)'
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-pulse">
                <span className="text-xl">🎙️</span>
              </div>
              <div>
                <div className="text-xs font-semibold" style={{ color: 'var(--accent-secondary)' }}>
                  NOW PLAYING
                </div>
                <div className="font-bold text-sm line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                  {title}
                </div>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-red-500/20 transition-all"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
              >
                {isPlaying ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>

              {/* Stop Button */}
              <button
                onClick={stop}
                className="w-10 h-10 rounded-full glass flex items-center justify-center hover:scale-110 transition-transform"
                style={{ color: 'var(--text-primary)' }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 6h12v12H6z" />
                </svg>
              </button>
            </div>

            {/* Speed Control */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
                Speed:
              </span>
              {[0.75, 1.0, 1.25, 1.5, 2.0].map(s => (
                <button
                  key={s}
                  onClick={() => changeSpeed(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    speed === s
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white scale-110'
                      : 'glass hover:scale-105'
                  }`}
                  style={speed !== s ? { color: 'var(--text-secondary)' } : {}}
                >
                  {s}x
                </button>
              ))}
            </div>

            {/* Status */}
            <div className="text-xs font-semibold px-3 py-1.5 rounded-full glass">
              <span style={{ color: isPlaying ? 'var(--accent-success)' : 'var(--text-muted)' }}>
                {isPlaying ? '🔊 Playing' : isPaused ? '⏸️ Paused' : '⏹️ Stopped'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
