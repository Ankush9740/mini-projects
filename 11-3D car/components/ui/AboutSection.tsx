'use client';

import React from 'react';
import { Award, Compass, Gauge, ShieldCheck, ArrowRight } from 'lucide-react';
import { configuratorStore } from '@/lib/configuratorStore';

export function AboutSection() {
  const handleConfiguratorClick = () => {
    configuratorStore.setConfiguratorMode(true);
    const target = document.querySelector('#configurator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="relative min-h-screen w-full py-28 px-6 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              <span>SECTION 04</span>
              <span>//</span>
              <span>THE ATELIER PHILOSOPHY</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-display">
              ENGINEERED WITHOUT COMPROMISE
            </h2>
          </div>

          <div className="mt-4 md:mt-0">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              ESTABLISHED IN STUTTGART & WEISSACH
            </div>
          </div>
        </div>

        {/* Editorial Narrative & Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Manifesto */}
          <div className="lg:col-span-7 bg-[#07080b]/85 backdrop-blur-md p-8 sm:p-12 border border-white/10 space-y-8 pointer-events-auto">
            <div className="space-y-4">
              <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
                THE AUREX DOCTRINE
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-white uppercase font-display leading-snug">
                WE DO NOT BUILD FOR THE MASSES. WE BUILD FOR THE DRIVER WHO DEMANDS PURITY.
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              In an era overwhelmed by synthetic power delivery, artificial engine soundtracks, and digital detachment, AUREX remains resolutely committed to raw mechanical honesty. Our machines are built around naturally aspirated, atmospheric flat-six engines that sing all the way to 9,000 RPM.
            </p>

            <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
              Every curve of the bodywork serves a functional aerodynamic purpose. No faux vents. No non-functional winglets. Only wind-tunnel-proven telemetry engineered to slice through the air and tether the chassis to the tarmac.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-white tracking-widest uppercase">
                  MARCUS V. STEINBACH
                </div>
                <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                  CHIEF AERODYNAMICIST & MOTORSPORT DIRECTOR
                </div>
              </div>

              <button
                onClick={handleConfiguratorClick}
                className="group flex items-center space-x-2 text-xs font-mono tracking-widest uppercase text-white hover:text-slate-300 transition-colors"
              >
                <span>CUSTOMISE YOUR MACHINE</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* Pillars of Engineering */}
          <div className="lg:col-span-5 space-y-4 pointer-events-auto">
            <div className="bg-[#07080b]/85 backdrop-blur-md p-6 border border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                <Gauge className="w-5 h-5 text-white" />
                <h4 className="text-sm font-mono tracking-widest text-white uppercase">
                  ATMOSPHERIC RESPONSIVENESS
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Zero turbo lag. Direct-to-throttle mechanical feedback delivering instant torque delivery with millimeter precision.
              </p>
            </div>

            <div className="bg-[#07080b]/85 backdrop-blur-md p-6 border border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                <Compass className="w-5 h-5 text-white" />
                <h4 className="text-sm font-mono tracking-widest text-white uppercase">
                  AERODYNAMIC MASS DYNAMICS
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Carbon fiber reinforced polymer (CFRP) doors, front wings, and roof keep curb weight to an agile 1,450 kg.
              </p>
            </div>

            <div className="bg-[#07080b]/85 backdrop-blur-md p-6 border border-white/10 space-y-3">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-white" />
                <h4 className="text-sm font-mono tracking-widest text-white uppercase">
                  MOTORSPORT HOMOLOGATION
                </h4>
              </div>
              <p className="text-xs text-slate-400 font-light leading-relaxed">
                Born directly from endurance racing championships, incorporating proven ball-joint suspension linkages and active rear steering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

