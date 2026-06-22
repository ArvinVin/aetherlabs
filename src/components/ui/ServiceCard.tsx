import type { LucideIcon } from 'lucide-react';
import { cn } from './LanguageSwitcher'; // Reusing cn utility

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function ServiceCard({ icon: Icon, title, description, className }: ServiceCardProps) {
  return (
    <div 
      className={cn(
        "group relative flex flex-col p-8 glass-panel overflow-hidden transition-all duration-500 hover:border-accent-cyan/30 rounded-lg",
        className
      )}
    >
      {/* Spotlight hover effect */}
      <div className="absolute -inset-px bg-gradient-to-br from-accent-cyan/10 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg pointer-events-none" />
      
      <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-lg border border-white/5 bg-surface-elevated text-text-primary group-hover:text-accent-cyan group-hover:border-accent-cyan/30 transition-colors duration-500 shadow-inner">
        <Icon size={24} strokeWidth={1.5} />
      </div>
      
      <h3 className="heading-3 text-text-primary mb-4 transition-colors group-hover:text-white">
        {title}
      </h3>
      
      <p className="text-body flex-1">
        {description}
      </p>
      
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-full bg-accent-cyan/50" />
        <div className="absolute top-0 right-0 w-full h-px bg-accent-cyan/50" />
      </div>
    </div>
  );
}
