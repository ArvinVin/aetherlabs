import { useRef, useEffect } from 'react';
import type { CSSProperties, MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useMouseParallax } from '../../hooks/useMouseParallax';
import { SparkTrail } from '../ui/SparkTrail';
import { FloatingSparks } from '../ui/FloatingSparks';

export function HeroSection() {
  const { t } = useTranslation();
  const mouse = useMouseParallax(1);
  const logoRef = useRef<HTMLDivElement>(null);
  const isHovering = useRef(false);

  useEffect(() => {
    let animationFrameId: number;
    const startTime = Date.now();

    const animate = () => {
      if (!isHovering.current && logoRef.current) {
        const time = (Date.now() - startTime) / 1000;
        const width = logoRef.current.offsetWidth || 300;
        const height = logoRef.current.offsetHeight || 300;
        const centerX = width / 2;
        const centerY = height / 2;

        // Smooth organic wandering path using a Lissajous curve
        const x = centerX + Math.sin(time * 1.5) * (width * 0.4);
        const y = centerY + Math.cos(time * 1.1) * (height * 0.4);

        logoRef.current.style.setProperty('--mouse-x', `${x}px`);
        logoRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    isHovering.current = true;
    if (logoRef.current) {
      const rect = logoRef.current.getBoundingClientRect();
      logoRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
      logoRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
    }
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    // We no longer banish the mask to -1000px, instead we let the auto-animator seamlessly take over again!
  };

  return (
    <section
      className="relative w-full min-h-screen overflow-hidden flex items-center justify-center bg-[#050508]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sweeping Ribbon Background (Layer 0) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none bg-cover bg-center bg-no-repeat opacity-80"
        style={{
          backgroundImage: `url('/images/hero_ribbon.png')`,
          transform: `translate3d(${mouse.x * -20}px, ${mouse.y * -20}px, 0)`
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Deep dark gradient overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050508]/40 to-[#050508] pointer-events-none" />

      {/* Interactive Spark Trail */}
      <SparkTrail />

      {/* Ambient Floating Sparks */}
      <FloatingSparks count={300} />

      {/* Content (Foreground) */}
      <div
        className="relative z-10 w-full max-w-[1200px] mx-auto px-6 md:px-12 flex flex-col items-center text-center mt-12"
        style={{ transform: `translate3d(${mouse.x * -4}px, ${mouse.y * -4}px, 0)` }}
      >
        {/* Tagline */}
        <div className="animate-fade-in-up mt-[30px] mb-10" style={{ animationDelay: '0.1s' }}>
          <span className="text-caption text-accent tracking-[0.3em] font-medium">
            {t('hero.tagline')}
          </span>
        </div>

        {/* AL Logo - Glowing Flashlight Reveal */}
        <div className="animate-fade-in-up mb-8" style={{ animationDelay: '0.2s' }}>
          <div
            ref={logoRef}
            className="relative w-[220px] md:w-[280px] lg:w-[320px] aspect-[1/1] flex items-center justify-center"
            style={{ '--mouse-x': '-1000px', '--mouse-y': '-1000px' } as CSSProperties}
          >
            {/* 1. BASE SVG LINE LOGO - Animated Gradient Mask */}
            {/* TO ADJUST POSITION: Change translate-x-0 or translate-y-0 below (e.g. translate-x-[2px] translate-y-[-4px]) */}
            {/* TO ADJUST TRANSPARENCY: Change opacity-70 below (e.g. opacity-50, opacity-100) */}
            <div
              className="absolute inset-0 w-full h-full opacity-70 transition-opacity duration-300 translate-x-0 translate-y-0 scale-100 overflow-visible"
              style={{
                WebkitMaskImage: `url('/images/logo/AL_line_logo.svg')`,
                maskImage: `url('/images/logo/AL_line_logo.svg')`,
                WebkitMaskSize: 'contain',
                maskSize: 'contain',
                WebkitMaskPosition: 'center',
                maskPosition: 'center',
                WebkitMaskRepeat: 'no-repeat',
                maskRepeat: 'no-repeat',
              }}
            >
              <div className="absolute inset-0 bg-white/30" />
              <div className="absolute inset-[-100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_60%,#00f0ff_85%,#8b3dff_100%)]" />
            </div>

            {/* 2. REVEALED GLOWING PNG LOGO */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-200 overflow-visible"
              style={{
                WebkitMaskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
                maskImage: `radial-gradient(150px circle at var(--mouse-x) var(--mouse-y), black 0%, transparent 100%)`,
              }}
            >
              {/* TO ADJUST POSITION: Change translate-x-[5px] or translate-y-[-33px] below */}
              {/* TO ADJUST TRANSPARENCY: Change opacity-100 below (e.g. opacity-80, opacity-50) */}
              <img
                src="/images/logo/AL_logo.png"
                alt="AetherLabs Glowing Logo"
                className="w-full h-full object-contain select-none translate-x-[2px] translate-y-[-2px] scale-100"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* Headline */}
        <h1
          className="display-title mb-6 max-w-4xl text-white animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {t('hero.headline')}
        </h1>

        {/* Subheadline */}
        <p
          className="text-body-large max-w-2xl mx-auto mb-12 animate-fade-in-up text-zinc-400"
          style={{ animationDelay: '0.45s' }}
        >
          {t('hero.subheadline')}
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: '0.6s' }}
        >
          <a
            href="#contact"
            className="group relative inline-flex overflow-hidden rounded-lg p-[4px] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_0_rgba(0,240,255,0)] hover:shadow-[0_0_40px_rgba(0,240,255,0.4)]"
          >
            {/* Spinning Running Border Layer */}
            <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#00f0ff_90%,#8b3dff_100%)] opacity-100 transition-opacity duration-300" />

            {/* Inner White Button Background */}
            <div className="relative flex items-center justify-center px-9 py-4 bg-white rounded-[6px] overflow-hidden w-full h-full">
              {/* Sweeping gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8b3dff] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />

              <span className="relative z-10 text-black font-semibold text-sm group-hover:text-white transition-colors duration-300">
                {t('hero.primary_cta')}
              </span>
            </div>
          </a>
          <a
            href="#projects"
            className="group flex items-center gap-2 px-6 py-4 text-sm font-medium text-zinc-400 hover:text-white transition-colors duration-300"
          >
            {t('hero.secondary_cta')}
            <span className="w-5 h-px bg-current group-hover:w-8 transition-all duration-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
