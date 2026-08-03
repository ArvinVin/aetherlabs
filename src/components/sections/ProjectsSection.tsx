import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';

interface ProjectBlockProps {
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  tags: string[];
  liveUrl: string;
  liveLabel: string;
  reversed?: boolean;
}

function ProjectBlock({ title, subtitle, description, imageSrc, tags, liveUrl, liveLabel, reversed }: ProjectBlockProps) {
  const imageRef = useScrollAnimation({ type: 'fade-up' });

  const isExternal = liveUrl.startsWith('http');

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center ${reversed ? 'lg:[direction:rtl]' : ''}`}>
      {/* Image */}
      <div ref={imageRef} className={`relative overflow-hidden rounded-xl border border-white/[0.06] group ${reversed ? 'lg:[direction:ltr]' : ''}`}>
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
        <img
          src={imageSrc}
          alt={title}
          className="w-full aspect-[16/10] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className={`flex flex-col gap-6 ${reversed ? 'lg:[direction:ltr]' : ''}`}>
        <span className="text-caption text-accent">{subtitle}</span>
        <h3 className="heading-1">{title}</h3>
        <p className="text-body-large">{description}</p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 text-[11px] font-mono tracking-wider border border-white/[0.08] rounded-md text-text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href={liveUrl}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="group/cta inline-flex items-center gap-2 mt-4 text-sm font-medium text-white hover:text-accent transition-colors duration-300"
        >
          {liveLabel}
          <ArrowUpRight size={16} className="group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const { t } = useTranslation();
  const titleRef = useScrollAnimation({ type: 'fade-up' });

  return (
    <section id="projects" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section label */}
        <div ref={titleRef} className="mb-24">
          <span className="text-caption text-accent">{t('projects.section_title')}</span>
        </div>

        <div className="flex flex-col gap-32 lg:gap-40">
          {/* La Élume Storefront */}
          <ProjectBlock
            title={t('projects.laelume.title')}
            subtitle={t('projects.laelume.subtitle')}
            description={t('projects.laelume.desc')}
            imageSrc="/images/portfolio/laelume-storefront.png"
            tags={['React 19', 'TypeScript', 'Tailwind CSS v4', 'TanStack Router', 'Zustand']}
            liveUrl={t('projects.laelume.live_url')}
            liveLabel={t('projects.explore_live')}
          />

          {/* La Élume Admin */}
          <ProjectBlock
            title={t('projects.laelume_admin.title')}
            subtitle={t('projects.laelume_admin.subtitle')}
            description={t('projects.laelume_admin.desc')}
            imageSrc="/images/portfolio/laelume-admin.png"
            tags={['Vue 3', 'PrimeVue', 'Pinia', 'Recharts', 'TipTap']}
            liveUrl={t('projects.laelume_admin.live_url')}
            liveLabel={t('projects.view_project')}
            reversed
          />

          {/* Sentaury — Racing Community */}
          <ProjectBlock
            title={t('projects.sentaury.title')}
            subtitle={t('projects.sentaury.subtitle')}
            description={t('projects.sentaury.desc')}
            imageSrc="/images/portfolio/sentaury.png"
            tags={['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Discord OAuth']}
            liveUrl={t('projects.sentaury.live_url')}
            liveLabel={t('projects.explore_live')}
          />
        </div>
      </div>
    </section>
  );
}
