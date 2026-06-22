import React, { useRef, useState } from 'react';
import { cn } from './LanguageSwitcher';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'magnetic';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', isLoading, children, ...props }, ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // Merge refs
    const setRefs = React.useCallback(
      (node: HTMLButtonElement) => {
        if (buttonRef) {
          (buttonRef as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
        if (ref) {
          if (typeof ref === 'function') ref(node);
          else (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;
        }
      },
      [ref]
    );

    const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (variant !== 'magnetic' || !buttonRef.current) return;
      
      const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
      const x = (e.clientX - left - width / 2) * 0.2;
      const y = (e.clientY - top - height / 2) * 0.2;
      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      if (variant !== 'magnetic') return;
      setPosition({ x: 0, y: 0 });
    };

    const handleMouseEnter = () => {
      if (variant !== 'magnetic') return;
    };

    const baseStyles = "relative inline-flex items-center justify-center font-body text-sm font-medium tracking-wide px-6 py-3 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-md overflow-hidden group";
    
    const variants = {
      primary: "bg-surface-elevated text-text-primary border border-white/10 hover:border-accent-cyan/50 hover:bg-white/5 shadow-lg",
      secondary: "bg-transparent text-text-primary border border-border hover:border-white/20 hover:bg-white/5",
      ghost: "bg-transparent text-text-secondary hover:text-text-primary",
      magnetic: "bg-surface text-text-primary border border-white/5 shadow-xl"
    };

    const transformStyle = variant === 'magnetic' 
      ? { transform: `translate(${position.x}px, ${position.y}px)` } 
      : {};

    return (
      <button
        ref={setRefs}
        className={cn(baseStyles, variants[variant], className)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={transformStyle}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading...
          </span>
        ) : (
          <>
            <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
            {/* Magnetic spotlight / Glow effect overlay */}
            {variant === 'magnetic' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-accent-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none mix-blend-screen"
                  style={{
                    background: `radial-gradient(circle at 50% 50%, var(--color-accent-glow) 0%, transparent 60%)`,
                    transform: `translate(${position.x * 0.5}px, ${position.y * 0.5}px)`,
                  }}
                />
                {/* Thin glowing border effect */}
                <div className="absolute inset-0 rounded-md border border-accent/0 group-hover:border-accent/50 transition-colors duration-500 pointer-events-none" />
              </>
            )}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
