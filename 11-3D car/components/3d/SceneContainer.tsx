'use client';

import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, useThree } from '@react-three/fiber';
import { CarModel } from './CarModel';
import { StudioLighting } from './StudioLighting';
import { CameraController } from './CameraController';
import { TechnicalOverlays } from './TechnicalOverlays';
import { useConfigurator } from '@/lib/configuratorStore';

function SceneExposer() {
  const { scene, camera } = useThree();
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __scene: THREE.Scene; __camera: THREE.Camera }).__scene = scene;
      (window as unknown as { __scene: THREE.Scene; __camera: THREE.Camera }).__camera = camera;
    }
  }, [scene, camera]);
  return null;
}

export function SceneContainer() {
  const { isConfiguratorMode } = useConfigurator();

  return (
    <div
      className={`fixed inset-0 z-0 transition-opacity duration-700 ${
        isConfiguratorMode ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <Canvas
        shadows
        dpr={[1, 1.8]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
        camera={{
          position: [3.2, 1.25, 4.2],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
      >
        <SceneExposer />
        <Suspense fallback={null}>
          <StudioLighting />
          <CarModel />
          <CameraController />
          <TechnicalOverlays />
        </Suspense>
      </Canvas>
    </div>
  );
}
