'use client';

import { useSyncExternalStore } from 'react';
import {
  CarColor,
  WheelFinish,
  CaliperColor,
  PAINT_COLORS,
  WHEEL_FINISHES,
  CALIPER_COLORS,
} from './specifications';

export type CameraViewPreset = 'hero' | 'side' | 'rear' | 'front' | 'top' | 'free';

export interface ConfiguratorState {
  // Appearance
  activeColor: CarColor;
  activeWheel: WheelFinish;
  activeCaliper: CaliperColor;
  headlightsOn: boolean;
  wireframeMode: boolean;

  // Camera & Navigation
  cameraPreset: CameraViewPreset;
  isConfiguratorMode: boolean;
  soundEnabled: boolean;
  activeSection: string;
  scrollProgress: number; // 0 to 1
  autoRotate: boolean;
}

const defaultState: ConfiguratorState = {
  activeColor: PAINT_COLORS[0], // Racing Silver
  activeWheel: WHEEL_FINISHES[0], // Satin Titanium
  activeCaliper: CALIPER_COLORS[0], // Acid Yellow
  headlightsOn: true,
  wireframeMode: false,
  cameraPreset: 'hero',
  isConfiguratorMode: false,
  soundEnabled: false,
  activeSection: 'hero',
  scrollProgress: 0,
  autoRotate: true,
};

let currentState: ConfiguratorState = { ...defaultState };
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => {
    listener();
  });
}

export const configuratorStore = {
  getSnapshot(): ConfiguratorState {
    return currentState;
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  setColor(color: CarColor) {
    currentState = { ...currentState, activeColor: color };
    emitChange();
  },
  setWheel(wheel: WheelFinish) {
    currentState = { ...currentState, activeWheel: wheel };
    emitChange();
  },
  setCaliper(caliper: CaliperColor) {
    currentState = { ...currentState, activeCaliper: caliper };
    emitChange();
  },
  toggleHeadlights() {
    currentState = { ...currentState, headlightsOn: !currentState.headlightsOn };
    emitChange();
  },
  toggleWireframe() {
    currentState = { ...currentState, wireframeMode: !currentState.wireframeMode };
    emitChange();
  },
  toggleAutoRotate() {
    currentState = { ...currentState, autoRotate: !currentState.autoRotate };
    emitChange();
  },
  setCameraPreset(preset: CameraViewPreset) {
    currentState = { ...currentState, cameraPreset: preset };
    emitChange();
  },
  setConfiguratorMode(active: boolean) {
    currentState = { ...currentState, isConfiguratorMode: active };
    emitChange();
  },
  toggleSound() {
    currentState = { ...currentState, soundEnabled: !currentState.soundEnabled };
    emitChange();
  },
  setActiveSection(section: string) {
    if (currentState.activeSection !== section) {
      currentState = { ...currentState, activeSection: section };
      emitChange();
    }
  },
  setScrollProgress(progress: number) {
    currentState = { ...currentState, scrollProgress: progress };
    emitChange();
  },
  resetToDefault() {
    currentState = {
      ...defaultState,
      soundEnabled: currentState.soundEnabled,
      activeSection: currentState.activeSection,
    };
    emitChange();
  },
};

export function useConfigurator(): ConfiguratorState {
  return useSyncExternalStore(
    configuratorStore.subscribe,
    configuratorStore.getSnapshot,
    () => defaultState
  );
}
