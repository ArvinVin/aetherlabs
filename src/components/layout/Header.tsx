import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { id: 'services', label: t('header.services') },
    { id: 'projects', label: t('header.projects') },
    { id: 'tech-stack', label: t('header.tech_stack') },
    { id: 'contact', label: t('header.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#050508]/95 backdrop-blur-md border-b border-white/[0.04] py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 z-50">
          <img src="/images/logo/AL_logo.png" alt="AetherLabs" className="h-8 w-auto" />
          <span className="font-heading text-base font-semibold tracking-[0.15em] text-text-primary">
            AETHERLABS
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="text-caption text-text-secondary hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-5 ml-2 pl-6 border-l border-white/[0.06]">
            <LanguageSwitcher />
            <a
              href="#contact"
              className="group relative inline-flex overflow-hidden rounded-md p-[3px] hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.4)]"
            >
              {/* Spinning Running Border Layer */}
              <div className="absolute inset-[-200%] animate-[spin_2.5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_75%,#00f0ff_90%,#8b3dff_100%)] opacity-100 transition-opacity duration-300" />
              
              {/* Inner White Button Background */}
              <div className="relative flex items-center justify-center px-5 py-2 bg-white rounded-[4px] overflow-hidden w-full h-full">
                <div className="absolute inset-0 bg-gradient-to-r from-[#00f0ff] to-[#8b3dff] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-0" />
                <span className="relative z-10 text-black text-xs font-semibold tracking-wider uppercase group-hover:text-white transition-colors duration-300">
                  {t('header.cta')}
                </span>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden z-50 p-2 text-text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`block h-px bg-current transition-all duration-300 origin-center ${isMobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
            <span className={`block h-px bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
          </div>
        </button>

        {/* Full-Screen Mobile Overlay */}
        <div className={`fixed inset-0 bg-background z-40 transition-all duration-500 md:hidden flex flex-col items-center justify-center ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}>
          <nav className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-heading font-semibold tracking-wide text-text-primary hover:text-accent transition-colors"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-12 flex flex-col items-center gap-6">
            <LanguageSwitcher />
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-8 py-3 text-sm font-medium bg-white text-black rounded-lg"
            >
              {t('header.cta')}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
