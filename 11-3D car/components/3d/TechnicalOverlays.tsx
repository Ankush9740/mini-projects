'use client';

import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { useConfigurator } from '@/lib/configuratorStore';

interface HotspotProps {
  position: [number, number, number];
  title: string;
  subtitle: string;
  metric: string;
  visible: boolean;
}

function Hotspot({ position, title, subtitle, metric, visible }: HotspotProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!visible) return null;

  return (
    <Html position={position} center distanceFactor={7} zIndexRange={[100, 0]}>
      <div className="relative group select-none pointer-events-auto">
        {/* Pulsing ring indicator */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Toggle details for ${title}`}
          className="relative flex items-center justify-center w-6 h-6 rounded-full bg-black/80 border border-white/60 text-white backdrop-blur-md transition-transform duration-300 group-hover:scale-125 focus:outline-none"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping absolute" />
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
        </button>

        {/* Hover / Active Telemetry Card */}
        <div
          className={`absolute left-8 top-1/2 -translate-y-1/2 w-56 p-3 bg-[#0a0c10]/90 backdrop-blur-md border border-white/15 text-left transition-all duration-300 pointer-events-none ${
            isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1.5">
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">SPEC // TELEMETRY</span>
            <span className="text-[10px] font-mono text-emerald-400 font-semibold">{metric}</span>
          </div>
          <div className="text-xs font-semibold tracking-wider text-white uppercase">{title}</div>
          <div className="text-[11px] text-slate-400 leading-tight mt-0.5">{subtitle}</div>
        </div>
      </div>
    </Html>
  );
}

export function TechnicalOverlays() {
  const { activeSection, isConfiguratorMode, scrollProgress } = useConfigurator();

  // Show hotspots during performance and showcase sections
  const showHotspots =
    !isConfiguratorMode &&
    (activeSection === 'performance' ||
      activeSection === 'showcase' ||
      (scrollProgress > 0.25 && scrollProgress < 0.85));

  return (
    <group>
      {/* 1. Swan-Neck Active Rear Wing */}
      <Hotspot
        position={[0, 1.25, -2.1]}
        title="SWAN-NECK DRS WING"
        subtitle="Hydraulically actuated active aerodynamic surface generating 860 kg downforce."
        metric="860 KG @ 285 KM/H"
        visible={showHotspots}
      />

      {/* 2. Rear Boxer Engine */}
      <Hotspot
        position={[0, 0.75, -1.05]}
        title="4.0L FLAT-SIX BOXER"
        subtitle="Naturally aspirated atmospheric engine revving up to 9,000 RPM."
        metric="518 HP // 9,000 RPM"
        visible={showHotspots}
      />

      {/* 3. Front PCCB Ceramic Brakes */}
      <Hotspot
        position={[0.95, 0.35, 1.3]}
        title="PCCB CERAMIC ROTORS"
        subtitle="410mm cross-drilled ceramic discs with 6-piston monobloc calipers."
        metric="410 MM // 6-PISTON"
        visible={showHotspots}
      />

      {/* 4. Front Radiator Venting */}
      <Hotspot
        position={[0, 0.65, 1.55]}
        title="AERO NOSE DUCTS"
        subtitle="Air guided through central radiator and vented across carbon roof curvature."
        metric="AERO EFFICIENCY 0.39 CD"
        visible={showHotspots}
      />
    </group>
  );
}

