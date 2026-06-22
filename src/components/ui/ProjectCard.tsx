import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  isFeatured?: boolean;
}

export function ProjectCard({ title, description, imageSrc, tags, isFeatured = false }: ProjectCardProps) {
  const { t } = useTranslation();
  const ref = useScrollAnimation({ type: 'parallax' });

  return (
    <div className={`group flex flex-col ${isFeatured ? 'lg:flex-row' : ''} gap-8 lg:gap-16 items-center`}>
      {/* Image Container */}
      <div 
        ref={ref}
        className={`w-full ${isFeatured ? 'lg:w-3/5' : ''} relative aspect-video overflow-hidden rounded-lg border border-white/10 bg-surface shadow-2xl`}
      >
        <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-50 transition-opacity duration-500 z-10 pointer-events-none" />
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-[120%] object-cover object-top -mt-[10%]"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className={`w-full ${isFeatured ? 'lg:w-2/5' : ''} flex flex-col gap-6`}>
        <h3 className="heading-2 text-text-primary mb-2">{title}</h3>
        
        <p className="text-body-large text-text-secondary font-light">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="px-3 py-1 text-xs font-mono font-medium tracking-wider border border-white/10 rounded-md text-text-secondary bg-surface-elevated/50 backdrop-blur-md"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="ghost" className="!px-0 border-none hover:bg-transparent hover:text-accent-cyan flex items-center gap-2 group/btn">
            {t('projects.view_case_study')}
            <span className="w-8 h-px bg-current group-hover/btn:w-12 transition-all duration-300" />
          </Button>
        </div>
      </div>
    </div>
  );
}
