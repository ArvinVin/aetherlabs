import { useTranslation } from 'react-i18next';
import { ContactForm } from '../ui/ContactForm';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { ArrowUpRight } from 'lucide-react';

export function ContactSection() {
  const { t } = useTranslation();
  const titleRef = useScrollAnimation({ type: 'fade-up' });
  const formRef = useScrollAnimation({ type: 'fade-up', delay: 0.15 });

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left — Copy */}
          <div ref={titleRef} className="flex flex-col gap-6">
            <span className="text-caption text-accent">{t('contact.section_title')}</span>
            <h2 className="heading-1 mt-2">
              {t('contact.headline')}
            </h2>
            <p className="text-body-large mt-2">
              {t('contact.subtitle')}
            </p>

            <div className="mt-10 flex flex-col gap-4">
              <span className="text-caption">{t('contact.direct_contact')}</span>
              <a
                href={`mailto:${t('contact.email')}`}
                className="group inline-flex items-center gap-2 text-lg font-medium text-white hover:text-accent transition-colors"
              >
                {t('contact.email')}
                <ArrowUpRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={formRef}>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
