'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { OrbitControls } from '@react-three/drei';
import { useConfigurator, CameraViewPreset } from '@/lib/configuratorStore';

// Camera position and lookAt waypoints for scroll choreography
interface Waypoint {
  progress: number;
  pos: [number, number, number];
  target: [number, number, number];
}

const SCROLL_WAYPOINTS: Waypoint[] = [
  // 1. Hero: Cinematic 3/4 Front, camera angled so car is showcased in the right half of the screen
  { progress: 0.0, pos: [2.2, 1.25, 4.5], target: [-1.1, 0.45, 0] },
  // 2. Showcase Intro: Dramatic low front three-quarter
  { progress: 0.2, pos: [3.4, 1.05, 3.8], target: [0.0, 0.45, 0.2] },
  // 3. Showcase Specs: Low Side Profile silhouette
  { progress: 0.4, pos: [5.1, 1.0, 0.0], target: [0.0, 0.48, 0] },
  // 4. Performance: Elevated Rear Quarter & Swan-Neck Active Wing
  { progress: 0.6, pos: [-3.4, 2.0, -4.2], target: [0.0, 0.62, -0.5] },
  // 5. Engineering: Elevated Technical Chassis Overview
  { progress: 0.8, pos: [-2.4, 3.4, 2.6], target: [0.0, 0.35, 0] },
  // 6. Configurator / Studio Base
  { progress: 0.95, pos: [3.8, 1.45, 4.0], target: [0.0, 0.48, 0] },
  { progress: 1.0, pos: [3.8, 1.45, 4.0], target: [0.0, 0.48, 0] },
];

// Presets for the Interactive Configurator
const PRESET_COORDINATES: Record<CameraViewPreset, { pos: [number, number, number]; target: [number, number, number] }> = {
  hero: { pos: [3.8, 1.45, 4.0], target: [0, 0.48, 0] },
  side: { pos: [5.2, 0.95, 0], target: [0, 0.48, 0] },
  rear: { pos: [-0.1, 1.4, -4.8], target: [0, 0.6, -0.4] },
  front: { pos: [0, 1.05, 4.8], target: [0, 0.48, 0.3] },
  top: { pos: [0.1, 5.8, 0.1], target: [0, 0.2, 0] },
  free: { pos: [3.8, 1.45, 4.0], target: [0, 0.48, 0] },
};

function getInterpolatedPoint(progress: number): { pos: THREE.Vector3; target: THREE.Vector3 } {
  const clamped = Math.max(0, Math.min(1, progress));
  
  // Find neighboring waypoints
  let idx = 0;
  for (let i = 0; i < SCROLL_WAYPOINTS.length - 1; i++) {
    if (clamped >= SCROLL_WAYPOINTS[i].progress && clamped <= SCROLL_WAYPOINTS[i + 1].progress) {
      idx = i;
      break;
    }
  }

  const w1 = SCROLL_WAYPOINTS[idx];
  const w2 = SCROLL_WAYPOINTS[idx + 1] || w1;
  const range = w2.progress - w1.progress;
  const factor = range > 0 ? (clamped - w1.progress) / range : 0;
  
  // Smooth cubic ease for fluid cinematic feel
  const eased = factor * factor * (3 - 2 * factor);

  const p1 = new THREE.Vector3(...w1.pos);
  const p2 = new THREE.Vector3(...w2.pos);
  const t1 = new THREE.Vector3(...w1.target);
  const t2 = new THREE.Vector3(...w2.target);

  return {
    pos: p1.lerp(p2, eased),
    target: t1.lerp(t2, eased),
  };
}

export function CameraController() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { isConfiguratorMode, cameraPreset, scrollProgress, activeSection } = useConfigurator();

  // Internal smooth target tracker
  const currentTargetRef = useRef(new THREE.Vector3(0, 0.45, 0));
  const desiredPosRef = useRef(new THREE.Vector3(3.2, 1.25, 4.2));

  // Handle Preset changes in Configurator mode
  useEffect(() => {
    if (isConfiguratorMode && PRESET_COORDINATES[cameraPreset]) {
      const preset = PRESET_COORDINATES[cameraPreset];
      desiredPosRef.current.set(...preset.pos);
      if (controlsRef.current) {
        controlsRef.current.target.set(...preset.target);
      }
    }
  }, [cameraPreset, isConfiguratorMode]);

  useFrame((state, delta) => {
    // Delta smoothing factor
    const alpha = Math.min(1, delta * 3.5);

    if (isConfiguratorMode) {
      // In Configurator mode, user has OrbitControls.
      // If a preset was recently clicked, gently glide camera towards desired pos
      if (cameraPreset !== 'free') {
        camera.position.lerp(desiredPosRef.current, alpha * 0.8);
      }
      controlsRef.current?.update();
      return;
    }

    // Scroll-based cinematic choreography mode
    const { pos: targetPos, target: lookTarget } = getInterpolatedPoint(scrollProgress);

    // Add subtle mouse parallax when on hero section
    if (activeSection === 'hero' && scrollProgress < 0.1) {
      const mouseX = (state.pointer.x * 0.45);
      const mouseY = (state.pointer.y * 0.25);
      targetPos.x += mouseX;
      targetPos.y += mouseY;
    }

    // Smooth camera position interpolation
    camera.position.lerp(targetPos, alpha);

    // Smooth lookAt target interpolation
    currentTargetRef.current.lerp(lookTarget, alpha);
    camera.lookAt(currentTargetRef.current);

    if (controlsRef.current) {
      controlsRef.current.target.copy(currentTargetRef.current);
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={isConfiguratorMode}
      enableDamping
      dampingFactor={0.06}
      minDistance={2.8}
      maxDistance={8.5}
      minPolarAngle={Math.PI / 8}
      maxPolarAngle={Math.PI / 2.05} // Prevent camera going below floor plane
      enablePan={false}
      rotateSpeed={0.7}
      zoomSpeed={0.8}
    />
  );
}
