import { useState, useEffect, useCallback } from 'react';

interface ParallaxValues {
  x: number;
  y: number;
}

/**
 * Tracks mouse position and returns smoothly interpolated normalized values
 * for multi-layer parallax effects. Values range from -1 to 1.
 */
export function useMouseParallax(intensity: number = 1) {
  const [position, setPosition] = useState<ParallaxValues>({ x: 0, y: 0 });
  const [target, setTarget] = useState<ParallaxValues>({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2 * intensity;
    const y = (e.clientY / window.innerHeight - 0.5) * 2 * intensity;
    setTarget({ x, y });
  }, [intensity]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  // Smooth lerp animation loop
  useEffect(() => {
    let animationId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const animate = () => {
      setPosition(prev => ({
        x: lerp(prev.x, target.x, 0.04),
        y: lerp(prev.y, target.y, 0.04),
      }));
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [target]);

  return position;
}
