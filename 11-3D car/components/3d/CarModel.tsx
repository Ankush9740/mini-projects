'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useConfigurator } from '@/lib/configuratorStore';

// Draco decoder path points to our local public/draco folder
const MODEL_PATH = '/models/porsche-911.glb';
const DRACO_PATH = '/draco/';

export function CarModel(props: JSX.IntrinsicElements['group']) {
  const groupRef = useRef<THREE.Group>(null);
  const {
    activeColor,
    activeWheel,
    activeCaliper,
    headlightsOn,
    wireframeMode,
    isConfiguratorMode,
    autoRotate,
    scrollProgress,
  } = useConfigurator();

  // Load GLTF with local draco decoder
  const gltf = useGLTF(MODEL_PATH, DRACO_PATH);

  // Clone scene so material instances are completely isolated
  const clonedScene = useMemo(() => {
    const s = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    console.log('CAR MODEL RAW BOUNDING BOX SIZE:', size.x, size.y, size.z);
    console.log('CAR MODEL RAW CENTER:', center.x, center.y, center.z);
    return s;
  }, [gltf.scene]);

  // Keep references to material slots for fast reactive updates
  const materialsMap = useMemo(() => {
    const map: Record<string, THREE.MeshStandardMaterial[]> = {};

    clonedScene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        const mat = child.material;
        if (mat) {
          // Clone material to avoid sharing with cache
          const clonedMat = (Array.isArray(mat) ? mat[0] : mat).clone() as THREE.MeshStandardMaterial;
          child.material = clonedMat;

          const name = clonedMat.name || 'unnamed';
          if (!map[name]) map[name] = [];
          map[name].push(clonedMat);
        }
      }
    });

    return map;
  }, [clonedScene]);

  // Dynamically update materials whenever configurator state changes
  useEffect(() => {
    // 1. Paint Body
    const paintMats = materialsMap['paint'] || [];
    paintMats.forEach((mat) => {
      mat.color.set(activeColor.hex);
      mat.metalness = activeColor.metalness;
      mat.roughness = activeColor.roughness;
      if ('clearcoat' in mat) {
        (mat as unknown as { clearcoat: number }).clearcoat = activeColor.clearcoat;
        (mat as unknown as { clearcoatRoughness: number }).clearcoatRoughness =
          activeColor.clearcoatRoughness ?? 0.1;
      }
      mat.wireframe = wireframeMode;
      mat.needsUpdate = true;
    });

    // 2. Wheels & Rims ('silver')
    const wheelMats = materialsMap['silver'] || [];
    wheelMats.forEach((mat) => {
      mat.color.set(activeWheel.hex);
      mat.metalness = activeWheel.metalness;
      mat.roughness = activeWheel.roughness;
      mat.wireframe = wireframeMode;
      mat.needsUpdate = true;
    });

    // 3. Calipers & Trim ('coat' / 'Material.001')
    const coatMats = materialsMap['coat'] || [];
    coatMats.forEach((mat) => {
      mat.color.set(activeCaliper.hex);
      mat.metalness = 0.7;
      mat.roughness = 0.3;
      mat.needsUpdate = true;
    });

    // 4. Headlights & Lights ('lights')
    const lightMats = materialsMap['lights'] || [];
    lightMats.forEach((mat) => {
      if (headlightsOn) {
        mat.emissive.set('#f0f6ff');
        mat.emissiveIntensity = 2.8;
        mat.color.set('#ffffff');
      } else {
        mat.emissive.set('#000000');
        mat.emissiveIntensity = 0;
        mat.color.set('#333338');
      }
      mat.needsUpdate = true;
    });

    // 5. Windows & Tinted Glass ('window', 'glass')
    const windowMats = [...(materialsMap['window'] || []), ...(materialsMap['glass'] || [])];
    windowMats.forEach((mat) => {
      mat.color.set('#0b0e14');
      mat.metalness = 0.95;
      mat.roughness = 0.05;
      if ('clearcoat' in mat) {
        (mat as unknown as { clearcoat: number }).clearcoat = 1.0;
      }
      mat.needsUpdate = true;
    });

    // 6. Tires Rubber ('rubber')
    const rubberMats = materialsMap['rubber'] || [];
    rubberMats.forEach((mat) => {
      mat.color.set('#161719');
      mat.roughness = 0.88;
      mat.metalness = 0.08;
      mat.needsUpdate = true;
    });

    // 7. Carbon aero / full black plastics ('full_black', 'plastic')
    const aeroMats = [...(materialsMap['full_black'] || []), ...(materialsMap['plastic'] || [])];
    aeroMats.forEach((mat) => {
      mat.color.set('#121316');
      mat.roughness = 0.55;
      mat.metalness = 0.35;
      mat.needsUpdate = true;
    });
  }, [materialsMap, activeColor, activeWheel, activeCaliper, headlightsOn, wireframeMode]);

  // Subtle floating idle motion or auto-rotation when appropriate
  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (isConfiguratorMode) {
      // In configurator mode, center the car precisely at x = 0
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, 0, Math.min(1, delta * 3));
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, 0.63, Math.min(1, delta * 3));
      if (autoRotate) {
        groupRef.current.rotation.y += delta * 0.25;
      }
    } else {
      // In hero mode, offset car to the right (x = 1.05) to balance with left typography
      const targetX = scrollProgress < 0.2 ? 1.05 : 0;
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, targetX, Math.min(1, delta * 2.5));
      const t = state.clock.getElapsedTime();
      groupRef.current.position.y = 0.63 + Math.sin(t * 0.8) * 0.008;
    }
  });

  return (
    <group ref={groupRef} position={[1.05, 0.63, 0]} {...props} dispose={null}>
      {/* Front Headlight Light Projections when headlights are turned on */}
      {headlightsOn && (
        <group position={[0, 0.45, 1.85]}>
          <pointLight position={[-0.65, 0.05, 0]} intensity={1.8} color="#e0f2fe" distance={7} decay={2} />
          <pointLight position={[0.65, 0.05, 0]} intensity={1.8} color="#e0f2fe" distance={7} decay={2} />
          {/* Spotlight projecting forward onto the track */}
          <spotLight
            position={[0, 0.1, 0.2]}
            target-position={[0, 0, 8]}
            angle={0.65}
            penumbra={0.8}
            intensity={4}
            color="#bae6fd"
            distance={16}
          />
        </group>
      )}

      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH, DRACO_PATH);
