import { useEffect, useRef } from 'react';
import { AetherScene } from '../components/three/AetherScene';

export function useAetherScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize the vanilla Three.js scene
    const scene = new AetherScene(containerRef.current);

    // Cleanup on unmount
    return () => {
      scene.dispose();
    };
  }, []);

  return containerRef;
}
