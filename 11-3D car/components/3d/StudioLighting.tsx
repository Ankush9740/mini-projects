'use client';

import React from 'react';
import { Environment, ContactShadows } from '@react-three/drei';

export function StudioLighting() {
  return (
    <>
      {/* Studio Environment HDR for realistic metallic reflections */}
      <Environment files="/hdr/studio.hdr" environmentIntensity={0.45} />

      {/* Atmospheric neutral ambient fill */}
      <ambientLight intensity={0.65} color="#f1f5f9" />

      {/* Primary Key Overhead Light */}
      <spotLight
        position={[3, 8, 4]}
        angle={0.55}
        penumbra={1}
        intensity={3.8}
        color="#ffffff"
        castShadow
        shadow-bias={-0.0001}
        shadow-mapSize={[1024, 1024]}
      />

      {/* Rim / Silhouette Kicker Light from rear */}
      <spotLight
        position={[-5, 4, -5]}
        angle={0.6}
        penumbra={0.8}
        intensity={2.8}
        color="#cbd5e1"
      />

      {/* Low Side Accent Light for body contours */}
      <directionalLight position={[6, 2, -1]} intensity={1.8} color="#ffffff" />
      <directionalLight position={[-6, 2, 2]} intensity={1.5} color="#e2e8f0" />

      {/* Front fascia fill */}
      <pointLight position={[0, 1.2, 5.5]} intensity={1.5} color="#ffffff" />

      {/* High-quality contact shadows beneath the chassis */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.85}
        scale={12}
        blur={1.6}
        far={3.5}
        resolution={1024}
        color="#000000"
      />

      {/* Cinematic studio ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.002, 0]} receiveShadow>
        <planeGeometry args={[70, 70]} />
        <meshStandardMaterial
          color="#050608"
          roughness={0.6}
          metalness={0.7}
          envMapIntensity={0.35}
        />
      </mesh>

      {/* Circular studio pedestal hairline accent */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <ringGeometry args={[3.4, 3.42, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.12} transparent />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <ringGeometry args={[5.0, 5.02, 64]} />
        <meshBasicMaterial color="#ffffff" opacity={0.06} transparent />
      </mesh>
    </>
  );
}
