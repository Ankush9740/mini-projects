'use client';

import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

export function LoadingScreen() {
  const { active, progress } = useProgress();
  const [mounted, setMounted] = useState(false);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Give a brief minimum duration for seamless transition
    const timer = setTimeout(() => {
      setMinTimeElapsed(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const isReady = (!active || progress >= 100) && minTimeElapsed;

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050608] text-white transition-all duration-1000 ease-out ${
        isReady ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background ambient radial highlight */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Brand Monogram */}
      <div className="relative flex flex-col items-center space-y-6">
        <div className="flex items-center space-x-3">
          <div className="w-2.5 h-2.5 bg-white rotate-45" />
          <h1 className="text-3xl md:text-4xl font-light tracking-[0.4em] uppercase text-white font-display">
            AUREX
          </h1>
          <div className="w-2.5 h-2.5 bg-white rotate-45" />
        </div>

        <p className="text-xs md:text-sm font-light tracking-[0.3em] uppercase text-slate-400">
          PREPARING YOUR EXPERIENCE
        </p>

        {/* Minimal Hairline Progress Bar */}
        <div className="w-56 md:w-72 h-[2px] bg-white/10 relative overflow-hidden mt-6">
          <div
            className="absolute left-0 top-0 bottom-0 bg-white transition-all duration-300 ease-out"
            style={{ width: `${Math.min(100, Math.max(progress, minTimeElapsed ? 100 : 35))}%` }}
          />
        </div>

        {/* Numeric Counter */}
        <div className="text-[11px] font-mono tracking-widest text-slate-400 pt-1">
          {Math.round(Math.min(100, Math.max(progress, minTimeElapsed ? 100 : 35)))}%
        </div>
      </div>

      {/* Engineering footnote */}
      <div className="absolute bottom-10 text-[10px] tracking-[0.25em] text-slate-400 uppercase font-mono">
        HIGH PERFORMANCE AUTOMOTIVE // ATELIER ED.
      </div>
    </div>
  );
}

