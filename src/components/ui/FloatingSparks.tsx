import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';

interface Spark {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
  opacity: number;
  color: string;
}

export function FloatingSparks({ count = 30 }: { count?: number }) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  useEffect(() => {
    // Generate static ambient sparks only once on mount
    const colors = ['#00f0ff', '#8b3dff', '#ffffff'];

    const newSparks = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage 0-100%
      y: Math.random() * 100, // percentage 0-100%
      size: Math.random() * 1.5 + 2, // 1px to 2.5px
      delay: Math.random() * -30, // Start randomly mid-animation
      duration: Math.random() * 20 + 15, // 15s to 35s for very slow floating
      drift: (Math.random() - 0.5) * 80, // drift sideways up to 40px
      opacity: Math.random() * 0.3 + 0.4, // very subtle 0.1 to 0.4 opacity
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setSparks(newSparks);
  }, [count]);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      style={{
        // Softly fade out the sparks at the top and bottom of the container
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      {sparks.map((spark) => (
        <div
          key={spark.id}
          className="absolute rounded-full animate-float-spark"
          style={{
            left: `${spark.x}%`,
            top: `${spark.y}%`,
            width: `${spark.size}px`,
            height: `${spark.size}px`,
            backgroundColor: spark.color,
            boxShadow: `0 0 ${spark.size * 3}px ${spark.color}, 0 0 ${spark.size * 5}px ${spark.color}`,
            '--spark-duration': `${spark.duration}s`,
            '--spark-x-drift': `${spark.drift}px`,
            '--spark-opacity': spark.opacity,
            animationDelay: `${spark.delay}s`,
          } as CSSProperties}
        />
      ))}
    </div>
  );
}
