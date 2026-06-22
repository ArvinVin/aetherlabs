import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const techStack = [
  'React', 'Vue', 'TypeScript', 'Node.js', 'Three.js', 'Vite',
  'Tailwind CSS', 'Go', 'PostgreSQL', 'Docker', 'Figma', 'Python', 'AWS',
];

// Double for seamless loop
const row1 = [...techStack, ...techStack];
const row2 = [...[...techStack].reverse(), ...[...techStack].reverse()];
const row3 = [...techStack.slice(6), ...techStack.slice(0, 6), ...techStack.slice(6), ...techStack.slice(0, 6)];

export function TechStackSection() {
  const { t } = useTranslation();
  const ref = useScrollAnimation({ type: 'fade-up' });

  return (
    <section id="tech-stack" className="py-16 md:py-24 border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
        <span ref={ref} className="text-caption text-accent">
          {t('tech_stack.section_title')}
        </span>
      </div>

      {/* Marquee with edge fade */}
      <div
        className="relative w-full flex flex-col gap-4 select-none"
        style={{ maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)' }}
      >
        {/* Row 1 */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row1.map((tech, i) => (
            <span
              key={`r1-${i}`}
              className="mx-2 px-5 py-2.5 text-[11px] font-mono tracking-[0.15em] uppercase border border-white/[0.06] rounded-md text-text-secondary hover:text-white hover:border-white/20 transition-colors whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 2 — reverse direction */}
        <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused]">
          {row2.map((tech, i) => (
            <span
              key={`r2-${i}`}
              className="mx-2 px-5 py-2.5 text-[11px] font-mono tracking-[0.15em] uppercase border border-white/[0.06] rounded-md text-text-secondary hover:text-white hover:border-white/20 transition-colors whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Row 3 */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {row3.map((tech, i) => (
            <span
              key={`r3-${i}`}
              className="mx-2 px-5 py-2.5 text-[11px] font-mono tracking-[0.15em] uppercase border border-white/[0.06] rounded-md text-text-secondary hover:text-white hover:border-white/20 transition-colors whitespace-nowrap"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
