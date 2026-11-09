'use client';

import React, { useEffect, useState } from 'react';
import { AlertCircle } from 'lucide-react';

export function WebGLFallback({ children }: { children: React.ReactNode }) {
  const [hasWebGL, setHasWebGL] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') ||
        canvas.getContext('experimental-webgl');
      setHasWebGL(Boolean(gl));
    } catch {
      setHasWebGL(false);
    }
  }, []);

  if (hasWebGL === false) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07080b] p-6 text-center text-white">
        <div className="max-w-md p-8 border border-white/20 bg-white/5 space-y-4">
          <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
          <h2 className="text-xl font-light tracking-widest uppercase font-display">
            HARDWARE ACCELERATION REQUIRED
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed font-light">
            AUREX requires WebGL hardware acceleration to render the real-time 3D automotive environment. Please enable hardware acceleration in your browser settings.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

