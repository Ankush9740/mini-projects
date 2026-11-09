'use client';

import React, { useState } from 'react';
import { CORE_METRICS, TECHNICAL_SPECS } from '@/lib/specifications';
import { Activity, Gauge, Cpu, Zap, ShieldCheck } from 'lucide-react';

export function ShowcaseSection() {
  const [unitMode, setUnitMode] = useState<'metric' | 'imperial'>('metric');

  return (
    <section id="showcase" className="relative min-h-screen w-full py-28 px-6 md:px-12 pointer-events-none">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-16">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              <span>SECTION 01</span>
              <span>//</span>
              <span>SHOWCASE SPECIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-display">
              AUREX GT-4S SPECIFICATION
            </h2>
          </div>

          <div className="mt-4 md:mt-0 flex items-center space-x-4 pointer-events-auto">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">UNITS:</span>
            <div className="flex border border-white/20 p-0.5 bg-black/40">
              <button
                onClick={() => setUnitMode('metric')}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  unitMode === 'metric' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                METRIC (KM/H)
              </button>
              <button
                onClick={() => setUnitMode('imperial')}
                className={`px-3 py-1 text-[10px] font-mono uppercase tracking-wider transition-colors ${
                  unitMode === 'imperial' ? 'bg-white text-black font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                IMPERIAL (MPH)
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Spec Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Editorial Text & Philosophy */}
          <div className="lg:col-span-5 space-y-8 bg-[#07080b]/75 backdrop-blur-md p-8 border border-white/10 pointer-events-auto">
            <div className="space-y-4">
              <div className="text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
                ENGINEERING MONOGRAPH
              </div>
              <h3 className="text-xl sm:text-2xl font-light tracking-wide text-white uppercase font-display">
                THE UNCOMPROMISING PURSUIT OF AERODYNAMIC HARMONY
              </h3>
              <p className="text-xs md:text-sm text-slate-400 font-light leading-relaxed">
                Every surface of the AUREX GT-4S has been sculpted by the wind tunnel at Weissach.
                Air is intentionally channeled through the hood nostrils, across the double-bubble
                carbon roof, and compressed under the rear active diffuser to produce genuine race-car
                downforce without excess parasitic drag.
              </p>
            </div>

            {/* Quick Live Telemetry Gauges */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-300">
                  <span>DOWNFORCE LOAD (@ 285 KM/H)</span>
                  <span className="text-white font-semibold">{unitMode === 'metric' ? '860 KG' : '1,896 LBS'}</span>
                </div>
                <div className="w-full h-1 bg-white/10 overflow-hidden">
                  <div className="w-[86%] h-full bg-white" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-300">
                  <span>LATERAL GRIP COEFF (G-FORCE)</span>
                  <span className="text-white font-semibold">1.45 G</span>
                </div>
                <div className="w-full h-1 bg-white/10 overflow-hidden">
                  <div className="w-[92%] h-full bg-emerald-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] font-mono text-slate-300">
                  <span>POWER-TO-WEIGHT RATIO</span>
                  <span className="text-white font-semibold">2.8 KG / HP</span>
                </div>
                <div className="w-full h-1 bg-white/10 overflow-hidden">
                  <div className="w-[88%] h-full bg-amber-400" />
                </div>
              </div>
            </div>

            {/* Feature Badges */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-[10px] font-mono tracking-wider text-slate-400">
              <div className="flex items-center space-x-2 p-2 bg-white/5 border border-white/5">
                <ShieldCheck className="w-3.5 h-3.5 text-white" />
                <span>FIA GT HOMOLOGATED</span>
              </div>
              <div className="flex items-center space-x-2 p-2 bg-white/5 border border-white/5">
                <Activity className="w-3.5 h-3.5 text-white" />
                <span>DRY SUMP OIL SYSTEM</span>
              </div>
            </div>
          </div>

          {/* Right Core Specs Matrix (Editorial Grid) */}
          <div className="lg:col-span-7 space-y-6 pointer-events-auto">
            {/* Top 6 KPI Metric Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-white/10 border border-white/10">
              {CORE_METRICS.map((metric, i) => {
                let displayVal = metric.value;
                let displayUnit = metric.unit;

                if (unitMode === 'imperial') {
                  if (metric.label.includes('Top Track')) {
                    displayVal = '184';
                    displayUnit = 'MPH';
                  } else if (metric.label.includes('Downforce')) {
                    displayVal = '1,896';
                    displayUnit = 'LBS';
                  } else if (metric.label.includes('Weight')) {
                    displayVal = '3,196';
                    displayUnit = 'LBS';
                  }
                }

                return (
                  <div
                    key={i}
                    className="p-6 bg-[#07080b]/90 backdrop-blur-md flex flex-col justify-between space-y-2 hover:bg-white/5 transition-colors"
                  >
                    <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                      {metric.label}
                    </div>
                    <div className="flex items-baseline space-x-1.5">
                      <span className="text-3xl sm:text-4xl font-light text-white font-mono">{displayVal}</span>
                      <span className="text-xs font-mono text-slate-400">{displayUnit}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                      {metric.subtext}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Detailed Engineering Specifications Accordion / List */}
            <div className="bg-[#07080b]/85 backdrop-blur-md border border-white/10 divide-y divide-white/10">
              {TECHNICAL_SPECS.map((spec, i) => (
                <div key={i} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-baseline justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="sm:w-1/3 text-[10px] font-mono tracking-widest text-slate-400 uppercase mb-1 sm:mb-0">
                    {spec.label}
                  </div>
                  <div className="sm:w-2/3 space-y-1">
                    <div className="text-sm font-medium text-white tracking-wide">
                      {spec.value}
                    </div>
                    <div className="text-xs text-slate-400 font-light leading-relaxed">
                      {spec.detail}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

