'use client';

import React, { useEffect, useRef } from 'react';
import { useConfigurator } from '@/lib/configuratorStore';

export function SoundController() {
  const { soundEnabled } = useConfigurator();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element
    if (typeof window !== 'undefined') {
      const audio = new Audio('/audio/engine-ambient.mp3');
      audio.loop = true;
      audio.volume = 0.25;
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;

    if (soundEnabled) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('Audio autoplay prevented by browser policy:', err);
        });
      }
    } else {
      audioRef.current.pause();
    }
  }, [soundEnabled]);

  return null;
}

