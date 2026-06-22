import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export function ServicesSection() {
  const { t } = useTranslation();
  const titleRef = useScrollAnimation({ type: 'fade-up' });

  const services = [
    { id: 'web_dev', number: '01', title: t('services.web_dev.title'), desc: t('services.web_dev.desc') },
    { id: 'mobile_dev', number: '02', title: t('services.mobile_dev.title'), desc: t('services.mobile_dev.desc') },
    { id: 'fivem', number: '03', title: t('services.fivem.title'), desc: t('services.fivem.desc') },
  ];

  return (
    <section id="services" className="py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section label */}
        <div ref={titleRef} className="mb-20">
          <span className="text-caption text-accent">{t('services.section_title')}</span>
        </div>

        {/* Services — editorial list */}
        <div className="flex flex-col">
          {services.map((service, i) => (
            <div
              key={service.id}
              className={`group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 py-14 md:py-20 ${
                i > 0 ? 'border-t border-white/[0.06]' : ''
              }`}
            >
              {/* Number */}
              <div className="md:col-span-1">
                <span className="text-caption text-accent">{service.number}</span>
              </div>

              {/* Title */}
              <div className="md:col-span-4">
                <h3 className="heading-2 text-text-primary group-hover:text-accent transition-colors duration-500">
                  {service.title}
                </h3>
              </div>

              {/* Description */}
              <div className="md:col-span-7">
                <p className="text-body-large leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
