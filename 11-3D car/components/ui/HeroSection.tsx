'use client';

import React from 'react';
import { ArrowDown, ChevronRight, Compass } from 'lucide-react';
import { configuratorStore } from '@/lib/configuratorStore';

export function HeroSection() {
  const handleScrollTo = (id: string, configurator = false) => {
    if (configurator) {
      configuratorStore.setConfiguratorMode(true);
    }
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 pointer-events-none"
    >
      {/* Top Meta Header */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-start pt-6">
        <div className="space-y-1">
          <div className="text-[10px] md:text-[11px] font-mono tracking-[0.3em] text-slate-400 uppercase">
            TYPE 992 // SPECIFICATION GT
          </div>
          <div className="text-xs font-mono text-slate-400 tracking-wider">
            ATMOSPHERIC 4.0L // 518 HP // 9,000 RPM
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-3 text-[11px] font-mono text-slate-400 tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>3D TELEMETRY LIVE</span>
        </div>
      </div>

      {/* Main Center Typography */}
      <div className="max-w-7xl mx-auto w-full my-auto py-12 md:py-24">
        <div className="max-w-2xl space-y-6">
          <div className="inline-flex items-center space-x-3 px-3 py-1 bg-white/5 border border-white/10 text-[10px] font-mono tracking-[0.25em] text-slate-300 uppercase">
            <span>CHASSIS NO. 01 / SERIES PRODUCTION</span>
          </div>

          <div className="space-y-2">
            <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-[0.15em] text-white uppercase font-display leading-tight">
              AUREX
            </h1>
            <p className="text-xl sm:text-2xl lg:text-3xl font-extralight tracking-[0.2em] text-slate-300 uppercase">
              ENGINEERED TO MOVE.
            </p>
          </div>

          <p className="text-sm md:text-base font-light tracking-wide text-slate-400 max-w-lg leading-relaxed">
            &ldquo;Performance is not a destination. It is a pursuit.&rdquo;
          </p>

          {/* Dual Minimal CTA Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 pointer-events-auto">
            <button
              onClick={() => handleScrollTo('#configurator', true)}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-white text-black text-xs font-mono tracking-[0.25em] uppercase hover:bg-slate-200 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            >
              <span>EXPLORE THE MACHINE</span>
              <Compass className="w-4 h-4 transition-transform duration-300 group-hover:rotate-45" />
            </button>

            <button
              onClick={() => handleScrollTo('#showcase', false)}
              className="group flex items-center justify-center space-x-3 px-8 py-4 bg-transparent border border-white/20 text-white text-xs font-mono tracking-[0.25em] uppercase hover:border-white hover:bg-white/5 transition-all duration-300"
            >
              <span>DISCOVER PERFORMANCE</span>
              <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Telemetry & Scroll Indicator */}
      <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-6 space-y-4 sm:space-y-0">
        {/* Quick Spec Highlights */}
        <div className="grid grid-cols-3 gap-6 md:gap-12 text-left">
          <div>
            <div className="text-lg md:text-xl font-light text-white font-mono tracking-wider">3.2s</div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">0 – 100 KM/H</div>
          </div>
          <div>
            <div className="text-lg md:text-xl font-light text-white font-mono tracking-wider">518 HP</div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">OUTPUT</div>
          </div>
          <div>
            <div className="text-lg md:text-xl font-light text-white font-mono tracking-wider">296 KM/H</div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">TOP SPEED</div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          onClick={() => handleScrollTo('#showcase', false)}
          className="flex items-center space-x-3 cursor-pointer group pointer-events-auto"
        >
          <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 group-hover:text-white uppercase transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-7 h-7 rounded-full border border-white/20 flex items-center justify-center group-hover:border-white transition-colors">
            <ArrowDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white animate-bounce transition-colors" />
          </div>
        </div>
      </div>
    </section>
  );
}

