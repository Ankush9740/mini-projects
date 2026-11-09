'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Navbar } from '@/components/ui/Navbar';
import { HeroSection } from '@/components/ui/HeroSection';
import { ShowcaseSection } from '@/components/ui/ShowcaseSection';
import { PerformanceSection } from '@/components/ui/PerformanceSection';
import { ConfiguratorSection } from '@/components/ui/ConfiguratorSection';
import { AboutSection } from '@/components/ui/AboutSection';
import { Footer } from '@/components/ui/Footer';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SoundController } from '@/components/ui/SoundController';
import { WebGLFallback } from '@/components/ui/WebGLFallback';
import { configuratorStore } from '@/lib/configuratorStore';

// Dynamically import Three.js SceneContainer with SSR disabled to prevent hydration errors
const SceneContainer = dynamic(
  () => import('@/components/3d/SceneContainer').then((mod) => mod.SceneContainer),
  { ssr: false }
);

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const sections = ['hero', 'showcase', 'performance', 'configurator', 'about'];

    // Overall scroll trigger for smooth camera progression across the whole experience
    const overallTrigger = ScrollTrigger.create({
      trigger: mainRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate: (self) => {
        configuratorStore.setScrollProgress(self.progress);
      },
    });

    // Section triggers to track active section for navigation highlighting
    const triggers: ScrollTrigger[] = [];

    sections.forEach((secId) => {
      const el = document.getElementById(secId);
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          configuratorStore.setActiveSection(secId);
          if (secId === 'configurator') {
            configuratorStore.setConfiguratorMode(true);
          } else {
            configuratorStore.setConfiguratorMode(false);
          }
        },
        onEnterBack: () => {
          configuratorStore.setActiveSection(secId);
          if (secId === 'configurator') {
            configuratorStore.setConfiguratorMode(true);
          } else {
            configuratorStore.setConfiguratorMode(false);
          }
        },
      });

      triggers.push(trigger);
    });

    return () => {
      overallTrigger.kill();
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <WebGLFallback>
      <main ref={mainRef} className="relative bg-[#060709] min-h-screen text-[#e2e5eb]">
        {/* Loading overlay with Drei useProgress */}
        <LoadingScreen />

        {/* Ambient Engine Audio Controller */}
        <SoundController />

        {/* Persistent luxury navigation */}
        <Navbar />

        {/* Fixed 3D Canvas Background & Interactive Configurator Stage */}
        <SceneContainer />

        {/* Content Sections */}
        <div className="relative z-10">
          <HeroSection />
          <ShowcaseSection />
          <PerformanceSection />
          <ConfiguratorSection />
          <AboutSection />
          <Footer />
        </div>
      </main>
    </WebGLFallback>
  );
}

