import { useTranslation } from 'react-i18next';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

const LinkedinIcon = ({ size = 18, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const teamMembers = [
  {
    name: 'Arvin Indrawan',
    linkedin: 'https://www.linkedin.com/in/arvin-indrawan',
    image: '/images/our-team/arvin-indrawan.png',
  },
  {
    name: 'Muhammad Fatih Abdus Salam',
    linkedin: 'https://www.linkedin.com/in/mfatihas/',
    image: '/images/our-team/muhammad-fatih-adbus-salam.png',
  },
  {
    name: 'Jovanus Hartono',
    linkedin: 'https://www.linkedin.com/in/jovanus-hartono-b024b31b8/',
    image: 'https://ui-avatars.com/api/?name=Jovanus+Hartono&background=0D0D12&color=00f0ff&size=256',
  },
];

export function TeamSection() {
  const { t } = useTranslation();
  const titleRef = useScrollAnimation({ type: 'fade-up' });

  return (
    <section id="team" className="py-16 md:py-24 border-t border-white/[0.04]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Section label */}
        <div ref={titleRef} className="mb-20">
          <span className="text-caption text-accent">{t('team.section_title')}</span>
        </div>

        {/* Team Grid */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-14">
          {teamMembers.map((member, i) => {
            const cardRef = useScrollAnimation({ type: 'fade-up', delay: i * 0.1 });
            
            return (
              <div key={member.name} ref={cardRef}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col w-full max-w-[240px] gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-2 h-full"
                >
                  {/* Image Wrapper */}
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-background border border-white/[0.04]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050508]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* LinkedIn Icon Overlay */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#0a66c2] text-white flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(10,102,194,0.4)]">
                      <LinkedinIcon size={16} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-medium text-white group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
