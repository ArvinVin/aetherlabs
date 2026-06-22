import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

export function SparkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouse = { x: -1000, y: -1000 };
    let lastMouse = { x: -1000, y: -1000 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Pre-render a much sharper glow texture
    const glowTexture = document.createElement('canvas');
    glowTexture.width = 32;
    glowTexture.height = 32;
    const gCtx = glowTexture.getContext('2d');
    if (gCtx) {
      const gradient = gCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(0, 240, 255, 1)');
      gradient.addColorStop(0.7, 'rgba(0, 240, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 240, 255, 0)');
      gCtx.fillStyle = gradient;
      gCtx.fillRect(0, 0, 32, 32);
    }

    const purpleGlowTexture = document.createElement('canvas');
    purpleGlowTexture.width = 32;
    purpleGlowTexture.height = 32;
    const pCtx = purpleGlowTexture.getContext('2d');
    if (pCtx) {
      const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.4, 'rgba(139, 61, 255, 1)');
      gradient.addColorStop(0.7, 'rgba(139, 61, 255, 0.2)');
      gradient.addColorStop(1, 'rgba(139, 61, 255, 0)');
      pCtx.fillStyle = gradient;
      pCtx.fillRect(0, 0, 32, 32);
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      lastMouse.x = mouse.x;
      lastMouse.y = mouse.y;
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;

      if (lastMouse.x === -1000) {
        lastMouse.x = mouse.x;
        lastMouse.y = mouse.y;
      }

      const dx = mouse.x - lastMouse.x;
      const dy = mouse.y - lastMouse.y;
      const speed = Math.sqrt(dx * dx + dy * dy);
      
      const count = Math.min(Math.floor(speed * 0.3), 5);
      
      for (let i = 0; i < count; i++) {
        const t = i / Math.max(count, 1);
        const px = lastMouse.x + dx * t;
        const py = lastMouse.y + dy * t;
        
        const maxLife = Math.random() * 40 + 30;
        particles.push({
          x: px + (Math.random() - 0.5) * 10,
          y: py + (Math.random() - 0.5) * 10,
          vx: (Math.random() - 0.5) * 1.5 + dx * 0.02,
          vy: (Math.random() - 0.5) * 1.5 + dy * 0.02,
          life: maxLife,
          maxLife: maxLife,
          size: Math.random() * 1.5 + 0.5,
          color: Math.random() > 0.5 ? 'cyan' : 'purple'
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'screen'; 

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        p.vy -= 0.01; 
        p.vx *= 0.95;
        
        const progress = p.life / p.maxLife;
        if (progress <= 0) {
          particles.splice(i, 1);
          continue;
        }

        const alpha = Math.min(progress * 2, 1) * 0.8; 
        // Vastly reduced draw size so they are crisp sparks, not huge blurry clouds
        const drawSize = p.size * 6 * progress; 

        ctx.globalAlpha = alpha;
        const tex = p.color === 'cyan' ? glowTexture : purpleGlowTexture;
        ctx.drawImage(tex, p.x - drawSize/2, p.y - drawSize/2, drawSize, drawSize);
      }
      
      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 pointer-events-none z-20 opacity-70"
    />
  );
}
