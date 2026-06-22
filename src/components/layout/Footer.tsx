import { useTranslation } from 'react-i18next';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="relative bg-background border-t border-white/[0.04]">
      {/* Main footer content */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3">
              <img src="/images/logo/AL_logo.png" alt="AetherLabs" className="h-8 w-auto" />
              <span className="font-heading text-base font-semibold tracking-[0.15em]">AETHERLABS</span>
            </a>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mt-2">
              {t('hero.subheadline')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4">
            <h4 className="text-caption mb-2">{t('footer.quick_links')}</h4>
            <nav className="flex flex-col gap-3">
              <a href="#services" className="text-sm text-text-secondary hover:text-white transition-colors">{t('header.services')}</a>
              <a href="#projects" className="text-sm text-text-secondary hover:text-white transition-colors">{t('header.projects')}</a>
              <a href="#tech-stack" className="text-sm text-text-secondary hover:text-white transition-colors">{t('header.tech_stack')}</a>
              <a href="#contact" className="text-sm text-text-secondary hover:text-white transition-colors">{t('header.contact')}</a>
            </nav>
          </div>

          {/* Contact & Social */}
          <div className="flex flex-col gap-4">
            <h4 className="text-caption mb-2">{t('footer.social')}</h4>
            <a href={`mailto:${t('contact.email')}`} className="text-sm text-text-secondary hover:text-accent transition-colors">
              {t('contact.email')}
            </a>
            <p className="text-sm text-text-secondary">Jakarta, Indonesia</p>
            <div className="flex items-center gap-3 mt-2">
              <a
                href="https://www.linkedin.com/company/aether-labs-id"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full border border-white/[0.06] flex items-center justify-center text-text-secondary hover:text-white hover:border-white/20 transition-all text-[10px] font-mono"
              >
                LI
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-secondary font-mono">{t('footer.rights')}</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="text-xs text-text-secondary hover:text-white transition-colors font-mono">Privacy</a>
            <a href="#terms" className="text-xs text-text-secondary hover:text-white transition-colors font-mono">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
