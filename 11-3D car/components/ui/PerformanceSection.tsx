'use client';

import React, { useState } from 'react';
import { PERFORMANCE_CHAPTERS } from '@/lib/specifications';
import { Wind, Gauge, Shield, Cpu, Sliders, CheckCircle2 } from 'lucide-react';

export function PerformanceSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [drsActive, setDrsActive] = useState(false);
  const [tachometerRpm, setTachometerRpm] = useState(8200);

  const chapter = PERFORMANCE_CHAPTERS[activeTab];

  return (
    <section id="performance" className="relative min-h-screen w-full py-28 px-6 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-12">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              <span>SECTION 02</span>
              <span>//</span>
              <span>TECHNICAL ENGINEERING</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-display">
              PERFORMANCE ARCHITECTURE
            </h2>
          </div>

          <div className="mt-4 md:mt-0 text-right">
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              CALIBRATED FOR WEISSACH & NÜRBURGRING NORDSCHLEIFE
            </div>
            <div className="text-xs font-mono text-emerald-400 mt-1">
              RECORD LAP: 6:49.328 MIN
            </div>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-2 mb-8 pointer-events-auto">
          {PERFORMANCE_CHAPTERS.map((ch, idx) => (
            <button
              key={ch.id}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center space-x-3 px-6 py-3 border text-xs font-mono tracking-[0.2em] uppercase transition-all duration-300 ${
                activeTab === idx
                  ? 'bg-white text-black border-white font-medium shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'bg-[#07080b]/80 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {idx === 0 && <Cpu className="w-3.5 h-3.5" />}
              {idx === 1 && <Wind className="w-3.5 h-3.5" />}
              {idx === 2 && <Shield className="w-3.5 h-3.5" />}
              <span>{ch.title}</span>
            </button>
          ))}
        </div>

        {/* Chapter Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Description & Highlights */}
          <div className="lg:col-span-7 bg-[#07080b]/85 backdrop-blur-md p-8 border border-white/10 space-y-8 pointer-events-auto">
            <div className="space-y-3">
              <span className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
                {chapter.subtitle}
              </span>
              <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-white uppercase font-display">
                {chapter.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 font-light leading-relaxed">
                {chapter.description}
              </p>
            </div>

            {/* Tri-Metric KPI Banner */}
            <div className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
              <div>
                <div className="text-2xl sm:text-3xl font-light text-white font-mono">{chapter.stat1.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                  {chapter.stat1.label}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-light text-white font-mono">{chapter.stat2.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                  {chapter.stat2.label}
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-light text-white font-mono">{chapter.stat3.value}</div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                  {chapter.stat3.label}
                </div>
              </div>
            </div>

            {/* Key Engineering Features Checklist */}
            <div className="space-y-3">
              <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                SYSTEM SPECIFICATIONS
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {chapter.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-2 text-xs text-slate-300 font-light">
                    <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Telemetry & Interactive Widget */}
          <div className="lg:col-span-5 bg-[#07080b]/85 backdrop-blur-md p-8 border border-white/10 space-y-6 pointer-events-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.25em] text-slate-400 uppercase">
                <Sliders className="w-3.5 h-3.5" />
                <span>INTERACTIVE TELEMETRY</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400">ACTIVE REALTIME</span>
            </div>

            {/* Dynamic visual widget depending on active chapter */}
            {activeTab === 0 && (
              // Powertrain Tachometer
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">TACHOMETER GAUGING</span>
                  <span className="text-sm font-mono text-white font-bold">{tachometerRpm} RPM</span>
                </div>

                <div className="relative pt-2 pb-4">
                  <div className="w-full h-3 bg-white/10 relative overflow-hidden flex">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-red-600 transition-all duration-150"
                      style={{ width: `${(tachometerRpm / 9000) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] font-mono text-slate-400 mt-2">
                    <span>0</span>
                    <span>3,000</span>
                    <span>6,000</span>
                    <span className="text-red-400 font-semibold">9,000 RPM (REDLINE)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-mono text-slate-400 uppercase">
                    DRAG TO REV ENGINE / TEST COMBUSTION BAND
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="9000"
                    step="100"
                    value={tachometerRpm}
                    onChange={(e) => setTachometerRpm(Number(e.target.value))}
                    className="w-full accent-white bg-white/10 cursor-pointer h-1"
                  />
                </div>

                <div className="p-3 bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400">
                  {tachometerRpm > 8000 ? (
                    <span className="text-red-400 font-medium">
                      ⚠️ PEAK FLUID ACCELERATION: 518 HP REACHED. EXHAUST RESONANCE AT MAXIMUM HARMONIC.
                    </span>
                  ) : (
                    <span>ATMOSPHERIC FLAT-SIX LINEAR TORQUE CURVE ENGAGED.</span>
                  )}
                </div>
              </div>
            )}

            {activeTab === 1 && (
              // Aerodynamics DRS Controller
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-300">ACTIVE DRS WING STATUS</span>
                  <span className={`text-xs font-mono font-bold ${drsActive ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {drsActive ? 'DRS OPEN (LOW DRAG)' : 'HIGH DOWNFORCE (ATTACK)'}
                  </span>
                </div>

                <div className="p-4 bg-white/5 border border-white/5 space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">CURRENT WING ANGLE:</span>
                    <span className="text-white font-semibold">{drsActive ? '0.0° (DRS Active)' : '+32.5° (Downforce)'}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">DOWNFORCE DELTA:</span>
                    <span className="text-white font-semibold">{drsActive ? '280 KG (-67%)' : '860 KG (Max)'}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-400">STRAIGHT-LINE VELOCITY:</span>
                    <span className="text-emerald-400 font-semibold">{drsActive ? '+12 KM/H ADVANTAGE' : 'CORNERING APEX GRIP'}</span>
                  </div>
                </div>

                <button
                  onClick={() => setDrsActive(!drsActive)}
                  className={`w-full py-3 border text-xs font-mono tracking-widest uppercase transition-all duration-300 ${
                    drsActive
                      ? 'bg-amber-400 text-black border-amber-400 font-semibold'
                      : 'bg-white text-black border-white hover:bg-slate-200'
                  }`}
                >
                  {drsActive ? 'DEACTIVATE DRS (HIGH DOWNFORCE)' : 'ACTIVATE DRS (SPEED MODE)'}
                </button>
              </div>
            )}

            {activeTab === 2 && (
              // Chassis & Braking Thermal Telemetry
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">FRONT CERAMIC ROTOR TEMP</span>
                    <span className="text-emerald-400 font-bold">485 °C (OPTIMAL)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                    <div className="w-[55%] h-full bg-emerald-400" />
                  </div>

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">REAR ROTOR TEMP</span>
                    <span className="text-emerald-400 font-bold">420 °C (STABLE)</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                    <div className="w-[45%] h-full bg-emerald-400" />
                  </div>

                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-slate-300">PASM DAMPER COMPRESSION</span>
                    <span className="text-white font-semibold">STAGE 3 TRACK SPORT</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 overflow-hidden">
                    <div className="w-[85%] h-full bg-white" />
                  </div>
                </div>

                <div className="p-3 bg-white/5 border border-white/5 text-[11px] font-mono text-slate-400">
                  <span>
                    Cross-drilled carbon-ceramic matrix dissipates extreme thermal buildup while reducing unsprung rotational mass by 50% compared to cast iron.
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

