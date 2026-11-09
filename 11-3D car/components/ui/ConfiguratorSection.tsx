'use client';

import React, { useState } from 'react';
import {
  PAINT_COLORS,
  WHEEL_FINISHES,
  CALIPER_COLORS,
  CarColor,
  WheelFinish,
  CaliperColor,
} from '@/lib/specifications';
import {
  useConfigurator,
  configuratorStore,
  CameraViewPreset,
} from '@/lib/configuratorStore';
import {
  RotateCcw,
  Sun,
  Eye,
  Camera,
  Layers,
  Sparkles,
  Download,
  Check,
  Move3d,
} from 'lucide-react';

export function ConfiguratorSection() {
  const {
    activeColor,
    activeWheel,
    activeCaliper,
    headlightsOn,
    wireframeMode,
    autoRotate,
    cameraPreset,
  } = useConfigurator();

  const [activeCategory, setActiveCategory] = useState<'paint' | 'wheels' | 'calipers' | 'optics'>('paint');
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const cameraPresets: { id: CameraViewPreset; label: string }[] = [
    { id: 'hero', label: 'STUDIO 3/4' },
    { id: 'side', label: 'PROFILE' },
    { id: 'rear', label: 'REAR AERO' },
    { id: 'front', label: 'FRONT FASCIA' },
    { id: 'top', label: 'BLUEPRINT' },
  ];

  const handleDownloadSpec = () => {
    const buildSheet = `
==============================================
AUREX AUTOMOTIVE ATELIER - BUILD SPECIFICATION
==============================================
Date: ${new Date().toLocaleDateString()}
Chassis Model: AUREX GT-4S (Type 992)
Engine: 4.0L Naturally Aspirated Boxer-6
Power Output: 518 HP @ 8,500 RPM | 9,000 RPM Limit
Transmission: 7-Speed Dual-Clutch (PDK)

EXTERIOR CONFIGURATION:
- Exterior Color: ${activeColor.name} (${activeColor.hex})
- Metalness / Roughness: ${activeColor.metalness} / ${activeColor.roughness}
- Clearcoat Specification: Ultra-High Gloss (${activeColor.clearcoat})

WHEEL & RUNNING GEAR:
- Wheel Model: 20/21" GT Forged Monobloc
- Finish: ${activeWheel.name} (${activeWheel.hex})
- Braking System: Porsche Ceramic Composite Brake (PCCB)
- Calipers: ${activeCaliper.name} (${activeCaliper.hex})

LIGHTING & AERO:
- Headlights: Matrix LED with 4-Point DRL (${headlightsOn ? 'ACTIVE' : 'STANDBY'})
- Downforce Setup: Active DRS Swan-Neck Wing (860 kg @ 285 km/h)

==============================================
ENGINEERED TO MOVE. AUREX ALL RIGHTS RESERVED.
==============================================
    `.trim();

    const blob = new Blob([buildSheet], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AUREX-GT4S-${activeColor.id.toUpperCase()}-BUILD.txt`;
    link.click();
    URL.revokeObjectURL(url);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <section
      id="configurator"
      className="relative min-h-screen w-full py-28 px-6 md:px-12 pointer-events-none flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Top Header & View Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-8">
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              <span>SECTION 03</span>
              <span>//</span>
              <span>ATELIER SPECIFICATION</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-light tracking-[0.1em] text-white uppercase font-display">
              AUREX CONFIGURATOR
            </h2>
          </div>

          {/* 360 Interaction Banner */}
          <div className="mt-4 md:mt-0 flex items-center space-x-2 px-3 py-1.5 bg-white/5 border border-white/15 text-[10px] font-mono tracking-widest text-slate-300 uppercase pointer-events-auto">
            <Move3d className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>INTERACTIVE 360° CANVAS ACTIVE — DRAG TO ORBIT</span>
          </div>
        </div>

        {/* Camera Perspective Presets */}
        <div className="flex flex-wrap items-center gap-2 mb-8 pointer-events-auto">
          <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mr-2 flex items-center space-x-1">
            <Camera className="w-3.5 h-3.5" />
            <span>CAMERA ANGLE:</span>
          </span>
          {cameraPresets.map((preset) => {
            const isSelected = cameraPreset === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => configuratorStore.setCameraPreset(preset.id)}
                className={`px-3 py-1.5 border text-[10px] font-mono tracking-wider uppercase transition-all duration-300 ${
                  isSelected
                    ? 'bg-white text-black border-white font-semibold'
                    : 'bg-black/60 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {preset.label}
              </button>
            );
          })}

          <button
            onClick={() => configuratorStore.resetToDefault()}
            className="px-3 py-1.5 border border-white/15 bg-black/60 text-slate-400 hover:text-white hover:border-white text-[10px] font-mono tracking-wider uppercase flex items-center space-x-1 transition-colors ml-auto"
            title="Reset to default build"
          >
            <RotateCcw className="w-3 h-3" />
            <span>RESET</span>
          </button>
        </div>

        {/* Floating Configuration Controls Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Main Customization Panel */}
          <div className="lg:col-span-6 bg-[#07080b]/90 backdrop-blur-md p-6 sm:p-8 border border-white/15 pointer-events-auto shadow-2xl space-y-6">
            {/* Category Navigation Tabs */}
            <div className="grid grid-cols-4 gap-1 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveCategory('paint')}
                className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-center ${
                  activeCategory === 'paint' ? 'text-white border-b-2 border-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                01 PAINT
              </button>
              <button
                onClick={() => setActiveCategory('wheels')}
                className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-center ${
                  activeCategory === 'wheels' ? 'text-white border-b-2 border-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                02 WHEELS
              </button>
              <button
                onClick={() => setActiveCategory('calipers')}
                className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-center ${
                  activeCategory === 'calipers' ? 'text-white border-b-2 border-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                03 BRAKES
              </button>
              <button
                onClick={() => setActiveCategory('optics')}
                className={`py-2 text-[10px] font-mono tracking-widest uppercase transition-colors text-center ${
                  activeCategory === 'optics' ? 'text-white border-b-2 border-white font-semibold' : 'text-slate-400 hover:text-white'
                }`}
              >
                04 ENVIRONMENT
              </button>
            </div>

            {/* TAB 1: Paint Color Selection */}
            {activeCategory === 'paint' && (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div className="text-xs font-mono text-slate-300 uppercase">
                    COLOR: <span className="text-white font-semibold">{activeColor.name}</span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-400">
                    CLEARCOAT: {Math.round(activeColor.clearcoat * 100)}%
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                  {PAINT_COLORS.map((color) => {
                    const isSelected = activeColor.id === color.id;
                    return (
                      <button
                        key={color.id}
                        onClick={() => configuratorStore.setColor(color)}
                        className={`group relative flex flex-col items-center p-2 rounded-sm border transition-all duration-300 ${
                          isSelected ? 'border-white bg-white/10 scale-105' : 'border-white/10 hover:border-white/30 bg-black/40'
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-9 h-9 rounded-full border border-white/20 shadow-inner flex items-center justify-center transition-transform group-hover:scale-110"
                          style={{ backgroundColor: color.hex }}
                        >
                          {isSelected && <Check className={`w-4 h-4 ${color.id === 'white' || color.id === 'silver' ? 'text-black' : 'text-white'}`} />}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 truncate w-full text-center mt-1.5">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-400 font-light leading-relaxed pt-1">
                  {activeColor.description}
                </p>
              </div>
            )}

            {/* TAB 2: Wheel Finishes */}
            {activeCategory === 'wheels' && (
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <div className="text-xs font-mono text-slate-300 uppercase">
                    WHEEL FINISH: <span className="text-white font-semibold">{activeWheel.name}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {WHEEL_FINISHES.map((wheel) => {
                    const isSelected = activeWheel.id === wheel.id;
                    return (
                      <button
                        key={wheel.id}
                        onClick={() => configuratorStore.setWheel(wheel)}
                        className={`p-3 border text-left flex flex-col justify-between space-y-3 transition-all ${
                          isSelected ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30 bg-black/40'
                        }`}
                      >
                        <div
                          className="w-6 h-6 rounded-full border border-white/20"
                          style={{ backgroundColor: wheel.hex }}
                        />
                        <div className="text-[10px] font-mono text-slate-300 leading-tight">
                          {wheel.name}
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] text-slate-400 font-light leading-relaxed pt-1">
                  {activeWheel.description}
                </p>
              </div>
            )}

            {/* TAB 3: Brake Calipers */}
            {activeCategory === 'calipers' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-300 uppercase">
                  CALIPER SPEC: <span className="text-white font-semibold">{activeCaliper.name}</span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {CALIPER_COLORS.map((caliper) => {
                    const isSelected = activeCaliper.id === caliper.id;
                    return (
                      <button
                        key={caliper.id}
                        onClick={() => configuratorStore.setCaliper(caliper)}
                        className={`p-3 border text-left flex items-center space-x-3 transition-all ${
                          isSelected ? 'border-white bg-white/10' : 'border-white/10 hover:border-white/30 bg-black/40'
                        }`}
                      >
                        <div
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0"
                          style={{ backgroundColor: caliper.hex }}
                        />
                        <span className="text-[10px] font-mono text-slate-300 truncate">
                          {caliper.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: Optics & Studio Toggles */}
            {activeCategory === 'optics' && (
              <div className="space-y-4">
                <div className="text-xs font-mono text-slate-300 uppercase">
                  STUDIO LIGHTING & DISPLAY CONTROLS
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Headlights Toggle */}
                  <button
                    onClick={() => configuratorStore.toggleHeadlights()}
                    className={`p-3 border flex flex-col justify-between space-y-2 transition-all ${
                      headlightsOn ? 'border-sky-400 bg-sky-950/20' : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sun className={`w-4 h-4 ${headlightsOn ? 'text-sky-400' : 'text-slate-400'}`} />
                      <span className="text-[9px] font-mono text-slate-400">
                        {headlightsOn ? 'ON' : 'OFF'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white">HEADLIGHTS</span>
                  </button>

                  {/* Wireframe Mesh Mode */}
                  <button
                    onClick={() => configuratorStore.toggleWireframe()}
                    className={`p-3 border flex flex-col justify-between space-y-2 transition-all ${
                      wireframeMode ? 'border-emerald-400 bg-emerald-950/20' : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Layers className={`w-4 h-4 ${wireframeMode ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <span className="text-[9px] font-mono text-slate-400">
                        {wireframeMode ? 'CAD' : 'SOLID'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white">CAD WIREFRAME</span>
                  </button>

                  {/* Turntable Auto Rotate */}
                  <button
                    onClick={() => configuratorStore.toggleAutoRotate()}
                    className={`p-3 border flex flex-col justify-between space-y-2 transition-all ${
                      autoRotate ? 'border-amber-400 bg-amber-950/20' : 'border-white/10 bg-black/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Sparkles className={`w-4 h-4 ${autoRotate ? 'text-amber-400' : 'text-slate-400'}`} />
                      <span className="text-[9px] font-mono text-slate-400">
                        {autoRotate ? 'ACTIVE' : 'PAUSED'}
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-white">TURNTABLE</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Build Sheet Card */}
          <div className="lg:col-span-6 bg-[#07080b]/90 backdrop-blur-md p-6 sm:p-8 border border-white/15 pointer-events-auto shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
                  CUSTOM SPECIFICATION
                </div>
                <div className="text-xl font-light text-white font-display uppercase mt-0.5">
                  AUREX GT-4S // ATELIER BUILD
                </div>
              </div>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 uppercase">ESTIMATED PRODUCTION</div>
                <div className="text-sm font-mono text-emerald-400 font-semibold">Q3 ALLOCATION</div>
              </div>
            </div>

            {/* Spec breakdown table */}
            <div className="space-y-2.5 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">BODY PAINT:</span>
                <span className="text-white font-medium">{activeColor.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">WHEEL FINISH:</span>
                <span className="text-white font-medium">{activeWheel.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">BRAKE CALIPER:</span>
                <span className="text-white font-medium">{activeCaliper.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-white/5">
                <span className="text-slate-400">OPTICS SYSTEM:</span>
                <span className="text-white font-medium">{headlightsOn ? 'Bi-LED Matrix Active' : 'Standby DRL'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">AERODYNAMIC DOWNFORCE:</span>
                <span className="text-emerald-400 font-medium">860 KG @ 285 KM/H</span>
              </div>
            </div>

            {/* Action Button: Download Spec */}
            <button
              onClick={handleDownloadSpec}
              className="w-full py-4 bg-white text-black text-xs font-mono tracking-[0.25em] uppercase hover:bg-slate-200 transition-all duration-300 flex items-center justify-center space-x-2 font-medium"
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>SPECIFICATION SAVED</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD ATELIER BUILD SHEET</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

