import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ChevronDown } from 'lucide-react';

const portfolioItems = [
  { id: 'project-laelume', titleKey: 'projects.laelume.title', subtitleKey: 'projects.laelume.subtitle' },
  { id: 'project-laelume-admin', titleKey: 'projects.laelume_admin.title', subtitleKey: 'projects.laelume_admin.subtitle' },
  { id: 'project-sentaury', titleKey: 'projects.sentaury.title', subtitleKey: 'projects.sentaury.subtitle' },
];

export function Header() {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isMobileProjectsOpen, setIsMobileProjectsOpen] = useState(false);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handleDropdownEnter = () => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setIsProjectsOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setIsProjectsOpen(false), 150);
  };

  const scrollToProject = (id: string) => {
    setIsProjectsOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileProjectsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const navLinks = [
    { id: 'services', label: t('header.services') },
    { id: 'projects', label: t('header.projects'), hasDropdown: true },
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
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div
                  key={link.id}
                  className="relative"
                  onMouseEnter={handleDropdownEnter}
                  onMouseLeave={handleDropdownLeave}
                >
                  <a
                    href={`#${link.id}`}
                    className="text-caption text-text-secondary hover:text-white transition-colors duration-300 inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${isProjectsOpen ? 'rotate-180' : ''}`}
                    />
                  </a>

                  {/* Dropdown */}
                  <div
                    className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-300 ${
                      isProjectsOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    <div className="w-72 rounded-xl border border-white/[0.08] bg-[#0a0a0f]/95 backdrop-blur-xl shadow-2xl shadow-black/40 overflow-hidden">
                      {/* Dropdown header */}
                      <div className="px-4 py-3 border-b border-white/[0.06]">
                        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-text-secondary">
                          Portfolio
                        </span>
                      </div>

                      {/* Items */}
                      <div className="py-1.5">
                        {portfolioItems.map((item, i) => (
                          <button
                            key={item.id}
                            onClick={() => scrollToProject(item.id)}
                            className="w-full text-left px-4 py-3 flex items-center gap-3 group/item hover:bg-white/[0.04] transition-colors duration-200"
                            style={{ animationDelay: `${i * 50}ms` }}
                          >
                            <span className="flex-shrink-0 w-6 h-6 rounded-md bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-[10px] font-mono text-accent">
                              {String(i + 1).padStart(2, '0')}
                            </span>
                            <div className="min-w-0">
                              <p className="text-sm font-medium text-text-primary group-hover/item:text-white transition-colors truncate">
                                {t(item.titleKey)}
                              </p>
                              <p className="text-[11px] text-text-secondary truncate mt-0.5">
                                {t(item.subtitleKey)}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  className="text-caption text-text-secondary hover:text-white transition-colors duration-300"
                >
                  {link.label}
                </a>
              )
            )}
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
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link, i) =>
              link.hasDropdown ? (
                <div key={link.id} className="flex flex-col items-center" style={{ animationDelay: `${i * 0.1}s` }}>
                  <button
                    onClick={() => setIsMobileProjectsOpen(!isMobileProjectsOpen)}
                    className="text-3xl font-heading font-semibold tracking-wide text-text-primary hover:text-accent transition-colors inline-flex items-center gap-2"
                  >
                    {link.label}
                    <ChevronDown
                      size={20}
                      className={`transition-transform duration-300 ${isMobileProjectsOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Mobile sub-items */}
                  <div
                    className={`overflow-hidden transition-all duration-400 ease-out ${
                      isMobileProjectsOpen ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-3 px-6 py-2 rounded-xl border border-white/[0.06] bg-white/[0.03]">
                      {portfolioItems.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => scrollToProject(item.id)}
                          className="text-base text-text-secondary hover:text-accent transition-colors"
                        >
                          {t(item.titleKey)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-heading font-semibold tracking-wide text-text-primary hover:text-accent transition-colors"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  {link.label}
                </a>
              )
            )}
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
